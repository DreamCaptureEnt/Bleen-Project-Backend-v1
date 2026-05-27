import React from 'react';
import { ShoppingCart, Factory, Thermometer, Truck, FileText, BarChart2, Receipt, Headphones, Megaphone, ShieldCheck, PackageCheck } from 'lucide-react';

const responsibilities = [
  {
    number: '01', icon: ShoppingCart, title: 'Procurement Excellence',
    desc: 'We source pharmaceutical products from certified and reputed manufacturers, ensuring all medicines meet strict quality and regulatory standards.'
  },
  {
    number: '02', icon: Factory, title: 'Third-Party Manufacturing & Brand Development',
    desc: 'We collaborate with WHO-GMP certified manufacturing partners to produce medicines under our own brand name. From product selection to packaging and branding, we ensure high-quality formulations that meet market demand and regulatory requirements.'
  },
  {
    number: '03', icon: Thermometer, title: 'Advanced Storage Systems',
    desc: 'Our storage facilities are designed with temperature-controlled environments to maintain product stability. We ensure proper handling, batch tracking, and expiry management.'
  },
  {
    number: '04', icon: Truck, title: 'Reliable Distribution Network',
    desc: 'We supply medicines efficiently to hospitals, pharmacies, and distributors, ensuring uninterrupted availability and timely delivery.'
  },
  {
    number: '05', icon: FileText, title: 'Regulatory Compliance',
    desc: 'We strictly adhere to all pharmaceutical regulations, maintaining valid drug licenses, GST compliance, and necessary legal documentation.'
  },
  {
    number: '06', icon: BarChart2, title: 'Efficient Inventory Management',
    desc: 'Our system tracks stock movement accurately, helping us manage inventory levels, reduce wastage, and eliminate expired or damaged products.'
  },
  {
    number: '07', icon: Receipt, title: 'Billing & Financial Management',
    desc: 'We ensure transparent billing, efficient invoicing, and smooth credit management for our clients and partners.'
  },
  {
    number: '08', icon: Headphones, title: 'Customer Relationship Management',
    desc: 'We build strong, long-term relationships with healthcare providers and distributors by offering responsive support and dependable service.'
  },
  {
    number: '09', icon: Megaphone, title: 'Marketing & Product Promotion',
    desc: 'We actively promote our own brand products through attractive schemes, offers, and strategic marketing initiatives to drive growth for our partners.'
  },
  {
    number: '10', icon: ShieldCheck, title: 'Quality Assurance Commitment',
    desc: 'We guarantee the supply of genuine, safe, and effective medicines, with strict measures to prevent counterfeit or substandard products.'
  },
  {
    number: '11', icon: PackageCheck, title: 'Logistics & Timely Delivery',
    desc: 'Our logistics system ensures safe and on-time delivery, with special handling for temperature-sensitive products.'
  },
];

export default function Responsibility() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg py-24 px-4 relative overflow-hidden">
        <div className="hero-blob w-96 h-96 bg-white/10 -top-20 right-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">Our Commitment</div>
          <h1 className="text-5xl font-black text-white mb-6">Our Responsibility</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            At Galaxy Health Care, we specialize in end-to-end pharmaceutical trading and brand development, ensuring quality, compliance, and reliability across the supply chain.
          </p>
        </div>
      </section>

      {/* Promise band */}
      <section className="bg-gray-950 py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Our Promise</div>
          <h2 className="text-3xl font-black mb-4">Right Medicine. Right Quality. Right Place. Right Time.</h2>
          <p className="text-gray-400 text-lg">Every step we take is guided by this commitment to our customers and partners.</p>
        </div>
      </section>

      {/* Responsibilities grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">What We Do</div>
            <h2 className="text-4xl font-black text-gray-900">Our Core Responsibilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map(({ number, icon: Icon, title, desc }, i) => (
              <div key={number} className={`reveal delay-${(i % 3 + 1) * 100} card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-teal-200 group`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="gradient-text font-black text-2xl mb-0.5">{number}</div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply chain visual */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Supply Chain</div>
            <h2 className="text-4xl font-black text-gray-900">End-to-End Excellence</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 reveal">
            {[
              { label: 'Procurement', icon: ShoppingCart, desc: 'Certified sources' },
              { label: 'Manufacturing', icon: Factory, desc: 'WHO-GMP partners' },
              { label: 'Storage', icon: Thermometer, desc: 'Temperature controlled' },
              { label: 'Distribution', icon: Truck, desc: 'Pan-India network' },
              { label: 'Delivery', icon: PackageCheck, desc: 'On-time, safe delivery' },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center text-center flex-1 min-w-0">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center shadow-lg mb-3">
                    <step.icon size={24} className="text-white" />
                  </div>
                  <div className="font-bold text-gray-900 text-sm">{step.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{step.desc}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block text-2xl text-teal-400 font-bold flex-shrink-0">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance badges */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3 reveal">Our Credentials</div>
          <h2 className="text-4xl font-black mb-12 reveal">Compliance & Certification</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'WHO-GMP', sub: 'Manufacturing Partners' },
              { title: 'Drug License', sub: 'State Licensed' },
              { title: 'GST Compliant', sub: 'Registered' },
              { title: 'Quality Assured', sub: 'Every Batch Tested' },
            ].map((badge, i) => (
              <div key={badge.title} className={`reveal delay-${(i + 1) * 100} border border-teal-500/30 rounded-2xl p-6 bg-gray-800/50`}>
                <div className="text-2xl font-black gradient-text mb-2">{badge.title}</div>
                <div className="text-gray-400 text-sm">{badge.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
