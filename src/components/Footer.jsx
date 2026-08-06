import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darkgreen text-slate-300 border-t border-slate-950 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shrink-0">
                <Sprout size={18} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-base text-white tracking-tight">Uzhaviyar</span>
                <span className="text-[8px] font-bold text-primary tracking-widest uppercase">
                  Smart Agriculture
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Sustainable Fertilizer Usage Optimizer for Higher Yield — empowering farmers with data-driven farm management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-primary transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors duration-200">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors duration-200">How It Works</a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-primary transition-colors duration-200">Benefits</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary transition-colors duration-200">Testimonials</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors duration-200">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Contact
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="break-all">support@uzhaviyar.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                <span>+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-primary pl-2">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-primary transition-colors duration-200">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-primary transition-colors duration-200">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-primary transition-colors duration-200">Disclaimer</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex items-center justify-center text-xs text-slate-500">
          <p>&copy; 2026 Uzhaviyar &mdash; Sustainable Fertilizer Usage Optimizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
