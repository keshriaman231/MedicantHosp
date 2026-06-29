export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  image: string;
  qualifications: string;
  experience: string;
  expertise: string[];
  opdTiming: string;
  regNo: string;
  bio: string;
  education: string[];
  awards: string[];
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
}

export interface Department {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  shortDesc: string;
  overview: string;
  services: string[];
  treatments: string[];
  facilities: string[];
  faqs: { question: string; answer: string }[];
  stats: { label: string; value: string }[];
}

export interface Notice {
  id: string;
  date: string;
  month: string;
  title: string;
  category: 'Hospital Updates' | 'Health Camps' | 'Public Notices' | 'Careers';
  isNew: boolean;
  content: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  details: string;
  image: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  category: 'Health & Wellness' | 'Technology' | 'Healthcare' | 'Care' | 'Prevention';
  image: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export const hospitalInfo = {
  name: "Medicant Hospital & Research Centre",
  hindiName: "मेडिकेंट हॉस्पिटल & रिसर्च सेंटर",
  address: "BIADA Housing Colony, Ritudih, Bokaro, Jharkhand 827012",
  phone: "1800 890 8898",
  landline: "06542 360400",
  email: "info@medicanthospital.com",
  emergencyPhone: "+91 6542 360400",
  whatsapp: "+91 18008908898",
  tagline: "Compassionate Care. Advanced Healthcare.",
  socials: {
    facebook: "https://www.facebook.com/medicant",
    twitter: "https://x.com/medicant_info?t=ZQlN6-AGqyNjywzgYkp0XA&s=09",
    instagram: "https://www.instagram.com/medicanthospital?igsh=ZWFkaTVmMWVtM3N6",
    youtube: "https://www.youtube.com/@medicanthospital",
    linkedin: "https://www.linkedin.com/company/medicant-hospital-research-centre/"
  }
};

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    hindiName: "हृदय रोग विभाग",
    icon: "Ribbon",
    shortDesc: "Advanced heart care, angioplasty, pacemaker and structural heart treatments.",
    overview: "The Department of Cardiology at Medicant Hospital & Research Centre offers comprehensive care for all types of heart conditions. Our state-of-the-art diagnostic facilities and expert team of cardiologists ensure precise diagnosis and compassionate, patient-first care.",
    services: [
      "Coronary Angiography & Angioplasty (PCI)",
      "24/7 Primary Angioplasty for Heart Attack",
      "Pacemaker, ICD, and CRT Implantation",
      "Echocardiography (2D & 3D Echo, TEE)",
      "Treadmill Test (TMT) & Holter Monitoring",
      "Pediatric Cardiology & Congenital Heart Care"
    ],
    treatments: [
      "Coronary Artery Disease Management",
      "Heart Failure & Cardiomyopathy Care",
      "Valvular Heart Disease Treatment",
      "Arrhythmia & Electrophysiology",
      "Hypertension & Lipid Disorder Therapy"
    ],
    facilities: [
      "Advanced Siemens Flat Panel Cath Lab",
      "Dedicated Cardiac ICU (CICU)",
      "High-End Non-Invasive Cardiac Lab",
      "Cardiac Rehabilitation Unit"
    ],
    stats: [
      { label: "Patients Treated", value: "15,000+" },
      { label: "Expert Cardiologists", value: "5+" },
      { label: "Years of Excellence", value: "10+" },
      { label: "Success Rate", value: "98.5%" }
    ],
    faqs: [
      {
        question: "When should I consult a Cardiologist?",
        answer: "You should see a cardiologist if you experience chest pain, shortness of breath, dizziness, irregular heartbeats, or if you have a family history of heart disease, high blood pressure, or high cholesterol."
      },
      {
        question: "What is an Angioplasty?",
        answer: "An angioplasty is a minimally invasive procedure used to open blocked heart arteries. A small balloon is inflated at the site of the blockage, and a stent (a tiny wire mesh tube) is usually placed to keep the artery open."
      }
    ]
  },
  {
    id: "oncology",
    name: "Oncology",
    hindiName: "कैंसर रोग विभाग",
    icon: "Ribbon",
    shortDesc: "Comprehensive cancer care, chemotherapy, immunotherapies, and surgical oncology.",
    overview: "The Oncology Department provides comprehensive cancer care using evidence-based medical, surgical, and supportive therapies. Our team works collaboratively to treat various cancers with high precision and care.",
    services: [
      "Chemotherapy & Targeted Drug Therapy",
      "Cancer Immunotherapy & Hormonal Therapy",
      "Surgical Oncology & Tumor Resections",
      "Onco-Pathology & Advanced Diagnostics",
      "Palliative Care & Pain Management"
    ],
    treatments: [
      "Breast, Lung, and Gastrointestinal Cancer Treatment",
      "Gynecological & Head/Neck Oncology",
      "Blood Cancer & Lymphoma Treatment",
      "Surgical management of solid tumors"
    ],
    facilities: [
      "Dedicated Daycare Chemotherapy Ward",
      "Biosafety Cabinets for Safe Chemo Preparation",
      "Advanced Diagnostic Imaging (CT, MRI)",
      "Oncology Intensive Care Unit"
    ],
    stats: [
      { label: "Cancer Survivors", value: "3,500+" },
      { label: "Dedicated Beds", value: "30" },
      { label: "Chemo Sessions/Year", value: "4,000+" },
      { label: "Survival Success Rate", value: "High" }
    ],
    faqs: [
      {
        question: "What support services are available for cancer patients?",
        answer: "We offer dietary counseling, psychological counseling, pain management, and dedicated oncology nursing to support our patients and their families through every phase of treatment."
      }
    ]
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    hindiName: "हड्डी एवं जोड़ रोग विभाग",
    icon: "Activity",
    shortDesc: "Joint replacements, sports injuries, fracture treatment, and spine surgeries.",
    overview: "Our Orthopedic Department offers pioneering treatments for bone and joint disorders, including joint replacement surgeries, arthroscopy, spine care, and pediatric orthopedics.",
    services: [
      "Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "Arthroscopic Keyhole Surgery (ACL/MCL Repair)",
      "Complex Fracture & Trauma Reconstruction",
      "Spine Decompression and Fusion Surgery"
    ],
    treatments: [
      "Osteoarthritis & Rheumatoid Arthritis Management",
      "Sports Injury Rehabilitation",
      "Osteoporosis Detection & Treatment",
      "Pediatric Bone & Joint Correction"
    ],
    facilities: [
      "State-of-the-Art Laminar Flow OT",
      "Advanced Ortho-Navigation Systems",
      "Dedicated Physiotherapy & Rehab Centre",
      "High-Definition C-Arm Imaging"
    ],
    stats: [
      { label: "Joint Replacements", value: "2,000+" },
      { label: "Recovery Rate", value: "99%" },
      { label: "Trauma Care Cases", value: "5,000+" },
      { label: "Specialists", value: "6+" }
    ],
    faqs: [
      {
        question: "How long is recovery after a knee replacement?",
        answer: "Most patients can walk with support on the day after surgery. Independent mobility without a walker usually occurs in 3-4 weeks, with full recovery within 3 months of regular physiotherapy."
      }
    ]
  },
  {
    id: "neurosurgery",
    name: "Neurosurgery & Neurology",
    hindiName: "न्यूरोलॉजी एवं न्यूरोसर्जरी",
    icon: "Brain",
    shortDesc: "Expert brain, spine, stroke, tumor surgery, and neurological care.",
    overview: "Our Neurological sciences department is equipped to handle complex brain tumor extractions, spinal disc therapies, stroke management, epilepsy care, and neurological diagnostics.",
    services: [
      "Microscopic Brain Tumor Surgeries",
      "Minimally Invasive Spine Surgery",
      "Stroke Thrombolysis (24/7)",
      "Epilepsy & Neuromuscular Care",
      "EEG, EMG, and Nerve Conduction Studies"
    ],
    treatments: [
      "Traumatic Brain & Spine Injury Treatment",
      "Aneurysm and AVM Interventions",
      "Parkinson's & Movement Disorder Management",
      "Migraine and Chronic Headache Care"
    ],
    facilities: [
      "Advanced Neuro ICU with Multipara Monitors",
      "Operating Microscope (Carl Zeiss)",
      "Advanced ICU Ventilator Support",
      "Neuro-Rehab Center"
    ],
    stats: [
      { label: "Neuro Surgeries", value: "1,500+" },
      { label: "Stroke Patients Saved", value: "800+" },
      { label: "ICU Beds", value: "15" },
      { label: "Emergency Response", value: "<15 Mins" }
    ],
    faqs: [
      {
        question: "What are the common warning signs of a stroke?",
        answer: "Think BE FAST: Balance loss, Eyesight changes, Facial drooping, Arm weakness, Speech difficulty, and Time to call emergency immediately!"
      }
    ]
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatology",
    hindiName: "शिशु एवं बाल रोग विभाग",
    icon: "Baby",
    shortDesc: "Expert newborn care, advanced NICU, and child immunization.",
    overview: "We offer dedicated childcare from birth through adolescence. Our level III NICU provides advanced care for premature infants and critically ill newborns.",
    services: [
      "Level-III Neonatal Intensive Care (NICU)",
      "Pediatric ICU (PICU) for Critical Child Care",
      "Comprehensive Immunization Programs",
      "Growth & Developmental Monitoring",
      "Pediatric Asthma & Allergy Management"
    ],
    treatments: [
      "Neonatal Respiratory Distress Management",
      "Pediatric Infectious Disease Care",
      "Child Nutrition and Wellness Plans",
      "Congenital disorders management"
    ],
    facilities: [
      "Advanced NICU with Incubators & Phototherapy",
      "High-Frequency Neonatal Ventilators",
      "Child-Friendly General Pediatrics Ward",
      "Dedicated Immunization Clinic"
    ],
    stats: [
      { label: "NICU Graduates", value: "1,200+" },
      { label: "Successful Immunizations", value: "10,000+" },
      { label: "Pediatric Beds", value: "25" },
      { label: "Specialists Available", value: "24/7" }
    ],
    faqs: [
      {
        question: "What is the schedule for childhood vaccinations?",
        answer: "Vaccinations start from birth (BCG, Hepatitis B, OPV) and continue at weeks 6, 10, 14, 9 months, 15 months, and regular intervals until 16 years as per IAP guidelines. We provide a computerized tracking schedule."
      }
    ]
  },
  {
    id: "gynecology",
    name: "Obstetrics & Gynecology",
    hindiName: "स्त्री एवं प्रसूति रोग विभाग",
    icon: "UserRound",
    shortDesc: "Painless deliveries, laparoscopic surgeries, and high-risk pregnancy care.",
    overview: "Dedicated to womens healthcare, offering premium labor suites, laparoscopic surgery, high-risk pregnancy management, and fertility diagnostics in a caring environment.",
    services: [
      "Painless Delivery & Maternity Services",
      "High-Risk Pregnancy Management",
      "Laparoscopic Hysterectomy & Myomectomy",
      "Infertility Workup & Counseling",
      "Adolescent Gynecology & Menopause Clinics"
    ],
    treatments: [
      "PCOS & Hormone Imbalance Therapy",
      "Uterine Fibroids and Endometriosis Treatment",
      "Gynecological Cancer Screening (Pap Smear)",
      "Antenatal & Postnatal Exercises"
    ],
    facilities: [
      "Premium LDR (Labor, Delivery, Recovery) Suites",
      "Dedicated Gynecological OT",
      "Continuous Fetal Monitoring Systems",
      "Baby Nursery with Expert Pediatric Support"
    ],
    stats: [
      { label: "Healthy Deliveries", value: "5,000+" },
      { label: "Laparoscopic Cases", value: "1,800+" },
      { label: "LDR Suites", value: "6" },
      { label: "Support Staff", value: "30+" }
    ],
    faqs: [
      {
        question: "What is high-risk pregnancy?",
        answer: "A pregnancy is considered high-risk if there are pre-existing medical conditions like diabetes, hypertension, advanced maternal age, or multiple pregnancies. We provide dedicated multi-disciplinary maternal-fetal care."
      }
    ]
  },
  {
    id: "emergencytrauma",
    name: "Emergency & Trauma",
    hindiName: "आपातकालीन एवं ट्रॉमा केयर",
    icon: "ShieldAlert",
    shortDesc: "24/7 immediate life support, trauma surgeons, and advanced ambulances.",
    overview: "Medicant's Emergency & Trauma department is a 24/7 state-of-the-art facility designed to handle all medical emergencies, cardiac arrests, respiratory failures, and polytrauma cases with utmost speed.",
    services: [
      "24/7 Polytrauma & Accident Management",
      "Acute Stroke & Cardiac Emergency Care",
      "Advanced Cardiorespiratory Life Support (ACLS)",
      "Burns and Poisoning Treatment Protocols",
      "Fully Equipped ALS & BLS Ambulance Services"
    ],
    treatments: [
      "Emergency Airway Intubation & Ventilation",
      "Thrombolytic Therapy for Acute Attacks",
      "Surgical Debridement and Hemorrhage Control",
      "Critical Care Stabilization"
    ],
    facilities: [
      "Dedicated Multi-Bed Triage Area",
      "Emergency Operation Theatre (OT)",
      "Plaster Room and Minor Procedure Suite",
      "24/7 In-house Blood Storage & Diagnostics"
    ],
    stats: [
      { label: "Emergencies Handled", value: "25,000+" },
      { label: "Response Time", value: "Immediate" },
      { label: "Ambulance Fleet", value: "5+" },
      { label: "Dedicated Trauma Beds", value: "15" }
    ],
    faqs: [
      {
        question: "How do I reach the ambulance service?",
        answer: "You can call our 24/7 dedicated emergency helpline at 1800 890 8898 or 06542 360400. Our fully equipped ALS ambulance with medical staff will be dispatched immediately."
      }
    ]
  },
  {
    id: "radiology",
    name: "Radiology & Imaging",
    hindiName: "रेडियोलॉजी एवं इमेजिंग",
    icon: "Scan",
    shortDesc: "High-resolution MRI, CT Scan, Ultrasound, and Digital X-Ray.",
    overview: "Our advanced Radiology division features high-resolution diagnostic equipment ensuring highly accurate scans for swift diagnoses.",
    services: [
      "High-Tesla Silent Magnetic Resonance Imaging (MRI)",
      "Multi-Slice CT Scan (Brain, Chest, Abdomen)",
      "High-Resolution 3D/4D Ultrasonography",
      "Digital Mammography & Bone Densitometry (DEXA)",
      "Digital X-Ray and Contrast Studies"
    ],
    treatments: [
      "Image-Guided Fine Needle Biopsies (FNAC)",
      "Diagnostic Screenings for Heart, Brain & Organs",
      "Vascular Doppler Screenings"
    ],
    facilities: [
      "Silent MRI Suite",
      "Radiation-Optimized Ultra-fast CT Scan Suite",
      "Dedicated Portable X-Ray for ICU",
      "Fully Digitized PACS Report Archiving System"
    ],
    stats: [
      { label: "Scans Performed", value: "40,000+" },
      { label: "Report Accuracy", value: "100%" },
      { label: "Turnaround Time", value: "<2 Hours" },
      { label: "Imaging Techs", value: "12+" }
    ],
    faqs: [
      {
        question: "Is any preparation needed for an abdominal ultrasound?",
        answer: "Yes, you generally need to remain fasting (no food or drinks except water) for 6-8 hours before an abdominal ultrasound for clear visualization of the gallbladder and organs."
      }
    ]
  }
];

