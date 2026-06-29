/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Scan, Info, ArrowRight, ShieldCheck, Cpu, 
  Sparkles, Eye, Maximize, Navigation 
} from 'lucide-react';

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  description: string;
  specs: string[];
}

interface TourScene {
  id: string;
  name: string;
  image: string;
  description: string;
  details: string;
  hotspots: Hotspot[];
}

const tourScenes: TourScene[] = [
  {
    id: "cathlab",
    name: "Siemens Cardiac Cath Lab",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200&h=700",
    description: "Our state-of-the-art flat panel angiography laboratory, specializing in rapid coronaries and pacemakers.",
    details: "The Cardiac Cath Lab at Medicant is Bokaro's premier facility, fully integrated with continuous hemodynamic tracking. It enables immediate opening of blocked coronary arteries during gold-standard critical heart attacks.",
    hotspots: [
      {
        id: "cl-siemens",
        top: "40%",
        left: "45%",
        title: "Siemens Artis dFC Angiography System",
        description: "An advanced ceiling-mounted robotic flat-panel imaging array delivering ultra-high resolution imaging at fractionally minimized radiation exposure.",
        specs: ["Flat detector size: 30x40 cm", "Integrated cardiac software package", "Real-time 3D reconstruction"]
      },
      {
        id: "cl-hemo",
        top: "25%",
        left: "70%",
        title: "Mac-Lab Hemodynamic System",
        description: "Continuous clinical tracking of patient vitals, intra-arterial pressures, and ECG parameters throughout complex interventional procedures.",
        specs: ["Dual 24-inch flat displays", "Full integration with PACS archiving", "Automated cardiac output reports"]
      }
    ]
  },
  {
    id: "modularot",
    name: "Modular Operation Theatre",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200&h=700",
    description: "A sterile, bacteria-free operating theater fitted with high-end surgical laminars.",
    details: "Medicant modular OTs are certified for zero-pathogen count. They are optimized for orthopedic joint replacements, complex neuro surgeries, and major oncology tumor resections.",
    hotspots: [
      {
        id: "ot-laminar",
        top: "15%",
        left: "50%",
        title: "Laminar Flow HEPA Air Circulation",
        description: "Direct vertical flow of highly filtered sterile air, creating a zero-pathogen envelope around the operating field to prevent post-op infections.",
        specs: ["99.97% HEPA filtration efficiency", "20+ air changes per hour", "Cleanliness class: ISO Class 5"]
      },
      {
        id: "ot-anesthesia",
        top: "35%",
        left: "25%",
        title: "Dräger Anesthesia Workstation",
        description: "Advanced ventilating and anesthetic delivery systems with sensitive gas and flow feedback loop.",
        specs: ["Integrated vaporizers", "Electronic flow controllers", "High-frequency ventilating support"]
      }
    ]
  },
  {
    id: "icu",
    name: "Level-III Intensive Care Unit",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=700",
    description: "Round-the-clock intensive therapy ward, managed by dedicated clinicians.",
    details: "The ICU has 1:1 specialist nursing care and dedicated bedside diagnostic ultrasound, pathology testing, and transport support systems to handle acute organ failures.",
    hotspots: [
      {
        id: "icu-monitor",
        top: "30%",
        left: "30%",
        title: "Mindray Multi-parameter Monitors",
        description: "High-end clinical displays measuring ECG, SPO2, invasive blood pressure, core temperature, and respiration indices with automated alerts.",
        specs: ["15-inch active touchscreen interface", "Wireless central monitoring tie", "Arrythmia diagnostic analytics"]
      },
      {
        id: "icu-vent",
        top: "45%",
        left: "65%",
        title: "Hamilton High-End ICU Ventilator",
        description: "Intelligent breathing support with adaptive ventilation controllers to support neonates and adults.",
        specs: ["Adaptive Supportive Ventilation (ASV)", "Bedside lung imaging modules", "High-flow nasal oxygen therapy (HFNC)"]
      }
    ]
  },
  {
    id: "deluxe",
    name: "Inpatient Deluxe Suite",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200&h=700",
    description: "Premium healing environment with high comfort electric beds and custom parent suites.",
    details: "Designed to provide a serene, premium recovery experience, featuring fully adjustable bed systems, client recliners, attached modern bath, and individualized clinical diet.",
    hotspots: [
      {
        id: "deluxe-bed",
        top: "50%",
        left: "50%",
        title: "Hillrom Ergonomic Electric Bed",
        description: "Fully motorized patient bed systems with hand controllers for backrest, height, and leg positions.",
        specs: ["Zero-pressure safety mattresses", "Patient call-bell integration", "Integrated weighing scale panel"]
      }
    ]
  },
  {
    id: "lobby",
    name: "Welcome Lobby & Triage Desk",
    image: "https://images.unsplash.com/photo-1581091923895-45a47d03b163?auto=format&fit=crop&q=80&w=1200&h=700",
    description: "Spacious reception, digitized billing, and instant clinical triage.",
    details: "Our welcome lobby ensures immediate patient registration, clear navigation routes, dedicated insurance desks, and initial vitals screening.",
    hotspots: [
      {
        id: "lobby-desk",
        top: "45%",
        left: "40%",
        title: "Integrated Digitized Helpdesk",
        description: "High-speed registration and OPD ticket routing. Instantly connected to our electronic health recording (EHR) database.",
        specs: ["Barcode patient identification", "Cashless TPA pre-authorization desk", "Instant token board displays"]
      }
    ]
  }
];

