import React from 'react';
import { 
  Heart, CheckCircle2, ChevronLeft, HelpCircle, Phone, 
  Clock, ShieldAlert, Calendar, User, UserCheck 
} from 'lucide-react';
import { departments, doctors, hospitalInfo, Department } from '../data/hospitalData';

interface DepartmentDetailProps {
  departmentId: string;
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
}

export default function DepartmentDetail({ departmentId, onNavigate, openAppointmentModal }: DepartmentDetailProps) {
  const dept = departments.find(d => d.id === departmentId);

  if (!dept) {
    return (
      <div className="p-12 text-center" id="dept-not-found">
        <p className="text-slate-500">Department not found.</p>
        <button onClick={() => onNavigate('services')} className="mt-4 bg-[#006B3F] text-white px-4 py-2 rounded-xl">
          Back to Medical Services
        </button>
      </div>
    );
  }

  // Find doctors working in this department
  const deptDoctors = doctors.filter(doc => doc.departmentId === dept.id);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id={`dept-detail-${dept.id}`}>
      
      {/* Back to services button header */}
      <div className="bg-slate-50 border-b border-slate-100 py-3.5" id="dept-back-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('services')}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#006B3F] font-bold cursor-pointer"
            id="dept-back-btn"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Medical Services
          </button>
        </div>
      </div>

      {/* Hero Banner section */}
      <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="dept-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 flex flex-col gap-4" id="dept-hero-info">
            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
              Center of Medical Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{dept.name}</h2>
            <span className="text-xs sm:text-sm text-green-400 font-extrabold tracking-widest uppercase">{dept.hindiName}</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">{dept.overview}</p>
          </div>

          {/* Quick Metrics columns (4 Columns) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm" id="dept-hero-stats">
            {dept.stats.map((st, idx) => (
              <div key={idx} className="flex flex-col text-center" id={`dept-stat-${idx}`}>
                <span className="text-2xl font-black text-green-400">{st.value}</span>
                <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Content Grid: Left services, Right doctors sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10" id="dept-content-section">
        
        {/* Left Side: Services, Treatments, Facilities & FAQs (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-10" id="dept-left-col">
          
          {/* Services & Procedures */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5" id="dept-services-box">
            <h3 className="text-lg font-bold text-[#0B1F3A] border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#006B3F] rounded-full"></span>
              Clinical Services Offered
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="dept-services-list">
              {dept.services.map((ser, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal" id={`ser-item-${idx}`}>
                  <CheckCircle2 className="w-4 h-4 text-[#006B3F] shrink-0 mt-0.5" />
                  <span>{ser}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Treatments & Therapies */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5" id="dept-treatments-box">
            <h3 className="text-lg font-bold text-[#0B1F3A] border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#006B3F] rounded-full"></span>
              Specialized Treatments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="dept-treatments-list">
              {dept.treatments.map((tr, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal" id={`tr-item-${idx}`}>
                  <CheckCircle2 className="w-4 h-4 text-[#006B3F] shrink-0 mt-0.5" />
                  <span>{tr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Facilities */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5" id="dept-facilities-box">
            <h3 className="text-lg font-bold text-[#0B1F3A] border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#006B3F] rounded-full"></span>
              Technical Infrastructure & Equipment
            </h3>
            <div className="flex flex-col gap-3.5" id="dept-facilities-list">
              {dept.facilities.map((fa, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-600 leading-relaxed" id={`fa-item-${idx}`}>
                  <span className="bg-[#006B3F]/10 text-[#006B3F] text-[10px] font-black px-2 py-1 rounded shrink-0 uppercase tracking-widest mt-0.5">Equip</span>
                  <span>{fa}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department FAQs */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-5" id="dept-faqs-box">
            <h3 className="text-lg font-bold text-[#0B1F3A] border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#006B3F] rounded-full"></span>
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-5" id="dept-faqs-list">
              {dept.faqs.map((faq, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 border-b border-slate-50 pb-4 last:border-0 last:pb-0" id={`faq-item-${idx}`}>
                  <h4 className="font-extrabold text-[#0B1F3A] text-sm flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-[#006B3F] shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Medical Consultants Sidebar (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6" id="dept-right-col">
          
          {/* Doctors Panel */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6" id="dept-doctors-panel">
            <h3 className="text-base font-extrabold text-[#0B1F3A] border-b border-slate-100 pb-3 uppercase tracking-wider block mb-5">
              Clinical Specialists
            </h3>

            {deptDoctors.length > 0 ? (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200" id="dept-doctors-list">
                {deptDoctors.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 hover:bg-green-50/20 hover:border-green-100 transition-colors cursor-pointer"
                    onClick={() => onNavigate('doctors', { search: doc.name })}
                    id={`dept-doc-${doc.id}`}
                  >
                    <div className="w-14 h-14 bg-slate-200 rounded-xl overflow-hidden shrink-0 border border-slate-200" id="doc-thumb-box">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1" id="doc-thumb-info">
                      <h4 className="font-extrabold text-sm text-slate-800 leading-tight flex items-center gap-1">
                        {doc.name}
                        <UserCheck className="w-3.5 h-3.5 text-[#006B3F]" />
                      </h4>
                      <p className="text-[10px] text-[#006B3F] font-bold uppercase tracking-wider leading-none">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{doc.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">Doctors directory updating soon.</p>
            )}
          </div>

          {/* Quick Helpline Booking widget */}
          <div className="bg-[#0B1F3A] text-white p-6 rounded-3xl border border-slate-800 flex flex-col gap-4" id="dept-booking-widget">
            <span className="text-[9px] uppercase font-bold text-green-400 tracking-wider">OPD Scheduling</span>
            <h4 className="font-bold text-sm">Need a direct clinical slot with a doctor?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book a direct consulting ticket or call our administrative reception desks to verify today's on-call roster.
            </p>
            <div className="flex flex-col gap-2 border-t border-slate-800 pt-3 text-xs" id="dept-booking-widget-helplines">
              <a href={`tel:${hospitalInfo.phone}`} className="hover:text-green-400 font-bold transition-colors">Toll Free: 1800 890 8898</a>
              <a href={`tel:${hospitalInfo.landline}`} className="hover:text-green-400 font-bold transition-colors">Emergency: 06542 360400</a>
            </div>
            <button
              onClick={openAppointmentModal}
              className="w-full text-center bg-[#006B3F] hover:bg-[#005431] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-green-950/20 cursor-pointer"
              id="dept-booking-widget-btn"
            >
              Book OPD Slot Online
            </button>
          </div>

        </div>

      </section>

    </div>
  );
}
