/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CreditCard, Search, Calendar, FileText, AlertCircle, ShieldCheck, 
  ArrowRight, Download, Receipt, QrCode, CheckCircle2, User, Phone,
  ChevronRight, Building, Award, Heart
} from 'lucide-react';
import { sanitizeInput } from '../lib/security';

interface Bill {
  billNo: string;
  patientId: string;
  patientName: string;
  phone: string;
  date: string;
  dueDate: string;
  dept: string;
  doctor: string;
  status: 'Unpaid' | 'Paid';
  type: 'OPD' | 'IPD';
  items: { description: string; qty: number; rate: number; amount: number }[];
  total: number;
}

// Simulated active bills database
const sampleBills: Bill[] = [
  {
    billNo: "INV-2026-8921",
    patientId: "MHR-OPD-7215",
    patientName: "Aman Keshri",
    phone: "9934010245",
    date: "July 12, 2026",
    dueDate: "July 26, 2026",
    dept: "Cardiology & Heart Care",
    doctor: "Dr. Arindam Sen",
    status: "Unpaid",
    type: "OPD",
    items: [
      { description: "Specialist Consultant OPD Fee", qty: 1, rate: 800, amount: 800 },
      { description: "12-Lead Electrocardiogram (ECG)", qty: 1, rate: 450, amount: 450 },
      { description: "Full Lipid Profile & Biochemical Assay", qty: 1, rate: 1200, amount: 1200 },
      { description: "Echocardiography Study (2D Echo)", qty: 1, rate: 2200, amount: 2200 }
    ],
    total: 4650
  },
  {
    billNo: "INV-2026-9042",
    patientId: "MHR-IPD-3045",
    patientName: "Ramesh Mahto",
    phone: "9876543210",
    date: "July 18, 2026",
    dueDate: "July 31, 2026",
    dept: "Orthopedics & Joint Care",
    doctor: "Dr. Kaustav De",
    status: "Unpaid",
    type: "IPD",
    items: [
      { description: "Semi-Private Ward Admission (2 Days)", qty: 2, rate: 2500, amount: 5000 },
      { description: "Orthopedic Surgical Implant Consumables", qty: 1, rate: 12500, amount: 12500 },
      { description: "Operation Theatre (OT) Consumables & Admin", qty: 1, rate: 6000, amount: 6000 },
      { description: "Post-Op Physiotherapy Session (In-patient)", qty: 2, rate: 600, amount: 1200 },
      { description: "Clinical Pharmacy & IV Infusion Charges", qty: 1, rate: 3450, amount: 3450 }
    ],
    total: 28150
  },
  {
    billNo: "INV-2026-7712",
    patientId: "MHR-OPD-4412",
    patientName: "Priyanjali Singh",
    phone: "8877665544",
    date: "July 05, 2026",
    dueDate: "July 19, 2026",
    dept: "Obstetrics & Gynecology",
    doctor: "Dr. Moumita Roy",
    status: "Paid",
    type: "OPD",
    items: [
      { description: "Consultant OPD Consultation", qty: 1, rate: 700, amount: 700 },
      { description: "Pelvic Ultrasonography (USG) Scan", qty: 1, rate: 1500, amount: 1500 }
    ],
    total: 2200
  }
];

