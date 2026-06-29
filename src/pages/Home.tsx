import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Calendar, Search, ShieldCheck, Phone, ChevronRight,
  Activity, ArrowRight, Eye, Sparkles, UserCheck,
  Award, Clock, Star, HeartPulse, UserCircle, X
} from 'lucide-react';
import { departments, doctors, notices, facilities, insurancePartners, blogs, statistics, hospitalInfo } from '../data/hospitalData';
import VirtualTour from '../components/VirtualTour';

// ==========================================
// 🎯 STEP 1: ANIMATED COUNTER CORE ENGINE (Placed outside the component)
// ==========================================
interface AnimatedCounterProps {
  targetValue: string;
  duration?: number;
}

function AnimatedCounter({ targetValue, duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Dynamic regex parsing logic to separate numbers from alphanumeric suffixes
  const numericMatch = targetValue.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = targetValue.replace(String(targetNumber), '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            setCount(Math.floor(progress * targetNumber));

            if (progress < 1) {
              window.requestAnimationFrame(animate);
            }
          };

          window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration]);

  if (targetNumber === 0) return <span>{targetValue}</span>;

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

// ==========================================
// MAIN EXPORT PORTAL COMPONENT BLOCK
// ==========================================
export default function Home({ onNavigate, openAppointmentModal }: HomeProps) {
  const [activeNoticeCategory, setActiveNoticeCategory] = useState<string>('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isFullscreenVideoOpen, setIsFullscreenVideoOpen] = useState<boolean>(false);

  // Reference pointer targeting the continuous ambient video
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Side-effect sync engine enforcing silence and structural playback coordination
  useEffect(() => {
    if (bgVideoRef.current) {
      if (isFullscreenVideoOpen) {
        bgVideoRef.current.pause();
        bgVideoRef.current.muted = true;
      } else {
        bgVideoRef.current.muted = true;
        bgVideoRef.current.play().catch(() => {
          /* Safely swallow browser permission autoplay rejections if any */
        });
      }
    }
  }, [isFullscreenVideoOpen]);

  const filterCategories = ['All', 'Hospital Updates', 'Health Camps', 'Public Notices'];

  const filteredNotices = activeNoticeCategory === 'All'
    ? notices
    : notices.filter(n => n.category === activeNoticeCategory);

  const testimonials = [
    {
      name: "Ramesh Mahto",
      location: "Bokaro Steel City",
      text: "The cardiac care team is exceptional. My father received immediate angioplasty treatment within minutes of entering the emergency room. Dr. Asish Hotta is a godsend.",
      rating: 5,
      department: "Cardiology"
    },
    {
      name: "Simran Naaz",
      location: "Chas, Jharkhand",
      text: "Our high-risk pregnancy was managed flawlessly by Dr. Ummehani Rasool. The LDR suites are premium and extremely comfortable. The nurses are so caring.",
      rating: 5,
      department: "Gynecology"
    },
    {
      name: "Anil Choubey",
      location: "Dhanbad",
      text: "Got joint replacement done for my knees. Dr. Vishal Kr. Mishra & his rehab team made me walk without support within three weeks. Outstanding modular OT facilities.",
      rating: 5,
      department: "Orthopedics"
    }
  ];

  const handleDeptClick = (id: string) => {
    onNavigate('department-detail', { id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800" id="home-page-root">
      
      {/* 1. HERO BANNER CONTAINER */}
      <section className="relative -mt-[1px] bg-[#0B1F3A] text-white overflow-hidden pt-4 pb-8 lg:pt-6 lg:pb-10 min-h-[460px] xl:min-h-[500px] flex items-center" id="hero-section">

        <video 
          ref={bgVideoRef} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none z-0"
        >
          <source src="/videos/vid.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A]/40 via-transparent to-[#0A1D37]/50 z-0 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row justify-between items-center gap-6 z-10" id="hero-container">

          {/* Left Column Text Details */}
          <div className="w-full lg:w-[58%] flex flex-col gap-3.5" id="hero-text-col">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">
              <Sparkles className="w-3 h-3" />
              Bokaro's Premier Multi-Specialty Hospital
            </span>

            <h2 className="text-xl sm:text-2xl xl:text-3xl font-black leading-tight text-white" id="hero-title">
              Every Patient Matters. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-[#16A34A]">Every Life is Precious.</span> <br />
              Every Day We Care.
            </h2>

            <p className="text-slate-300 text-xs xl:text-sm leading-relaxed max-w-md" id="hero-desc">
              At Medicant Hospital & Research Centre, we are committed to providing compassionate, ethical, and affordable healthcare that puts patients first. Our mission is to improve lives, support families, and build a healthier community through quality medical care.
            </p>

            <div className="grid grid-cols-2 gap-2 max-w-md" id="hero-bullet-grid">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="truncate">Expert Consultants</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="truncate">Level-3 ICU, NICU Care</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="truncate">24/7 Trauma Emergency</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="truncate">Cashless TPA Support</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1" id="hero-buttons">
              <button onClick={() => openAppointmentModal()} className="bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer">
                Book Appointment
              </button>
              <button onClick={() => onNavigate('services')} className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-sm transition-all cursor-pointer">
                Explore Services
              </button>
            </div>
          </div>

          {/* Right Column Video/Notice Widget Layer */}
          <div className="w-full lg:w-[38%] flex justify-end relative min-h-[320px]" id="hero-widget-col">
            {isFullscreenVideoOpen ? (
              <div className="w-full max-w-[360px] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col z-30" onContextMenu={(e) => e.preventDefault()}>
                <div className="bg-[#1A1A1A] px-3 py-2 flex justify-between items-center select-none">
                  <span className="text-[10px] font-bold text-slate-300 truncate">🎬 Virtual Tour</span>
                  <button onClick={() => setIsFullscreenVideoOpen(false)} className="text-white/60 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="relative aspect-[4/3] w-full bg-black">
                  <video controls autoPlay controlsList="nodownload" disablePictureInPicture className="w-full h-full object-cover">
                    <source src="/videos/vid.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xl text-slate-800 flex flex-col gap-3 w-full max-w-[360px]" id="hero-notice-widget">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2" id="notice-widget-header">
                  <span className="text-[#0B1F3A] font-black text-xs tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 inline-block animate-ping bg-red-500 rounded-full"></span>
                    📌 Notice Board
                  </span>
                  <button onClick={() => document.getElementById('notices-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-[9px] font-extrabold text-[#006B3F] bg-green-50 px-2 py-1 rounded-lg hover:bg-green-100 flex items-center gap-0.5 cursor-pointer">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="h-[150px] overflow-hidden relative" id="notice-widget-items">
                  <div className="flex flex-col gap-2 animate-marquee-vertical cursor-pointer">
                    {(notices || []).slice(0, 4).map((notice) => (
                      <div key={`l1-${notice.id}`} className="p-2 bg-slate-50 hover:bg-green-50/40 rounded-xl border border-slate-100 flex gap-2 transition-colors">
                        <div className="bg-[#0B1F3A] text-white rounded-lg px-1.5 py-0.5 flex flex-col items-center justify-center min-w-[38px] shrink-0">
                          <span className="text-[10px] font-black leading-none">{notice.date}</span>
                          <span className="text-[7px] uppercase font-bold mt-0.5 text-green-400">{notice.month}</span>
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <h4 className="text-[11px] font-bold text-slate-800 truncate">{notice.title}</h4>
                          <p className="text-[9px] text-slate-400 truncate">{notice.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#006B3F] to-[#16A34A] text-white p-3 rounded-xl flex justify-between items-center shadow-sm" id="notice-widget-promo">
                  <div className="flex flex-col text-left">
                    <h4 className="text-[11px] font-black">Virtual Hospital Tour</h4>
                    <p className="text-[9px] text-green-100 leading-none mt-0.5">Explore our clinical spaces.</p>
                  </div>
                  <button onClick={() => setIsFullscreenVideoOpen(true)} className="bg-[#006B3F] hover:bg-[#005431] text-white px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer active:scale-95 shrink-0">
                    <Eye className="w-3 h-3" /> Start Tour
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC ODOMETER STATISTICS FIELD PANEL */}
      <section className="py-8 bg-[#0B1F3A] text-white border-t border-white/5 relative z-20" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-6 gap-8 text-center" id="stats-grid">
          {statistics.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1" id={`stat-col-${idx}`}>
              <span className="text-3xl sm:text-4xl font-extrabold text-green-400">
                {/* 🎯 STEP 2A: Integrated animation engine directly into sub-header parameters */}
                <AnimatedCounter targetValue={stat.value} />
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WELCOME & RE-DESIGN INTRODUCTION */}
      <section className="py-16 bg-white border-b border-slate-100" id="welcome-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="welcome-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 relative" id="welcome-visual">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/Hospital.jpg"
                  alt="Medicant Hospital Lab"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#0B1F3A] text-white p-5 rounded-2xl shadow-xl border border-slate-800 hidden sm:flex flex-col gap-1 shrink-0 max-w-[200px]" id="welcome-visual-tag">
                <span className="text-[#16A34A] text-2xl font-black">24x7</span>
                <span className="text-xs font-bold text-slate-300">Continuous Critical Emergency & Diagnostic Support</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-5" id="welcome-narrative">
              <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Welcome to Medicant
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-sans tracking-tight">
                Pioneering Healthcare for Bokaro & Eastern India
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Medicant Hospital & Research Centre stands as an emblem of modern medical architecture and clinical precision. Nestled in Bokaro, Jharkhand, our tertiary healthcare hub addresses key patient requirements through a meticulously planned multi-specialty framework.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By housing top-notch clinical laboratories, modular laminar flow theaters, high-Tesla MRI suites, and an advanced cardiac catheterization center, we alleviate the local necessity of traveling to remote metros for critical procedures. Our philosophy balances aggressive technological modernization with a gentle, patient-centric healing model.
              </p>
              <div className="flex gap-4 mt-2" id="welcome-narrative-actions">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-[#006B3F] hover:text-[#005431] flex items-center gap-1.5 cursor-pointer border border-[#006B3F] px-4 py-2 rounded-lg"
                  id="welcome-btn-about"
                >
                  Read CMD Message <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. QUICK SERVICE CARDS */}
      <section className="py-12 bg-slate-50 border-b border-slate-100" id="quick-services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="quick-services-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="quick-services-grid">

            <div
              onClick={() => onNavigate('doctors')}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              id="card-quick-doctors"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F] group-hover:bg-[#006B3F] group-hover:text-white transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-1">Find Specialist</h4>
                  <p className="text-xs text-slate-500 leading-normal">Search doctor listings and OPD clinic times.</p>
                </div>
              </div>
              <span className="text-xs text-[#006B3F] font-bold flex items-center gap-1 mt-4">
                Go to Listings <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => openAppointmentModal()}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              id="card-quick-appointment"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F] group-hover:bg-[#006B3F] group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-1">Book Appointment</h4>
                  <p className="text-xs text-slate-500 leading-normal">Schedule an OPD consultation online.</p>
                </div>
              </div>
              <span className="text-xs text-[#006B3F] font-bold flex items-center gap-1 mt-4">
                Open Scheduler <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('services')}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              id="card-quick-services"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F] group-hover:bg-[#006B3F] group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-1">Medical Services</h4>
                  <p className="text-xs text-slate-500 leading-normal">Explore general surgery & oncology care.</p>
                </div>
              </div>
              <span className="text-xs text-[#006B3F] font-bold flex items-center gap-1 mt-4">
                View Services <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('portal')}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              id="card-quick-portal"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F] group-hover:bg-[#006B3F] group-hover:text-white transition-colors">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-1">Patient Portal</h4>
                  <p className="text-xs text-slate-500 leading-normal">Access report downloads & active tickets.</p>
                </div>
              </div>
              <span className="text-xs text-[#006B3F] font-bold flex items-center gap-1 mt-4">
                Portal Login <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              id="card-quick-emergency"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 bg-red-500 text-white rounded-xl flex items-center justify-center animate-pulse">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-red-900 mb-1">Emergency Desk</h4>
                  <p className="text-xs text-red-700 leading-normal">Emergency beds and trauma dispatch.</p>
                </div>
              </div>
              <span className="text-xs text-red-600 font-bold flex items-center gap-1 mt-4">
                Call Helpline <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NOTICE BOARD SECTION */}
      <section className="py-16 bg-white border-b border-slate-100 scroll-mt-24" id="notices-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="notices-container">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10" id="notices-header-block">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Notice Board & Announcements</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Hospital Updates & Health Camps</h3>
            </div>
            <div className="flex flex-wrap gap-1.5" id="notices-filters">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveNoticeCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeNoticeCategory === cat
                    ? 'bg-[#006B3F] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  id={`notice-filter-${cat.replace(' ', '')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="notices-grid">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                id={`notice-card-${notice.id}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4" id="notice-card-top">
                    <span className="bg-green-50 text-[#006B3F] border border-green-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {notice.category}
                    </span>
                    {notice.isNew && (
                      <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-widest animate-pulse">
                        New
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0B1F3A] mb-2 leading-snug">{notice.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{notice.content}</p>
                </div>

                <div className="flex items-center gap-2.5 border-t border-slate-50 pt-3 text-[11px] text-slate-400" id="notice-card-footer">
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                  <span>Posted in June 2026</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. OPD LIVE CALENDAR CONSULTATION */}
      <section className="py-16 bg-white border-b border-slate-100" id="opd-calendar-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="opd-calendar-container">
          <div className="text-center mb-10" id="calendar-header-block">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Live OPD Scheduling</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mt-1">Clinical OPD Consultation Calendar</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Select any date in **July 2026** to view real-time specialist consultation schedules and reserve your OPD slot instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="calendar-grid-container">
            <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 border border-slate-100/80 shadow-sm" id="calendar-widget-card">
              <div className="flex justify-between items-center mb-6" id="calendar-month-selector">
                <span className="text-[#0B1F3A] font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-[#006B3F]" /> July 2026
                </span>
                <span className="text-[10px] bg-green-50 text-[#006B3F] px-2.5 py-1 rounded-full font-black uppercase border border-green-100">
                  Active Roster
                </span>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3" id="calendar-day-headers">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-xs text-center" id="calendar-month-grid">
                <div className="aspect-square"></div><div className="aspect-square"></div><div className="aspect-square"></div>

                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDay === day;
                  const dateObj = new Date(2026, 6, day); 
                  const isSunday = dateObj.getDay() === 0;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-xl font-bold flex flex-col items-center justify-center transition-all relative cursor-pointer ${isSelected
                        ? 'bg-[#006B3F] text-white shadow-md shadow-green-100 scale-105 z-10'
                        : isSunday
                          ? 'text-red-400 hover:bg-red-50/50'
                          : 'text-[#0B1F3A] bg-white border border-slate-100 hover:border-green-300 hover:text-[#006B3F] hover:scale-105'
                        }`}
                      id={`calendar-day-btn-${day}`}
                    >
                      <span>{day}</span>
                      {!isSunday && <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#16A34A]'}`}></span>}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-slate-200/50 pt-4 flex gap-2 items-center text-[10px] text-slate-400 font-medium" id="calendar-legend">
                <span className="w-2.5 h-2.5 rounded bg-[#006B3F]"></span> Selected
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] ml-2"></span> OPD Active
                <span className="w-2.5 h-2.5 rounded bg-slate-200 ml-2"></span> Sunday Closed
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4" id="calendar-roster-column">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3" id="calendar-roster-header">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Consultation Date</span>
                  <span className="text-base font-extrabold text-[#0B1F3A]">
                    {selectedDay} July 2026 ({new Date(2026, 6, selectedDay).toLocaleDateString('en-US', { weekday: 'long' })})
                  </span>
                </div>
                <span className="text-xs bg-white text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold flex items-center gap-1.5 w-fit">
                  <Clock className="w-4 h-4 text-green-600" /> Roster Ref: {selectedDay < 10 ? `0${selectedDay}` : selectedDay}/07/2026
                </span>
              </div>

              <div className="flex flex-col gap-3" id="calendar-doctors-list">
                {(() => {
                  const dateObj = new Date(2026, 6, selectedDay);
                  const dayOfWeek = dateObj.getDay();

                  if (dayOfWeek === 0) {
                    return (
                      <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 text-center flex flex-col items-center gap-3 text-red-800" id="calendar-sunday-notice">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                          <HeartPulse className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="text-sm font-extrabold">Emergency & Trauma Admissions Only</h4>
                        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                          Standard Outpatient (OPD) consultation clinics are closed on Sundays. Our **24/7 Trauma Emergency Care Roster** and life-saving clinical fields remain fully operational without pause. For urgent inquiries, dial 1800 890 8898.
                        </p>
                      </div>
                    );
                  }

                  const availableDocs = doctors.filter((doc) => {
                    if (doc.id === 'arindam-sen') return dayOfWeek >= 1 && dayOfWeek <= 6;
                    if (doc.id === 'moumita-roy') return dayOfWeek >= 1 && dayOfWeek <= 6;
                    if (doc.id === 'subhajit-paul') return dayOfWeek >= 1 && dayOfWeek <= 5;
                    if (doc.id === 'rituparna-das') return dayOfWeek >= 1 && dayOfWeek <= 5;
                    if (doc.id === 'kaustav-de') return dayOfWeek >= 1 && dayOfWeek <= 6;
                    if (doc.id === 'sayan-mukherjee') return dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
                    if (doc.id === 'anirban-pal') return dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5;
                    if (doc.id === 'ipsita-ghosh') return dayOfWeek >= 1 && dayOfWeek <= 6;
                    return true;
                  });

                  return availableDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all flex flex-col sm:flex-row justify-between items-center gap-4"
                      id={`roster-doctor-${doc.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={doc.image} alt={doc.name} className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[9px] bg-green-50 text-[#006B3F] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider w-fit mb-1">{doc.departmentName}</span>
                          <h4 className="text-sm font-extrabold text-[#0B1F3A] leading-tight mb-0.5">{doc.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{doc.qualifications}</p>
                          <p className="text-xs text-[#006B3F] font-extrabold mt-1.5 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> OPD: {doc.opdTiming}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openAppointmentModal({
                          doctor: doc.name,
                          date: `2026-07-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`,
                          dept: doc.departmentName
                        })}
                        className="bg-[#006B3F] hover:bg-[#005431] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-green-50 shrink-0 w-full sm:w-auto cursor-pointer"
                      >
                        Reserve Slot
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIRTUAL TOUR SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-100 scroll-mt-24" id="virtual-tour-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="virtual-tour-container">
          <div className="flex flex-col gap-1.5 mb-8 text-center" id="tour-header-block">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Technological Transparency</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Explore Our Digital Clinical Spaces</h3>
          </div>
          <VirtualTour />
        </div>
      </section>

      {/* 8. WHY CHOOSE US — SECOND INSTANCE ANIMATING LIVE METRICS */}
      <section className="py-16 bg-white border-b border-slate-100" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="why-choose-us-container">
          <div className="text-center mb-12" id="why-choose-header">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Our Credentials</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] mt-1.5">What Makes Medicant Bokaro Trusted?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="why-choose-grid">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all flex flex-col gap-4" id="why-choose-1">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#006B3F] shrink-0"><UserCheck className="w-5 h-5" /></div>
              <div><h4 className="font-extrabold text-base text-[#0B1F3A] mb-1.5">Distinguished Specialists</h4><p className="text-xs text-slate-500 leading-relaxed">Our doctors represent top national institutes, carrying decades of rich clinical experience.</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all flex flex-col gap-4" id="why-choose-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#006B3F] shrink-0"><HeartPulse className="w-5 h-5" /></div>
              <div><h4 className="font-extrabold text-base text-[#0B1F3A] mb-1.5">Advanced Diagnostics</h4><p className="text-xs text-slate-500 leading-relaxed">Ultra-silent High-Tesla MRI, multi-slice fast CT, and angiography lab to enable precise diagnostics.</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all flex flex-col gap-4" id="why-choose-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#006B3F] shrink-0"><Award className="w-5 h-5" /></div>
              <div><h4 className="font-extrabold text-base text-[#0B1F3A] mb-1.5">Affordable Quality Care</h4><p className="text-xs text-slate-500 leading-relaxed">Certified quality metrics with full backing for cashless Ayushman PM-JAY and top public/private TPAs.</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all flex flex-col gap-4" id="why-choose-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-[#006B3F] shrink-0"><Clock className="w-5 h-5" /></div>
              <div><h4 className="font-extrabold text-base text-[#0B1F3A] mb-1.5">24/7 Critical Response</h4><p className="text-xs text-slate-500 leading-relaxed">Round-the-clock emergency, equipped trauma ambulances, continuous blood product bank and immediate triage.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DEPARTMENTS SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-100" id="departments-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="departments-preview-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10" id="dept-preview-header">
            <div className="flex flex-col gap-1">
              <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Medical Excellence</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Primary Centers of Clinical Excellence</h3>
            </div>
            <button onClick={() => onNavigate('specialities')} className="text-xs font-bold text-[#006B3F] hover:underline flex items-center gap-1 cursor-pointer" id="dept-preview-viewall">
              Explore All Specialities <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="dept-preview-grid">
            {(departments || []).slice(0, 4).map((dept) => (
              <div key={dept?.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between" id={`dept-card-${dept?.id}`}>
                <div className="flex flex-col gap-4">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F]"><Heart className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-1 leading-snug">{dept?.name}</h4>
                    <span className="text-[10px] text-[#006B3F] font-semibold tracking-wider block mb-2">{dept?.hindiName}</span>
                    <p className="text-xs text-slate-500 leading-normal line-clamp-3">{dept?.shortDesc}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between" id="dept-card-actions">
                  <button onClick={() => handleDeptClick(dept?.id || "")} className="text-xs text-[#006B3F] hover:text-[#005431] font-bold flex items-center gap-1 cursor-pointer" id={`dept-card-btn-${dept?.id}`}>
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STATISTICS SECTION — SECOND INSTANCE ANIMATING LIVE METRICS */}
      <section className="py-12 bg-[#0B1F3A] text-white" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-6 gap-8 text-center" id="stats-grid">
          {statistics.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1" id={`stat-col-${idx}`}>
              <span className="text-3xl sm:text-4xl font-extrabold text-green-400">
                {/* 🎯 STEP 2B: Secondary Page fold counter integration mapping */}
                <AnimatedCounter targetValue={stat.value} />
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 11. INSURANCE PARTNERS */}
      <section className="py-12 bg-white border-b border-slate-100" id="insurance-panel-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="insurance-panel-container">
          <div className="text-center mb-8" id="insurance-panel-header">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Financial Affiliation</span>
            <h4 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider">Approved Cashless Insurance & TPA Partners</h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 border border-slate-100 rounded-2xl p-5 bg-slate-50/50" id="insurance-logo-flexbox">
            {insurancePartners.slice(0, 10).map((p, idx) => (
              <span key={idx} className="bg-white border border-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">{p.name}</span>
            ))}
            <button onClick={() => onNavigate('insurance')} className="text-xs font-extrabold text-[#006B3F] hover:underline flex items-center gap-1 cursor-pointer bg-green-50 px-3.5 py-2 rounded-xl" id="insurance-view-all-btn">
              See All Corporate Ties <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-slate-50 border-b border-slate-100" id="testimonials-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col gap-6" id="testimonials-container">
          <div className="flex flex-col gap-1.5" id="testimonials-header">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Patient Reviews</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">What our Treated Patients Say</h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 relative min-h-[220px] flex flex-col justify-between" id="testimonial-stage">
            <div className="flex justify-center gap-1 text-yellow-400 mb-4" id="testimonial-stars">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">"{testimonials[activeTestimonial].text}"</p>
            <div className="flex flex-col gap-1" id="testimonial-author-box">
              <h5 className="font-bold text-[#0B1F3A] text-sm">{testimonials[activeTestimonial].name}</h5>
              <p className="text-xs text-slate-400">{testimonials[activeTestimonial].location} • Treated in <span className="text-[#006B3F] font-bold">{testimonials[activeTestimonial].department}</span></p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-2" id="testimonial-dots">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? 'bg-[#006B3F] w-7' : 'bg-slate-300'}`} aria-label={`Testimonial slide ${idx + 1}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* 13. RECENT BLOGS & NEWS */}
      <section className="py-16 bg-white border-b border-slate-100" id="blogs-news-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="blogs-news-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10" id="blogs-news-header">
            <div className="flex flex-col gap-1">
              <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Medical Publications</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Healthcare Updates & News</h3>
            </div>
            <button onClick={() => onNavigate('blog')} className="text-xs font-bold text-[#006B3F] hover:underline flex items-center gap-1 cursor-pointer" id="blogs-news-viewall">
              Read Medical Blog <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blogs-news-grid">
            {(blogs || []).slice(0, 3).map((blog) => (
              <div key={blog?.id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" id={`blog-card-${blog?.id}`}>
                <div>
                  <div className="aspect-[16/10] bg-slate-200" id="blog-image-box"><img src={blog?.image || ""} alt={blog?.title || ""} className="w-full h-full object-cover" /></div>
                  <div className="p-5 flex flex-col gap-2.5" id="blog-info">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold" id="blog-meta-bar">
                      <span className="bg-green-50 text-[#006B3F] px-2.5 py-0.5 rounded border border-green-100 uppercase tracking-wider">{blog?.category || "Health"}</span>
                      <span>{blog?.date}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-[#0B1F3A] line-clamp-2 leading-snug">{blog?.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{blog?.summary}</p>
                  </div>
                </div>
                <div className="p-5 pt-0" id="blog-action-box">
                  <button onClick={() => onNavigate('blog')} className="text-xs font-bold text-[#006B3F] hover:underline flex items-center gap-1 cursor-pointer" id={`blog-card-btn-${blog?.id}`}>
                    Read Full Article <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. APPOINTMENT CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#006B3F] to-[#16A34A] text-white text-center" id="cta-banner-section">
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-5" id="cta-banner-container">
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">Prioritize your Wellness today. <br />Schedule an OPD Session instantly.</h3>
          <p className="text-sm text-green-100 max-w-xl mx-auto leading-relaxed">Our expert medical coordinators are ready to support your check-ups. Choose your preferred clinician and book an active ticket slot instantly.</p>
          <div className="flex justify-center gap-4 mt-2" id="cta-banner-buttons">
            <button onClick={() => openAppointmentModal()} className="bg-[#0B1F3A] hover:bg-slate-900 text-white px-7 py-3.5 rounded-xl text-sm font-extrabold shadow-lg cursor-pointer" id="cta-btn-scheduler">Book Consultation Now</button>
            <a href={`tel:${hospitalInfo?.phone || "18008908898"}`} className="bg-white text-[#006B3F] hover:bg-slate-50 px-7 py-3.5 rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-lg transition-all" id="cta-btn-call"><Phone className="w-4 h-4" /> Call Helpline</a>
          </div>
        </div>
      </section>

    </div>
  );
}