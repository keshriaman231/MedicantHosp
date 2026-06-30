// import React, { useState } from 'react';
// import {
//   MapPin, Phone, Mail, Send, CheckCircle,
//   Map, Navigation, Sparkles, AlertCircle
// } from 'lucide-react';
// import { hospitalInfo } from '../data/hospitalData';
// import { supabase, isSupabaseConfigured } from '../lib/supabase';
// import { sanitizeInput, validateEmail, validatePhone, validateName, validateMessage, checkRateLimit } from '../lib/security';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: 'General Inquiry',
//     message: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const cleanName = sanitizeInput(formData.name);
//     const cleanEmail = sanitizeInput(formData.email);
//     const cleanPhone = sanitizeInput(formData.phone);
//     const cleanSubject = sanitizeInput(formData.subject);
//     const cleanMessage = sanitizeInput(formData.message);

//     if (!cleanName || !cleanPhone || !cleanMessage) {
//       setSubmitError("Please fill out all mandatory fields: Name, Phone, and Message.");
//       return;
//     }

//     if (!validateName(cleanName)) {
//       setSubmitError("Please enter a valid Patient/Sender Name (2-80 characters, letters/numbers/spaces/dots/hyphens only).");
//       return;
//     }

//     if (!validatePhone(cleanPhone)) {
//       setSubmitError("Please enter a valid primary contact phone number (10-20 digits, formatting allowed).");
//       return;
//     }

//     if (formData.email && !validateEmail(cleanEmail)) {
//       setSubmitError("Please provide a valid email address structure (e.g., example@domain.com).");
//       return;
//     }

//     if (!validateMessage(cleanMessage)) {
//       setSubmitError("Please restrict your message body to under 2000 characters.");
//       return;
//     }

