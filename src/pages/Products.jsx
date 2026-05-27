import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, ChevronDown, LayoutGrid, List, ChevronRight, Package } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api';

function ProductCard({ product, onClick, view }) {
  const firstImage = product.images?.[0];
  if (view === 'list') {
    return (
      <article
        onClick={onClick}
        className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 sm:h-24 sm:w-24">
          {firstImage ? (
            <img src={firstImage.url} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          ) : (
            <div className="grid h-full w-full place-items-center text-xl font-black text-teal">
              {product.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-teal">{product.product_category_name || 'Product'}</p>
          <h3 className="mt-1 truncate text-lg font-black text-slate-900">{product.name}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{product.division_name}</p>
          {product.formulation && <p className="mt-1 text-xs text-slate-400">{product.formulation}</p>}
        </div>
        {product.status && (
          <span className="shrink-0 hidden rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 sm:inline-block">{product.status}</span>
        )}
        <ChevronRight size={18} className="shrink-0 text-slate-300 group-hover:text-teal transition" />
      </article>
    );
  }
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
        {firstImage ? (
          <img src={firstImage.url} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center text-3xl font-black text-teal/40">
            {product.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        {product.status && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-green-700 shadow backdrop-blur-sm">
            {product.status}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-teal">{product.product_category_name || 'Product'}</p>
        <h3 className="mt-1.5 text-lg font-black leading-snug text-slate-900">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{product.division_name}</p>
        {product.formulation && <p className="mt-2 text-xs text-slate-400">{product.formulation}</p>}
      </div>
    </article>
  );
}

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chemicalCategoryParam = searchParams.get('chemical_category') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chemicalCategories, setChemicalCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [chemicalCategory, setChemicalCategory] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('name');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ count: 0, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sync catalogue context from URL params.
  useEffect(() => {
    setChemicalCategory(chemicalCategoryParam);
    setCategory('');
    setSearch('');
    setPage(1);
  }, [chemicalCategoryParam]);

  // Load filter options
  useEffect(() => {
    Promise.all([
      api.categories({ page_size: 100 }),
      api.chemicalCategories({ page_size: 100 }),
    ]).then(([cc, chem]) => {
      setCategories(cc.results);
      setChemicalCategories(chem.results);
    }).catch(() => {});
  }, []);

  // Load products
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      api.products({ page, page_size: 12, search, chemical_category: chemicalCategory, category })
        .then((data) => {
          setProducts(data.results);
          setMeta(data);
          setError('');
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [page, search, chemicalCategory, category]);

  // Client-side sort
  const displayed = useMemo(() => {
    let list = [...products];
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name_desc') list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'newest') list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return list;
  }, [products, sort]);

  const contextLabel = chemicalCategories.find((c) => String(c.id) === String(chemicalCategory))?.name;
  const contextType = chemicalCategory ? 'Chemical Category' : '';
  const activeFilterCount = [search, category].filter(Boolean).length;

  const resetAll = () => {
    setSearch('');
    setCategory('');
    setSort('name');
    setPage(1);
  };

  const SelectField = ({ label, value, onChange, options, placeholder }) => (
    <div className="relative">
      <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); setPage(1); }}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3.5 pr-8 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero + search */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal to-navy px-4 py-20 text-white sm:px-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Product Catalogue</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Trusted Formulations</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80">
            {contextLabel ? `${contextType}: ${contextLabel}` : 'Explore our full product range and filter by product category.'}
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-teal" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search product, composition, category…"
              className="w-full rounded-full border-0 bg-white px-14 py-4 text-slate-900 shadow-xl outline-none focus:ring-2 focus:ring-teal-300"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-slate-500"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        {/* Top row */}
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2.5 px-4 py-3 sm:px-6">
          {contextLabel && (
            <span className="inline-flex items-center rounded-xl bg-teal-50 px-3.5 py-2.5 text-sm font-bold text-teal-700">
              {contextType}: {contextLabel}
            </span>
          )}
          {/* Category */}
          <div className="min-w-[150px] flex-1 sm:max-w-[200px]">
            <SelectField
              value={category}
              onChange={setCategory}
              placeholder="All Categories"
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-8 text-sm font-semibold text-slate-700 outline-none"
            >
              <option value="name">A – Z</option>
              <option value="name_desc">Z – A</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <button onClick={() => setView('grid')} className={`px-3 py-2.5 transition ${view === 'grid' ? 'bg-teal text-white' : 'text-slate-500 hover:bg-slate-100'}`}><LayoutGrid size={15} /></button>
            <button onClick={() => setView('list')} className={`px-3 py-2.5 transition ${view === 'list' ? 'bg-teal text-white' : 'text-slate-500 hover:bg-slate-100'}`}><List size={15} /></button>
          </div>

          <span className="ml-auto text-sm font-semibold text-slate-400">{meta.count} products</span>

          {activeFilterCount > 0 && (
            <button
              onClick={resetAll}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition"
            >
              Reset ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-2 sm:px-6">
            {[
              search && { label: `Search: "${search}"`, clear: () => setSearch('') },
              category && { label: `Category: ${categories.find((c) => String(c.id) === String(category))?.name || category}`, clear: () => setCategory('') },
            ].filter(Boolean).map((chip, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                {chip.label}
                <button onClick={chip.clear} className="hover:text-teal-900"><X size={11} /></button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {loading ? (
          <div className={`grid gap-5 ${view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`animate-pulse rounded-2xl bg-white ${view === 'grid' ? 'h-72' : 'h-24'}`} />
            ))}
          </div>
        ) : displayed.length ? (
          <>
            <div className={`grid gap-5 ${view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} view={view} onClick={() => navigate(`/products/${p.id}`)} />
              ))}
            </div>
            {/* Pagination */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                disabled={!meta.has_previous}
                onClick={() => setPage((v) => Math.max(v - 1, 1))}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                ← Previous
              </button>
              <span className="rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-white">
                {meta.page} / {meta.total_pages || 1}
              </span>
              <button
                disabled={!meta.has_next}
                onClick={() => setPage((v) => v + 1)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <Package size={44} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">No products found</h2>
            <p className="mt-2 text-slate-500">Try adjusting your filters or search term.</p>
            <button onClick={resetAll} className="mt-6 rounded-full bg-teal px-6 py-3 text-sm font-bold text-white">Reset All Filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
