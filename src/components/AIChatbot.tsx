// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   MessageSquare, X, Send, Heart, Calendar,
//   Phone, AlertTriangle, ArrowRight, Sparkles
// } from 'lucide-react';
// import { doctors, departments, hospitalInfo } from '../data/hospitalData';

// interface Message {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: Date;
//   action?: {
//     type: 'appointment' | 'call' | 'navigate';
//     label: string;
//     target: string;
//   };
// }

// interface AIChatbotProps {
//   onNavigate: (page: string, params?: any) => void;
//   openAppointmentModal: () => void;
// }

// export default function AIChatbot({ onNavigate, openAppointmentModal }: AIChatbotProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Initialize with a warm welcome message
//   useEffect(() => {
//     if (messages.length === 0) {
//       setMessages([
//         {
//           id: 'welcome',
//           sender: 'assistant',
//           text: "Hello! I am Medibot, your Medicant Care Coordinator. 🩺\n\nHow can I assist you today? I can help you find specialist doctors, match symptoms to clinical departments, find OPD timings, or book an appointment.",
//           timestamp: new Date()
//         }
//       ]);
//     }
//   }, []);

//   // Scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isTyping]);

//   const quickReplies = [
//     { text: "📅 Book Appointment", value: "book_appointment" },
//     { text: "⏰ OPD Timings", value: "opd_timings" },
//     { text: "❤️ Cardiology Care", value: "cardiology" },
//     { text: "🚨 Emergency Contacts", value: "emergency" }
//   ];

//   const processResponse = (userInput: string) => {
//     setIsTyping(true);
//     const delay = Math.min(1000 + userInput.length * 5, 2000); // Dynamic typing delay

//     setTimeout(() => {
//       const lowerInput = userInput.toLowerCase();
//       let replyText = "";
//       let action: any = undefined;