export const doctors: Doctor[] = [
  {
    id: "majid-talikoti",
    name: "Dr. Majid A. Talikoti",
    title: "Sr. Consultant & Surgical Oncologist",
    departmentId: "oncology",
    departmentName: "Oncology",
    image: "/images/doctors/DrMajidATalikoti.png",
    qualifications: "MBBS, MS (General Surgery),  (Oncology) - AIIMS New Delhi",
    experience: "20+ Years Experience",
    expertise: [
      "Head & Neck Surgery",
      "Conservative & Reconstructive Breast Surgery",
      "Gastrointestinal Cancer Surgery",
      "Oncoplasty"
    ],
    opdTiming: "Mon - Fri: 10:00 AM - 02:00 PM | Sat: 10:00 AM - 01:00 PM", //change
    regNo: "WBMC-12345 / JMC-4328",  //change
    bio: "Dr. Majid Ahmed Talikoti is a highly renowned Senior Surgical Oncologist with over 20 years of medical experience. He is the Founder of Medicant Hospital & Research Centre in Bokaro and specializes in minimally-invasive cancer surgeries, oncoplasty, and complex tumor resections.",
    education: [
      "Bachelor of Medicine & Surgery (MBBS) - Al Ameen Medical College, RGUHS, Karnataka (2001)",
      "Master of Surgery (General Surgery) - Al Ameen Medical College, RGUHS, Karnataka (2007)",
      "Diplomate of National Board (Surgical Oncology) - National Board of Examinations (NBE), New Delhi",
      "Surgical Oncology - Dr. B.R. Ambedkar Institute-Rotary Cancer Hospital, AIIMS, New Delhi",
      "Advanced Surgical Oncology Fellowship - National Cancer Centre, Japan"
    ],
    awards: [
      "Honorary Health Commissioner: Conferred by the India-GCC Trade Council",
      "Best Cancer Specialist of the Year (Asia): Awarded at the Asia Leaders Excellence Awards in Singapore on World Cancer Day",
      "International Quality Award for best-in-class Oncology services"
    ],
    reviews: [
      {
        author: "Ananya Mukherjee",
        rating: 5,
        text: "Dr. Talikoti performed my father's gastrointestinal cancer surgery. The procedure was successful, and the post-operative care was exceptional. Highly recommend his expertise.",
        date: "May 12, 2026"
      },
      {
        author: "Souvik Chatterjee",
        rating: 5,
        text: "I was diagnosed with breast cancer and Dr. Talikoti guided me through the entire treatment process, including oncoplastic surgery. His compassionate approach made a difficult time manageable.",
        date: "Apr 28, 2026"
      }
    ]
  },
  {
    id: "ak-singh",
    name: "Dr. A. K. Singh",
    title: "Sr. Consultant, Physician & Cardiologist (Non-Invasive)",
    departmentId: "cardiology",
    departmentName: "Internal Medicine and Cardiology",
    image: "/images/doctors/DrAKSingh.png",
    qualifications: "MBBS, MD (Internal Medicine),Cardiology & Critical Care",
    experience: "35+ Years Experience",
    expertise: [
      "Non-Invasive Cardiology",
      "Pacemaker Implantation",
      "Internal Medicine & Critical Care",
    ],
    opdTiming: "Mon - Sat: 11:00 AM - 03:00 PM", //change
    regNo: "MCI-43210 / JMC-5561",   //change
    bio: "Dr. A. K. Singh is a highly experienced Senior Consultant in Internal Medicine and Cardiology with over 35 years of practice. He specializes in non-invasive cardiology, pacemaker implantation, and critical care management, providing comprehensive cardiac care to patients, having successfully implanted over 1,000 pacemakers during his career.",
    education: [
      "MBBS & MD (Internal Medicine) - Govt. Medical College, Nagpur (1987)",
      "Specialized Cardiology & Critical Care - Bombay Hospital, Mumbai",
    ],
    awards: [
      "Jawahar Award by SAIL in 2008 for for exemplary medical contributions.",
      "Served as Director of Medical & Health Services at BGH (2009-2021).",
      "Held the post of Vice President for the Cardiological Society of India (CSI) - Jharkhand Chapter."
    ],
    reviews: [
      {
        author: "Rima Das",
        rating: 5,
        text: "Dr. Singh is an exceptional cardiologist. He diagnosed my father's heart condition accurately and managed his treatment with utmost care. The entire experience was reassuring and professional.",
        date: "Feb 10, 2026"
      }
    ]
  },
  {
    id: "tm-singh",
    name: "Dr. T.M. Singh",
    title: "Consultant & Radiation Oncologist",
    departmentId: "oncology",
    departmentName: "Oncology",
    image: "/images/doctors/DrTMSingh.png",
    qualifications: "MBBS,  DMRT, MD (Radiotherapy)",
    experience: "32+ Years Experience",
    expertise: [
      "Head & Neck Cancers",
      "Breast Cancers",
      "Esophageal Brachytherapy",
    ],
    opdTiming: "Mon - Fri: 10:00 AM - 04:00 PM",   //change
    regNo: "NMC-98765 / JMC-1102",            //change
    bio: "Dr. T.M. Singh is a highly skilled radiation oncologist with extensive experience in delivering cutting-edge radiotherapy treatments. He is dedicated to providing comprehensive cancer care using the latest technological advancements.",
    education: [
      "MBBS - University of Manipur (1981)",
      "DMRT (Diploma in Medical Radio-Therapy) - Aligarh Muslim University (1986)",
      "MD (Radiotherapy) - Panjab University (1987)"
    ],
    awards: [
      "Felicitated at regional CME forums for making high-quality cancer care accessible across Jharkhand.",
      "Contributor to the Association of Radiation Oncologists of India (Bihar Chapter).",
      "Active Member of both National and International Radiation Oncology Associations."
    ],
    reviews: [
      {
        author: "Alok Kumar",
        rating: 5,
        text: "Dr. Singh's expertise in radiation oncology is remarkable. He provided clear explanations of the treatment plan and ensured that I was comfortable throughout the process. The results have been very positive.",
        date: "May 22, 2026"
      }
    ]
  },
  {
    id: "alokr-singh",
    name: "Dr. Alok Kumar Singh",
    title: "Consultant, & Orthopedics Surgeon",
    departmentId: "orthopedics",
    departmentName: "Orthopedics",
    image: "/images/doctors/DrAlokKSingh.png",
    qualifications: "MBBS, D. Ortho, M.Ch. (Ortho)",
    experience: "15+ Years Experience",
    expertise: [
      "Joint Replacement & Arthroplasty",
      "Trauma & Fractures",
      "Spine & Deformity Correction",
      "Arthroscopy"
    ],
    opdTiming: "Mon - Fri: 09:00 AM - 01:00 PM",    //change
    regNo: "WBMC-38910",                //change
    bio: "Dr. Alok Kumar Singh has dedicated his career to orthopedic care, providing comprehensive treatment for joint disorders and trauma cases.",
    education: [
      "M.B.B.S - M.G.I.M.S., Sevagram",
      "D. Ortho - M.G.I.M.S., Sevagram",
      "M. Ch. Ortho - University Of Seychelles American Institute Of Medicine (U.S.)"
    ],
    awards: [
      "Icon of Health Award (Jharkhand) in 2024 for his outstanding medical contributions.",
      "Accomplished the state's first single-sitting bilateral knee replacement using the DePuy ATTUNE revision system at Medicant Hospital.",
      "Secured 3rd merit in the Post-Graduate Diploma in Orthopaedics at MUHS university in 2010."
    ],
    reviews: [
      {
        author: "Sumitra Roy",
        rating: 5,
        text: "Dr. Alok Kumar Singh is an excellent orthopedic surgeon. His expertise and compassionate care made a huge difference in my recovery.",
        date: "Jun 02, 2026"
      }
    ]
  },
  {
    id: "ummehani-rasool",
    name: "Dr. Ummehani Rasool",
    title: "Obstetrician, Gynecologist, and Laparoscopic Surgeon",
    departmentId: "gynecology",
    departmentName: "Gynecology",
    image: "/images/doctors/DrUmmehaniRasool.png",
    qualifications: "MBBS, MD (Obstetrics & Gynaecology), Laparoscopic Surgeon",
    experience: "6+ Years Experience",
    expertise: [
      "Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "Arthroscopic Ligament Reconstruction (ACL/PCL)",
      "Complex Fracture & Polytrauma Care"
    ],
    opdTiming: "Mon - Sat: 12:00 PM - 04:00 PM",  //change
    regNo: "KMC-67543",                 //change
    bio: "Dr. Ummehani Rasool is a renowned obstetrician and gynecologist with expertise in laparoscopic surgery. She is highly regarded for her compassionate care and clinical excellence.",
    education: [
      "MBBS - Maharashtra University of Health Sciences, Nashik",
      "MD (Obstetrics & Gynaecology) - Government Medical College (GMCH), Aurangabad.",
      "Advanced Diploma in ART & Infertility from Kiel University, Germany."
    ],
    awards: [
      "Laparoscopic Surgeon Certification: IAGE Certified",
      "Recognized for excellence in minimally invasive gynecological procedures and patient care."
    ],
    reviews: [
      {
        author: "Devendra Mahato",
        rating: 5,
        text: "Dr. Rasool is an exceptional gynecologist. She performed my wife's laparoscopic surgery with utmost precision and care. The recovery was smooth, and I felt well-informed throughout the process.",
        date: "Jan 15, 2026"
      }
    ]
  },
  {
    id: "sayan-mukherjee",
    name: "Dr. Sayan Mukherjee",
    title: "Senior Consultant Nephrologist",
    departmentId: "neurosurgery", // Or dialysis/urology/kidney
    departmentName: "Nephrology & Kidney Care",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=450",
    qualifications: "MBBS, MD (Medicine), DM (Nephrology)",
    experience: "9+ Years Experience",
    expertise: [
      "Kidney Transplantation Support",
      "Chronic Kidney Disease (CKD) Care",
      "Hemodialysis & Peritoneal Dialysis",
      "Acute Kidney Injury (AKI) Treatment"
    ],
    opdTiming: "Tue, Thu, Sat: 10:00 AM - 02:00 PM",
    regNo: "MCI-87965",
    bio: "Dr. Sayan Mukherjee is a renal specialist specializing in critical dialysis procedures and chronic kidney management with a primary focus on improving the quality of patient lives.",
    education: [
      "MBBS - NRS Medical College, Kolkata",
      "MD - PGIMER, Chandigarh",
      "DM (Nephrology) - IMS BHU, Varanasi"
    ],
    awards: [
      "Young Nephrologist Presentation Award (2022)"
    ],
    reviews: []
  },
  {
    id: "anirban-pal",
    name: "Dr. Anirban Pal",
    title: "Consultant Urologist",
    departmentId: "radiology", // Urology mapped for now or generic
    departmentName: "Urology & Renal Science",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=450",
    qualifications: "MBBS, MS, MCh (Urology)",
    experience: "10+ Years Experience",
    expertise: [
      "Laser Prostate Surgery (HoLEP, TURP)",
      "Kidney Stone Laser Treatment (RIRS, URSL)",
      "Urological Reconstructive Surgeries",
      "Uro-Oncology Care"
    ],
    opdTiming: "Mon, Wed, Fri: 11:00 AM - 03:00 PM",
    regNo: "WBMC-77890",
    bio: "Dr. Anirban Pal offers advanced keyhole and laser endoscopic solutions for kidney stones, urinary disorders, prostate enlargements and cancers with highly successful outcomes.",
    education: [
      "MBBS - Medical College, Kolkata",
      "MS (General Surgery) - IPGMER, Kolkata",
      "MCh (Urology) - KGMU, Lucknow"
    ],
    awards: [
      "Best Endourology Presenter Award (2023)"
    ],
    reviews: []
  },
  {
    id: "ipsita-ghosh",
    name: "Dr. Ipsita Ghosh",
    title: "Consultant Pediatrician & Neonatologist",
    departmentId: "pediatrics",
    departmentName: "Pediatrics & Neonatology",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=450",
    qualifications: "MBBS, MD (Pediatrics), Fellowship in Neonatology",
    experience: "8+ Years Experience",
    expertise: [
      "Advanced Neonatal Critical Care",
      "Pediatric Asthma & Allergy Management",
      "Child Nutrition & Developmental Milestones",
      "Newborn Resuscitation & Follow up"
    ],
    opdTiming: "Mon - Sat: 10:00 AM - 01:00 PM",
    regNo: "JMC-8219",
    bio: "Dr. Ipsita Ghosh provides compassionate and highly customized healthcare, immunization, and disease monitoring for children from infancy through adolescence.",
    education: [
      "MBBS - Ranchi University",
      "MD (Pediatrics) - Patna Medical College",
      "Fellowship in Neonatology - Cloudnine Hospital, Bengaluru"
    ],
    awards: [
      "Child Health Excellence Award (2024)",
      "Best Pediatric Resident Award (2018)"
    ],
    reviews: [
      {
        author: "Meera Singh",
        rating: 5,
        text: "The best pediatrician in Bokaro! She is very sweet and gentle with babies and never prescribes unnecessary medicines.",
        date: "Jun 14, 2026"
      }
    ]
  }
];

