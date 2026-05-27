import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, Users, ChevronLeft, ChevronRight, CheckCircle, MapPin, Package, TrendingUp, Heart } from 'lucide-react';
import MedicineScene from '../components/MedicineScene';
import { api } from '../api';

const heroSlides = [
  {
    tag: 'Premium Healthcare',
    title: 'Quality Medicines',
    highlight: 'For Everyone',
    desc: 'Delivering safe, effective, and affordable healthcare products across cities and rural areas.',
    cta: 'Explore Products',
    ctaPath: '/products',
    bg: 'from-teal-600 to-blue-800',
  },
  {
    tag: 'Our Flagship Products',
    title: 'Alum Velum',
    highlight: 'Oral Care',
    desc: 'Premium tooth powder and paste formulated for daily oral hygiene with natural ingredients.',
    cta: 'View Product',
    ctaPath: '/products',
    bg: 'from-blue-800 to-teal-600',
  },
  {
    tag: 'Nutraceuticals',
    title: 'Vitaleen',
    highlight: 'Supplements',
    desc: 'Essential vitamins and health supplements for holistic well-being of the entire family.',
    cta: 'View Product',
    ctaPath: '/products',
    bg: 'from-teal-600 to-blue-800',
  },
  {
    tag: 'Cosmetics',
    title: 'Moixy & Gold Soap',
    highlight: 'Skincare',
    desc: 'Premium cosmetic products formulated for gentle, effective daily skincare routines.',
    cta: 'View Product',
    ctaPath: '/products',
    bg: 'from-blue-800 to-teal-600',
  },
];

const stats = [
  { value: '500+', label: 'Products', icon: Package },
  { value: '15+', label: 'Years Experience', icon: Award },
  { value: '1000+', label: 'Partners', icon: Users },
  { value: '20+', label: 'States Coverage', icon: MapPin },
];

const whyUs = [
  { icon: Shield, title: 'Quality Assurance', desc: 'All products sourced from WHO-GMP certified manufacturers with rigorous quality checks.' },
  { icon: Truck, title: 'Reliable Distribution', desc: 'Extensive distribution network ensuring timely delivery across urban and rural areas.' },
  { icon: Award, title: 'Certified Standards', desc: 'Strict adherence to pharmaceutical regulations, GST compliance, and legal documentation.' },
  { icon: Heart, title: 'Patient-First', desc: 'Every decision is guided by patient safety, efficacy, and affordability.' },
  { icon: TrendingUp, title: 'Market Growth', desc: 'Strategic marketing and brand development to drive growth for our partners.' },
  { icon: Users, title: 'Strong Network', desc: 'Long-term relationships with hospitals, pharmacies, and distributors across India.' },
];

