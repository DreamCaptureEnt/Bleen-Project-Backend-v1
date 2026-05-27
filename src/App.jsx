import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Company from './pages/Company';
import Divisions from './pages/Divisions';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Responsibility from './pages/Responsibility';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import './index.css';
import { ToastProvider } from './components/Toast';

const AdminGuard = lazy(() => import('./pages/admin/AdminGuard'));
const AdminShell = lazy(() => import('./pages/admin/AdminShell'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminDivisions = lazy(() => import('./pages/admin/AdminDivisions'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminChemicalCategories = lazy(() => import('./pages/admin/AdminChemicalCategories'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));

/* ── Smooth custom cursor ───────────────────────────── */
function SmoothCursor() {
  useEffect(() => {
    const dot = document.getElementById('custom-cursor');
    const ring = document.getElementById('custom-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onEnter = () => {
      dot.style.width  = '6px';
      dot.style.height = '6px';
      dot.style.opacity = '0.5';
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(46,180,180,0.8)';
    };
    const onLeave = () => {
      dot.style.width  = '12px';
      dot.style.height = '12px';
      dot.style.opacity = '1';
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(46,180,180,0.5)';
    };

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea, label')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };

    window.addEventListener('mousemove', onMove);
    addHover();

    const mo = new MutationObserver(addHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" />
      <div id="custom-cursor-ring" />
    </>
  );
}

/* ── Scroll to top / anchor on route change ─────────── */
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

/* ── Scroll reveal observer ─────────────────────────── */
function RevealObserver() {
  const { pathname } = useLocation();
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      document
        .querySelectorAll('.reveal:not(.visible)')
        .forEach((el) => observerRef.current?.observe(el));
    }, 280);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [pathname]);

  return null;
}

/* ── Animated routes ────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-100 px-4 py-24 text-center text-slate-500">Loading admin...</div>}>
        <Routes location={location}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminGuard />}>
            <Route element={<AdminShell />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/divisions" element={<AdminDivisions />} />
              <Route path="/admin/product-categories" element={<AdminCategories />} />
              <Route path="/admin/product-chemical-categories" element={<AdminChemicalCategories />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    );
  }

  // ProductDetail uses its own full layout (no Navbar/Footer overlap needed,
  // but we keep them here so the site stays consistent)
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/"                    element={<Home />} />
            <Route path="/company"             element={<Company />} />
            <Route path="/divisions"           element={<Divisions />} />
            <Route path="/products"            element={<Products />} />
            <Route path="/products/:id"        element={<ProductDetail />} />
            <Route path="/responsibility"      element={<Responsibility />} />
            <Route path="/blog"                element={<Blog />} />
            <Route path="/careers"             element={<Careers />} />
            <Route path="/contact"             element={<Contact />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ── App root ────────────────────────────────────────── */
export default function App() {
  return (
    <ToastProvider>
      <Router>
        <SmoothCursor />
        <ScrollToAnchor />
        <RevealObserver />
        <AnimatedRoutes />
      </Router>
    </ToastProvider>
  );
}
