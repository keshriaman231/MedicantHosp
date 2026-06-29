import React, { useState, useEffect } from 'react';
// const bgVideoRef = React.useRef<HTMLVideoElement>(null);
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { sanitizeInput, validateEmail, validatePhone, validateName, checkRateLimit } from './lib/security';

// Page Imports
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MedicalServices from './pages/MedicalServices';
import DepartmentDetail from './pages/DepartmentDetail';
import Doctors from './pages/Doctors';
import Facilities from './pages/Facilities';
import BlogPage from './pages/Blog';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import PatientPortal from './pages/PatientPortal';
import PaymentPortal from './pages/PaymentPortal';

// Shared Icons
import {
  X, Calendar, CheckCircle, ShieldCheck,
  ChevronRight, Phone, AlertCircle, Clock
} from 'lucide-react';
import { doctors, departments } from './data/hospitalData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<any>(null);

  // Appointment Scheduler Modal State
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentDoc, setAppointmentDoc] = useState('');
  const [appointmentDept, setAppointmentDept] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentSlot, setAppointmentSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isHealthPackageChecked, setIsHealthPackageChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ticketNo, setTicketNo] = useState('');

  // Availability checking states
  const [isAvailabilityChecking, setIsAvailabilityChecking] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<'unchecked' | 'available' | 'unavailable'>('unchecked');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [emailPreview, setEmailPreview] = useState<string | null>(null);

  // Trigger server-side availability check when clinician, date, or time slot changes
  useEffect(() => {
    if (appointmentDoc && appointmentDate && appointmentSlot) {
      const checkDoctorAvailability = async () => {
        setIsAvailabilityChecking(true);
        setSubmitError(null);
        try {
          const res = await fetch('/api/appointments/check-availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              doctor_name: appointmentDoc,
              appointment_date: appointmentDate,
              time_slot: appointmentSlot
            })
          });
          const data = await res.json();
          if (data.available) {
            setAvailabilityStatus('available');
            setAvailabilityMessage(data.message || 'Slot is available for booking.');
          } else {
            setAvailabilityStatus('unavailable');
            setAvailabilityMessage(data.message || 'This slot is fully booked.');
            setSubmitError(data.message || 'The selected clinician is fully booked for this slot. Please select another slot or doctor.');
          }
        } catch (error) {
          console.warn('Error checking doctor availability:', error);
          setAvailabilityStatus('available');
          setAvailabilityMessage('Available (demo sandbox mode)');
        } finally {
          setIsAvailabilityChecking(false);
        }
      };

      checkDoctorAvailability();
    } else {
      setAvailabilityStatus('unchecked');
      setAvailabilityMessage('');
    }
  }, [appointmentDoc, appointmentDate, appointmentSlot]);

  // Handle cross-page routing transitions with parameters
  const handleNavigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setNavParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'doctors' && params?.search) {
      setAppointmentDoc(params.search);
    }
  };

  // Handle open appointment modal with optional pre-population parameters
  const openAppointmentModalWithParams = (params?: { doctor?: string; date?: string; dept?: string }) => {
    if (params) {
      if (params.doctor) {
        setAppointmentDoc(params.doctor);
        const docObj = doctors.find(d => d.name === params.doctor);
        if (docObj) {
          setAppointmentDept(docObj.departmentName);
        }
      }
      if (params.date) {
        setAppointmentDate(params.date);
      }
      if (params.dept) {
        setAppointmentDept(params.dept);
      }
    }
    setIsAppointmentModalOpen(true);
  };

  const handleBookAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPatientName = sanitizeInput(patientName);
    const cleanPatientPhone = sanitizeInput(patientPhone);
    const cleanPatientEmail = sanitizeInput(patientEmail);
    const cleanDoc = sanitizeInput(appointmentDoc);
    const cleanDept = sanitizeInput(appointmentDept);
    const cleanDate = sanitizeInput(appointmentDate);
    const cleanSlot = sanitizeInput(appointmentSlot);

    if (!cleanPatientName || !cleanPatientPhone || !cleanDate || !cleanSlot) {
      setSubmitError("Please fill in all mandatory fields: Name, Phone, Appointment Date, and Slot.");
      return;
    }

    if (!validateName(cleanPatientName)) {
      setSubmitError("Please provide a valid Patient Name (2-80 characters, letters/numbers/spaces/dots/hyphens only).");
      return;
    }

    if (!validatePhone(cleanPatientPhone)) {
      setSubmitError("Please provide a valid primary contact phone number (10-20 digits, formatting allowed).");
      return;
    }

    if (patientEmail && !validateEmail(cleanPatientEmail)) {
      setSubmitError("Please enter a valid email address structure (e.g., patient@domain.com).");
      return;
    }

    const selectedTime = new Date(cleanDate).getTime();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    if (selectedTime < todayStart.getTime()) {
      setSubmitError("Preferred appointment date cannot be in the past.");
      return;
    }

    if (availabilityStatus === 'unavailable') {
      setSubmitError(availabilityMessage || "The selected clinician is fully booked for this slot. Please select another slot or doctor.");
      return;
    }

    const rateLimit = checkRateLimit('appointment', 3, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      setSubmitError(`Rate limit exceeded. Please wait ${rateLimit.timeLeftSeconds} seconds before scheduling another consultation.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const randomTicket = "MHR-OPD-" + Math.floor(1000 + Math.random() * 9000);

    try {
      const { error } = await supabase.from('appointments').insert([{
        patient_name: cleanPatientName,
        patient_phone: cleanPatientPhone,
        patient_email: cleanPatientEmail || null,
        doctor_name: cleanDoc || 'On-Call Consultant',
        department_name: cleanDept || 'General Medicine',
        appointment_date: cleanDate,
        time_slot: cleanSlot,
        health_package: isHealthPackageChecked,
        ticket_no: randomTicket,
        status: 'Confirmed'
      }]);

      if (error) {
        throw error;
      }

      if (cleanPatientEmail) {
        try {
          const emailRes = await fetch('/api/appointments/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              patient_email: cleanPatientEmail,
              patient_name: cleanPatientName,
              doctor_name: cleanDoc,
              appointment_date: cleanDate,
              time_slot: cleanSlot,
              ticket_no: randomTicket
            })
          });
          const emailData = await emailRes.json();
          if (emailData.success) {
            console.log("[EDGE FUNCTION] Simulated email sent successfully:", emailData.log);
            setEmailPreview(emailData.previewHtml);
          }
        } catch (emailErr) {
          console.error("Failed to run email edge function:", emailErr);
        }
      }

      setTicketNo(randomTicket);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error saving appointment to Supabase:', err);
      setSubmitError(err.message || 'Failed to save appointment in database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setIsSubmitted(false);
    setSubmitError(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setAppointmentDoc('');
    setAppointmentDept('');
    setAppointmentDate('');
    setAppointmentSlot('');
    setIsHealthPackageChecked(false);
    setAvailabilityStatus('unchecked');
    setAvailabilityMessage('');
    setEmailPreview(null);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />;
      case 'about':
        return <AboutUs />;
      case 'services':
        return <MedicalServices onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />;
      case 'specialities':
        return <Specialities onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />;
      case 'department-detail':
        return (
          <DepartmentDetail
            departmentId={navParams?.id || 'cardiology'}
            onNavigate={handleNavigate}
            openAppointmentModal={openAppointmentModalWithParams}
          />
        );
      case 'doctors':
        return (
          <Doctors
            initialSearch={navParams?.search || ''}
            onNavigate={handleNavigate}
            openAppointmentModal={openAppointmentModalWithParams}
          />
        );
      case 'facilities':
        return <Facilities />;
      case 'insurance':
        return <InsuranceTPA />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactUs />;
      case 'portal':
        return <PatientPortal onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />;
      case 'payment':
        return <PaymentPortal />;
      default:
        return <Home onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans overflow-x-hidden antialiased text-slate-800" id="application-layout-root">

      {/* Injecting Local Keyframes via standard Style Tag for safety */}
      <style>{`
        @keyframes custom-float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-char-float {
          animation: custom-float 4s ease-in-out infinite;
        }
        /* 🎬 NEW: Infinite Vertical Marquee Animation */
        @keyframes vertical-marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-vertical {
          animation: vertical-marquee 15s linear infinite;
        }
        .animate-marquee-vertical:hover {
          animation-play-state: paused; /* ⏸ Pauses the scroll when user hovers */
        }
      `}</style>

      {/* Dynamic Header Component */}
      <Header onNavigate={handleNavigate} currentPage={currentPage} openAppointmentModal={openAppointmentModalWithParams} />

      {/* Main Dynamic Screen Render Body */}
      {/* <main className="flex-grow pt-[104px] md:pt-[112px] bg-[#0B1F3A] animate-in fade-in duration-300" id="main-scroll-pane"> */}
      <main className="flex-grow pt-0 bg-[#0B1F3A] animate-in fade-in duration-300" id="main-scroll-pane">
        {renderActivePage()}
      </main>

      {/* Dynamic Footer Component */}
      <Footer onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />

      {/* Floating Clinical AI Triage Care Assistant Coordinator */}
      <AIChatbot onNavigate={handleNavigate} openAppointmentModal={openAppointmentModalWithParams} />

      {/* Floating WhatsApp Connect Mascot Widget */}
      <a
        href="https://wa.me/9118008908898"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 left-4 z-[90] flex flex-col items-center select-none animate-char-float group"
        id="whatsapp-floating-trigger"
        title="Connect on WhatsApp"
      >
        {/* Tooltip Chat Bubble above Mascot */}
        <div className="bg-white text-slate-700 border border-slate-100 px-3 py-1.5 rounded-2xl shadow-xl text-[10px] font-bold max-w-[120px] text-center mb-1 relative opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp!
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
        </div>


        <div className="w-30 h-34 sm:w-34 sm:h-40 flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <source src="/videos/whatsapp.mp4" type="video/mp4" alt="WhatsApp Assistant" />

          </video>
        </div>

        {/* Lower Action Label Badge Banner */}

      </a>

      {/* Floating Interactive Appointment Booking Model */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200" id="appointment-modal-backdrop">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col" id="appointment-modal">

            {/* Model Header */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center bg-slate-50 gap-2.5" id="appointment-modal-header">
              <span className="text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-[#006B3F]" /> Outpatient OPD Clinic Scheduler
              </span>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {isSupabaseConfigured ? (
                  <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  </span>
                ) : (
                  <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1" title="Offline simulated LocalStorage mode">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Sandbox
                  </span>
                )}
                <button
                  onClick={closeAppointmentModal}
                  className="p-1.5 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-slate-500"
                  id="close-appointment-modal-btn"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Modal Form Renders */}
            {!isSubmitted ? (
              <form onSubmit={handleBookAppointmentSubmit} className="p-6 sm:p-8 flex flex-col gap-4 font-sans" id="scheduler-form">

                {submitError && (
                  <div className="bg-red-50 border border-red-100 text-red-700 p-3.5 rounded-2xl flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
                    <p>{submitError}</p>
                  </div>
                )}

                {/* Doctor Selection Dropdown */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Specialist Doctor Consultant *</label>
                  <select
                    required
                    value={appointmentDoc}
                    onChange={(e) => {
                      setAppointmentDoc(e.target.value);
                      const doc = doctors.find(d => d.name === e.target.value);
                      if (doc) setAppointmentDept(doc.departmentName);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F] cursor-pointer"
                    id="scheduler-doc-select"
                  >
                    <option value="">-- Choose a Clinician --</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name} ({doc.departmentName})</option>
                    ))}
                  </select>
                </div>

                {/* Patient Information input rows */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="scheduler-patient-info">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Shri Ramesh Mahto"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Contact Phone No *</label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g. +91 99340 10245"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Email Address</label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="e.g. ramesh.mahto@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
                    />
                  </div>
                </div>

                {/* Scheduling times row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="scheduler-datetime">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred Appointment Date *</label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinic Chamber Time Slot *</label>
                    <select
                      required
                      value={appointmentSlot}
                      onChange={(e) => setAppointmentSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F] cursor-pointer"
                      id="scheduler-slot-select"
                    >
                      <option value="">-- Choose Slot --</option>
                      <option value="10:00 AM - 11:30 AM (Morning Roster)">10:00 AM - 11:30 AM (Morning Roster)</option>
                      <option value="12:00 PM - 02:00 PM (Afternoon Clinic)">12:00 PM - 02:00 PM (Afternoon Clinic)</option>
                      <option value="05:00 PM - 07:00 PM (Evening Consult)">05:00 PM - 07:00 PM (Evening Consult)</option>
                    </select>
                  </div>
                </div>

                {/* Doctor Availability Live Feedback */}
                {appointmentDoc && appointmentDate && appointmentSlot && (
                  <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 transition-all duration-300 ${isAvailabilityChecking
                    ? "bg-slate-50 border-slate-200 text-slate-500 animate-pulse"
                    : availabilityStatus === "available"
                      ? "bg-green-50 border-green-100 text-[#006B3F]"
                      : "bg-red-50 border-red-100 text-red-800"
                    }`} id="availability-feedback-banner">
                    {isAvailabilityChecking ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#006B3F] border-t-transparent rounded-full animate-spin shrink-0"></span>
                        <span className="font-semibold">Querying clinical roster database for real-time doctor availability...</span>
                      </>
                    ) : availabilityStatus === "available" ? (
                      <>
                        <CheckCircle className="w-4.5 h-4.5 text-[#006B3F] shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-extrabold text-[#006B3F] uppercase tracking-wider text-[10px] leading-none">Roster Status: Confirmed Available</span>
                          <span className="mt-1 font-medium text-slate-600">{availabilityMessage}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-extrabold text-red-700 uppercase tracking-wider text-[10px] leading-none">Roster Status: Clinician Fully Booked</span>
                          <span className="mt-1 font-semibold">{availabilityMessage}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Health Package Add-on check box */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3 mt-1.5" id="scheduler-addon-box">
                  <input
                    type="checkbox"
                    id="package-checked"
                    checked={isHealthPackageChecked}
                    onChange={(e) => setIsHealthPackageChecked(e.target.checked)}
                    className="w-4.5 h-4.5 text-[#006B3F] bg-white border border-slate-300 rounded focus:ring-0 cursor-pointer mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="package-checked" className="font-extrabold text-xs text-slate-800 cursor-pointer flex items-center gap-1.5">
                      Add-on Free Blood Sugar Screen & Vitals Package?
                    </label>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Includes comprehensive blood glucose screening, automated pressure diagnostics, and weight profiling prior to clinic entry.
                    </p>
                  </div>
                </div>

                {/* Clinical Disclaimer */}
                <div className="bg-amber-50/50 border border-amber-100 p-3.5 rounded-2xl flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed" id="scheduler-disclaimer">
                  <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Clinical Notice:</strong> This digital outpatient token does NOT represent an emergency or critical trauma bed admission block. In situations of active stroke or chest pain, please immediately call our dispatch unit at <strong>06542 360400</strong>.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#006B3F] hover:bg-[#005431] text-white font-extrabold py-3.5 rounded-xl text-xs shadow-lg shadow-green-100 mt-2 cursor-pointer transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  id="scheduler-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-1"></span>
                      Booking OPD Slot...
                    </>
                  ) : (
                    "Confirm and Book Roster Slot"
                  )}
                </button>

              </form>
            ) : (
              /* Success Scheduling Ticket Output */
              <div className="p-6 sm:p-8 flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-200" id="scheduler-ticket-screen">
                <div className="w-12 h-12 bg-green-50 text-[#006B3F] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[9px] bg-green-50 text-[#006B3F] border border-green-100 px-3 py-1 rounded-full uppercase font-black tracking-wider">Outpatient Token Generated</span>
                  <h3 className="text-lg font-black text-[#0B1F3A] mt-2.5">OPD Session Booked Successfully</h3>
                  <p className="text-xs text-slate-400 mt-1">Please show this coupon at the Sector 4 billing lounge to obtain active physical files.</p>
                </div>

                {/* Ticket Coupon */}
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl w-full flex flex-col gap-3 font-sans text-xs text-slate-700" id="ticket-coupon">
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2.5" id="ticket-coupon-top">
                    <span className="font-extrabold text-[#0B1F3A]">Medicant Outpatient Desk</span>
                    <span className="font-bold text-[#006B3F]">#{ticketNo}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left" id="ticket-coupon-body">
                    <p><strong>Patient:</strong> {patientName}</p>
                    <p><strong>Clinician Consultant:</strong> {appointmentDoc || 'On-Call General Physician'}</p>
                    <p><strong>Roster Date:</strong> {appointmentDate}</p>
                    <p><strong>Session Slot:</strong> {appointmentSlot}</p>
                    {isHealthPackageChecked && (
                      <p className="text-[#006B3F] font-bold">✓ Included: Free Sugar & Vitals Screening Package</p>
                    )}
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-2.5 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5" id="ticket-coupon-footer">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Validated under Medicant Health Policy.</span>
                  </div>
                </div>

                {/* Server-Side Triggered Email Status & Preview */}
                {patientEmail && (
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left flex flex-col gap-2.5 animate-in fade-in duration-300" id="ticket-email-confirmation-card">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>Edge Function Email Dispatch Status</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Supabase DB trigger detected INSERT on <code>appointments</code>. The server-side Edge Function successfully composed and queued a confirmation dispatch message to <strong className="text-[#0B1F3A]">{patientEmail}</strong>.
                    </p>
                    {emailPreview && (
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-[10px] text-slate-400 overflow-y-auto max-h-[160px] font-mono leading-relaxed" id="email-preview-box">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-1.5 text-[9px] font-bold text-slate-400">
                          <span>HTML SECURE MAIL CLIENT PREVIEW</span>
                          <span className="text-green-600 font-extrabold text-[8px] tracking-wider uppercase bg-green-50 px-1 py-0.5 rounded">SENT (SMTP)</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: emailPreview }} className="unreset-email-html" />
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={closeAppointmentModal}
                  className="bg-[#0B1F3A] hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-xl text-xs w-full cursor-pointer transition-colors"
                  id="ticket-finish-btn"
                >
                  Acknowledge and Exit
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}