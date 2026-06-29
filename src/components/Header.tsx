import React, { useState } from 'react';
import {
  Phone, Mail, Menu, X, Calendar, User, ShieldAlert
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
}

export default function Header({ currentPage, onNavigate, openAppointmentModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Medical Services', value: 'services' },
    { label: 'Facilities', value: 'facilities' },
    { label: 'Doctors', value: 'doctors' },
    { label: 'Blog & News', value: 'blog' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact Us', value: 'contact' }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm select-none" id="hospital-header">
      {/* Top Bar */}
      <div className="bg-[#0B1F3A] text-slate-200 text-xs py-2 px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-2 border-b border-slate-800" id="top-bar">
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-center lg:text-left" id="top-bar-contact">
          <span className="flex items-center gap-1.5 text-red-400 font-medium animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            24/7 Emergency Line: {hospitalInfo.phone}
          </span>
          <span className="h-3 w-px bg-slate-700 hidden sm:block"></span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            Landline: {hospitalInfo.landline}
          </span>
          <span className="h-3 w-px bg-slate-700 hidden md:block"></span>
          <span className="flex items-center gap-1.5 hidden md:flex">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            {hospitalInfo.email}
          </span>
        </div>


        <div className="flex items-center gap-4 w-full justify-end lg:w-auto" id="top-bar-links-socials">
          <div className="flex items-center gap-3 text-slate-300" id="top-bar-utility-links">
            <button
              onClick={() => handleNavClick('portal')}
              className="flex items-center gap-1 hover:text-[#16A34A] transition-colors font-medium bg-slate-800/60 px-2.5 py-1 rounded border border-slate-700 cursor-pointer active:scale-95"
              id="btn-portal-access"
            >
              <User className="w-3.5 h-3.5 text-[#16A34A]" />
              Patient Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar — Optimized to prevent overflow cuts at 100% scale */}
      <div className="bg-white text-slate-800 max-w-7xl mx-auto h-16 px-4 flex justify-between items-center gap-2 z-40" id="main-nav-bar">
        {/* Logo Section */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          id="hospital-logo-container"
        >
          <img
            src="/images/mainlogo.png"
            alt="Medicant Hospital Logo"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col shrink-0">
            <h1 className="text-sm xl:text-base font-black text-[#0B1F3A] leading-tight font-sans tracking-tight">
              MEDICANT
            </h1>
            <span className="text-[8px] xl:text-[9px] text-[#006B3F] font-bold tracking-wider uppercase">
              Hospital & Research Centre
            </span>
          </div>
        </div>

        {/* Desktop Navigation — Tightened text sizing and padding gaps */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-3.5 font-sans font-bold text-xs h-10 flex-grow px-1" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.value ||
              (item.value === 'services' && currentPage === 'department-detail') ||
              (item.value === 'doctors' && currentPage === 'doctor-detail');
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-1.5 py-1 relative transition-all duration-200 cursor-pointer whitespace-nowrap hover:text-[#006B3F] text-[11px] xl:text-xs ${isActive ? 'text-[#006B3F] font-black' : 'text-slate-600'
                  }`}
                id={`nav-${item.value}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#006B3F] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Badges & Buttons — Made smaller to stay in layout boundaries */}
        <div className="hidden lg:flex items-center gap-2 shrink-0" id="header-cta-actions">
          {/* NABH Stamp */}
          <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 px-2 py-1 rounded-xl shadow-sm text-[10px]" id="header-nabh-badge">
            <img src="/images/nabh.png" alt="NABH" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[7px] uppercase font-bold text-[#006B3F]">NABH</span>
              <span className="text-[7px] text-[#0B1F3A] font-extrabold mt-0.5">Accredited</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={openAppointmentModal}
            className="bg-[#006B3F] hover:bg-[#005431] text-white px-3 py-2 rounded-xl text-[10px] xl:text-xs font-black shadow-sm transition-all active:scale-95 whitespace-nowrap"
            id="header-btn-appointment"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          id="mobile-menu-trigger"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] md:top-[116px] bg-white z-40 border-t border-slate-100 shadow-2xl flex flex-col p-6 animate-in slide-in-from-top duration-200 overflow-y-auto" id="mobile-drawer">
          <nav className="flex flex-col gap-2 font-medium text-slate-700 text-base" id="mobile-nav">
            {navItems.map((item) => {
              const isActive = currentPage === item.value ||
                (item.value === 'services' && currentPage === 'department-detail') ||
                (item.value === 'doctors' && currentPage === 'doctor-detail');
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                      ? 'text-[#006B3F] bg-green-50 font-bold border-l-4 border-[#006B3F]'
                      : 'hover:text-[#006B3F] hover:bg-slate-50'
                    }`}
                  id={`mobile-nav-${item.value}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 flex flex-col gap-3" id="mobile-drawer-ctas">
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 py-3.5 rounded-xl font-semibold text-center transition-all"
              id="mobile-btn-emergency"
            >
              <ShieldAlert className="w-4 h-4" />
              Emergency helpline: {hospitalInfo.phone}
            </a>
            <button
              onClick={() => {
                openAppointmentModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-[#006B3F] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#005431] transition-all cursor-pointer"
              id="mobile-btn-appointment"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          <div className="mt-auto py-6 border-t border-slate-100 text-center text-xs text-slate-500" id="mobile-drawer-footer">
            <p className="font-semibold mb-1">Medicant Hospital & Research Centre</p>
            <p className="px-4">{hospitalInfo.address}</p>
          </div>
        </div>
      )}
    </header>
  );
}