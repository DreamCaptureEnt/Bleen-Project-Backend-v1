import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Shield, Heart, Star, Users, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const openings = [
  { role: 'Sales & Marketing Executive', dept: 'Sales', type: 'Full-time', location: 'Tamil Nadu', desc: 'Drive pharmaceutical product sales across assigned territories, build relationships with healthcare professionals, and expand market presence.' },
  { role: 'Area Sales Manager', dept: 'Sales', type: 'Full-time', location: 'Multiple Locations', desc: 'Lead a team of sales executives, develop strategic sales plans, and achieve regional targets across the pharmaceutical portfolio.' },
  { role: 'Packaging & Quality Control', dept: 'Operations', type: 'Full-time', location: 'Tamil Nadu', desc: 'Ensure packaging meets quality standards, maintain records, and uphold compliance with pharmaceutical packaging regulations.' },
  { role: 'Logistics & Delivery Executive', dept: 'Logistics', type: 'Full-time', location: 'Tamil Nadu', desc: 'Manage timely and accurate delivery of pharmaceutical products, maintain cold-chain integrity, and handle inventory tracking.' },
  { role: 'Accounts & Administration', dept: 'Finance', type: 'Full-time', location: 'Tamil Nadu', desc: 'Handle billing, invoicing, credit management, GST filings, and financial reporting for the company operations.' },
  { role: 'Driver (Delivery Vehicle)', dept: 'Logistics', type: 'Full-time', location: 'Tamil Nadu', desc: 'Safe transportation of pharmaceutical products across designated routes with responsibility for vehicle maintenance and delivery documentation.' },
];

const perks = [
  { icon: TrendingUp, title: 'Growth & Development', desc: 'Opportunities to learn, upskill, and advance your career through hands-on experience and continuous improvement.' },
  { icon: Shield, title: 'Safe & Healthy Environment', desc: 'As a healthcare company, we maintain strict safety, hygiene, and quality standards across all operations.' },
  { icon: Heart, title: 'Respect & Inclusion', desc: 'We foster a culture where every individual is respected, heard, and valued regardless of their role.' },
  { icon: Star, title: 'Recognition & Rewards', desc: 'We appreciate hard work and reward performance with growth opportunities and incentives.' },
  { icon: Users, title: 'Work-Life Balance', desc: 'We support a balanced work culture to ensure both professional success and personal well-being.' },
  { icon: Briefcase, title: 'Pharma Exposure', desc: 'Gain valuable experience in the growing pharmaceutical industry with exposure to industry standards.' },
];

const deptColors = { Sales: 'bg-teal-100 text-teal-700', Operations: 'bg-blue-100 text-blue-700', Logistics: 'bg-orange-100 text-orange-700', Finance: 'bg-purple-100 text-purple-700' };

export default function Careers() {
  const [expanded, setExpanded] = useState(null);
  const [applied, setApplied] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg py-24 px-4 relative overflow-hidden">
        <div className="hero-blob w-80 h-80 bg-white/10 top-0 right-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">Join Our Team</div>
          <h1 className="text-5xl font-black text-white mb-6">Build Your Career with Bleen</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We believe that hiring the right people for the right roles drives quality and growth. Be part of a growing healthcare brand focused on innovation, quality, and trust.
          </p>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Our Culture</div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We are not just a company — we are a growing healthcare brand focused on innovation, quality, and trust.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`reveal delay-${(i % 3 + 1) * 100} card-hover p-6 rounded-2xl border border-gray-100 hover:border-teal-200 bg-gradient-to-br from-white to-gray-50 group`}>
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work culture */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">What We Believe</div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Our Work Culture</h2>
              <div className="space-y-4">
                {[
                  'Hiring the right people for the right roles',
                  'Encouraging teamwork and responsibility',
                  'Maintaining high-quality standards in every process',
                  'Supporting continuous learning and improvement',
                  'Growing stronger with skilled professionals committed to excellence',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal delay-200">
              <div className="gradient-bg rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-black mb-4">Who Can Apply?</h3>
                <p className="text-white/80 mb-4">We welcome candidates who are:</p>
                <div className="space-y-3">
                  {['Passionate about the pharma/healthcare industry', 'Detail-oriented and responsible', 'Willing to learn and grow', 'Team players with a positive attitude', 'Committed to quality and excellence'].map(item => (
                    <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                      <Star size={14} className="text-white/80 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Opportunities</div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Current Openings</h2>
            <p className="text-gray-500">We are actively looking for talented individuals across these roles.</p>
          </div>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <div key={job.role} className={`reveal delay-${(i % 3 + 1) * 100} bg-white border border-gray-100 hover:border-teal-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden`}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Briefcase size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{job.role}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${deptColors[job.dept]}`}>{job.dept}</span>
                        <span className="text-xs text-gray-500">{job.type}</span>
                        <span className="text-xs text-gray-400">📍 {job.location}</span>
                      </div>
                    </div>
                  </div>
                  {expanded === i ? <ChevronUp size={18} className="text-teal-600 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
                </button>
                {expanded === i && (
                  <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{job.desc}</p>
                    {applied === i ? (
                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center gap-3 text-teal-700">
                        <CheckCircle size={18} />
                        <span className="font-semibold text-sm">Application submitted! We'll contact you soon.</span>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => setApplied(i)}
                          className="btn-shimmer text-white px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-md">
                          Apply Now <ArrowRight size={16} />
                        </button>
                        <Link to="/contact" className="border border-teal-300 text-teal-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors">
                          Enquire
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Don't See Your Role?</div>
          <h2 className="text-4xl font-black mb-4">Send Us Your CV</h2>
          <p className="text-gray-400 mb-8">We are always looking for talented individuals passionate about healthcare. Send your resume and we'll keep it in consideration for future openings.</p>
          <Link to="/contact" className="btn-shimmer text-white px-10 py-4 rounded-xl font-bold inline-flex items-center gap-2 shadow-lg text-base">
            Contact Us <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
