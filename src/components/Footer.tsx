/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, Phone, Mail, MapPin, Clock, ArrowUpRight, 
  ChevronRight, ShieldCheck, HeartPulse, Award,
  Facebook, Twitter, Instagram, Youtube, Linkedin
} from 'lucide-react';
import { hospitalInfo, departments } from '../data/hospitalData';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
}

export default function Footer({ onNavigate, openAppointmentModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: string, params?: any) => {
    onNavigate(page, params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans" id="hospital-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id="footer-grid">
        
        {/* Hospital Branding Column */}
        <div className="flex flex-col gap-6" id="footer-col-about">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')} id="footer-logo">
            <img 
              src="/logo.png" 
              alt="Medicant Hospital Logo" 
              className="w-10 h-10 object-contain bg-white rounded-lg p-1 shrink-0" 
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-white text-base font-bold tracking-tight leading-tight">MEDICANT</span>
              <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase">HOSPITAL</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Medicant Hospital & Research Centre is Bokaro's premier tertiary-level multi-specialty healthcare institution, merging world-class medical experts with advanced diagnostic technologies to deliver compassionate, clinical care.
          </p>
          <div className="flex flex-col gap-2 text-xs" id="footer-accreditations">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Accreditations & Assurances</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-slate-800 text-slate-100 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-semibold text-xs">
                <img src="/nabh.png" alt="NABH" className="w-4.5 h-4.5 object-contain" referrerPolicy="no-referrer" /> NABH Accredited
              </span>
              <span className="bg-slate-800 text-green-400 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1 font-medium">
                <Award className="w-3.5 h-3.5" /> ISO 9001:2015
              </span>
            </div>
          </div>
        </div>

        {/* Clinical Specialities Column */}
        <div className="flex flex-col gap-5" id="footer-col-specialities">
          <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-3">
            Centers of Excellence
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400" id="footer-specialities-links">
            {departments.slice(0, 6).map((dept) => (
              <li key={dept.id}>
                <button
                  onClick={() => handleNavClick('department-detail', { id: dept.id })}
                  className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 text-left text-slate-400 cursor-pointer"
                  id={`footer-link-dept-${dept.id}`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-green-500" />
                  {dept.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Resources Column */}
        <div className="flex flex-col gap-5" id="footer-col-resources">
          <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-3">
            Patient Care & Links
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400" id="footer-resources-links">
            <li>
              <button onClick={() => handleNavClick('payment')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400 font-extrabold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20" id="footer-link-payment">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Digital Payment Portal
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('portal')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-portal">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Patient Portal Login
              </button>
            </li>
            <li>
              <button onClick={openAppointmentModal} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-appointment">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Online OPD Booking
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('insurance')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-insurance">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Cashless & TPA Partners
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('facilities')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-facilities">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Critical Care & Wards
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('blog')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-blog">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> Health News & Events
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="hover:text-white hover:translate-x-1.5 transition-all flex items-center gap-1.5 cursor-pointer text-slate-400" id="footer-link-about">
                <ChevronRight className="w-3.5 h-3.5 text-green-500" /> CMD Message & History
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col gap-5" id="footer-col-contact">
          <h3 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-3">
            Get In Touch
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-slate-400" id="footer-contact-details">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed text-xs">
                BIADA Housing Colony, Ritudih, Bokaro, Jharkhand 827012
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-green-400 shrink-0" />
              <div className="flex flex-col">
                <a href="tel:18008908898" className="hover:text-white transition-colors">1800 890 8898 (Toll Free)</a>
                <a href="tel:06542360400" className="hover:text-white transition-colors">06542 360400</a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-green-400 shrink-0" />
              <a href={`mailto:${hospitalInfo.email}`} className="hover:text-white transition-colors">{hospitalInfo.email}</a>
            </li>
            <li className="flex items-center gap-2.5 border-t border-slate-800 pt-3">
              <Clock className="w-4 h-4 text-green-400 shrink-0" />
              <div className="flex flex-col text-xs text-slate-400">
                <span className="text-green-400 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-ping"></span>
                  Active & Operational
                </span>
                <span>Emergency: 24/7 Support</span>
                <span>OPD: 9:00 AM - 7:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 text-center" id="footer-bottom">
        <p>© {currentYear} Medicant Hospital & Research Centre. All Rights Reserved.</p>
        
        {/* Social Media Handles */}
        <div className="flex items-center gap-2.5" id="footer-social-handles">
          <a href={hospitalInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:border-green-400/30 hover:bg-slate-800 text-slate-400 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 transition-all duration-200" title="Facebook">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={hospitalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:border-green-400/30 hover:bg-slate-800 text-slate-400 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 transition-all duration-200" title="X (Twitter)">
            <Twitter className="w-4 h-4" />
          </a>
          <a href={hospitalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:border-green-400/30 hover:bg-slate-800 text-slate-400 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 transition-all duration-200" title="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={hospitalInfo.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:border-green-400/30 hover:bg-slate-800 text-slate-400 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 transition-all duration-200" title="YouTube">
            <Youtube className="w-4 h-4" />
          </a>
          <a href={hospitalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 hover:border-green-400/30 hover:bg-slate-800 text-slate-400 bg-slate-800/40 p-2 rounded-lg border border-slate-700/40 transition-all duration-200" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        <div className="flex gap-4" id="footer-policy-links">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
