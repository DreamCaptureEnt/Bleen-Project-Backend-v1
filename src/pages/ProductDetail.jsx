import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft, CalendarDays, Package, Pill, ZoomIn, X,
  ChevronLeft, ChevronRight, ImageOff, Tag, Layers,
  FileText, FlaskConical, CheckCircle2, Info,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

function formatDate(v) {
  if (!v) return '';
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(v));
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX  — portal-rendered, never clipped by page layout
───────────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const total = images.length;
  const touchX = useRef(null);

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [prev, next, onClose]);

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = saved; };
  }, []);

  const img = images[idx];
  const hasThumb = total > 1;

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        background: 'rgba(0,0,0,0.96)',
        height: '100dvh',
        WebkitTapHighlightColor: 'transparent',
      }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const d = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 40) d > 0 ? next() : prev();
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div style={{
        flexShrink: 0, height: 52,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
      }}>
        <span style={{
          background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
          borderRadius: 999, padding: '3px 11px', fontSize: 11, fontWeight: 700,
        }}>
          {idx + 1} / {total}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.13)', border: 'none',
            color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Image stage — fills all remaining vertical space */}
      <div style={{
        flex: 1, minHeight: 0,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {total > 1 && (
          <button onClick={prev} aria-label="Previous" style={navBtnStyle('left')}>
            <ChevronLeft size={20} />
          </button>
        )}
        <img
          key={idx}
          src={img.url}
          alt={img.file_name || `Image ${idx + 1}`}
          style={{
            maxWidth: total > 1 ? 'calc(100% - 88px)' : '100%',
            maxHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'contain',
            borderRadius: 8, display: 'block',
            animation: 'lbFade .18s ease',
          }}
        />
        {total > 1 && (
          <button onClick={next} aria-label="Next" style={navBtnStyle('right')}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasThumb && (
        <div style={{
          flexShrink: 0, height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 6, padding: '0 12px', overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {images.map((im, i) => (
            <button
              key={im.id ?? i}
              onClick={() => setIdx(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                flexShrink: 0, width: 46, height: 46, padding: 0,
                borderRadius: 7, overflow: 'hidden', background: 'transparent',
                border: i === idx ? '2.5px solid #fff' : '2px solid rgba(255,255,255,0.18)',
                opacity: i === idx ? 1 : 0.48,
                transform: i === idx ? 'scale(1.1)' : 'scale(1)',
                transition: 'all .16s ease', cursor: 'pointer',
              }}
            >
              <img src={im.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes lbFade{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>,
    document.body
  );
}

function navBtnStyle(side) {
  return {
    position: 'absolute', [side]: 6, zIndex: 2,
    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
    background: 'rgba(255,255,255,0.13)', border: 'none',
    color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer',
  };
}

/* ─────────────────────────────────────────────────────────────
   IMAGE GALLERY  — inline, fully self-contained, responsive
───────────────────────────────────────────────────────────── */
function ImageGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchX = useRef(null);
  const total = images.length;

  const prev = e => { e?.stopPropagation(); setActive(i => (i - 1 + total) % total); };
  const next = e => { e?.stopPropagation(); setActive(i => (i + 1) % total); };

  if (!images.length) {
    return (
      <div style={{
        aspectRatio: '1/1', width: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 10, borderRadius: 14, background: '#f1f5f9', color: '#94a3b8',
      }}>
        <ImageOff size={30} />
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>No images</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      {lightboxOpen && (
        <Lightbox images={images} startIndex={active} onClose={() => setLightboxOpen(false)} />
      )}

      {/* Main square */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Open image viewer"
        onClick={() => setLightboxOpen(true)}
        onKeyDown={e => e.key === 'Enter' && setLightboxOpen(true)}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const d = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 40) { d > 0 ? next(e) : prev(e); }
          else setLightboxOpen(true);
          touchX.current = null;
        }}
        style={{
          position: 'relative', width: '100%', aspectRatio: '1/1',
          borderRadius: 14, overflow: 'hidden', cursor: 'zoom-in',
          background: 'linear-gradient(135deg, #f0fdfa 0%, #eff6ff 100%)',
        }}
      >
        <img
          key={active}
          src={images[active].url}
          alt={productName}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'contain', padding: 10, boxSizing: 'border-box',
            animation: 'gFade .18s ease',
          }}
        />

        {/* Zoom icon */}
        <div style={{
          position: 'absolute', right: 10, top: 10, zIndex: 2,
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(0,0,0,0.35)', color: '#fff',
          display: 'grid', placeItems: 'center',
          opacity: 0, transition: 'opacity .2s',
          pointerEvents: 'none',
        }} className="gallery-zoom-hint">
          <ZoomIn size={13} />
        </div>

        {/* Prev / next — always visible on mobile, hover on desktop */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              style={galleryArrow('left')}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              style={galleryArrow('right')}
            >
              <ChevronRight size={15} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div style={{
            position: 'absolute', bottom: 10, left: 0, right: 0, zIndex: 2,
            display: 'flex', justifyContent: 'center', gap: 5,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActive(i); }}
                aria-label={`Image ${i + 1}`}
                style={{
                  height: 5, width: i === active ? 16 : 5,
                  borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === active ? '#0d9488' : 'rgba(255,255,255,0.65)',
                  transition: 'width .22s ease, background .18s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div style={{
          marginTop: 10, display: 'flex', gap: 7, overflowX: 'auto',
          paddingBottom: 2, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}>
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => setActive(i)}
              aria-label={`Select image ${i + 1}`}
              style={{
                flexShrink: 0, width: 54, height: 54, padding: 0,
                borderRadius: 9, overflow: 'hidden', background: 'transparent',
                border: i === active ? '2.5px solid #0d9488' : '2px solid #e2e8f0',
                opacity: i === active ? 1 : 0.58,
                transform: i === active ? 'scale(1.06)' : 'scale(1)',
                boxShadow: i === active ? '0 2px 8px rgba(13,148,136,0.18)' : 'none',
                transition: 'all .17s ease', cursor: 'pointer',
              }}
            >
              <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes gFade{from{opacity:.5}to{opacity:1}}
        div[role="button"]:hover .gallery-zoom-hint{opacity:1!important}
      `}</style>
    </div>
  );
}

function galleryArrow(side) {
  return {
    position: 'absolute', [side]: 6, top: '50%', transform: 'translateY(-50%)',
    zIndex: 3, width: 30, height: 30, borderRadius: '50%',
    background: 'rgba(0,0,0,0.32)', border: 'none', color: '#fff',
    display: 'grid', placeItems: 'center', cursor: 'pointer',
  };
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL PAGE
───────────────────────────────────────────────────────────── */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    api.product(id)
      .then(data => { setProduct(data); setError(''); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="h-14 animate-pulse border-b border-slate-200 bg-white" />
        <div className="h-32 animate-pulse bg-slate-200 sm:h-44" />
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
            <div className="space-y-4">
              <div className="aspect-square animate-pulse rounded-2xl bg-white" />
              <div className="h-28 animate-pulse rounded-2xl bg-white" />
            </div>
            <div className="h-80 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  /* Error state */
  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="w-full max-w-xs rounded-2xl bg-white p-8 shadow-sm">
          <ImageOff size={40} className="mx-auto text-slate-300" />
          <p className="mt-4 font-bold text-slate-700">{error || 'Product not found.'}</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-5 rounded-full bg-teal-500 px-6 py-2.5 text-sm font-bold text-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [];

  const TABS = [
    { key: 'overview',    label: 'Overview',    icon: Info },
    { key: 'composition', label: 'Composition', icon: FlaskConical },
    { key: 'description', label: 'Description', icon: FileText },
  ];

  const META_ITEMS = [
    { icon: Pill,         label: 'Formulation', value: product.formulation },
    { icon: Package,      label: 'Packing',     value: product.packing_size },
    { icon: CalendarDays, label: 'Added On',    value: formatDate(product.created_at) },
  ].filter(x => x.value);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky breadcrumb nav ── */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:px-6">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-bold text-teal-600 transition hover:bg-teal-50"
          >
            <ArrowLeft size={14} />
            <span className="hidden xs:inline">Products</span>
          </button>
          <ChevronRight size={13} className="shrink-0 text-slate-300" />
          <span className="min-w-0 truncate text-sm font-semibold text-slate-600">{product.name}</span>
        </div>
      </nav>

      {/* ── Hero banner ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-slate-800 px-4 py-8 text-white sm:px-6 sm:py-12">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {product.division_name && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                <Layers size={8} /> {product.division_name}
              </span>
            )}
            {product.product_category_name && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                <Tag size={8} /> {product.product_category_name}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          {product.status && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
              <CheckCircle2 size={12} className="text-green-300" />
              {product.status}
            </div>
          )}
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:py-10">
        {/*
          Mobile:  single column, gallery on top, tabs below
          Desktop: two columns side-by-side
        */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[380px_1fr]">

          {/* ── Left column: gallery + quick info ── */}
          <div className="space-y-4">

            {/* Gallery card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <ImageGallery images={images} productName={product.name} />
            </div>

            {/* Quick info — hidden on mobile to save space, shown on tablet+ */}
            {META_ITEMS.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Info</p>
                <div className="space-y-2">
                  {META_ITEMS.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-100">
                        <Icon size={14} className="text-teal-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">{label}</p>
                        <p className="mt-0.5 truncate text-sm font-bold text-slate-800">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column: tabbed detail ── */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Tab bar — always scrollable so it never wraps on tiny screens */}
            <div
              className="flex border-b border-slate-100"
              style={{ overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`inline-flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-bold transition sm:px-5 sm:py-3.5 sm:text-sm ${
                    tab === key
                      ? 'border-b-2 border-teal-500 text-teal-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-4 sm:p-6">

              {/* Overview */}
              {tab === 'overview' && (
                <div className="space-y-4">
                  {/* 2-col grid of stat pills — works from 320px up */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      { label: 'Formulation', value: product.formulation },
                      { label: 'Status',      value: product.status },
                      { label: 'Division',    value: product.division_name },
                      { label: 'Category',    value: product.product_category_name },
                      { label: 'Chemical',    value: product.product_chemical_category_name },
                      { label: 'Packing',     value: product.packing_size },
                      { label: 'Added',       value: formatDate(product.created_at) },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-slate-50 p-3 sm:p-4">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 sm:text-[10px]">
                          {label}
                        </p>
                        <p className="mt-1 break-words text-sm font-bold text-slate-900">
                          {value || '—'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {product.composition && (
                    <div className="rounded-xl border border-slate-200 p-3.5 sm:p-5">
                      <p className="mb-1.5 text-[10px] font-black uppercase tracking-wider text-teal-600">Composition</p>
                      <p className="line-clamp-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {product.composition}
                      </p>
                      <button onClick={() => setTab('composition')} className="mt-2 text-xs font-bold text-teal-600 hover:underline">
                        Read full →
                      </button>
                    </div>
                  )}

                  {product.description && (
                    <div className="rounded-xl border border-slate-200 p-3.5 sm:p-5">
                      <p className="mb-1.5 text-[10px] font-black uppercase tracking-wider text-teal-600">Description</p>
                      <p className="line-clamp-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {product.description}
                      </p>
                      <button onClick={() => setTab('description')} className="mt-2 text-xs font-bold text-teal-600 hover:underline">
                        Read full →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Composition */}
              {tab === 'composition' && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <FlaskConical size={14} className="text-teal-600" />
                    <p className="text-[10px] font-black uppercase tracking-wider text-teal-600">Full Composition</p>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-8 text-slate-700">
                    {product.composition || 'Composition not specified.'}
                  </p>
                </div>
              )}

              {/* Description */}
              {tab === 'description' && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <FileText size={14} className="text-teal-600" />
                    <p className="text-[10px] font-black uppercase tracking-wider text-teal-600">Full Description</p>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-8 text-slate-700">
                    {product.description || 'No description added.'}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