export default function VirtualTour() {
  const [activeScene, setActiveScene] = useState<TourScene>(tourScenes[0]);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleSceneChange = (scene: TourScene) => {
    setActiveScene(scene);
    setActiveHotspot(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden font-sans" id="virtual-tour-root">
      
      {/* Title Header bar */}
      <div className="bg-[#0B1F3A] px-6 py-5 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="tour-bar-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
            <Scan className="w-5 h-5 text-green-400 animate-pulse" />
          </div>
          <div>
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" /> Interactive Experience
            </span>
            <h3 className="text-lg font-bold tracking-tight">Virtual 2D Hospital Infrastructure Tour</h3>
          </div>
        </div>
        <div className="flex gap-2 text-xs font-semibold text-slate-300" id="tour-info-pill">
          <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-green-400" /> Click Hotspots to inspect technology
          </span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3" id="tour-main-grid">
        
        {/* Left Side: Scenes Selector and Description (1 Column) */}
        <div className="p-6 bg-slate-50 border-r border-slate-100 flex flex-col justify-between" id="tour-left-pane">
          <div className="flex flex-col gap-6">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Select Infrastructure Scene</span>
            <div className="flex flex-col gap-2" id="scene-selector-list">
              {tourScenes.map((scene) => {
                const isActive = scene.id === activeScene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSceneChange(scene)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isActive 
                        ? 'bg-white border-green-200 shadow-md text-[#006B3F] font-bold' 
                        : 'bg-white/40 hover:bg-white hover:border-slate-200 border-transparent text-slate-700'
                    }`}
                    id={`scene-btn-${scene.id}`}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Navigation className={`w-4 h-4 ${isActive ? 'text-green-600 rotate-45' : 'text-slate-400'}`} />
                      {scene.name}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-green-600' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-5 mt-2" id="scene-description-block">
              <h4 className="text-base font-bold text-[#0B1F3A] mb-2">{activeScene.name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{activeScene.description}</p>
            </div>
          </div>

          <div className="mt-8 bg-[#006B3F]/5 border border-green-100 rounded-2xl p-4 flex items-start gap-3" id="tour-quality-note">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-normal">
              <strong>Quality Assurance:</strong> All clinical equipment is continuously calibrated and complies strictly with NABH and atomic radiation safety boards.
            </div>
          </div>
        </div>

        {/* Center: Image Stage with Interactive Hotspots (2 Columns) */}
        <div className="col-span-1 lg:col-span-2 bg-slate-900 relative h-[350px] sm:h-[450px] lg:h-auto flex items-center justify-center overflow-hidden" id="tour-canvas-pane">
          {/* Main Scene Image */}
          <img 
            src={activeScene.image} 
            alt={activeScene.name}
            className="w-full h-full object-cover opacity-90 select-none pointer-events-none transition-all duration-500" 
            id="tour-scene-image"
          />

          {/* Interactive Hotspot Indicators */}
          {activeScene.hotspots.map((hotspot) => {
            const isSelected = activeHotspot?.id === hotspot.id;
            return (
              <div
                key={hotspot.id}
                style={{ top: hotspot.top, left: hotspot.left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(hotspot)}
                id={`hotspot-trigger-${hotspot.id}`}
              >
                {/* Glowing Dot Ring */}
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-green-400 opacity-40 animate-ping"></span>
                <button
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg transition-all duration-300 ${
                    isSelected ? 'bg-green-600 scale-125' : 'bg-[#006B3F] hover:bg-green-600'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            );
          })}

          {/* Detail Overlay Panel */}
          {activeHotspot ? (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-2xl p-5 z-30 max-w-lg animate-in slide-in-from-bottom duration-300" id="hotspot-detail-panel">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-green-700" />
                  </div>
                  <h5 className="font-bold text-[#0B1F3A] text-sm leading-tight">{activeHotspot.title}</h5>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600 text-xs font-bold border border-slate-100"
                  id="close-hotspot-btn"
                >
                  Close
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {activeHotspot.description}
              </p>
              <div className="flex flex-col gap-1" id="hotspot-specs-list">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Specifications</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeHotspot.specs.map((spec, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10" id="tour-help-overlay">
              <Scan className="w-3.5 h-3.5 text-green-400 animate-spin" />
              <span>Explore hotspots inside this scene</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