//       // Clinical triage & symptom mapping
//       if (lowerInput.includes('appoint') || lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('register')) {
//         replyText = "I can certainly assist with booking your appointment! You can use our secure online patient scheduler to choose your preferred specialist, select an available date, and book instant outpatient slots.";
//         action = {
//           type: 'appointment',
//           label: 'Open Scheduler Now',
//           target: ''
//         };
//       } else if (lowerInput.includes('opd') || lowerInput.includes('timing') || lowerInput.includes('schedule') || lowerInput.includes('time')) {
//         replyText = "Medicant Hospital Outpatient Department (OPD) is active Monday through Saturday. Revise slots below:\n\n• General OPD slot: 9:00 AM – 1:00 PM and 3:00 PM – 7:00 PM.\n• 24/7 Emergency & Trauma is always open.\n\nWhich department doctors are you looking to consult?";
//       } else if (lowerInput.includes('heart') || lowerInput.includes('chest') || lowerInput.includes('cardio') || lowerInput.includes('cardiology')) {
//         replyText = "For cardiovascular symptoms, chest pain, or high blood pressure, you should consult the Department of Cardiology.\n\nOur Chief Interventional Cardiologist is Dr. Arindam Sen (MBBS, MD, DM - AIIMS New Delhi), offering OPD on Mon-Fri (10 AM - 2 PM) and Sat (10 AM - 1 PM).";
//         action = {
//           type: 'navigate',
//           label: 'View Doctor Profile',
//           target: 'arindam-sen'
//         };
//       } else if (lowerInput.includes('preg') || lowerInput.includes('gyne') || lowerInput.includes('baby') || lowerInput.includes('deliver') || lowerInput.includes('gynae')) {
//         replyText = "For high-risk pregnancies, gynecological check-ups, and painless delivery services, our Obstetrics & Gynecology department is here to support you.\n\nSenior Consultant: Dr. Moumita Roy, available Mon-Sat (11:00 AM - 3:00 PM) at our premium labor suites.";
//         action = {
//           type: 'navigate',
//           label: 'View Gynecology Doctor',
//           target: 'moumita-roy'
//         };
//       } else if (lowerInput.includes('bone') || lowerInput.includes('joint') || lowerInput.includes('fracture') || lowerInput.includes('knee') || lowerInput.includes('ortho')) {
//         replyText = "For joint replacement, severe fractures, or back pain, our Orthopedics department has advanced laminar flow OTs and post-op rehab centers.\n\nWe recommend consulting Dr. Kaustav De (Joint Replacement Specialist), available Mon-Sat (12:00 PM - 4:00 PM).";
//         action = {
//           type: 'navigate',
//           label: 'View Orthopedics Doctor',
//           target: 'kaustav-de'
//         };
//       } else if (lowerInput.includes('brain') || lowerInput.includes('headache') || lowerInput.includes('spine') || lowerInput.includes('paralysis') || lowerInput.includes('neuro')) {
//         replyText = "Neurological and spinal health is managed by our Neurology & Neurosurgery division.\n\nChief Neurosurgeon: Dr. Subhajit Paul (MBBS, MS, MCh - NIMHANS), available Mon-Fri (10:00 AM - 4:00 PM) for consultation.";
//         action = {
//           type: 'navigate',
//           label: 'View Neuro Specialist',
//           target: 'subhajit-paul'
//         };
//       } else if (lowerInput.includes('child') || lowerInput.includes('pediatr') || lowerInput.includes('kid') || lowerInput.includes('infant')) {
//         replyText = "For children's health, immunization schedules, and neonatal critical care (NICU), our Pediatrics department has round-the-clock level-3 neonatologists.\n\nConsultant: Dr. Ipsita Ghosh, available Mon-Sat (10:00 AM - 1:00 PM).";
//         action = {
//           type: 'navigate',
//           label: 'View Pediatrician',
//           target: 'ipsita-ghosh'
//         };
//       } else if (lowerInput.includes('emergency') || lowerInput.includes('accident') || lowerInput.includes('help') || lowerInput.includes('call') || lowerInput.includes('icu') || lowerInput.includes('ambulance')) {
//         replyText = "🚨 EMERGENCY NOTICE: For immediate life support or ambulance dispatch, call our dedicated 24/7 helpdesks:\n\n• Toll Free: 1800 890 8898\n• Emergency Landline: 06542 360400\n\nOur Advanced Cardiac Life Support (ALS) ambulances are ready to respond.";
//         action = {
//           type: 'call',
//           label: 'Call 1800 890 8898',
//           target: '18008908898'
//         };
//       } else if (lowerInput.includes('insurance') || lowerInput.includes('tpa') || lowerInput.includes('cashless') || lowerInput.includes('ayushman')) {
//         replyText = "Medicant Hospital supports major insurance/TPA platforms, including Ayushman Bharat (PM-JAY), Apollo Munich, Niva Bupa, Care Health, HDFC ERGO, and PSU corporate ties like SAIL, Coal India, and BSNL. We provide seamless cashless treatments.";
//         action = {
//           type: 'navigate',
//           label: 'View Insurance Partners',
//           target: 'insurance'
//         };
//       } else if (lowerInput.includes('contact') || lowerInput.includes('address') || lowerInput.includes('location') || lowerInput.includes('map') || lowerInput.includes('where')) {
//         replyText = `Medicant Hospital & Research Centre is located at:\nBIADA Housing Colony, Ritudih, Bokaro, Jharkhand 827012.\n\nWe have a large campus with diagnostic labs, pharmacy, and emergency wings open 24 hours.`;
//         action = {
//           type: 'navigate',
//           label: 'View Contact Page',
//           target: 'contact'
//         };
//       } else {
//         replyText = "I appreciate your message! I recommend consulting one of our specialist doctors for personalized clinical feedback.\n\nWhich medical department or health issue would you like to explore? (e.g. Cardiology, Gynecology, Orthopedics, Pediatrics, Neurology, Surgery, or Emergency).";
//       }

