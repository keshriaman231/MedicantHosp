import React from 'react';
import { 
  HeartPulse, ShieldAlert, Zap, Cpu, Award, 
  Sparkles, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { facilities } from '../data/hospitalData';

export default function Facilities() {
  
  const techSpecs: { [key: string]: string[] } = {
    icu: ["Dräger continuous gas and ventilation monitors", "Bedside hemodialysis support lines", "1:1 specialized nurse staffing model", "Central telemetry monitoring boards"],
    nicu: ["Dräger level-3 newborn warmers and incubator beds", "Neonatal high-frequency ventilators", " Continuous transcutaneous oxygen sensors", "Dedicated newborn isolation rooms"],
    ot: ["Modular stainless steel walls with antibacterial coatings", "Vertically structured Laminar Airflow with HEPA filters", "Premium Carl Zeiss operating neuro microscopes", "Maquet orthopedic surgical traction tables"],
    mri: ["High-Tesla high-resolution magnetic imaging arrays", "Acoustic noise reduction system for patient comfort", "Real-time orthopedic joint and brain sequencing", "Fully digital PACS report synchronization"],
    ctscan: ["Radiation optimized high-speed multislice scanning", "Coronary and chest diagnostic software", "3D anatomical bone reconstruction capabilities", "Fast 10-second complete scan cycles"],
    laboratory: ["Fully automated biochemical analyzers", "Digitized CBC hematology counters", "Strict internal and external quality compliance", "Online digital report download integration"],
    ambulance: ["Hamilton transport respiratory ventilators", "Cardiac resuscitation defibrillators", "Continuous oxygen and monitoring setups", "Trained emergency critical trauma nurses"],
    emergency: ["Multi-bed triage and resuscitation room", "Minor emergency operation theatre", "24/7 on-call trauma surgeons and doctors", "Dedicated in-house blood storage units"]
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id="facilities-page-root">
      
      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="facilities-hero">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-3">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Advanced Medical Equipment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our High-End Clinical Facilities</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Medicant Hospital & Research Centre is equipped with advanced modular operating theatres, level-3 intensive units, and high-resolution diagnostic scanners.
          </p>
        </div>
      </section>

      {/* Facilities Cards Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="facilities-grid-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="facilities-grid">
          {facilities.map((fac) => (
            <div 
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between"
              id={`facility-detail-card-${fac.id}`}
            >
              <div>
                <div className="aspect-[16/9] bg-slate-200 relative overflow-hidden" id="facility-detail-img">
                  <img 
                    src={fac.image} 
                    alt={fac.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#0B1F3A] text-green-400 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider border border-slate-800 flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Certified Standard
                  </span>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-4" id="facility-detail-info">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">{fac.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{fac.details}</p>
                  </div>

                  {/* Technical Specs List */}
                  <div className="border-t border-slate-50 pt-4" id="facility-specs-box">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2.5">Infrastructural Specifications</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="facility-specs-list">
                      {(techSpecs[fac.id] || []).map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 leading-normal" id={`spec-item-${idx}`}>
                          <CheckCircle2 className="w-4 h-4 text-[#006B3F] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-slate-50 mt-4 flex items-center gap-2 text-xs text-slate-500 font-semibold" id="facility-footer">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Calibrated and checked monthly by Biomedical Engineering Wing.</span>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