export const notices: Notice[] = [
  {
    id: "n1",
    date: "20",
    month: "Jun",
    title: "Free Health Check-up Camp on 20th June 2025",
    category: "Health Camps",
    isNew: true,
    content: "Medicant Hospital is organizing a comprehensive Free Health Check-up Camp focusing on cardiac screening, bone mineral density (BMD), diabetes check, and specialist consultations. Timings: 9:00 AM to 3:00 PM. Registration is free but mandatory. Venue: Hospital Outpatient Wing."
  },
  {
    id: "n2",
    date: "11",
    month: "Jun",
    title: "Department of Cardiology Now Open",
    category: "Hospital Updates",
    isNew: true,
    content: "Our highly anticipated state-of-the-art Siemens Cath Lab and Cardiac ICU are now fully operational. We are now offering 24/7 emergency primary angioplasty, pacemakers, and comprehensive cardiac inpatient care with a distinguished team of cardiologists."
  },
  {
    id: "n3",
    date: "08",
    month: "Jun",
    title: "Blood Donation Camp – 15th June 2025",
    category: "Health Camps",
    isNew: false,
    content: "On the occasion of World Blood Donor Day, join us in our initiative to save lives. Donate blood at our advanced blood bank facility on June 15th, 2025 between 10:00 AM and 4:00 PM. Every donor will receive a certificate and basic screening card."
  },
  {
    id: "n4",
    date: "05",
    month: "Jun",
    title: "OPD Timings Changed w.e.f 10th June 2025",
    category: "Public Notices",
    isNew: false,
    content: "Please note that outpatient department timings have been revised. The morning slot is from 9:00 AM to 1:00 PM and the evening slot is from 3:00 PM to 7:00 PM. Kindly book your slots accordingly on our portal or call 1800 890 8898."
  },
  {
    id: "n5",
    date: "28",
    month: "May",
    title: "Careers: Open Positions for ICU Nurses & Technicians",
    category: "Careers",
    isNew: false,
    content: "We are recruiting experienced ICU Staff Nurses (GNM/B.Sc Nursing with 2+ years experience) and Senior Cath Lab/Radiology Technicians. Email your CV to careers@medicanthospital.com or submit it at the HR department."
  }
];