//       setMessages(prev => [
//         ...prev,
//         {
//           id: Math.random().toString(),
//           sender: 'assistant',
//           text: replyText,
//           timestamp: new Date(),
//           action
//         }
//       ]);
//       setIsTyping(false);
//     }, delay);
//   };

//   const handleSend = (textToSend: string) => {
//     if (!textToSend.trim()) return;

//     // Add user message
//     const newMsg: Message = {
//       id: Math.random().toString(),
//       sender: 'user',
//       text: textToSend,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, newMsg]);
//     setInput('');
//     processResponse(textToSend);
//   };

//   const handleQuickReply = (reply: { text: string; value: string }) => {
//     if (reply.value === 'book_appointment') {
//       handleSend("Book an Appointment");
//     } else if (reply.value === 'opd_timings') {
//       handleSend("What are the OPD Timings?");
//     } else if (reply.value === 'cardiology') {
//       handleSend("Tell me about Cardiology care and cardiologist doctor");
//     } else if (reply.value === 'emergency') {
//       handleSend("I need Emergency Help & Ambulance numbers");
//     }
//   };

//   const handleAction = (action: { type: string; label: string; target: string }) => {
//     if (action.type === 'appointment') {
//       openAppointmentModal();
//     } else if (action.type === 'call') {
//       window.location.href = `tel:${action.target}`;
//     } else if (action.type === 'navigate') {
//       if (action.target === 'insurance' || action.target === 'contact') {
//         onNavigate(action.target);
//       } else {
//         // Navigate to doctors search or specific doctor
//         const doc = doctors.find(d => d.id === action.target);
//         if (doc) {
//           onNavigate('doctors', { search: doc.name });
//         } else {
//           onNavigate('doctors');
//         }
//       }
//     }
//   };

//   return (
//     <>
//       {/* Floating Circular Trigger */}
//       {/* <div className="fixed bottom-6 right-6 z-[100]" id="floating-bot-trigger">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`w-14 h-14 bg-gradient-to-tr from-[#006B3F] to-[#16A34A] rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative group cursor-pointer border border-green-100 ${
//             isOpen ? 'rotate-90' : ''
//           }`}
//           aria-label="Ask Medibot"
//         >
//           {isOpen ? (
//             <X className="w-6 h-6 stroke-[2.5]" />
//           ) : (
//             <>
//               <MessageSquare className="w-6 h-6 stroke-[2.5] fill-green-500/10" />
//               <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5" id="notification-badge">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-red-500 text-[9px] text-white font-bold items-center justify-center">1</span>
//               </span>
//             </>
//           )}
//           {/* Tooltip */}
//       {/* {!isOpen && (
//             <div className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg font-medium flex items-center gap-1">
//               <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
//               Need Help? Ask Medibot
//             </div>
//           )}
//         </button>
//       </div> */}
//       {/* Floating MediBot Mascot Trigger Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-0 right-4 z-[90] flex flex-col items-center select-none animate-char-float group cursor-pointer focus:outline-none"
//           id="medibot-floating-trigger"
//         >
//           {/* Interactive Help Prompt Text Bubble */}
//           <div className="bg-white text-[#0B1F3A] border border-slate-100 px-3 py-1.5 rounded-2xl shadow-xl text-[10px] font-black max-w-[130px] text-center mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
//             ✨ Need Help? Ask Me!
//             {/* Bubble tail */}
//             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
//           </div>

//           {/* MediBot Character Avatar Asset Box */}
//           <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center overflow-hidden">
//             <img
//               src="/medibot-mascot.png" /* Ensure your new companion image is placed in public folder */
//               alt="MediBot Clinical Coordinator"
//               className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
//               referrerPolicy="no-referrer"
//             />
//           </div>

//           {/* Bottom Status Ribbon */}
//           <span className="bg-[#006B3F] text-white text-[9px] font-extrabold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider -mt-2 mb-2 flex items-center gap-1">
//             <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span> MediBot
//           </span>
//         </button>
//       )}


