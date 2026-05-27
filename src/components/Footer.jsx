import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowRight, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA Band */}
      <div className="gradient-bg py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-3">Ready to Partner With Us?</h2>
          <p className="text-white/80 mb-6 text-lg">Deliver quality healthcare products to your market with Bleen</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-teal-600 font-bold px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-black/20 transition-all hover:-translate-y-0.5">
              Contact Us Today
            </Link>
            <Link to="/products" className="border-2 border-white/60 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all">
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">B</span>
              </div>
              <div>
                <div className="font-black text-xl gradient-text">BLEEN</div>
                <div className="text-xs text-gray-400 -mt-0.5">Galaxy Health Care</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Committed to delivering high-quality, safe, and affordable healthcare products to everyone, everywhere.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:gradient-bg transition-all group">
                  <Icon size={16} className="text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Company', path: '/company' },
                { label: 'Divisions', path: '/divisions' },
                { label: 'Our Products', path: '/products' },
                { label: 'Responsibility', path: '/responsibility' },
                { label: 'Blog', path: '/blog' },
                { label: 'Careers', path: '/careers' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Our Divisions</h4>
            <ul className="space-y-3">
              {['Healthcare', 'Nutraceuticals', 'Cosmetics', 'Surgical Products', 'Self Care', 'Veterinary'].map(div => (
                <li key={div}>
                  <Link to="/products" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {div}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+91 73730 18880" className="text-gray-400 text-sm">+91 73730 18880</a>
                </div>
              </li>
                 <li className="flex gap-3">
                <Phone size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+91 73730 18880" className="text-gray-400 text-sm">+91 73730 38882</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm">info@bleen.in</div>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400 text-sm">Tamil Nadu, India</div>
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Drug License</div>
              <div className="text-sm text-gray-300">Licensed Pharmaceutical Distributor</div>
              <div className="text-xs text-gray-500 mt-1">GST Compliant | WHO-GMP Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Bleen — Galaxy Health Care. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Drug License</a>
            <Link
              to="/admin/login"
              aria-label="Admin login"
              title="Admin login"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-gray-500 transition-colors hover:text-teal-400"
            >
              <Shield size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