export default function PaymentPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBill, setActiveBill] = useState<Bill | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setPaymentSuccess(false);
    setActiveBill(null);

    const cleanQuery = sanitizeInput(searchQuery).trim().toLowerCase();
    if (!cleanQuery) {
      setSearchError("Please enter a valid Ticket No, Case ID, or 10-digit Mobile Number.");
      return;
    }

    // Search bill
    const foundBill = sampleBills.find(
      b => b.patientId.toLowerCase() === cleanQuery || 
           b.billNo.toLowerCase() === cleanQuery || 
           b.phone === cleanQuery
    );

    if (foundBill) {
      setActiveBill(foundBill);
    } else {
      setSearchError("No active unpaid bills found matching your credentials. If you recently registered or completed your OPD session, please allow up to 15 minutes for the clinical billing desk to upload the invoice.");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBill) return;

    if (paymentMethod === 'CARD') {
      if (cardNumber.replace(/\s/g, '').length < 16 || !expiry || cvv.length < 3 || !cardName) {
        alert("Please enter all card payment details correctly.");
        return;
      }
    } else if (paymentMethod === 'NETBANKING' && !selectedBank) {
      alert("Please select a banking partner to proceed.");
      return;
    }

    setIsPaying(true);

    // Simulate clinical payment gateway response
    setTimeout(() => {
      const randomTxn = "TXN-MHR-" + Math.floor(10000000 + Math.random() * 90000000);
      setTransactionId(randomTxn);
      setPaymentSuccess(true);
      setIsPaying(false);

      // Update the bill status in our simulated local array
      activeBill.status = 'Paid';
    }, 2000);
  };

  const banksList = [
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank (PNB)",
    "Bank of Baroda",
    "Canara Bank",
    "Kotak Mahindra Bank"
  ];

  return (
    <div className="w-full bg-[#F8FAFC] pb-24 font-sans text-slate-800" id="payment-portal-root">
      {/* Page Hero Banner */}
      <div className="bg-[#0B1F3A] text-white py-12 px-4 md:px-8 text-center relative overflow-hidden" id="payment-hero">
        <div className="absolute top-0 right-0 w-[30%] h-[100%] bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mx-auto">
            <ShieldCheck className="w-4 h-4" /> Secure Payment Gateway
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Online Digital Payment Portal</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Settle your Outpatient (OPD) Consultation fees, Clinical Diagnostic bills, or Inpatient (IPD) admission billing securely through India's leading unified transaction networks.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8" id="payment-body-container">
        
        {/* Left Search / Invoice Details Section */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Invoice Lookup Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4.5 h-4.5 text-[#006B3F]" /> Search Active Medical Invoice
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your patient outpatient **Ticket/Token No** (e.g., MHR-OPD-7215), **IPD Case ID** (e.g., MHR-IPD-3045), or the **Registered 10-digit Mobile Number** to retrieve itemized hospital billing.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-1">
              <div className="relative flex-grow">
                <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. MHR-OPD-7215, 9934010245"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] font-semibold"
                />
              </div>
              <button
                type="submit"
                className="bg-[#006B3F] hover:bg-[#005431] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-green-100 cursor-pointer"
              >
                Retrieve Bill <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {searchError && (
              <div className="bg-red-50 border border-red-100 text-red-700 p-3.5 rounded-2xl flex items-start gap-2 text-xs mt-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{searchError}</p>
              </div>
            )}
          </div>

          {/* Retrieved Bill Details Card */}
          {activeBill && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Header Status */}
              <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Invoice Reference</span>
                  <span className="text-sm font-bold text-[#0B1F3A]">{activeBill.billNo}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                  activeBill.status === 'Paid' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                }`}>
                  {activeBill.status}
                </span>
              </div>

              {/* Patient Meta Grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 text-xs text-slate-600 bg-slate-50/30">
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                    <User className="w-3.5 h-3.5" /> Patient Details
                  </span>
                  <p className="font-extrabold text-[#0B1F3A] text-sm">{activeBill.patientName}</p>
                  <p className="text-[11px]">ID: <span className="font-mono text-[#006B3F] font-bold">{activeBill.patientId}</span></p>
                  <p className="text-[11px]">Primary Contact: +91 {activeBill.phone}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                    <Building className="w-3.5 h-3.5" /> Clinic & Doctor
                  </span>
                  <p className="font-bold text-[#0B1F3A]">{activeBill.doctor}</p>
                  <p className="text-[11px] text-slate-500">{activeBill.dept}</p>
                  <p className="text-[11px] flex items-center gap-1 mt-0.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> Date: {activeBill.date}
                  </p>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <div className="p-6">
                <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-3">Itemized Clinical Service Breakdown</h4>
                <div className="border border-slate-100 rounded-2xl overflow-hidden text-xs">
                  <div className="bg-slate-50 p-3 grid grid-cols-12 gap-2 font-bold text-[#0B1F3A] border-b border-slate-100 uppercase text-[9px] tracking-wider">
                    <span className="col-span-7">Service / Investigation description</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-3 text-right">Amount</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {activeBill.items.map((item, idx) => (
                      <div key={idx} className="p-3 grid grid-cols-12 gap-2 text-slate-600">
                        <span className="col-span-7 font-medium leading-normal">{item.description}</span>
                        <span className="col-span-2 text-center font-mono font-bold text-slate-500">{item.qty}</span>
                        <span className="col-span-3 text-right font-mono font-bold text-[#0B1F3A]">₹{item.amount.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  {/* Total summary row */}
                  <div className="bg-green-50/50 p-4 flex justify-between items-center font-sans border-t border-slate-100">
                    <span className="text-xs font-black text-[#006B3F] uppercase tracking-wider">Total Payable Invoice Value</span>
                    <span className="text-lg font-black text-[#0B1F3A] font-mono">₹{activeBill.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Secure Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-slate-500 mt-2 bg-white/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-2.5">
              <Award className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>ISO Certified & Secured:</strong> All credit cards and UPI routing comply strictly with PCI-DSS guidelines, keeping your financial parameters fully encrypted.
              </p>
            </div>
          </div>

        </div>

        {/* Right Checkout / Payment Processing Section */}
        <div className="lg:col-span-5">
          
          {/* Payment Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg flex flex-col gap-6 sticky top-28">
            <h3 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4.5 h-4.5 text-[#006B3F]" /> Choose Payment Channel
            </h3>

            {!activeBill ? (
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center text-xs text-slate-500 flex flex-col items-center gap-3">
                <Receipt className="w-10 h-10 text-slate-300 stroke-[1.5]" />
                <p className="font-medium max-w-xs leading-relaxed">
                  Please search for and select an active billing record using your credentials to unlock secure payment methods.
                </p>
              </div>
            ) : paymentSuccess ? (
              /* Success Screen */
              <div className="flex flex-col gap-6 items-center text-center py-6 animate-in zoom-in-95 duration-300">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-base font-extrabold text-[#0B1F3A]">Transaction Successful!</h4>
                  <p className="text-xs text-[#006B3F] font-bold">₹{activeBill.total.toLocaleString('en-IN')} Secured & Processed</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">Txn ID: {transactionId}</p>
                </div>

                <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-600 text-left flex flex-col gap-2 font-mono">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Patient:</span>
                    <span className="font-bold text-[#0B1F3A]">{activeBill.patientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Reference No:</span>
                    <span className="font-bold text-[#006B3F]">{activeBill.patientId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Paid Date:</span>
                    <span>July 26, 2026</span>
                  </div>
                  <div className="flex justify-between pt-1 font-sans text-sm font-black text-[#0B1F3A]">
                    <span>Amount Settle:</span>
                    <span>₹{activeBill.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-slate-100 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Official Receipt
                </button>
              </div>
            ) : (
              /* Payment Forms */
              <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-5">
                
                {/* Payment Channels Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 text-[10px] font-black uppercase rounded-lg text-center transition-all cursor-pointer ${
                      paymentMethod === 'UPI' 
                        ? 'bg-white text-[#006B3F] shadow-sm' 
                        : 'text-slate-500 hover:text-[#006B3F]'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`py-2 text-[10px] font-black uppercase rounded-lg text-center transition-all cursor-pointer ${
                      paymentMethod === 'CARD' 
                        ? 'bg-white text-[#006B3F] shadow-sm' 
                        : 'text-slate-500 hover:text-[#006B3F]'
                    }`}
                  >
                    Credit/Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`py-2 text-[10px] font-black uppercase rounded-lg text-center transition-all cursor-pointer ${
                      paymentMethod === 'NETBANKING' 
                        ? 'bg-white text-[#006B3F] shadow-sm' 
                        : 'text-slate-500 hover:text-[#006B3F]'
                    }`}
                  >
                    Netbanking
                  </button>
                </div>

                {/* Amount to Pay Review */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 flex justify-between items-center">
                  <span className="font-medium">Selected Bill Value</span>
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-[#0B1F3A] text-sm font-mono">₹{activeBill.total.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-[#006B3F] font-bold">Inclusive of CGST/SGST</span>
                  </div>
                </div>

                {/* Render Selected payment form */}
                {paymentMethod === 'UPI' && (
                  <div className="flex flex-col gap-4 items-center text-center animate-in fade-in duration-200">
                    <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                      Scan this secure UPI QR Code with any UPI-enabled mobile app (such as Google Pay, PhonePe, Paytm, BHIM, or SBI Yono) for instant processing.
                    </p>
                    
                    {/* Simulated QR Code */}
                    <div className="w-36 h-36 border border-slate-100 rounded-2xl bg-white shadow-inner flex items-center justify-center p-3 relative group">
                      <QrCode className="w-full h-full text-[#0B1F3A]" />
                      <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold uppercase text-[#006B3F]">Secured UPI Gateway</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-green-50 text-[#006B3F] text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Verify Active Roster
                    </div>

                    <div className="w-full flex items-center gap-2 text-xs text-slate-400 my-2">
                      <span className="h-px bg-slate-100 flex-grow"></span>
                      <span>OR Pay via UPI ID</span>
                      <span className="h-px bg-slate-100 flex-grow"></span>
                    </div>

                    <div className="w-full flex flex-col gap-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UPI Address VPA</label>
                      <input
                        type="text"
                        placeholder="e.g. keshri.aman@okaxis"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#006B3F]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'CARD' && (
                  <div className="flex flex-col gap-4 animate-in fade-in duration-200 text-left">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cardholder Full Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="e.g. Aman Keshri"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">16-Digit Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          // formatting
                          const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        placeholder="e.g. 4321 8892 1042 3045"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setExpiry(val);
                          }}
                          placeholder="e.g. 11/29"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secret CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 102"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#006B3F] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'NETBANKING' && (
                  <div className="flex flex-col gap-4 animate-in fade-in duration-200 text-left">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Banking Partner</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#006B3F] cursor-pointer font-medium"
                      >
                        <option value="">-- Choose Your Bank --</option>
                        {banksList.map((bank, idx) => (
                          <option key={idx} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      You will be securely redirected to your bank's authenticated portal to authorize this clinical transaction.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPaying || activeBill.status === 'Paid'}
                  className="w-full bg-[#006B3F] hover:bg-[#005431] disabled:bg-slate-200 text-white text-xs font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-green-100 cursor-pointer"
                >
                  {isPaying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Verifying Secured Credentials...
                    </>
                  ) : activeBill.status === 'Paid' ? (
                    "Settle Completed"
                  ) : (
                    <>
                      <ShieldCheck className="w-4.5 h-4.5" /> Settle Settle ₹{activeBill.total.toLocaleString('en-IN')} Securly
                    </>
                  )}
                </button>

              </form>
            )}

            {/* Refund disclaimer */}
            <p className="text-[9px] text-slate-400 text-center leading-relaxed">
              By authorizing, you agree to Medicant Hospital's clinical refund guidelines. For incorrect duplicate debits, refunds are fully re-credited within 3 business cycles.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