//       {/* Slide-out Chat Panel */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[75vh] max-h-[600px] bg-white rounded-2xl border border-slate-100 shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 font-sans" id="chatbot-panel">

//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#006B3F] to-[#0B1F3A] p-4 text-white flex justify-between items-center" id="chatbot-header">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
//                 <img src="/images/MediBot.png" alt="Medibot Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
//               </div>
//               <div>
//                 <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
//                   Medibot Coordinator
//                   <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
//                 </h4>
//                 <p className="text-[10px] text-slate-300">Medicant Hospital Assistant</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
//               id="close-chatbot-btn"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Medical Disclaimer Banner */}
//           <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-start gap-2 text-[10px] text-yellow-800" id="chatbot-disclaimer">
//             <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5 animate-bounce" />
//             <p className="leading-tight">
//               <strong>Patient Disclaimer:</strong> Medibot is for clinical informational triage only. For medical emergencies, please call our 24/7 helpline immediately or visit the ER.
//             </p>
//           </div>

//           {/* Chat Logs */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chat-logs">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
//                   }`}
//                 id={`chat-msg-${msg.id}`}
//               >
//                 <div
//                   className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
//                       ? 'bg-[#006B3F] text-white rounded-tr-none shadow-md'
//                       : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
//                     }`}
//                 >
//                   {msg.text}

//                   {/* Attachment CTA Buttons */}
//                   {msg.action && (
//                     <div className="mt-3 pt-2.5 border-t border-slate-100/50 flex" id="msg-cta-container">
//                       <button
//                         onClick={() => handleAction(msg.action!)}
//                         className={`text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all w-full justify-center ${msg.sender === 'user'
//                             ? 'bg-white text-[#006B3F] hover:bg-slate-100'
//                             : 'bg-green-50 text-[#006B3F] hover:bg-[#006B3F] hover:text-white border border-green-200'
//                           }`}
//                         id="msg-cta-action"
//                       >
//                         {msg.action.type === 'appointment' && <Calendar className="w-3.5 h-3.5" />}
//                         {msg.action.type === 'call' && <Phone className="w-3.5 h-3.5" />}
//                         {msg.action.label}
//                         <ArrowRight className="w-3 h-3" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-[9px] text-slate-400 mt-1 px-1">
//                   {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//               </div>
//             ))}

//             {isTyping && (
//               <div className="flex items-center gap-2 mr-auto" id="typing-indicator">
//                 <div className="bg-white rounded-full px-4 py-2 border border-slate-100 shadow-sm flex items-center gap-1.5 text-xs text-slate-400">
//                   <span>Care Coordinator is thinking</span>
//                   <div className="flex gap-1">
//                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
//                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
//                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick replies */}
//           {messages.length < 5 && (
//             <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-thin" id="quick-replies">
//               {quickReplies.map((reply) => (
//                 <button
//                   key={reply.value}
//                   onClick={() => handleQuickReply(reply)}
//                   className="bg-slate-50 hover:bg-green-50 hover:text-[#006B3F] hover:border-green-200 border border-slate-200 text-slate-700 text-xs px-3.5 py-1.5 rounded-full transition-all font-medium cursor-pointer"
//                   id={`quick-reply-${reply.value}`}
//                 >
//                   {reply.text}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Input Box */}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSend(input);
//             }}
//             className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center"
//             id="chatbot-input-form"
//           >
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Describe your symptoms or ask a question..."
//               className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#006B3F] text-slate-800"
//               id="chatbot-text-input"
//             />
//             <button
//               type="submit"
//               disabled={!input.trim()}
//               className="w-10 h-10 bg-[#006B3F] disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center shadow-md shadow-green-100 hover:bg-[#005431] transition-all cursor-pointer"
//               id="chatbot-send-btn"
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </form>

