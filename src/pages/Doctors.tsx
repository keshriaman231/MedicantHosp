import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Clock, MapPin, Phone, ShieldCheck, 
  X, Star, Calendar, UserCheck, Award, GraduationCap, ArrowRight 
} from 'lucide-react';
import { doctors, departments, Doctor } from '../data/hospitalData';

interface DoctorsProps {
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
  initialSearch?: string;
}

export default function Doctors({ onNavigate, openAppointmentModal, initialSearch = '' }: DoctorsProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.qualifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedDept === 'All') return matchesSearch;
    return matchesSearch && doc.departmentId === selectedDept;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id="doctors-page-root">
      
      {/* Directory Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="doctors-hero">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-3">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Medical Personnel Directory</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Meet Our Specialist Clinicians</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Medicant Hospital & Research Centre brings together national medical board specialists, carrying extensive surgical expertise to provide precise clinical care.
          </p>
        </div>
      </section>

      {/* Directory Search & Filters */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[110px] md:top-[116px] z-30 shadow-sm" id="directory-search-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md" id="doc-search-box">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search doctor by name, qualification, or illness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#006B3F] text-slate-800"
              id="doc-search-input"
            />
          </div>

          {/* Department Filter dropdown */}
          <div className="flex items-center gap-2.5 w-full md:w-auto" id="doc-filter-box">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full md:w-56 bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#006B3F] text-slate-700 cursor-pointer"
              id="doc-dept-filter"
            >
              <option value="All">All Clinical Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Directory Cards Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="doctors-listings-section">
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300" id="doctors-grid">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id} 
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                id={`directory-card-${doc.id}`}
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden" id="directory-card-img">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#006B3F] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {doc.departmentName}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2" id="directory-card-info">
                    <h3 className="font-extrabold text-sm text-[#0B1F3A] leading-tight flex items-center gap-1">
                      {doc.name}
                      <UserCheck className="w-4 h-4 text-[#006B3F]" />
                    </h3>
                    <p className="text-[11px] text-[#006B3F] font-bold uppercase tracking-wider leading-none">{doc.title}</p>
                    <p className="text-[11px] text-slate-500 font-bold leading-normal mt-1">{doc.qualifications}</p>
                    <div className="flex flex-col gap-1 border-t border-slate-50 pt-3 mt-1.5 text-[11px] text-slate-400" id="directory-card-details">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-300" /> {doc.experience}
                      </span>
                      <span className="flex items-center gap-1.5 truncate mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-300 shrink-0" /> Reg No: {doc.regNo}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-1 gap-2" id="directory-card-actions">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="w-full text-center bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    id={`view-profile-btn-${doc.id}`}
                  >
                    View Roster & Reviews
                  </button>
                  <button
                    onClick={openAppointmentModal}
                    className="w-full text-center bg-[#006B3F] hover:bg-[#005431] text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-green-100 transition-all cursor-pointer"
                    id={`book-doctor-btn-${doc.id}`}
                  >
                    Book Appointment
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto" id="no-doctors-found">
            <p className="text-slate-500 text-sm font-medium">No specialist doctors found matching your filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedDept('All'); }}
              className="mt-4 bg-[#006B3F] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Search Filters
            </button>
          </div>
        )}

      </section>

      {/* Interactive Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200" id="doctor-modal-backdrop">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col" id="doctor-profile-modal">
            
            {/* Modal Header bar */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50" id="doctor-modal-header">
              <span className="text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase flex items-center gap-2">
                <UserCheck className="w-4.5 h-4.5 text-[#006B3F]" /> Doctor Profile & OPD Roster
              </span>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-slate-500"
                id="close-doc-modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 flex flex-col gap-6" id="doctor-modal-body">
              
              {/* Profile Top Block */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-slate-50 pb-6" id="doc-modal-top">
                <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200" id="doc-modal-img">
                  <img 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name} 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-1.5" id="doc-modal-intro">
                  <h3 className="text-xl font-extrabold text-[#0B1F3A]">{selectedDoctor.name}</h3>
                  <p className="text-xs text-[#006B3F] font-bold uppercase tracking-wider leading-none">{selectedDoctor.title}</p>
                  <p className="text-xs text-slate-500 font-bold leading-normal">{selectedDoctor.qualifications}</p>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded font-bold w-fit mt-1">
                    Registration No: {selectedDoctor.regNo}
                  </span>
                </div>
              </div>

              {/* Bio & Education */}
              <div className="flex flex-col gap-5" id="doc-modal-details">
                <div className="flex flex-col gap-1" id="doc-modal-bio">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Professional Bio</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{selectedDoctor.bio}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-50 pt-4" id="doc-modal-grid">
                  <div className="flex flex-col gap-2" id="doc-modal-edu">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-[#006B3F]" /> Academic Education
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600" id="doc-modal-edu-list">
                      {selectedDoctor.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#006B3F] rounded-full mt-1.5 shrink-0"></span>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2" id="doc-modal-awards">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#006B3F]" /> Honors & Awards
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600" id="doc-modal-awards-list">
                      {selectedDoctor.awards.map((aw, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#006B3F] rounded-full mt-1.5 shrink-0"></span>
                          <span>{aw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* OPD clinic times */}
                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex flex-col gap-1.5 mt-2" id="doc-modal-timing">
                  <span className="text-[10px] text-[#006B3F] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Weekly Outpatient Clinic (OPD) Timetable
                  </span>
                  <p className="text-xs font-extrabold text-[#0B1F3A] leading-relaxed">
                    {selectedDoctor.opdTiming}
                  </p>
                </div>

                {/* Patient Reviews */}
                {selectedDoctor.reviews && selectedDoctor.reviews.length > 0 && (
                  <div className="border-t border-slate-100 pt-5 flex flex-col gap-3" id="doc-modal-reviews-box">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Testimonials & Reviews</span>
                    <div className="flex flex-col gap-3.5" id="doc-modal-reviews-list">
                      {selectedDoctor.reviews.map((rev, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-2" id={`rev-item-${idx}`}>
                          <div className="flex justify-between items-center text-xs text-slate-400" id="rev-item-header">
                            <span className="font-bold text-slate-700">{rev.author}</span>
                            <span>{rev.date}</span>
                          </div>
                          <div className="flex gap-1 text-yellow-400" id="rev-item-rating">
                            {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                          </div>
                          <p className="text-xs text-slate-600 italic">"{rev.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Book Appointment Button */}
              <div className="border-t border-slate-50 pt-6 mt-2" id="doc-modal-actions">
                <button
                  onClick={() => {
                    openAppointmentModal();
                    setSelectedDoctor(null);
                  }}
                  className="w-full text-center bg-[#006B3F] hover:bg-[#005431] text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-green-100 flex items-center justify-center gap-1.5 cursor-pointer"
                  id="doc-modal-action-btn"
                >
                  <Calendar className="w-4.5 h-4.5" /> Book Consultation with {selectedDoctor.name}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