export const facilities: Facility[] = [
  {
    id: "icu",
    name: "Intensive Care Unit (ICU)",
    icon: "HeartPulse",
    shortDesc: "Level-3 multi-disciplinary critical care unit with dedicated bed monitors.",
    details: "Our Level-III ICU has continuous multi-parameter monitoring, advanced high-end ventilators, bed-side dialysis, and 1:1 nurse-to-patient ratios for critically ill patients. It is overseen 24/7 by a team of highly experienced Intensivists.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "nicu",
    name: "Neonatal Intensive Care Unit (NICU)",
    icon: "Baby",
    shortDesc: "Advanced level-3 newborn critical care for premature infants.",
    details: "A fully sterile, state-of-the-art Level-3 NICU equipped with advanced warmers, incubators, neonatal ventilators, high-intensity phototherapy units, and neonatal nitric oxide delivery systems. Managed 24/7 by dedicated neonatologists.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "ot",
    name: "Operation Theatre (OT)",
    icon: "Scissors",
    shortDesc: "Ultra-clean laminar flow operating theaters with zero-bacteria environment.",
    details: "Medicant houses modular operating theatres with advanced laminar airflow, HEPA filters to maintain a zero-bacteria environment, premium LED surgical lights, high-end surgical pendants, and state-of-the-art anesthesia workstations.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "mri",
    name: "Magnetic Resonance Imaging (MRI)",
    icon: "Scan",
    shortDesc: "High-Tesla diagnostics with premium resolution and silent scanning.",
    details: "Our high-Tesla silent MRI provides top-resolution imaging of the brain, spinal cord, joints, and soft tissues with minimized noise and optimized patient comfort. Advanced sequences allow fast and precise tumor and stroke diagnostic scans.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "ctscan",
    name: "Multi-Slice CT Scan",
    icon: "ScanFace",
    shortDesc: "Ultra-fast radiology scan with minimal radiation exposure.",
    details: "High-speed multi-slice CT scanning offers rapid scans of the brain, thorax, abdomen, and bones. Optimized radiation protection ensures safety for all age groups, providing highly detailed anatomical slices in seconds.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "laboratory",
    name: "Pathology & Laboratory",
    icon: "FlaskConical",
    shortDesc: "24/7 fully automated biochemistry and hematology clinical laboratory.",
    details: "A fully digitized laboratory performing complete blood counts, coagulation parameters, complex biochemistry profiles, endocrine markers, and tumor pathology. Rigorous internal and external quality control ensures 100% accurate reporting.",
    image: "https://images.unsplash.com/photo-1581091923895-45a47d03b163?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "ambulance",
    name: "24/7 Ambulance Fleet",
    icon: "Truck",
    shortDesc: "Advanced cardiac life support (ALS) ambulances with transport ventilators.",
    details: "Our ambulance fleet includes Advanced Life Support (ALS) vehicles fitted with transport ventilators, defibrillators, oxygen supplies, and critical monitoring systems. Our trained emergency nursing staff handles rapid critical transit 24/7.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "emergency",
    name: "Emergency & Trauma Care",
    icon: "ShieldAlert",
    shortDesc: "Dedicated emergency trauma center with immediate multi-specialist triage.",
    details: "Equipped with a specialized multi-bed triage, emergency operating theatre, and round-the-clock availability of critical care doctors, trauma specialists, and surgeons to handle industrial, accidental, and cardiac emergencies.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

export const insurancePartners: Partner[] = [
  { name: "Ayushman Bharat (PM-JAY)", logoUrl: "/images/insurance/PM-JAY.png" },
  { name: 'National Insurance', logoUrl: '/images/insurance/nationalinsurance.png' },
  { name: 'Aditya Birla Health', logoUrl: '/images/insurance/AdityaBirla.png' },
    { name: 'Niva Bupa', logoUrl: '/images/insurance/nivaBupa.png' },
    { name: 'Care Health Insurance', logoUrl: '/images/insurance/carehealth.png' },
    { name: 'Digit Insurance', logoUrl: '/images/insurance/digit.png' },
    { name: 'FHPL', logoUrl: '/images/insurance/fhpl.png' },
    { name: 'HDFC ERGO', logoUrl: '/images/insurance/hdfcergo.png', },
    { name: 'Heritage Health', logoUrl: '/images/insurance/heritagehealth.png' },
    { name: 'ICICI Lombard', logoUrl: '/images/insurance/icicilombard.png' },
    { name: 'IFFCO-TOKIO', logoUrl: '/images/insurance/iffcotokio.png' },
    { name: 'Magma HDI', logoUrl: '/images/insurance/magma.png' },
    { name: 'MD India', logoUrl: '/images/insurance/mdindia.png' },
    { name: 'Medi Assist', logoUrl: '/images/insurance/Mediassist.png' },
    { name: 'Navi Health Insurance', logoUrl: '/images/insurance/navi.png' },
    { name: 'The New India Insurance', logoUrl: '/images/insurance/Thenewindiainsurance.png' },
    { name: 'Safeway Insurance TPA', logoUrl: '/images/insurance/safeway.png' },
    { name: 'Oriental Insurance', logoUrl: '/images/insurance/oriental.png' },
    { name: 'United India Insurance', logoUrl: '/images/insurance/unitedindia.png' },
    { name: 'Volo Health', logoUrl: '/images/insurance/volo.png' },
    { name: 'Vidal Health TPA', logoUrl: '/images/insurance/vidalhealth.png' },
    { name: 'Akna Health TPA', logoUrl: '/images/insurance/akna.png' },
    { name: 'HealthInsurance TPA', logoUrl: '/images/insurance/healthinsurance.png' },
    { name: 'Health India TPA', logoUrl: '/images/insurance/healthindia.png' }
];

export const corporatePartners: Partner[] = [
  { name: "Coal India Limited", logoUrl: "/images/insurance/coalindia.png" },
  { name: "Damodar Valley Corporation (DVC)", logoUrl: "/images/insurance/DVC.png" },
  { name: "BSNL", logoUrl: "/images/insurance/BSNL.png" },
  { name: 'State Government', logoUrl: '/images/insurance/govofjhar.png' },
  { name: 'Bharat Petroleum', logoUrl: '/images/insurance/bharatpetrol.png' },
  { name: 'Ayushman State Scheme', logoUrl: '/images/insurance/PM-JAY.png' },
  { name: "Bokaro Steel Plant (SAIL)", logoUrl: "/images/insurance/SAIL.png" }
];

export const blogs: Blog[] = [
  {
    id: "b1",
    title: "Medicant Hospital & Research Centre: Where Innovation Meets Compassion in Healthcare",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400",
    date: "May 15, 2026",
    readTime: "5 Min Read",
    summary: "An in-depth look at how Medicant Hospital merges state-of-the-art diagnostics and treatment protocols with a deeply compassionate human touch.",
    content: "Our healthcare team works day and night to set a new global benchmark of clinical precision and patient care. At Medicant Hospital, we believe that advanced technology (such as ultra-silent MRI, high-precision flat panel Cath Labs, and smart Level-3 ICUs) delivers its true value only when paired with the empathy, warmth, and dedication of outstanding medical experts."
  },
  {
    id: "b2",
    title: "Medicant Hospital and Research Centre: Redefining Healthcare in Bokaro",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400",
    date: "May 10, 2026",
    readTime: "5 Min Read",
    summary: "How Bokaro is rapidly transforming into a major healthcare hub with the launch of Medicant's tertiary-level multispecialty infrastructure.",
    content: "Historically, residents of Jharkhand had to travel to metro cities for critical cardiac surgeries, complex neuro interventions, or comprehensive oncology treatments. Medicant Hospital & Research Centre has redefined the local landscape by offering complete state-of-the-art operations under a single roof, bringing world-class cardiac, cancer, neuro, and emergency facilities right here to Bokaro."
  },
  {
    id: "b3",
    title: "Medicant Hospital and Research Centre: A New Era of Healthcare in Bokaro",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1581091923895-45a47d03b163?auto=format&fit=crop&q=80&w=600&h=400",
    date: "May 05, 2026",
    readTime: "4 Min Read",
    summary: "A review of our multi-specialty clinical departments, super-specialists, and the comprehensive care facilities.",
    content: "Our mission is to make premium, high-quality tertiary care accessible, affordable, and trustworthy for everyone in the region. Through our specialized clinical centers of excellence, we bring leading medical talents together with digital integration, advanced labs, modular theatres, and round-the-clock specialized emergency care."
  },
  {
    id: "b4",
    title: "Medicant Hospital and Research Centre: Transforming Healthcare in Bokaro",
    category: "Care",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400",
    date: "Apr 28, 2026",
    readTime: "6 Min Read",
    summary: "Discover our patient-centric care models, customized rehabilitation therapies, and dedicated patient helpdesks.",
    content: "We focus on healing the whole patient, not just treating the clinical diagnosis. By introducing dedicated post-surgery cardiac and ortho rehab suites, personalized nutritional counseling, patient support desks, and continuous digital health updates, we guide our patients securely and comfortably along their complete journey to health and recovery."
  },
  {
    id: "b5",
    title: "Preventive Healthcare: Small Steps Today for a Healthier Tomorrow",
    category: "Prevention",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=400",
    date: "Apr 20, 2026",
    readTime: "4 Min Read",
    summary: "Why regular medical screenings, lifestyle balance, and preventive cardiac scans are the best shields against modern lifestyle disorders.",
    content: "Many major healthcare challenges, including cardiovascular blockages and early-stage tumors, can be managed with outstanding success if identified early. Undergoing basic annual screenings, monitoring blood pressure, managing lipid counts, and seeking expert consultations can help ward off major medical emergencies before they arise."
  }
];

export const statistics = [
  { label: "Patients Cared For", value: "3 M+" },
  { label: "Hospital beds proposed", value: "600+" },
  { label: "Health professionals", value: "100+" },
  { label: "Super Specialities", value: "25+" },
  { label: "Emergency Services", value: "24/7" },
  { label: "Diagnostic Accuracy", value: "100%" }
];
