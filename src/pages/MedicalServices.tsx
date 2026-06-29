import React, { useState } from 'react';
import { 
  Heart, Calendar, ChevronRight, Activity, ShieldCheck, 
  Sparkles, Award, Star, Phone, CheckCircle2, Search,
  ShieldAlert, Clock, FlaskConical, ScanLine, Stethoscope
} from 'lucide-react';
import { departments, hospitalInfo } from '../data/hospitalData';

interface SpecialitiesProps {
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
}

export default function MedicalServices({ onNavigate, openAppointmentModal }: SpecialitiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleSpecialtyClick = (id: string) => {
    onNavigate('department-detail', { id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clinicalHighlights: { [key: string]: string[] } = {
    oncology: ["Medical Oncology", "Surgical Oncology", "Chemotherapy", "Cancer Screening"],
    nuclearMedicine: ["PET-CT Imaging", "Nuclear Scans", "Radioisotope Therapy", "Thyroid Imaging"],
    neurosurgery: ["Brain Tumor Surgery", "Spine Surgery", "Stroke Management", "Neuro Trauma Care"],
    orthopedics: ["Joint Replacement", "Sports Injury Care", "Arthroscopy", "Trauma & Fracture Care"],
    cardiology: ["Coronary Angioplasty", "Pacemaker Implantation", "Heart Failure Clinic", "Cardiac Diagnostics"],
    physiotherapy: ["Pain Management", "Sports Rehabilitation", "Post-Surgical Rehab", "Neurological Physiotherapy"],
    radiology: ["MRI Scan", "CT Scan", "Digital X-Ray", "Ultrasound Imaging"],
    laboratory: ["Blood Testing", "Biochemistry", "Microbiology", "Pathology Services"],
    respiratoryMedicine: ["Asthma Care", "COPD Treatment", "Pulmonary Function Test", "Sleep Medicine"],
    pediatrics: ["Child Healthcare", "Vaccination", "NICU Care", "Growth Monitoring"],
    minimalInvasiveGeneralSurgery: ["Laparoscopic Surgery", "Gallbladder Surgery", "Hernia Repair", "Appendix Surgery"],
    obstetricsGynecology: ["Normal Delivery", "High-Risk Pregnancy", "Infertility Care", "Laparoscopic Gynecology"],
    criticalCareAnaesthesiology: ["24×7 ICU Care", "Ventilator Support", "Emergency Critical Care", "Advanced Anaesthesia"],
    urology: ["Kidney Stone Treatment", "Prostate Surgery", "Endourology", "Uro-Oncology"],
    dermatology: ["Skin Allergy Treatment", "Laser Procedures", "Acne Treatment", "Cosmetic Dermatology"],
    dental: ["Root Canal Treatment", "Dental Implants", "Cosmetic Dentistry", "Orthodontics"],
    dietetics: ["Clinical Nutrition", "Weight Management", "Diabetic Diet", "Therapeutic Diet Planning"],
    endocrinologyDiabetes: ["Diabetes Management", "Thyroid Disorders", "Hormonal Disorders", "Metabolic Care"],
    nephrology: ["Kidney Disease Care", "Dialysis Services", "Hypertension Clinic", "Kidney Transplant Care"],
    emergencyTrauma: ["24×7 Emergency Care", "Trauma Management", "Critical Stabilization", "Ambulance Services"],
    internalMedicine: ["General Physician Care", "Chronic Disease Management", "Preventive Health", "Infectious Disease Care"],
    ophthalmology: ["Cataract Surgery", "Retina Services", "LASIK Consultation", "Glaucoma Care"],
    entHeadNeckSurgery: ["Endoscopic Sinus Surgery", "Tonsil Surgery", "Hearing Care", "Head & Neck Procedures"],
    bloodCentre: ["Blood Donation", "Blood Component Separation", "24×7 Blood Bank", "Transfusion Services"]
  };

  const baseSpecialities = departments.filter(d => d.id !== 'emergencyTrauma' && d.id !== 'radiology');

  const medicalServicesRoster = [
    { id: 'oncology', name: 'Oncology', hindiName: 'कैंसर रोग विज्ञान', type: 'Critical Care', shortDesc: 'Comprehensive clinical cancer care solutions optimizing targeted chemotherapies and advanced multi-disciplinary surgical tumor boards.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'nuclearMedicine', name: 'Nuclear Medicine', hindiName: 'परमाणु चिकित्सा', type: 'Diagnostics & Scans', shortDesc: 'Pioneering internal cellular metabolic tracking modalities including premium PET-CT scanning diagnostic evaluations.', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'neurosurgery', name: 'Neurosurgery & Spine', hindiName: 'न्यूरोसर्जरी', type: 'Critical Care', shortDesc: 'Precision micro-surgical interventions for complex neurological tumor management vectors and traumatic spinal injuries.', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'orthopedics', name: 'Orthopedic and Joint Replacement', hindiName: 'हड्डी रोग विभाग', type: 'General Specialty', shortDesc: 'Pioneering orthopedic interventions covering high-end total knee arthroplasty and diagnostic keyhole arthroscopic repairs.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'cardiology', name: 'Cardiology', hindiName: 'हृदय रोग विभाग', type: 'Critical Care', shortDesc: 'Rapid primary percutaneous coronary angioplasty loops, pacemaker implantations, and failure clinic systems.', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=400&h=240&q=80' },
    { id: 'physiotherapy', name: 'Physiotherapy & Rehab', hindiName: 'भौतिक चिकित्सा', type: 'General Specialty', shortDesc: 'Comprehensive structural neurological physical therapies and targeted muscular rehabilitation tracking streams.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'radiology', name: 'Radiology & Imaging', hindiName: 'रेडियोलॉजी एवं इमेजिंग', type: 'Diagnostics & Scans', shortDesc: 'High-Tesla absolute silent structural MRI sweeps, ultra-fast slice CT scanning lines, and diagnostic digital radiology.', image: 'https://images.unsplash.com/photo-1551601651-3a146b343307?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'laboratory', name: 'Laboratory', hindiName: 'पैथोलॉजी प्रयोगशाला', type: 'Diagnostics & Scans', shortDesc: 'Fully automated high-throughput laboratory services deploying real-time microscopic and clinical biochemistry pipelines.', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'respiratoryMedicine', name: 'Respiratory Medicine', hindiName: 'श्वसन चिकित्सा', type: 'General Specialty', shortDesc: 'Advanced pulmonary function evaluations and continuous therapeutic treatments for obstructive respiratory conditions.', image: 'https://images.unsplash.com/photo-1584515933487-75982139b85b?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'pediatrics', name: 'Pediatrics & Neonatology', hindiName: 'बाल रोग विज्ञान', type: 'General Specialty', shortDesc: 'Specialized healthcare paths for infants, encompassing Level-III continuous incubator NICU critical monitoring infrastructure.', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'minimalInvasiveGeneralSurgery', name: 'Minimal Invasive & General Surgery', hindiName: 'सामान्य शल्य चिकित्सा', type: 'General Specialty', shortDesc: 'Laparoscopic keyhole workflows streamlining post-operative convalescence metrics for gallbladder and hernia repair.', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'obstetricsGynecology', name: 'Obstetrics & Gynaecology', hindiName: 'प्रसूति एवं स्त्री रोग', type: 'General Specialty', shortDesc: 'Comprehensive maternity monitoring paths, painless birthing suites, and progressive micro-laparoscopic gynecology.', image: 'https://images.unsplash.com/photo-1544126475-19e09962f176?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'criticalCareAnaesthesiology', name: 'Critical Care & Anaesthesiology', hindiName: 'क्रिटिकल केयर एवं एनेस्थीसिया', type: 'Critical Care', shortDesc: 'Continuous Level-3 intensive bed support parameters integrating advanced surgical anesthesia and emergency resuscitation panels.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'urology', name: 'Urology', hindiName: 'मूत्र रोग विज्ञान', type: 'General Specialty', shortDesc: 'Laser lithotripsy modalities targeting complete urinary blockages alongside precision endourology clinical systems.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'dermatology', name: 'Dermatology', hindiName: 'त्वचा रोग विभाग', type: 'General Specialty', shortDesc: 'Clinical diagnostic procedures targeting advanced dermal immune variations, matching aesthetic laser cosmetology options.', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'dental', name: 'Dental', hindiName: 'दंत चिकित्सा', type: 'General Specialty', shortDesc: 'Advanced maxillofacial corrections, premium dental implants, single-visit root canals, and modern orthodontics.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'dietetics', name: 'Dietetics', hindiName: 'आहार विज्ञान', type: 'General Specialty', shortDesc: 'Clinical evaluation of complex nutritional patterns to optimize recovery metrics across varied multi-system conditions.', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'endocrinologyDiabetes', name: 'Endocrinology & Diabetes', hindiName: 'एंडोक्रिनोलॉजी और मधुमेह', type: 'General Specialty', shortDesc: 'Targeted continuous metabolic care systems tracking endocrine variations and critical type-1/2 diabetes conditions.', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'nephrology', name: 'Nephrology', hindiName: 'नेफ्रोलॉजी विभाग', type: 'Critical Care', shortDesc: 'High-volume continuous renal filtration replacement lines and clinical settings matching chronic pre-transplant panels.', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'emergencyTrauma', name: 'Emergency & Trauma', hindiName: 'आपातकालीन और आघात', type: 'Critical Care', shortDesc: 'Immediate continuous multi-channel trauma support metrics deploying field diagnostic ambulances 24 hours a day.', image: 'https://images.unsplash.com/photo-1584515933487-75982139b85b?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'internalMedicine', name: 'Internal Medicine', hindiName: 'आंतरिक चिकित्सा', type: 'General Specialty', shortDesc: 'Primary thorough diagnosis tracks targeting ambiguous health profiles and non-surgical system conditions.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'ophthalmology', name: 'Ophthalmology', hindiName: 'नेत्र विज्ञान', type: 'General Specialty', shortDesc: 'Advanced micro-incision sutureless cataract adjustments, retina tracking scans, and operational glaucoma stabilization lines.', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'entHeadNeckSurgery', name: 'ENT and Head neck Surgery', hindiName: 'ईएनटी विभाग', type: 'General Specialty', shortDesc: 'Endoscopic evaluation pathways for complete auditory and sinus clear operations, matching neck cancer resections.', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400&h=240' },
    { id: 'bloodCentre', name: 'Blood Centre', hindiName: 'रक्त केंद्र', type: 'Diagnostics & Scans', shortDesc: '24×7 complete apheresis separate screening storage panels delivering sterile component options with no waiting constraints.', image: 'https://images.unsplash.com/photo-1615461066841-4b10492969d2?auto=format&fit=crop&q=80&w=400&h=240' }
  ];

  const filteredServices = medicalServicesRoster.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || service.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans min-h-screen" id="medical-services-page">
      
      {/* Banner */}
      <section className="bg-[#0B1F3A] text-white py-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col gap-3">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Centers of Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight">Super Specialty Medical Services</h2>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search departments or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#006B3F] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-700 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
            {['All', 'Critical Care', 'General Specialty', 'Diagnostics & Scans'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat ? 'bg-[#006B3F] text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🟦 FIXED: INFOBAR CONTAINER (Switched to flex-start alignment to drop vertical whitespace gaps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full">
          
          {/* Card 1: 24/7 ICU Desk Admissions */}
          <div className="bg-[#0B1F3A] rounded-3xl p-5 border border-slate-800 text-white shadow-lg flex flex-col gap-4 select-none">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-400 font-black tracking-wider text-[9px] uppercase px-3 py-1 rounded-full w-fit mb-3">
                <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> Critical Admission Helpline
              </span>
              <h3 className="text-lg font-black leading-tight tracking-tight">24/7 ICU Desk Admissions</h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-1">
                Direct ambulance dispatches guaranteeing seamless immediate admission to ICU, NICU, or Cardiac units.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <a href="tel:18008908898" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/5 transition-all">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white shrink-0"><Phone className="w-3.5 h-3.5 stroke-[2.5]" /></div>
                <div className="flex flex-col min-w-0"><span className="text-[8px] font-bold text-slate-400 uppercase leading-none">Emergency</span><span className="text-xs font-black mt-1 text-white">1800 890 8898</span></div>
              </a>
              <a href="tel:06542360400" className="flex items-center gap-4 group bg-white/5 hover:bg-white/10 p-2.5 rounded-xl border border-white/5 transition-all">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-green-400 shrink-0"><Clock className="w-4 h-4" /></div>
                <div className="flex flex-col text-left"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Administrative</span><span className="text-sm font-black mt-1 text-white truncate">06542 360400</span></div>
              </a>
            </div>
            <button onClick={openAppointmentModal} className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors">
              Schedule Outpatient Consult
            </button>
          </div>

          {/* Card 2: Fully Digitized Diagnostics Labs (Removed justify-between to pack content smoothly) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <span className="bg-blue-50 text-blue-600 font-bold text-[9px] uppercase px-2.5 py-1 rounded-md w-fit">
                In-House Diagnostics
              </span>
              <h4 className="text-base font-black text-[#0B1F3A]">Fully Digitized Diagnostics Labs</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Synchronized automated lab workflows rendering rapid, high-accuracy diagnostic data insights.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 font-semibold border-t border-slate-100 pt-4 mt-2">
              <div className="flex items-center gap-1.5"><FlaskConical className="w-4 h-4 text-[#006B3F]" /><span>24/7 Pathology</span></div>
              <div className="flex items-center gap-1.5"><ScanLine className="w-4 h-4 text-[#006B3F]" /><span>Silent 3T MRI</span></div>
              <div className="flex items-center gap-1.5"><Stethoscope className="w-4 h-4 text-[#006B3F]" /><span>High-Speed CT</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN SERIAL LISTINGS GRID SECTION */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="serial-services-master-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((dept) => {
              const isDiagnostics = dept.type === 'Diagnostics & Scans';
              return (
                <div 
                  key={dept.id} 
                  className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between w-full h-full min-h-[460px]"
                >
                  <div>
                    {/* Cover Photo Layer */}
                    <div className="w-full h-44 bg-slate-100 relative overflow-hidden select-none">
                      <img src={dept.image} alt={dept.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute top-3 right-3 bg-[#0B1F3A]/90 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider backdrop-blur-sm">{dept.type}</span>
                    </div>

                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isDiagnostics ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-[#006B3F]'}`}>
                          {isDiagnostics ? <Activity className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h3 className="text-base font-black text-[#0B1F3A] tracking-tight leading-tight truncate">{dept.name}</h3>
                          <span className="text-[10px] text-[#006B3F] font-bold uppercase tracking-widest mt-0.5 truncate">{dept.hindiName}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{dept.shortDesc}</p>

                      <div className="border-t border-slate-50 pt-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Procedures & Care Fields</span>
                        <div className="flex flex-col gap-1.5">
                          {(clinicalHighlights[dept.id] || []).slice(0, 4).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#006B3F] shrink-0 mt-0.5" />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Footer Actions */}
                  <div className="grid grid-cols-2 gap-2.5 p-5 pt-0 border-t border-slate-50 mt-4">
                    <button onClick={() => handleSpecialtyClick(dept.id)} className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold py-2 rounded-xl border border-slate-100 text-center transition-colors">View Specs</button>
                    <button onClick={openAppointmentModal} className="bg-[#006B3F] hover:bg-[#005431] text-white text-[11px] font-bold py-2 rounded-xl text-center shadow-sm transition-colors">{isDiagnostics ? 'Book Scan' : 'Consult Now'}</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-medium">
              No healthcare departments or services match your active search terms.
            </div>
          )}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="py-12 bg-[#0B1F3A] text-white" id="specialties-cta-banner">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-5" id="specialties-cta-container">
          <div className="flex justify-center gap-1" id="banner-stars">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
          </div>
          <h3 className="text-xl sm:text-2xl xl:text-3xl font-black leading-tight">
            Consult With India's Top Super-Specialists At Bokaro
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Choose clinical precision, advanced modular safety, and complete cashless convenience. Book your outpatient consultation tickets or contact our emergency helpdesks now.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-1" id="banner-actions">
            <button onClick={openAppointmentModal} className="bg-[#16A34A] hover:bg-[#15803D] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md cursor-pointer active:scale-95 transition-all">Book Specialist Slot</button>
            <a href={`tel:${hospitalInfo.phone}`} className="bg-white/10 hover:bg-white/15 text-white border border-white/15 px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"><Phone className="w-3.5 h-3.5 text-green-400" /> Dial 1800 890 8898</a>
          </div>
        </div>
      </section>

    </div>
  );
}