//     const rateLimit = checkRateLimit('contact', 5, 10 * 60 * 1000);
//     if (!rateLimit.allowed) {
//       setSubmitError(`Rate limit exceeded. Please wait ${rateLimit.timeLeftSeconds} seconds before sending another message.`);
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const { error } = await supabase.from('enquiries').insert([{
//         name: cleanName,
//         phone: cleanPhone,
//         email: cleanEmail || null,
//         subject: cleanSubject,
//         message: cleanMessage
//       }]);

//       if (error) {
//         throw error;
//       }

//       setIsSubmitted(true);
//     } catch (err: any) {
//       console.error('Error submitting inquiry to Supabase:', err);
//       setSubmitError(err.message || 'Failed to submit inquiry to backend database.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeSuccessModal = () => {
//     setIsSubmitted(false);
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       subject: 'General Inquiry',
//       message: ''
//     });
//   };

//   return (
//     <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id="contact-page-root">

//       {/* Hero Banner */}
//       <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="contact-hero">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-900/20 to-transparent pointer-events-none"></div>
//         <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-3">
//           <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
//             <Sparkles className="w-4 h-4 text-yellow-400" /> Patient Helpdesk Connect
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us & Get Directions</h2>
//           <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
//             Our clinical triage officers and administrators are ready to support your medical files. Reach out directly or plan your visit to our Bokaro sector campus.
//           </p>
//         </div>
//       </section>

//       {/* Main Grid: Form, Contacts and Map */}
//       <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-main-grid-section">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" id="contact-grid-wrapper">

//           {/* Left Side: Contact Cards & Contact Form (7 Columns) */}
//           <div className="lg:col-span-7 flex flex-col gap-8" id="contact-left-pane">

//             {/* Quick Contact Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="contact-quick-cards">
//               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
//                 <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0">
//                   <MapPin className="w-4.5 h-4.5" />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Campus Location</h4>
//                   <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{hospitalInfo.address}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
//                 <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0">
//                   <Phone className="w-4.5 h-4.5" />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Active Helplines</h4>
//                   <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
//                     OPD: {hospitalInfo.phone}<br />
//                     Toll Free: 1800 890 8898
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
//                 <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0">
//                   <Mail className="w-4.5 h-4.5" />
//                 </div>
//                 <div>
//                   <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Online Support</h4>
//                   <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{hospitalInfo.email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Inquiry Form */}
//             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8" id="contact-form-box">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-6 gap-2">
//                 <h3 className="text-base font-extrabold text-[#0B1F3A] uppercase tracking-wider">
//                   Online Consultation & Admission Inquiry
//                 </h3>
//                 {isSupabaseConfigured ? (
//                   <span className="self-start sm:self-auto text-[9px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
//                     Supabase Active
//                   </span>
//                 ) : (
//                   <span className="self-start sm:self-auto text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1" title="Saving to simulated LocalStorage database.">
//                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
//                     Demo Sandbox Mode
//                   </span>
//                 )}
//               </div>

//               {submitError && (
//                 <div className="bg-red-50 border border-red-100 text-red-700 p-3.5 rounded-2xl flex items-start gap-2 text-xs mb-4">
//                   <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
//                   <p>{submitError}</p>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans" id="contact-inquiry-form">

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-top-row">
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient Name *</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="e.g. Ramesh Kumar"
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Number *</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       placeholder="e.g. +91 99340 12345"
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-middle-row">
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="e.g. ramesh@gmail.com"
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inquiry Subject</label>
//                     <select
//                       value={formData.subject}
//                       onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F] cursor-pointer"
//                     >
//                       <option value="General Inquiry">General Admission Inquiry</option>
//                       <option value="OPD Schedule">OPD Timing Inquiry</option>
//                       <option value="Diagnostic Booking">Pathology & Radiology Inquiry</option>
//                       <option value="Corporate TPA Cashless">TPA Cashless Pre-Auth Inquiry</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-1" id="form-msg-row">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Message / Symptoms *</label>
//                   <textarea
//                     required
//                     rows={4}
//                     value={formData.message}
//                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                     placeholder="Describe your treatment requirements or symptoms..."
//                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] resize-none"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`bg-[#006B3F] hover:bg-[#005431] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-green-100 flex items-center justify-center gap-1.5 mt-2 cursor-pointer transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                   id="submit-inquiry-btn"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                       Saving Inquiry...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" /> Send Request Desk
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Right Side: Campus Card showing Map Embed & Coordinate Markers (5 Columns) */}
//           <div className="lg:col-span-5 flex flex-col gap-6" id="contact-right-pane">

//             <div className="bg-[#0B1F3A] text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col gap-5 relative overflow-hidden" id="visual-map-mock">
//               <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

//               <div className="flex justify-between items-center border-b border-slate-800 pb-3" id="map-widget-header">
//                 <span className="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
//                   <Map className="w-4.5 h-4.5" /> Campus Map Coordinates
//                 </span>
//                 <span className="text-[10px] text-slate-500">23.65° N, 86.15° E</span>
//               </div>

//               {/* 🎯 Interactive Google Maps Frame Integration */}
//               <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative z-10" id="map-frame-wrapper">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.459955848246!2d86.1428383!3d23.6594246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f5edb18bb5bdf3%3A0xe2130dfc7379203a!2sMedicant%20Hospital%20%26%20Research%20Centre!5e0!3m2!1sen!2sin!4v1719717600000!5m2!1sen!2sin"
//                   className="w-full h-full border-0"
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="strict-origin-when-cross-origin"
//                   title="Medicant Hospital Interactive Map"
//                 />
//               </div>
//               {/* Coordinate Metrics */}
//               <div className="flex flex-col gap-4 relative" id="map-streets">
//                 <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
//                   <span>— NH-23 (Dhanbad-Ramgarh Highway)</span>
//                   <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold font-sans">2 KM</span>
//                 </div>

//                 <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
//                   <span>Bokaro Steel City Railway Station</span>
//                   <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold font-sans">8 KM</span>
//                 </div>

//                 <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
//                   <span>Chas Transit Crossing</span>
//                   <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold font-sans">5 KM</span>
//                 </div>
//               </div>

//               {/* Selected Target Node HUD block */}
//               <div className="bg-gradient-to-r from-green-950/40 to-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-center gap-3 relative z-10" id="medicant-map-node">
//                 <div className="w-9 h-9 bg-green-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20">
//                   <Navigation className="w-4 h-4 fill-current" />
//                 </div>
//                 <div>
//                   <h4 className="text-xs font-black text-white uppercase tracking-wider leading-none">Medicant Hospital Campus</h4>
//                   <span className="text-[9px] text-green-400 font-bold block mt-1.5">Housing Colony, Sector 4, Bokaro Steel City</span>
//                 </div>
//               </div>

//               {/* Transit Directions metadata list */}
//               <div className="flex flex-col gap-3 border-t border-slate-800/60 pt-4" id="transit-directions-list">
//                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transit Access Points</span>
//                 <div className="grid grid-cols-1 gap-3.5 text-xs text-slate-300" id="transit-grid">
//                   <div className="flex items-start gap-2.5">
//                     <span className="bg-slate-950 text-green-400 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold border border-slate-800">R</span>
//                     <p className="leading-relaxed text-[11px]"><strong>From Bokaro Railway Station</strong>: 8 km (take the Sector-4 local bypass auto track direct to Housing Colony Crossing).</p>
//                   </div>
//                   <div className="flex items-start gap-2.5">
//                     <span className="bg-slate-950 text-green-400 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold border border-slate-800">H</span>
//                     <p className="leading-relaxed text-[11px]"><strong>From NH-23 (Dhanbad Highway)</strong>: 2 km east on the Sector-4 entrance corridor.</p>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>

//         </div>
//       </section>

//       {/* Success Modal Overlay popup */}
//       {isSubmitted && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200" id="inquiry-success-backdrop">
//           <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200" id="inquiry-success-modal">
//             <div className="w-12 h-12 bg-green-50 text-[#006B3F] rounded-full flex items-center justify-center mb-1">
//               <CheckCircle className="w-8 h-8" />
//             </div>
//             <div>
//               <h3 className="font-extrabold text-base text-[#0B1F3A] mb-1">Inquiry Submitted Successfully</h3>
//               <p className="text-xs text-slate-500 leading-relaxed font-sans">
//                 Our Patient Coordinator will call your registered contact number <strong>{formData.phone}</strong> within 15 minutes to coordinate admissions or consultations.
//               </p>
//             </div>
//             <button
//               onClick={closeSuccessModal}
//               className="bg-[#0B1F3A] hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-xl text-xs cursor-pointer w-full transition-colors"
//               id="success-modal-close-btn"
//             >
//               Understand, Thank you
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Send, CheckCircle,
  Map, Navigation, Sparkles, AlertCircle
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sanitizeInput, validateEmail, validatePhone, validateName, validateMessage, checkRateLimit } from '../lib/security';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = sanitizeInput(formData.phone);
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanPhone || !cleanMessage) {
      setSubmitError("Please fill out all mandatory fields: Name, Phone, and Message.");
      return;
    }

    if (!validateName(cleanName)) {
      setSubmitError("Please enter a valid Patient/Sender Name.");
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setSubmitError("Please enter a valid primary contact phone number.");
      return;
    }

    if (formData.email && !validateEmail(cleanEmail)) {
      setSubmitError("Please provide a valid email address structure.");
      return;
    }

    if (!validateMessage(cleanMessage)) {
      setSubmitError("Please restrict your message body to under 2000 characters.");
      return;
    }

    const rateLimit = checkRateLimit('contact', 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      setSubmitError(`Rate limit exceeded. Please wait ${rateLimit.timeLeftSeconds} seconds.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('enquiries').insert([{
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail || null,
        subject: cleanSubject,
        message: cleanMessage
      }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting inquiry to Supabase:', err);
      setSubmitError(err.message || 'Failed to submit inquiry to backend database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans pb-16" id="contact-page-root">

      {/* Hero Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 relative overflow-hidden" id="contact-hero">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-3">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400" /> Patient Helpdesk Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us & Get Directions</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Our clinical triage officers and administrators are ready to support your medical files. Reach out directly or plan your visit to our Bokaro sector campus.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-main-grid-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Side Panel */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0"><MapPin className="w-4.5 h-4.5" /></div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Campus Location</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{hospitalInfo.address}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0"><Phone className="w-4.5 h-4.5" /></div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Active Helplines</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">OPD: {hospitalInfo.phone}<br />Toll Free: 1800 890 8898</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-[#006B3F] shrink-0"><Mail className="w-4.5 h-4.5" /></div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0B1F3A] uppercase tracking-wider mb-1">Online Support</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{hospitalInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 mb-6 gap-2">
                <h3 className="text-base font-extrabold text-[#0B1F3A] uppercase tracking-wider">Online Consultation & Admission Inquiry</h3>
                {isSupabaseConfigured ? (
                  <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Supabase Active
                  </span>
                ) : (
                  <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Demo Sandbox Mode
                  </span>
                )}
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-3.5 rounded-2xl flex items-start gap-2 text-xs mb-4">
                  <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Ramesh Kumar" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Number *</label>
                    <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="e.g. +91 99340 12345" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. ramesh@gmail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inquiry Subject</label>
                    <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F]">
                      <option value="General Inquiry">General Admission Inquiry</option>
                      <option value="OPD Schedule">OPD Timing Inquiry</option>
                      <option value="Diagnostic Booking">Pathology & Radiology Inquiry</option>
                      <option value="Corporate TPA Cashless">TPA Cashless Pre-Auth Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Message / Symptoms *</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your requirements..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-[#006B3F] hover:bg-[#005431] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 mt-2 transition-colors">
                  {isSubmitting ? "Saving Inquiry..." : <><Send className="w-4 h-4" /> Send Request Desk</>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side Card Deck (Matches image_f48a41.png perfectly) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0B1F3A] text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Map className="w-4.5 h-4.5" /> Campus Map Coordinates
                </span>
                <span className="text-[10px] text-slate-500">23.65° N, 86.15° E</span>
              </div>

              {/* 🎯 Real Embed-Authorized Interactive Google Map Frame for Medicant Hospital */}
              {/* 🎯 Safe Production-Ready Interactive Google Map Frame */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative z-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.945281987595!2d86.13398907533355!3d23.631971178753238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4239100000001%3A0xc1c26f6c86fd4bde!2sMedicant%20Hospital%20%26%20Research%20Centre!5e0!3m2!1sen!2sin!4v1719727200000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Medicant Hospital Bokaro Map Embed"
                />
              </div>
              {/* Coordinate Metrics */}
              <div className="flex flex-col gap-4 relative">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
                  <span>— NH-23 (Dhanbad-Ramgarh Highway)</span>
                  <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold">2 KM</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
                  <span>Bokaro Steel City Railway Station</span>
                  <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold">8 KM</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-800/60 pb-1">
                  <span>Chas Transit Crossing</span>
                  <span className="text-[8px] bg-slate-950 border border-slate-800 text-green-400 px-1.5 py-0.5 rounded font-bold">5 KM</span>
                </div>
              </div>

              {/* Node Placement Tag */}
              <div className="bg-gradient-to-r from-green-950/40 to-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 bg-green-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20">
                  <Navigation className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider leading-none">Medicant Hospital Campus</h4>
                  <span className="text-[9px] text-green-400 font-bold block mt-1.5">Housing Colony, Sector 4, Bokaro Steel City</span>
                </div>
              </div>

              {/* Transit Access Metadata */}
              <div className="flex flex-col gap-3 border-t border-slate-800/60 pt-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transit Access Points</span>
                <div className="grid grid-cols-1 gap-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="bg-slate-950 text-green-400 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold border border-slate-800">R</span>
                    <p className="leading-relaxed text-[11px]"><strong>From Bokaro Railway Station</strong>: 8 km (take the Sector-4 local bypass auto track direct to Housing Colony Crossing).</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="bg-slate-950 text-green-400 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold border border-slate-800">H</span>
                    <p className="leading-relaxed text-[11px]"><strong>From NH-23 (Dhanbad Highway)</strong>: 2 km east on the Sector-4 entrance corridor.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-[#006B3F] rounded-full flex items-center justify-center mb-1">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0B1F3A] mb-1">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our Patient Coordinator will call your registered contact number <strong>{formData.phone}</strong> within 15 minutes to coordinate admissions or consultations.
              </p>
            </div>
            <button onClick={closeSuccessModal} className="bg-[#0B1F3A] hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-xl text-xs w-full transition-colors">
              Understand, Thank you
            </button>
          </div>
        </div>
      )}

    </div>
  );
}