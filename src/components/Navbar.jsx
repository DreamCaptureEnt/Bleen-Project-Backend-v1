import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Facebook, Instagram, Mail, Menu, Phone, X, Youtube } from 'lucide-react';
import logo from '../assets/image/Logo-Bleen.png';
import { api } from '../api';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Company',
    path: '/company',
    sub: [
      { label: 'Who We Are', path: '/company#who-we-are' },
      { label: 'Why Us', path: '/company#why-us' },
      { label: 'Innovation', path: '/company#innovation' },
    ],
  },
  {
    label: 'Divisions',
    path: '/divisions',
  },
  { label: 'Products', path: '/products' },
  { label: 'Responsibility', path: '/responsibility' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'Facebook', Icon: Facebook },
  { label: 'Instagram', Icon: Instagram },
  { label: 'YouTube', Icon: Youtube },
];

function splitTo(path) {
  const [pathname, hash] = path.split('#');
  return { pathname, hash: hash ? `#${hash}` : '' };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [chemicalCategories, setChemicalCategories] = useState([]);
  const location = useLocation();
  const dynamicNavItems = navItems.map((item) => {
    if (item.label === 'Divisions') {
      return {
        ...item,
        sub: divisions.map((division) => ({
          label: division.tag || division.name,
          path: `/divisions?division=${division.id}`,
        })),
      };
    }
    if (item.label === 'Products') {
      return {
        ...item,
        sub: chemicalCategories.map((category) => ({
          label: category.name,
          path: `/products?chemical_category=${category.id}`,
        })),
      };
    }
    return item;
  });
  const visibleNavItems = isSuperuser ? [...dynamicNavItems, { label: 'Admin', path: '/admin' }] : dynamicNavItems;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    api.currentUser()
      .then((data) => setIsSuperuser(Boolean(data.authenticated && data.is_superuser)))
      .catch(() => setIsSuperuser(false));
  }, [location.pathname]);

  useEffect(() => {
    Promise.all([
      api.divisions({ page_size: 100 }),
      api.chemicalCategories({ page_size: 100 }),
    ]).then(([divisionData, chemicalCategoryData]) => {
      setDivisions(divisionData.results || []);
      setChemicalCategories(chemicalCategoryData.results || []);
    }).catch(() => {
      setDivisions([]);
      setChemicalCategories([]);
    });
  }, []);

  const isActivePath = (path) => {
    const { pathname, hash } = splitTo(path);
    return location.pathname === pathname && (!hash || location.hash === hash);
  };

  const isParentActive = (item) => {
    const { pathname } = splitTo(item.path);
    return location.pathname === pathname;
  };

  return (
    <>
      <div className="gradient-bg text-white text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+917373018880" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={13} />
              <span>+91 73730 18880</span>
            </a>
            <a href="tel:+917373038882" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={13} />
              <span>+91 73730 38882</span>
            </a>
            <a href="mailto:info@bleen.in" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={13} />
              <span>info@bleen.in</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                title={label}
                className="w-8 h-8 rounded-full grid place-items-center hover:bg-white/15 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav
        className={`nav-shell sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between min-h-[72px]">
            <Link to="/" className="flex items-center gap-3 py-3" aria-label="Bleen home">
              <img src={logo} alt="Bleen" className="h-11 w-auto object-contain" />
              <span className="hidden sm:block text-[0.7rem] leading-tight text-slate-500 font-semibold border-l border-slate-200 pl-3">
                Galaxy<br />Health Care
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5">
              {visibleNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.sub?.length && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`nav-link nav-link-elegant flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      isParentActive(item) ? 'active text-teal-700' : 'text-slate-700 hover:text-teal-700'
                    }`}
                    aria-expanded={item.sub?.length ? activeDropdown === item.label : undefined}
                  >
                    {item.label}
                    {item.sub?.length ? (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    ) : null}
                  </Link>

                  {item.sub?.length && activeDropdown === item.label && (
                    <div className="dropdown-panel absolute left-0 top-full pt-3 z-50">
                      <div className="w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white">
                        {item.sub.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-5 py-3.5 text-sm font-semibold transition-colors ${
                              isActivePath(subItem.path)
                                ? 'bg-teal-50 text-teal-700'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex">
              <Link
                to="/contact"
                className="btn-shimmer text-white px-5 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-teal-300/40 transition-all"
              >
                Get in Touch
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden w-11 h-11 rounded-full border border-slate-200 text-slate-700 grid place-items-center hover:bg-slate-50 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {visibleNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isParentActive(item) ? 'gradient-bg text-white' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.sub?.length ? (
                    <div className="ml-4 mt-1 grid gap-1 border-l border-slate-100 pl-3">
                      {item.sub.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActivePath(subItem.path) ? 'text-teal-700 bg-teal-50' : 'text-slate-500 hover:text-teal-700'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="pt-3">
                <Link to="/contact" className="btn-shimmer block text-center text-white px-5 py-3 rounded-full text-sm font-bold">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
