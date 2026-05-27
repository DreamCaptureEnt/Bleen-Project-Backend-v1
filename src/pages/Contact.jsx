import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-bg py-24 px-4 relative overflow-hidden">
        <div className="hero-blob w-96 h-96 bg-white/10 -top-20 -right-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
            <MessageSquare size={14} className="inline mr-2" />Get In Touch
          </div>
          <h1 className="text-5xl font-black text-white mb-6">Contact Us</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Ready to partner with us or have questions about our products? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="reveal">
                <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Reach Out</div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Let's Connect</h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're a healthcare provider, distributor, pharmacist, or looking to partner with us — we're here to help.
                </p>
              </div>

              {[
                { icon: Phone, label: 'Phone', value: ['+91 73730 18880','+91 73730 38882'], sub: 'Mon - Sat, 9am - 6pm' },
                { icon: Mail, label: 'Email', value: 'info@bleen.in', sub: 'We reply within 24 hours' },
                { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India', sub: 'Pan-India distribution' },
                { icon: Clock, label: 'Business Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM', sub: 'Closed on Sundays & Public Holidays' },
              ].map(({ icon: Icon, label, value, sub }, i) => (
                <div key={label} className={`reveal delay-${(i + 1) * 100} flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all`}>
                  <div className="w-11 h-11 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</div>
                    <div className="font-semibold text-gray-900 mt-0.5">{value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="reveal p-5 bg-white rounded-2xl border border-gray-100">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'YouTube'].map(s => (
                    <a key={s} href="#"
                      className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:gradient-bg hover:text-white hover:border-transparent transition-all">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 reveal delay-200">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name:'', company:'', phone:'', email:'', type:'', message:'' }); }}
                      className="btn-shimmer text-white px-8 py-3 rounded-xl font-semibold">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h3>
                    <p className="text-gray-500 mb-8 text-sm">Fill out the form below and we'll get back to you promptly.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                          <input type="text" name="name" value={form.name} onChange={handleChange} required
                            placeholder="Dr. / Mr. / Ms. ..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company / Hospital</label>
                          <input type="text" name="company" value={form.company} onChange={handleChange}
                            placeholder="Organization name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">I am a...</label>
                        <select name="type" value={form.type} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer">
                          <option value="">Select your role</option>
                          <option>Hospital / Clinic</option>
                          <option>Pharmacist / Chemist</option>
                          <option>Distributor / Stockist</option>
                          <option>Medical Representative</option>
                          <option>Healthcare Professional</option>
                          <option>Business Partner</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} required
                          rows={4}
                          placeholder="Tell us about your requirements, product inquiries, or any questions..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 hover:bg-white transition-colors resize-none" />
                      </div>
                      <button type="submit" disabled={loading}
                        className="w-full btn-shimmer text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-teal-300/40 transition-all disabled:opacity-70">
                        {loading ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <div className="gradient-text text-sm font-bold uppercase tracking-widest mb-3">Partner With Us</div>
            <h2 className="text-4xl font-black text-gray-900">Who We Work With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏥', label: 'Hospitals & Clinics', desc: 'Bulk supply agreements with reliable delivery' },
              { icon: '💊', label: 'Pharmacies & Chemists', desc: 'Competitive pricing and consistent stock' },
              { icon: '🚛', label: 'Distributors & Stockists', desc: 'Wide product range with attractive margins' },
              { icon: '🤝', label: 'Business Partners', desc: 'Franchise and brand partnership opportunities' },
            ].map(({ icon, label, desc }, i) => (
              <div key={label} className={`reveal delay-${(i + 1) * 100} card-hover text-center p-6 rounded-2xl border border-gray-100 hover:border-teal-200 bg-gradient-to-br from-gray-50 to-white`}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{label}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
