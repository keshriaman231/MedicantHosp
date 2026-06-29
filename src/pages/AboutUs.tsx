import React from 'react';
import {
  Award, Compass, Eye, Sparkles, Heart,
  Building2, Construction, Stethoscope, Container, HeartPulse
} from 'lucide-react';

export default function AboutUs() {
  const timelineMilestones = [
    { 
      year: "2015", 
      title: "FOUNDATION LAID", 
      desc: "Initially proposed as a state-of-the-art tertiary hub to bring modern super-specialty facilities to Bokaro, Jharkhand.",
      num: "01",
      icon: Building2,
      color: "from-emerald-700 to-emerald-500"
    },
    { 
      year: "2018", 
      title: "INFRASTRUCTURAL CONSTRUCTION", 
      desc: "Constructing modular earthquake-resistant physical towers, laminar operating theaters, and medical line systems.",
      num: "02",
      icon: Construction,
      color: "from-slate-900 to-[#0A1D37]"
    },
    { 
      year: "2021", 
      title: "OPD & NON-INVASIVE LAB LAUNCH", 
      desc: "Opening state-of-the-art diagnostic screening clinics, pharmacy services, and early multi-specialty physician OPDs.",
      num: "03",
      icon: Stethoscope,
      color: "from-emerald-700 to-emerald-500"
    },
    { 
      year: "2024", 
      title: "COMPREHENSIVE ICU & DIAGNOSTIC LAUNCH", 
      desc: "Commissioning Level-3 ICUs, neonatology suites, high-Tesla MRI systems, and fully digitized clinical lab operations.",
      num: "04",
      icon: Container,
      color: "from-slate-900 to-[#0A1D37]"
    },
    { 
      year: "2025", 
      title: "ADVANCED SIEMENS CATH LAB INTEGRATION", 
      desc: "Inaugurated flat-panel cardiac catheterization and 24/7 primary angioplasty support to treat cardiac emergencies.",
      num: "05",
      icon: HeartPulse,
      color: "from-emerald-700 to-emerald-500"
    }
  ];

  const advisoryBoard = [
    { name: "Prof. Dr. J. C. Mukhopadhyay", role: "Chief Medical Advisor", bio: "Former Director of Medical Education, carry 35+ years of clinical teaching and governance expertise." },
    { name: "Dr. Sandip Banerjee", role: "Advisory Chairman - Neuro Sciences", bio: "Distinguished neuro-consultant, advisor to state health planning panels." },
    { name: "Smt. Shanti Devi Keshri", role: "Trustee Member", bio: "Social entrepreneur focused on improving rural healthcare outreach and female sanitation camps." },
    { name: "Shri Alok Kumar Roy", role: "Managing Director", bio: "Administrative pioneer with 20+ years of leading corporate healthcare groups." }
  ];

  const tpaPartners = [
    { name: 'Ayushman Bharat PM-JAY', src: '/images/insurance/PM-JAY.png' },
    { name: 'National Insurance', src: '/images/insurance/nationalinsurance.png' },
    { name: 'Aditya Birla Health', src: '/images/insurance/AdityaBirla.png' },
    { name: 'Niva Bupa', src: '/images/insurance/nivaBupa.png' },
    { name: 'Care Health Insurance', src: '/images/insurance/carehealth.png' },
    { name: 'Digit Insurance', src: '/images/insurance/digit.png' },
    { name: 'FHPL', src: '/images/insurance/fhpl.png' },
    { name: 'HDFC ERGO', src: '/images/insurance/hdfcergo.png', },
    { name: 'Heritage Health', src: '/images/insurance/heritagehealth.png' },
    { name: 'ICICI Lombard', src: '/images/insurance/icicilombard.png' },
    { name: 'IFFCO-TOKIO', src: '/images/insurance/iffcotokio.png' },
    { name: 'Magma HDI', src: '/images/insurance/magma.png' },
    { name: 'MD India', src: '/images/insurance/mdindia.png' },
    { name: 'Medi Assist', src: '/images/insurance/Mediassist.png' },
    { name: 'Navi Health Insurance', src: '/images/insurance/navi.png' },
    { name: 'The New India Insurance', src: '/images/insurance/Thenewindiainsurance.png' },
    { name: 'Safeway Insurance TPA', src: '/images/insurance/safeway.png' },
    { name: 'Oriental Insurance', src: '/images/insurance/oriental.png' },
    { name: 'United India Insurance', src: '/images/insurance/unitedindia.png' },
    { name: 'Volo Health', src: '/images/insurance/volo.png' },
    { name: 'Vidal Health TPA', src: '/images/insurance/vidalhealth.png' },
    { name: 'Akna Health TPA', src: '/images/insurance/akna.png' },
    { name: 'HealthInsurance TPA', src: '/images/insurance/healthinsurance.png' },
    { name: 'Health India TPA', src: '/images/insurance/healthindia.png' }

  ];

  const corporatePartners = [
    { name: 'Coal India Limited', src: '/images/insurance/coalindia.png' },
    { name: 'Damodar Valley Corporation (DVC)', src: '/images/insurance/DVC.png' },
    { name: 'BSNL', src: '/images/insurance/BSNL.png' },
    { name: 'State Government', src: '/images/insurance/govofjhar.png' },
    { name: 'Bharat Petroleum', src: '/images/insurance/bharatpetrol.png' },
    { name: 'Ayushman State Scheme', src: '/images/insurance/PM-JAY.png' },
    { name: 'SAIL / Bokaro Steel Plant', src: '/images/insurance/SAIL.png' }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans min-h-screen" id="about-us-page">

      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 text-center relative overflow-hidden" id="about-hero">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4 relative z-10">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400" /> About Our Institution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Medicant Hospital & Research Centre</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Providing Bokaro and Jharkhand with world-class tertiary healthcare, state-of-the-art cardiac diagnostics, and highly empathetic clinical support.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-16 bg-white border-b border-slate-100" id="about-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative" id="about-intro-visual">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="/images/lowangleview.jpg"
                alt="Hospital Low Angle View"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-[#006B3F] to-[#16A34A] text-white p-5 rounded-2xl shadow-lg border border-green-400 flex flex-col gap-1">
              <span className="text-2xl font-black">NABH</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-100">Quality-Committed Service</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5" id="about-intro-text">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Our Legacy</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Transforming the Local Healthcare Landscape</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Medicant Hospital & Research Centre is founded on the core values of accessibility, clinical perfection, and uncompromising ethical conduct. Historically, residents of the Bokaro Steel industrial belt had to travel extensively to distant medical hubs for critical procedures.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Recognizing this critical vacuum, Medicant designed a massive multispecialty medical infrastructure. Merging renowned clinical experts with high-tech diagnostic support, we offer precise treatments under a single roof, maintaining a clinical culture focusing entirely on patient recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-slate-50 border-b border-slate-100" id="about-vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12" id="vision-mission-grid">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-5" id="vision-card">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F]">
              <Eye className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-[#0B1F3A] mb-2.5">Our Strategic Vision</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                To establish Medicant Hospital & Research Centre as the absolute benchmark of clinical excellence, medical research, and compassionate patient care in Eastern India, delivering healthcare of global standards at affordable pricing.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-5" id="mission-card">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#006B3F]">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xl font-extrabold text-[#0B1F3A] mb-2.5">Our Daily Mission</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                To serve our patients with utmost precision, empathy, and transparency. We commit to maintaining sterile, bacteria-free environments, continuously modernizing clinical diagnostic gear, and making premium healthcare services inclusive and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP INSIGHTS ZONE (CMD & Advisory Chairman Cards) */}
      <section className="py-12 bg-white border-b border-slate-100 flex flex-col gap-8" id="leadership-messages-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-8 w-full">
          {/* CMD'S CARD */}
          <div className="bg-[#0B1F3A] text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12" id="cmd-grid">
            <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-slate-800 border-4 border-green-500 overflow-hidden flex items-center justify-center mb-5 shadow-lg shadow-black/30 relative group shrink-0">
                <img
                  src="/images/cmd.png"
                  alt="Prof. Dr. Majid Ahmad Talikoti"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-1.5 max-w-sm">
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight tracking-tight font-sans">
                  Prof. Dr. Majid Ahmad Talikoti
                </h3>
                <p className="text-emerald-400 font-extrabold uppercase tracking-widest text-[11px] sm:text-xs">
                  CMD & Chief Director
                </p>
                <div className="h-px bg-slate-800/80 my-1.5 w-full mx-auto" />
                <p className="text-white/80 font-bold text-[11px] sm:text-xs leading-normal">
                  Medicant Hospital & Research Centre
                </p>
                <p className="text-emerald-300/90 text-[10px] sm:text-[11px] font-semibold leading-relaxed mt-1">
                  Health Commissioner<br />
                  <span className="opacity-80 font-medium">India–Gulf Cooperation Council (GCC) Trade Council</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center gap-4 text-left">
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full inline-block"></span>
                CMD Message
              </span>
              <h4 className="text-lg sm:text-xl font-black leading-tight text-white font-sans tracking-tight">
                "Healing with Clinical Perfection, Leading with Complete Empathy"
              </h4>
              <div className="space-y-3.5 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium opacity-95">
                <p>
                  At Medicant Hospital & Research Centre, our vision is not just to treat illnesses, but to transform lives. We are committed to setting new standards in patient care—where compassion meets cutting-edge technology, and where every heartbeat matters. Every milestone we achieve is rooted in the trust of our patients, the dedication of our caregivers, and the support of our community. As we grow, we remain anchored in our values-guided by tradition, driven by innovation.
                </p>
                <p>
                  We are here for you, your families, and future generations. Together, let’s build a healthier tomorrow.”
                </p>
              </div>
            </div>
          </div>

          {/* ADVISORY CHAIRMAN CARD */}
          <div className="bg-[#0B1F3A] text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 max-w-4xl mx-auto w-full" id="advisory-chairman-card">
            <div className="md:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 p-5 sm:p-6 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-800 border-4 border-blue-500 overflow-hidden flex items-center justify-center mb-4 shadow-md relative group shrink-0">
                <img
                  src="/images/boa.png"
                  alt="Dr A K Singh"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-1 max-w-xs">
                <h4 className="text-base font-black text-white leading-tight font-sans">
                  Dr A K Singh
                </h4>
                <p className="text-blue-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                  Chairman, Advisory Board
                </p>
                <div className="h-px bg-slate-800/60 my-1 w-full mx-auto" />
                <p className="text-slate-400 text-[10px] leading-tight font-medium">
                  MBBS, MD (Medicine)<br />
                  <span className="opacity-80">GMC Nagpur</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-center gap-3 text-left">
              <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full inline-block"></span>
                Message from Chairman Board of Advisory
              </span>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium opacity-90">
                <p>
                  “As the Advisor-in-Chief at Medicant Super Speciality Hospital & Research Centre (MHRC), BIADA, Bokaro, Jharkhand, it is my privilege to share with that our mission is to deliver high-quality medical services with compassion, integrity and innovation. We believe in the power of partnership and actively work to contribute to the health and well-being of the communities we serve.”
                </p>
                <p>
                  Together, we will continue to advance our mission and uphold the core values that define MHRC as a leader in compassionate and innovative healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board Directory */}
      <section className="py-16 bg-slate-50 border-b border-slate-100" id="advisory-board">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="advisory-container">
          <div className="text-center mb-12" id="advisory-header">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Medical Governance</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">Our Distinguished Advisory Board</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="advisory-grid">
            {advisoryBoard.map((board, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all" id={`board-member-${idx}`}>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B1F3A] mb-0.5">{board.name}</h4>
                  <span className="text-[10px] text-[#006B3F] font-bold uppercase tracking-wider block mb-2">{board.role}</span>
                  <p className="text-xs text-slate-500 leading-relaxed">{board.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧭 PREMIUM ASYMMETRIC FLUID TIMELINE GRAPHIC (Strict layout implementation of image_b1ac52.jpg) */}
      <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden" id="timeline-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="timeline-container">
          
          <div className="text-center mb-16 flex flex-col items-center gap-1.5" id="timeline-header-block">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Institution History</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] font-sans tracking-tight flex items-center gap-2">
              Our Milestone Timeline
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-1 font-medium">
              A journey of growth, innovation, and unwavering commitment to delivering advanced healthcare for a healthier tomorrow.
            </p>
          </div>

          {/* 🛣️ Curved Serpent Road Alignment Track Container */}
          <div className="relative mt-12 max-w-5xl mx-auto flex flex-col gap-12 lg:gap-16" id="serpentine-canvas-wrapper">
            
            {/* Native SVG Fluid Sinusoidal Track Ribbon System background connector layer */}
            <div className="absolute top-12 bottom-12 left-6 lg:left-1/2 w-1 lg:w-[4px] bg-gradient-to-b from-green-600/30 via-slate-300/40 to-green-600/20 -translate-x-1/2 rounded-full pointer-events-none z-0"></div>

            {timelineMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 1;
              const StepIcon = milestone.icon;

              return (
                <div 
                  key={idx} 
                  className={`relative grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-4 lg:gap-0 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                  id={`milestone-node-row-${idx}`}
                >
                  
                  {/* Left Column Box Layer */}
                  <div className={`w-full lg:col-span-5 flex pl-14 lg:pl-0 ${
                    isEven ? 'lg:col-start-8 lg:justify-start' : 'lg:justify-end'
                  } z-10`}>
                    
                    {/* Render Content Conditional Loop Filter */}
                    <div className={`w-full max-w-md bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/70 flex flex-row transition-transform hover:scale-[1.01] ${isEven ? 'flex-row' : 'lg:flex-row'}`}>
                      {/* Left Colored Banner Block Accent */}
                      <div className={`w-24 sm:w-28 bg-gradient-to-b ${milestone.color} shrink-0 flex flex-col items-center justify-center text-white relative shadow-inner p-4 text-center`}>
                        <StepIcon className="w-7 h-7 opacity-95 stroke-[2]" />
                        <span className="text-[10px] font-black tracking-widest block mt-2 opacity-80">{milestone.year}</span>
                      </div>
                      
                      {/* Description Parameters Area */}
                      <div className="p-5 flex flex-col text-left justify-center min-w-0 flex-1">
                        <span className="text-[#006B3F] font-black text-[10px] uppercase tracking-wider block mb-0.5">{milestone.year}</span>
                        <h4 className="text-[#0B1F3A] font-black text-xs sm:text-sm tracking-tight leading-snug uppercase mb-1.5 font-sans">
                          {milestone.title}
                        </h4>
                        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-medium font-sans">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Center Node Button Pill Circle Counter Axis */}
                  <div className="absolute left-6 lg:left-1/2 top-6 lg:top-auto -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-md border-2 border-emerald-500 flex items-center justify-center relative scale-105">
                      <span className="text-emerald-700 text-xs font-black tracking-tight font-sans">
                        {milestone.num}
                      </span>
                    </div>
                  </div>

                  {/* Empty Spacer Column Box to keep grid offsets stable */}
                  <div className="hidden lg:block lg:col-span-2"></div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* APPROVED CASHLESS PARTNERS & TPAs MASTER BLOCK */}
      <section className="bg-white border-t border-slate-100" id="approved-cashless-section">
        {/* Banner Header Container */}
        <div className="bg-[#0B1F3A] text-white py-14 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 flex flex-col gap-2 relative z-10">
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Cashless & Subsidized Treatment
            </span>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight">Approved Cashless Partners & TPAs</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Medicant Hospital & Research Centre is fully certified and empanelled with major insurance, government welfare schemes, and PSU corporate boards.
            </p>
          </div>
        </div>

        {/* Procedural Process Grid Map */}
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100/80">
          <div className="text-center mb-12">
            <span className="text-[#006B3F] text-xs font-bold uppercase tracking-widest">Procedural Transparency</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] mt-1">How to Avail Cashless Treatment</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
              <span className="absolute right-4 top-2 text-5xl font-black text-slate-100/60 font-sans select-none tracking-tighter">01</span>
              <div className="flex flex-col gap-2.5 text-left relative z-10">
                <span className="text-[#006B3F] text-[10px] font-extrabold uppercase tracking-wider">Step 01</span>
                <h4 className="font-extrabold text-sm text-[#0B1F3A] uppercase tracking-tight">Contact TPA Desk</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Visit our dedicated 24/7 Cashless & Insurance helpdesk in the welcome lobby with your policy card.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
              <span className="absolute right-4 top-2 text-5xl font-black text-slate-100/60 font-sans select-none tracking-tighter">02</span>
              <div className="flex flex-col gap-2.5 text-left relative z-10">
                <span className="text-[#006B3F] text-[10px] font-extrabold uppercase tracking-wider">Step 02</span>
                <h4 className="font-extrabold text-sm text-[#0B1F3A] uppercase tracking-tight">Submit ID & Cards</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Submit your patient identification card (Aadhaar/PAN), corporate identity card, or Ayushman Golden Card.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
              <span className="absolute right-4 top-2 text-5xl font-black text-slate-100/60 font-sans select-none tracking-tighter">03</span>
              <div className="flex flex-col gap-2.5 text-left relative z-10">
                <span className="text-[#006B3F] text-[10px] font-extrabold uppercase tracking-wider">Step 03</span>
                <h4 className="font-extrabold text-sm text-[#0B1F3A] uppercase tracking-tight">Pre-Auth Submission</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Our in-house clinical coordinators coordinate directly with the insurance provider to submit pre-auth documents.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
              <span className="absolute right-4 top-2 text-5xl font-black text-slate-100/60 font-sans select-none tracking-tighter">04</span>
              <div className="flex flex-col gap-2.5 text-left relative z-10">
                <span className="text-[#006B3F] text-[10px] font-extrabold uppercase tracking-wider">Step 04</span>
                <h4 className="font-extrabold text-sm text-[#0B1F3A] uppercase tracking-tight">Avail Cashless Care</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Upon approval from your TPA (usually within 2-4 hours), enjoy seamless cashless treatment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ASSET LOGO GRID TILES */}
        <div className="py-16 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
            
            {/* Grid Box Panel 1: Insurance & TPAs */}
            <div className="flex flex-col gap-6 text-center">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Our Empaneled Insurance and TPAs</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 items-center justify-center">
                {tpaPartners.map((partner, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 h-14 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow" title={partner.name}>
                    <img 
                      src={partner.src} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = e.currentTarget.parentElement;
                        if (el) el.innerHTML = `<span class="text-[9px] font-bold text-slate-400 text-center leading-tight block">${partner.name}</span>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Box Panel 2: Corporate & PSU Entities */}
            <div className="flex flex-col gap-6 text-center border-t border-slate-200/40 pt-10">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Our Corporate and PSU Partners</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-center max-w-4xl mx-auto w-full">
                {corporatePartners.map((corp, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 h-14 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow" title={corp.name}>
                    <img 
                      src={corp.src} 
                      alt={corp.name} 
                      className="max-h-full max-w-full object-contain" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const el = e.currentTarget.parentElement;
                        if (el) el.innerHTML = `<span class="text-[9px] font-bold text-slate-400 text-center leading-tight block">${corp.name}</span>`;
                      }}
                    />
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