import React, { useState } from "react";
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  Lock, 
  Clock,
  X,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PageHero from "./PageHero.tsx";
import { getApiUrl } from "../utils/api.ts";

interface ContactProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [activeForm, setActiveForm] = useState<"referral" | "contact_us">("referral");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralFeedback, setReferralFeedback] = useState(false);
  const [contactFeedback, setContactFeedback] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [referralForm, setReferralForm] = useState({
    commissionerName: "",
    authority: "",
    email: "",
    phone: "",
    serviceUserName: "",
    dob: "",
    diagnosis: "Learning Disabilities & Autism Mix",
    fundingStatus: "Secured",
    riskDetails: "",
    requiredRatios: "1:1 Support Day & night",
    authorityType: "CCG (NHS Commissioning)"
  });

  const [generalForm, setGeneralForm] = useState({
    name: "",
    email: "",
    phone: "",
    relation: "Family Member / Guardian",
    message: ""
  });

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralForm.commissionerName || !referralForm.email || !referralForm.serviceUserName) {
      setFormError("Please fill in high priority validation fields (Your Name, email, and Resident Name).");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    setNotification(null);
    
    try {
      const res = await fetch(getApiUrl("/api/local_authority_referrals.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(referralForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit referral to Hostinger PHP MySQL API.");
      }
      
      setIsSubmitting(false);
      setReferralFeedback(true);
      setNotification({
        type: "success",
        text: "Referral Received"
      });
      // Reset form after successful submission
      setReferralForm({
        commissionerName: "",
        authority: "",
        email: "",
        phone: "",
        serviceUserName: "",
        dob: "",
        diagnosis: "Learning Disabilities & Autism Mix",
        requiredRatios: "1:1 Support Day & night",
        fundingStatus: "Secured",
        authorityType: "CCG (NHS Commissioning)",
        riskDetails: ""
      });
    } catch (err: any) {
      console.error("MySQL referral save failed:", err);
      setIsSubmitting(false);
      setFormError(err.message || "Could not submit referral to secure MySQL database.");
      setNotification({
        type: "error",
        text: "Referral Submission Failed"
      });
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalForm.name || !generalForm.email || !generalForm.message) {
      setFormError("Please fill in high priority validation fields (Your Name, email, and Consultation Message).");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch(getApiUrl("/api/general_family_inquiries.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Family Message Can't Received");
      }

      setIsSubmitting(false);
      setContactFeedback(true);
      setNotification({
        type: "success",
        text: "Family Message Received"
      });
      // Reset form after successful submission
      setGeneralForm({
        name: "",
        email: "",
        phone: "",
        relation: "Family Member / Guardian",
        message: ""
      });
    } catch (err: any) {
      console.error("MySQL insert failed:", err);
      setIsSubmitting(false);
      setNotification({
        type: "error",
        text: "Family Message Can't Received"
      });
      setFormError(err.message || "Could not save to secure database. Connection to Hostinger MySQL failed.");
    }
  };

  return (
    <div id="contact-view" className="animate-fadeIn relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold max-w-sm w-full sm:w-auto bg-white"
            style={{
              borderColor: notification.type === "success" ? "#10B981" : "#EF4444",
            }}
          >
            <div className={`p-1.5 rounded-full ${notification.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
              {notification.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            <div className="flex-1 text-slate-800">
              <p className="font-extrabold">{notification.text}</p>
              <p className="text-[10px] text-slate-400 font-normal">
                {notification.type === "success" ? "Saved securely on Hostinger MySQL database" : "Verification or connection error occurred"}
              </p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHero sectionId="contact" onNavigate={onNavigate} />
      
      <section id="contact" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Layout containing Left and Right Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Info Credentials & Assurance */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                <h3 className="font-bold text-base tracking-tight font-sans">Contacting Our Office</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Referrals and admissions assessments are processed centrally by our housing and positive behaviour support (PBS) coordinator Salman Muhammad.
                </p>

                <div className="border-t border-slate-800 pt-5 space-y-3.5 text-xs">
                  <div className="flex items-center space-x-2 text-care-green">
                    <ShieldCheck className="w-4 h-4 text-care-green" />
                    <span className="font-mono font-bold tracking-wider text-[9.5px] uppercase">
                      NHS Data Custody Standards
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    All digital entries are processed compliant with 256-bit encryption safeguards, strictly meeting CQC safe custody systems and GDPR guidelines.
                  </p>
                </div>
              </div>

              {/* Quick Hours Note */}
              <div className="bg-sky-50 border border-sky-100/50 rounded-2xl p-5 space-y-1.5 text-slate-800">
                <span className="text-[10px] font-extrabold text-gov-blue uppercase tracking-widest block font-mono">
                  ADMISSIONS TEAM HOURS:
                </span>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Our professional placement assessment lines operate 24/7 for urgent clinical step-down requests from NHS Integrated Care Boards or local councils.
                </p>
              </div>
            </div>

            {/* Right Column: Secure Admission & Inquiry Gateway */}
            <div className="lg:col-span-8 flex justify-center items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full bg-white border border-gov-blue/15 shadow-2xl rounded-3xl p-5 sm:p-7.5 space-y-4.5 sm:space-y-5.5 relative overflow-hidden"
              >
                {/* Decorative NHS blue / Care green secure accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-care-green to-gov-blue" />
                
                {/* Card Title & Header */}
                <div className="flex items-center justify-between border-b border-slate-150 pb-3 text-slate-800">
                  <div className="space-y-0.5">
                    <h3 className="text-xs sm:text-xs.5 font-black text-gov-blue flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-care-green" />
                      <span>Secure Admission & Inquiry Gateway</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">PRO Care Secure and fully GDPR-compliant pathways</p>
                  </div>
                  <span className="text-[8px] bg-sky-50 text-gov-blue border border-sky-100 font-bold px-2 py-0.5 rounded font-sans uppercase">
                    PRO Care Secure
                  </span>
                </div>

                {/* Tab Selector */}
                <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveForm("referral");
                      setFormError(null);
                    }}
                    className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      activeForm === "referral"
                        ? "bg-white text-gov-blue shadow-sm"
                        : "text-slate-500 hover:text-gov-blue"
                    }`}
                  >
                    Local Authority Referral
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveForm("contact_us");
                      setFormError(null);
                    }}
                    className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      activeForm === "contact_us"
                        ? "bg-white text-gov-blue shadow-sm"
                        : "text-slate-500 hover:text-gov-blue"
                    }`}
                  >
                    General Family Inquiry
                  </button>
                </div>

                {notification && (
                  <div className={`p-2.5 border rounded-xl flex items-start space-x-1.5 animate-fadeIn text-[10.5px] font-semibold ${
                    notification.type === "success" 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                      : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}>
                    <span className="mt-0.5">{notification.type === "success" ? "✨" : "⚠️"}</span>
                    <div className="flex-1">
                      <p className="font-extrabold uppercase tracking-wider text-[9px] font-mono opacity-80">
                        {notification.type === "success" ? "MySQL Success" : "Database Alert"}
                      </p>
                      <p className="leading-tight">{notification.text}</p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-semibold rounded-xl flex items-start space-x-1.5 animate-fadeIn">
                    <span className="mt-0.5">⚠️</span>
                    <span>{formError}</span>
                  </div>
                )}

                {/* Scrollable Form Body Container with consistent height */}
                <div className="h-[360px] font-sans text-slate-800">
                  {activeForm === "referral" ? (
                    referralFeedback ? (
                      <div className="h-full flex flex-col justify-between animate-scaleUp text-center">
                        <div className="flex-1 overflow-y-auto py-6 text-center space-y-4 pr-1 sm:pr-[7px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                          <div className="w-12 h-12 bg-care-green/10 text-care-green rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <CheckCircle2 className="w-6 h-6 text-care-green" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs.5 font-black text-gov-blue uppercase tracking-wide">
                              Pre-Admission Dossier Initiated
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                              Thank you, <strong>{referralForm.commissionerName}</strong>. The placement file for <strong>{referralForm.serviceUserName}</strong> has been secured on our system.
                            </p>
                            <p className="text-[10px] text-care-green font-bold leading-tight">
                              Our clinical registrar Salman Muhammad will complete the 48-hour assessment audit.
                            </p>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-left space-y-1 text-[10.5px] text-slate-600 max-w-sm mx-auto">
                            <div className="flex justify-between font-bold border-b border-slate-150 pb-1 text-gov-blue">
                              <span>Diagnostic Stream</span>
                              <span>Care Day Ratio</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span>{referralForm.diagnosis}</span>
                              <span className="font-extrabold text-gov-blue">{referralForm.requiredRatios}</span>
                            </div>
                            <div className="text-[9.5px] text-slate-400 mt-1 border-t border-slate-100 pt-1 text-center font-sans">
                              A formal validation digest was routed to: <strong className="text-slate-600">{referralForm.email}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 bg-white">
                          <button
                            type="button"
                            onClick={() => {
                              setReferralFeedback(false);
                              setReferralForm({
                                commissionerName: "",
                                authority: "",
                                email: "",
                                phone: "",
                                serviceUserName: "",
                                dob: "",
                                diagnosis: "Learning Disabilities & Autism Mix",
                                fundingStatus: "Secured",
                                riskDetails: "",
                                requiredRatios: "1:1 Support Day & night",
                                authorityType: "CCG (NHS Commissioning)"
                              });
                            }}
                            className="text-xs font-bold text-care-green hover:underline cursor-pointer block mx-auto py-2"
                          >
                            Lodge Another Placement Referral
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleReferralSubmit} className="h-full flex flex-col justify-between text-left">
                        <div className="flex-1 overflow-y-auto pr-1 sm:pr-[7px] space-y-3 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Assessor Title / Name *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Sarah Jenkins"
                                value={referralForm.commissionerName}
                                onChange={(e) => setReferralForm({ ...referralForm, commissionerName: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Placing Authority *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Bir. City Council"
                                value={referralForm.authority}
                                onChange={(e) => setReferralForm({ ...referralForm, authority: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Secure / Official Email *
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. s.jenkins@secure-email.co.uk"
                                value={referralForm.email}
                                onChange={(e) => setReferralForm({ ...referralForm, email: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Direct Telephone *
                              </label>
                              <input
                                type="tel"
                                required
                                placeholder="e.g. 0121 496 0192"
                                value={referralForm.phone}
                                onChange={(e) => setReferralForm({ ...referralForm, phone: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Resident Identifier / Initial *
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Client JW"
                                value={referralForm.serviceUserName}
                                onChange={(e) => setReferralForm({ ...referralForm, serviceUserName: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Date of Birth *
                              </label>
                              <input
                                type="date"
                                required
                                value={referralForm.dob}
                                onChange={(e) => setReferralForm({ ...referralForm, dob: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 font-sans text-slate-400"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Primary Diagnostic Profile
                            </label>
                            <select
                              value={referralForm.diagnosis}
                              onChange={(e) => setReferralForm({ ...referralForm, diagnosis: e.target.value })}
                              className="w-full text-xs font-bold text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                            >
                              <option value="Autism (Sensory Calibration Needs)">Autism (Sensory Calibration Needs)</option>
                              <option value="Learning Disabilities Only">Learning Disabilities Only</option>
                              <option value="Learning Disabilities & Autism Mix">Learning Disabilities & Autism Mix</option>
                              <option value="Complex Associated Mental Health">Complex Associated Mental Health</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Suggested Day Support Ratio
                              </label>
                              <select
                                value={referralForm.requiredRatios}
                                onChange={(e) => setReferralForm({ ...referralForm, requiredRatios: e.target.value })}
                                className="w-full text-xs font-bold text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              >
                                <option value="1:1 Support Day & night">1:1 Support (Day & Night)</option>
                                <option value="1:1 Day, Shared Night">1:1 Day, Shared Night</option>
                                <option value="2:1 Staffing Capabilities">2:1 Staffing Capabilities</option>
                                <option value="Shared Core Framework">Shared Core Framework</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Funding Sign-off Status
                              </label>
                              <select
                                value={referralForm.fundingStatus}
                                onChange={(e) => setReferralForm({ ...referralForm, fundingStatus: e.target.value })}
                                className="w-full text-xs font-bold text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              >
                                <option value="Secured">Secured (Full Authority)</option>
                                <option value="Awaiting Assessment Panel">Awaiting Assessment Panel</option>
                                <option value="Joint funding (LA / NHS CHC)">Joint funding (LA / NHS CHC)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Historical Triggers, Risks, or Specific Goals
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Current placement situation, specific sensory challenges, positive behavioural support (PBS) milestones required..."
                              value={referralForm.riskDetails}
                              onChange={(e) => setReferralForm({ ...referralForm, riskDetails: e.target.value })}
                              className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 resize-none font-sans"
                            />
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-slate-100 bg-white space-y-1.5">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-gov-blue hover:bg-care-green text-white font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-xs shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <Clock className="w-3.5 h-3.5 animate-spin text-white" />
                                <span>TRANSMITTING ADMISSION CASE FILE...</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3.5 h-3.5" />
                                <span>FILE SECURE ADMISSION REFERRAL</span>
                              </>
                            )}
                          </button>

                          <div className="text-[9px] text-slate-400 text-center font-sans tracking-wide">
                            🔒 256-bit Encrypted compliant with NHS IG & GDPR requirements
                          </div>
                        </div>
                      </form>
                    )
                  ) : (
                    contactFeedback ? (
                      <div className="h-full flex flex-col justify-between animate-scaleUp text-center">
                        <div className="flex-1 overflow-y-auto py-8 text-center space-y-4 pr-1 sm:pr-[7px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                          <div className="w-12 h-12 bg-care-purple/10 text-care-purple rounded-full flex items-center justify-center mx-auto">
                            <HeartHandshake className="w-6 h-6 text-gov-blue" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs.5 font-black text-gov-blue uppercase tracking-wide">
                              Family Message Received
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                              Dear <strong>{generalForm.name}</strong>, thank you for writing to us. Your consultation request has been successfully registered.
                            </p>
                            <p className="text-[9.5px] text-slate-400 font-sans">
                              A compassionate support specialist will contact you shortly via <strong>{generalForm.email}</strong> to discuss your relative's needs.
                            </p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 bg-white">
                          <button
                            type="button"
                            onClick={() => {
                              setContactFeedback(false);
                              setGeneralForm({
                                name: "",
                                email: "",
                                phone: "",
                                relation: "Family Member / Guardian",
                                message: ""
                              });
                            }}
                            className="text-xs font-bold text-gov-blue hover:underline cursor-pointer block mx-auto py-2"
                          >
                            Send Another Query
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleGeneralSubmit} className="h-full flex flex-col justify-between text-left">
                        <div className="flex-1 overflow-y-auto pr-1 sm:pr-[7px] space-y-3 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Your Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. David Jenkins"
                              value={generalForm.name}
                              onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                              className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Relationship to Resident
                            </label>
                            <select
                              value={generalForm.relation}
                              onChange={(e) => setGeneralForm({ ...generalForm, relation: e.target.value })}
                              className="w-full text-xs font-bold text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                            >
                              <option value="Family Member / Guardian">Family Member / Guardian</option>
                              <option value="Potential Placement Broker">Social Worker / Placement Broker</option>
                              <option value="Care Candidate / Support Practitioner">Job / Career Candidate</option>
                              <option value="General UK Citizen inquiry">General Inquiry</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Contact Email Address *
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. d.jenkins@gmail.com"
                                value={generalForm.email}
                                onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                                Phone Number (Optional)
                              </label>
                              <input
                                type="tel"
                                placeholder="e.g. 07912 345678"
                                value={generalForm.phone}
                                onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                                className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Consultation details / Specific Needs *
                            </label>
                            <textarea
                              rows={4}
                              required
                              placeholder="Please explain how we can best assist your family relative... we provide sensory calibration and trauma-informed support living plans."
                              value={generalForm.message}
                              onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                              className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 resize-none font-sans"
                            />
                          </div>
                        </div>

                        <div className="pt-1.5 border-t border-slate-100 bg-white">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-gov-blue hover:bg-care-green text-white font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-xs shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <Clock className="w-3.5 h-3.5 animate-spin text-white" />
                                <span>SUBMITTING DIALOGUE INTAKE...</span>
                              </>
                            ) : (
                              <>
                                <HeartHandshake className="w-3.5 h-3.5" />
                                <span>SUBMIT CONSULTATION REQUEST</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )
                  )}
                </div>
              </motion.div>
            </div>

          </div>

          {/* Info Grid: Key Hotlines & Contact Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-slate-800">
            <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl flex items-start space-x-4">
              <span className="p-3 bg-sky-50 text-sky-700 rounded-xl">
                <Phone className="w-5 h-5 text-sky-600" />
              </span>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                  Direct Referrals Hotline
                </span>
                <p className="font-extrabold text-sm text-slate-900">+44 (0) 7904 908123</p>
                <p className="text-xs text-slate-500">Mon - Fri, 8am to 6pm GMT</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl flex items-start space-x-4">
              <span className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                <Mail className="w-5 h-5 text-care-green" />
              </span>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                  Secured Email Channel
                </span>
                <p className="font-extrabold text-sm text-slate-900 font-sans">info@procarehomes.co.uk</p>
                <p className="text-xs text-slate-500">PRO Care Homes encrypted secure channel</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl flex items-start space-x-4">
              <span className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
                <MapPin className="w-5 h-5 text-gov-blue" />
              </span>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                  Registered Headquarters
                </span>
                <p className="font-extrabold text-sm text-slate-900">PRO Care Homes Ltd</p>
                <p className="text-xs text-slate-500">Gloucestershire Office Frameworks, UK</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
