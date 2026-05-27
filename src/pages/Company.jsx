import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Target, Eye, Lightbulb, Users, TrendingUp, Shield, ArrowRight, Star, Package, Sprout } from 'lucide-react';
import MedicineScene from '../components/MedicineScene';

const whyUsPoints = [
  { icon: Shield, title: 'Quality You Can Trust', desc: 'We partner with WHO-GMP certified manufacturing units to ensure every product meets stringent quality, safety, and efficacy standards.' },
  { icon: Package, title: 'Extensive Product Portfolio', desc: 'From general medicines to specialty segments, we offer a wide and continuously expanding range of pharmaceutical products.' },
  { icon: TrendingUp, title: 'Strong Marketing & Distribution', desc: 'Our well-established distribution channels and strategic marketing approach ensure timely availability and strong brand presence.' },
  { icon: CheckCircle, title: 'Regulatory & Compliance Excellence', desc: 'We strictly adhere to all pharmaceutical regulations and guidelines, ensuring smooth operations and reliable product approvals.' },
  { icon: Users, title: 'Customer-Centric Approach', desc: 'We believe in building lasting relationships with dedicated support, transparent communication, and customized solutions.' },
  { icon: Star, title: 'Competitive Pricing', desc: 'We offer premium-quality products at competitive prices, enabling our partners to maximize profitability without compromising standards.' },
  { icon: Lightbulb, title: 'Innovative & Growth-Oriented', desc: 'We continuously upgrade our portfolio and marketing strategies to stay ahead in a competitive pharmaceutical landscape.' },
  { icon: Target, title: 'Ethical Business Practices', desc: 'Integrity and transparency are the foundation of our business. We follow ethical marketing practices aligned with industry norms.' },
];

const milestones = [
  { year: '2010', event: 'Company founded with vision to provide quality healthcare for all' },
  { year: '2013', event: 'Expanded portfolio to 100+ pharmaceutical products' },
  { year: '2016', event: 'Launched own brand nutraceuticals division' },
  { year: '2019', event: 'Established cosmetics and personal care product line' },
  { year: '2022', event: 'Launched surgical and medical equipment division' },
  { year: '2024', event: '500+ products serving 20+ states across India' },
];

export default function Company() {
  return (
    <div>
      {/* Hero */}
      <section id="who-we-are" className="gradient-bg py-24 px-4 relative overflow-hidden">
        <MedicineScene className="hero-scene" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">About Us</div>
          <h1 className="text-5xl font-black text-white mb-6">Who We Are</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            A pharmaceutical marketing company committed to delivering high-quality, safe, and affordable healthcare products to everyone at the earliest.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="why-us" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Story</div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Committed to Better Healthcare</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                We are a pharmaceutical marketing company committed to delivering high-quality, safe, and affordable healthcare products to everyone at the earliest. Our portfolio includes a wide range of pharmaceutical and nutraceutical products such as tablets, capsules, syrups, cosmetics, and other healthcare products.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We are driven by the vision to create a strong presence in the pharmaceutical industry through ethical practices, customer satisfaction, and continuous growth.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Vision', icon: Eye, text: 'Provide high-quality medicine to everyone at affordable prices' },
                  { label: 'Mission', icon: Target, text: 'Deliver quality medicine to cities and rural areas through accessible distribution' },
                ].map(({ label, icon: Icon, text }) => (
                  <div key={label} className="p-5 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center mb-3">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="font-bold text-gray-900 mb-2">Our {label}</div>
                    <div className="text-sm text-gray-600">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal delay-200">
              <div className="relative">
                <div className="gradient-bg rounded-3xl p-10 text-white shadow-2xl">
                  <div className="text-8xl font-black opacity-10 absolute top-4 right-6">GHC</div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6">Galaxy Health Care</h3>
                    <div className="space-y-4">
                      {['WHO-GMP Certified Partners', 'Drug License Compliant', 'GST Registered', '500+ Product Portfolio', 'Pan-India Distribution', 'Quality First Approach'].map(item => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-white/80 flex-shrink-0" />
                          <span className="text-white/90 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Journey</div>
            <h2 className="text-4xl font-black text-gray-900">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`reveal delay-${(i % 3 + 1) * 100} flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 inline-block">
                      <div className="text-gray-700 font-medium">{m.event}</div>
                    </div>
                  </div>
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <span className="text-white font-black text-xs text-center leading-tight">{m.year}</span>
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Strengths</div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Eight reasons why healthcare providers, distributors, and pharmacies trust Bleen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsPoints.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`reveal delay-${(i % 4 + 1) * 100} card-hover p-6 rounded-2xl border border-gray-100 hover:border-teal-200 bg-white shadow-sm hover:shadow-lg group`}>
                <div className="w-11 h-11 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation / Banyan Tree */}
      <section id="innovation" className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:'radial-gradient(circle, rgba(46,180,180,0.4) 1px, transparent 1px)', backgroundSize:'35px 35px'}} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Innovation</div>
              <h2 className="text-4xl font-black mb-6">The Banyan Tree Growth Model</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Innovation at our company is not only about pharmaceuticals and marketing strategies - it is also about long-term professional relationships and growth opportunities within our organization.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Like a banyan tree that grows new branches to support it in the long run, our model encourages committed associates and business partners to grow along with our organization.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Partner Growth Model', desc: 'Committed long-term associates get opportunities to lead new business branches.' },
                  { title: 'Leadership Development', desc: 'Helping experienced professionals take on new leadership roles through our systems.' },
                  { title: 'Mutual Success Strategy', desc: 'Growth centered around mutual benefit - organization and associates grow together.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-bold mb-1">{title}</div>
                      <div className="text-gray-400 text-sm">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal delay-200 flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 gradient-bg rounded-full opacity-20 animate-blob" />
                <div className="absolute inset-8 gradient-bg rounded-full opacity-40 animate-blob" style={{animationDelay:'2s'}} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center z-10">
                    <Sprout size={72} className="mx-auto mb-4 text-teal-200" strokeWidth={1.5} />
                    <div className="text-white font-black text-xl">Banyan Tree</div>
                    <div className="text-teal-300 text-sm font-medium">Growth Model</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