const featuredProducts = [
  { name: 'Alum Velum', type: 'Tooth Powder & Paste', category: 'Oral Care', color: 'from-teal-400 to-teal-600' },
  { name: 'Moixy', type: 'Premium Soap', category: 'Cosmetics', color: 'from-blue-400 to-blue-700' },
  { name: 'Gold Soap', type: 'Loveleen Collection', category: 'Cosmetics', color: 'from-amber-400 to-orange-500' },
  { name: 'Vitaleen', type: 'Drops, Syrup & Tablets', category: 'Nutraceuticals', color: 'from-green-400 to-teal-500' },
  { name: 'Bleeliv', type: 'Liver Syrup', category: 'Healthcare', color: 'from-purple-400 to-blue-500' },
  { name: 'Deara', type: 'Baby Care Range', category: 'Baby Care', color: 'from-pink-400 to-rose-500' },
];

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const numEnd = parseInt(end);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || isNaN(numEnd)) return;
    let start = 0;
    const step = numEnd / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, numEnd);
      setCount(Math.floor(start));
      if (start >= numEnd) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, numEnd, duration]);

  return <span ref={ref}>{isNaN(numEnd) ? end : count + end.replace(/\d+/, '')}</span>;
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [backendFeaturedProducts, setBackendFeaturedProducts] = useState([]);

  useEffect(() => {
    const t = setInterval(() => goToSlide((slide + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [slide]);

  useEffect(() => {
    api.products({ featured: true, page_size: 6 })
      .then((data) => setBackendFeaturedProducts(data.results || []))
      .catch(() => setBackendFeaturedProducts([]));
  }, []);

  function goToSlide(idx) {
    if (animating) return;
    setAnimating(true);
    setSlide(idx);
    setTimeout(() => setAnimating(false), 600);
  }

  const homeFeaturedProducts = backendFeaturedProducts.length
    ? backendFeaturedProducts.map((product, index) => ({
        id: product.id,
        name: product.name,
        type: product.formulation || product.packing_size || product.product_category_name || 'Featured Product',
        category: product.product_category_name || product.division_name || 'Product',
        image: product.images?.[0]?.url,
        color: featuredProducts[index % featuredProducts.length].color,
      }))
    : featuredProducts;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-bg">
          <div className="absolute inset-0 opacity-5"
            style={{backgroundImage:'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div key={slide} className={`${animating ? '' : 'animate-fade-up'}`}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award size={14} />
                {heroSlides[slide].tag}
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-3">
                {heroSlides[slide].title}
              </h1>
              <h2 className="text-4xl sm:text-5xl font-black text-white/80 mb-6">
                {heroSlides[slide].highlight}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                {heroSlides[slide].desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={heroSlides[slide].ctaPath}
                  className="bg-white text-teal-600 font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all text-base">
                  {heroSlides[slide].cta} <ArrowRight size={18} />
                </Link>
                <Link to="/company"
                  className="border-2 border-white/60 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base">
                  About Us
                </Link>
              </div>
            </div>

            {/* Slide visual */}
            <div className="hidden lg:flex justify-center relative">
              <MedicineScene />
            </div>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-4 mt-12">
            <button onClick={() => goToSlide((slide - 1 + heroSlides.length) % heroSlides.length)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex gap-2">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all ${i === slide ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/40'}`} />
              ))}
            </div>
            <button onClick={() => goToSlide((slide + 1) % heroSlides.length)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center reveal">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-3xl font-black gradient-text mb-1">
                  <CountUp end={value} />
                </div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-24 px-4 section-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              {/* Visual card */}
              <div className="relative">
                <div className="gradient-bg rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-6xl font-black opacity-20 mb-4">GHC</div>
                  <h3 className="text-2xl font-bold mb-4">Galaxy Health Care</h3>
                  <p className="text-white/80 leading-relaxed">Bridging the gap between quality pharmaceutical products and every household in India.</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {['WHO-GMP Certified', 'GST Compliant', 'Drug Licensed', 'Quality Assured'].map(badge => (
                      <div key={badge} className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                        <CheckCircle size={14} className="text-white flex-shrink-0" />
                        <span className="text-xs font-semibold">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-xl font-black text-teal-600">15+</div>
                    <div className="text-xs text-teal-500 font-medium">Years</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal delay-200">
              <div className="inline-block gradient-text text-sm font-bold uppercase tracking-widest mb-3">Who We Are</div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                Your Trusted Pharmaceutical Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                We are a pharmaceutical marketing company committed to delivering high-quality, safe, and affordable healthcare products to everyone at the earliest.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our portfolio includes a wide range of pharmaceutical and nutraceutical products - tablets, capsules, syrups, cosmetics, and other healthcare products. Driven by the vision to create a strong presence through ethical practices, customer satisfaction, and continuous growth.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Vision: Quality medicine for everyone at affordable prices',
                  'Mission: Reach cities and rural areas with reliable supply chains',
                  'Values: Ethics, Trust, Quality, and Innovation'
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/company" className="btn-shimmer text-white px-7 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-teal-300/40 transition-all">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="inline-block gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Portfolio</div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From healthcare to cosmetics, our range covers every need with premium quality formulations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeFeaturedProducts.map((product) => (
              <div key={product.id || product.name} className="card-hover group">
                <div className={`relative overflow-hidden bg-gradient-to-br ${product.color} rounded-2xl p-6 text-white mb-4 aspect-video flex items-end shadow-lg group-hover:shadow-2xl transition-all`}>
                  {product.image && (
                    <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-300 group-hover:scale-105" />
                  )}
                  <div className="relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{product.category}</div>
                    <div className="text-2xl font-black">{product.name}</div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="text-sm text-gray-500 font-medium mb-3">{product.type}</div>
                  <Link to={product.id ? `/products/${product.id}` : '/products'} className="gradient-text font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal">
            <Link to="/products" className="btn-shimmer text-white px-10 py-4 rounded-xl font-bold inline-flex items-center gap-2 shadow-lg hover:shadow-teal-300/40 transition-all text-base">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:'radial-gradient(circle, rgba(46,180,180,0.3) 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-block text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Our Strengths</div>
            <h2 className="text-4xl font-black mb-4">Why Choose Bleen?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Six core pillars that make us the preferred pharmaceutical partner across India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`reveal delay-${(i % 3 + 1) * 100} group p-6 rounded-2xl border border-gray-800 hover:border-teal-500/50 bg-gray-900/50 hover:bg-gray-800/80 transition-all`}>
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-block gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Reach</div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Network Coverage Across India</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                From metro cities to remote villages, our distribution network ensures that quality medicines reach everyone who needs them.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Urban Distribution', pct: 95 },
                  { label: 'Semi-Urban Reach', pct: 80 },
                  { label: 'Rural Coverage', pct: 65 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                      <span className="text-sm font-bold gradient-text">{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg rounded-full transition-all duration-1000" style={{width: `${pct}%`}} />
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/responsibility" className="mt-8 btn-shimmer text-white px-7 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-md transition-all">
                Our Responsibility <ArrowRight size={18} />
              </Link>
            </div>
            <div className="reveal delay-200">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Hospitals Served', value: '200+', color: 'bg-teal-50 text-teal-600 border-teal-100' },
                  { label: 'Pharmacies', value: '500+', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                  { label: 'Distributors', value: '100+', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                  { label: 'States', value: '20+', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`p-6 rounded-2xl border ${color} card-hover`}>
                    <div className="text-3xl font-black mb-1">{value}</div>
                    <div className="text-sm font-semibold opacity-70">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