//         </div>
//       )}
//     </>
//   );
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  X, Send, Calendar, Phone, AlertTriangle, ArrowRight
} from 'lucide-react';
import { doctors, hospitalInfo } from '../data/hospitalData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  action?: {
    type: 'appointment' | 'call' | 'navigate';
    label: string;
    target: string;
  };
}

interface AIChatbotProps {
  onNavigate: (page: string, params?: any) => void;
  openAppointmentModal: () => void;
}

export default function AIChatbot({ onNavigate, openAppointmentModal }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: "Hello! I am Medibot, your Medicant Care Coordinator. 🩺\n\nHow can I assist you today? I can help you find specialist doctors, match symptoms to clinical departments, find OPD timings, or book an appointment.",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickReplies = [
    { text: "📅 Book Appointment", value: "book_appointment" },
    { text: "⏰ OPD Timings", value: "opd_timings" },
    { text: "❤️ Cardiology Care", value: "cardiology" },
    { text: "🚨 Emergency Contacts", value: "emergency" }
  ];

  const processResponse = (userInput: string) => {
    setIsTyping(true);
    const delay = Math.min(1000 + userInput.length * 5, 2000);

    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let replyText = "";
      let action: any = undefined;

      if (lowerInput.includes('appoint') || lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('register')) {
        replyText = "I can certainly assist with booking your appointment! You can use our secure online patient scheduler to choose your preferred specialist, select an available date, and book instant outpatient slots.";
        action = {
          type: 'appointment',
          label: 'Open Scheduler Now',
          target: ''
        };
      } else if (lowerInput.includes('opd') || lowerInput.includes('timing') || lowerInput.includes('schedule') || lowerInput.includes('time')) {
        replyText = "Medicant Hospital Outpatient Department (OPD) is active Monday through Saturday. Revise slots below:\n\n• General OPD slot: 9:00 AM – 1:00 PM and 3:00 PM – 7:00 PM.\n• 24/7 Emergency & Trauma is always open.\n\nWhich department doctors are you looking to consult?";
      } else if (lowerInput.includes('heart') || lowerInput.includes('chest') || lowerInput.includes('cardio') || lowerInput.includes('cardiology')) {
        replyText = "For cardiovascular symptoms, chest pain, or high blood pressure, you should consult the Department of Cardiology.\n\nOur Chief Interventional Cardiologist is Dr. Arindam Sen (MBBS, MD, DM - AIIMS New Delhi), offering OPD on Mon-Fri (10 AM - 2 PM) and Sat (10 AM - 1 PM).";
        action = {
          type: 'navigate',
          label: 'View Doctor Profile',
          target: 'arindam-sen'
        };
      } else if (lowerInput.includes('preg') || lowerInput.includes('gyne') || lowerInput.includes('baby') || lowerInput.includes('deliver') || lowerInput.includes('gynae')) {
        replyText = "For high-risk pregnancies, gynecological check-ups, and painless delivery services, our Obstetrics & Gynecology department is here to support you.\n\nSenior Consultant: Dr. Moumita Roy, available Mon-Sat (11:00 AM - 3:00 PM) at our premium labor suites.";
        action = {
          type: 'navigate',
          label: 'View Gynecology Doctor',
          target: 'moumita-roy'
        };
      } else if (lowerInput.includes('bone') || lowerInput.includes('joint') || lowerInput.includes('fracture') || lowerInput.includes('knee') || lowerInput.includes('ortho')) {
        replyText = "For joint replacement, severe fractures, or back pain, our Orthopedics department has advanced laminar flow OTs and post-op rehab centers.\n\nWe recommend consulting Dr. Kaustav De (Joint Replacement Specialist), available Mon-Sat (12:00 PM - 4:00 PM).";
        action = {
          type: 'navigate',
          label: 'View Orthopedics Doctor',
          target: 'kaustav-de'
        };
      } else if (lowerInput.includes('brain') || lowerInput.includes('headache') || lowerInput.includes('spine') || lowerInput.includes('paralysis') || lowerInput.includes('neuro')) {
        replyText = "Neurological and spinal health is managed by our Neurology & Neurosurgery division.\n\nChief Neurosurgeon: Dr. Subhajit Paul (MBBS, MS, MCh - NIMHANS), available Mon-Fri (10:00 AM - 4:00 PM) for consultation.";
        action = {
          type: 'navigate',
          label: 'View Neuro Specialist',
          target: 'subhajit-paul'
        };
      } else if (lowerInput.includes('child') || lowerInput.includes('pediatr') || lowerInput.includes('kid') || lowerInput.includes('infant')) {
        replyText = "For children's health, immunization schedules, and neonatal critical care (NICU), our Pediatrics department has round-the-clock level-3 neonatologists.\n\nConsultant: Dr. Ipsita Ghosh, available Mon-Sat (10:00 AM - 1:00 PM).";
        action = {
          type: 'navigate',
          label: 'View Pediatrician',
          target: 'ipsita-ghosh'
        };
      } else if (lowerInput.includes('emergency') || lowerInput.includes('accident') || lowerInput.includes('help') || lowerInput.includes('call') || lowerInput.includes('icu') || lowerInput.includes('ambulance')) {
        replyText = "🚨 EMERGENCY NOTICE: For immediate life support or ambulance dispatch, call our dedicated 24/7 helpdesks:\n\n• Toll Free: 1800 890 8898\n• Emergency Landline: 06542 360400\n\nOur Advanced Cardiac Life Support (ALS) ambulances are ready to respond.";
        action = {
          type: 'call',
          label: 'Call 1800 890 8898',
          target: '18008908898'
        };
      } else if (lowerInput.includes('insurance') || lowerInput.includes('tpa') || lowerInput.includes('cashless') || lowerInput.includes('ayushman')) {
        replyText = "Medicant Hospital supports major insurance/TPA platforms, including Ayushman Bharat (PM-JAY), Apollo Munich, Niva Bupa, Care Health, HDFC ERGO, and PSU corporate ties like SAIL, Coal India, and BSNL. We provide seamless cashless treatments.";
        action = {
          type: 'navigate',
          label: 'View Insurance Partners',
          target: 'insurance'
        };
      } else if (lowerInput.includes('contact') || lowerInput.includes('address') || lowerInput.includes('location') || lowerInput.includes('map') || lowerInput.includes('where')) {
        replyText = `Medicant Hospital & Research Centre is located at:\nBIADA Housing Colony, Ritudih, Bokaro, Jharkhand 827012.\n\n We have a large campus with diagnostic labs, pharmacy, and emergency wings open 24 hours.`;
        action = {
          type: 'navigate',
          label: 'View Contact Page',
          target: 'contact'
        };
      } else {
        replyText = "I appreciate your message! I recommend consulting one of our specialist doctors for personalized clinical feedback.\n\nWhich medical department or health issue would you like to explore? (e.g. Cardiology, Gynecology, Orthopedics, Pediatrics, Neurology, Surgery, or Emergency).";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date(),
          action
        }
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    processResponse(textToSend);
  };

  const handleQuickReply = (reply: { text: string; value: string }) => {
    if (reply.value === 'book_appointment') {
      handleSend("Book an Appointment");
    } else if (reply.value === 'opd_timings') {
      handleSend("What are the OPD Timings?");
    } else if (reply.value === 'cardiology') {
      handleSend("Tell me about Cardiology care and cardiologist doctor");
    } else if (reply.value === 'emergency') {
      handleSend("I need Emergency Help & Ambulance numbers");
    }
  };

  const handleAction = (action: { type: string; label: string; target: string }) => {
    if (action.type === 'appointment') {
      openAppointmentModal();
    } else if (action.type === 'call') {
      window.location.href = `tel:${action.target}`;
    } else if (action.type === 'navigate') {
      if (action.target === 'insurance' || action.target === 'contact') {
        onNavigate(action.target);
      } else {
        const doc = doctors.find(d => d.id === action.target);
        if (doc) {
          onNavigate('doctors', { search: doc.name });
        } else {
          onNavigate('doctors');
        }
      }
    }
  };

  return (
    <>
      {/* Floating Animated MediBot Mascot Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 right-4 z-[90] flex flex-col items-center select-none animate-char-float group cursor-pointer focus:outline-none"
          id="medibot-floating-trigger"
        >
          {/* Tooltip Prompt Chat Bubble */}
          <div className="bg-white text-[#0B1F3A] border border-slate-100 px-3 py-1.5 rounded-2xl shadow-xl text-[10px] font-black max-w-[130px] text-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none relative">
            <span>👋Hi, I'm MediBot.</span>
            <span>Need help?</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
          </div>

          <div className="w-36 h-42 sm:w-42 sm:h-50 flex items-center justify-center overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
            >
              <source src="/videos/medibot.mp4" type="video/mp4" alt="MediBot Assistant" />
            </video>
          </div>
        </button>
      )}

      {/* Slide-out Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[75vh] max-h-[600px] bg-white rounded-2xl border border-slate-100 shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 font-sans" id="chatbot-panel">

          {/* Header Bar using Premium Character Logo */}
          <div className="bg-gradient-to-r from-[#006B3F] to-[#0B1F3A] p-4 text-white flex justify-between items-center" id="chatbot-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
                <img
                  src="/images/medibot.png"
                  alt="MediBot Avatar"
                  className="w-full h-full object-contain pt-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  MediBot
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-slate-300">Medicant AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              id="close-chatbot-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-start gap-2 text-[10px] text-yellow-800" id="chatbot-disclaimer">
            <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5 animate-bounce" />
            <p className="leading-tight">
              <strong>Patient Disclaimer:</strong> Medibot is for clinical informational triage only. For medical emergencies, please call our 24/7 helpline immediately or visit the ER.
            </p>
          </div>

          {/* Chat Logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chat-logs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                id={`chat-msg-${msg.id}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                    ? 'bg-[#006B3F] text-white rounded-tr-none shadow-md'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}
                >
                  {msg.text}

                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100/50 flex" id="msg-cta-container">
                      <button
                        onClick={() => handleAction(msg.action!)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all w-full justify-center ${msg.sender === 'user'
                          ? 'bg-white text-[#006B3F] hover:bg-slate-100'
                          : 'bg-green-50 text-[#006B3F] hover:bg-[#006B3F] hover:text-white border border-green-200'
                          }`}
                        id="msg-cta-action"
                      >
                        {msg.action.type === 'appointment' && <Calendar className="w-3.5 h-3.5" />}
                        {msg.action.type === 'call' && <Phone className="w-3.5 h-3.5" />}
                        {msg.action.label}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 mr-auto" id="typing-indicator">
                <div className="bg-white rounded-full px-4 py-2 border border-slate-100 shadow-sm flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Care Coordinator is thinking</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length < 5 && (
            <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-thin" id="quick-replies">
              {quickReplies.map((reply) => (
                <button
                  key={reply.value}
                  onClick={() => handleQuickReply(reply)}
                  className="bg-slate-50 hover:bg-green-50 hover:text-[#006B3F] hover:border-green-200 border border-slate-200 text-slate-700 text-xs px-3.5 py-1.5 rounded-full transition-all font-medium cursor-pointer"
                  id={`quick-reply-${reply.value}`}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center"
            id="chatbot-input-form"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms or ask a question..."
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#006B3F] text-slate-800"
              id="chatbot-text-input"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 bg-[#006B3F] disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center shadow-md shadow-green-100 hover:bg-[#005431] transition-all cursor-pointer"
              id="chatbot-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div class="text-center text-[10px] text-gray-400 py-2">
            Powered by <span class="font-semibold text-emerald-600">A² Media</span>
          </div>
        </div>
      )}
    </>
  );    
}