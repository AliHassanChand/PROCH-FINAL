import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  HeartHandshake, 
  UserCheck, 
  ChevronRight, 
  HeartPulse,
  Lock,
  Clock,
  CheckCircle2
} from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Referral Framework form states
  const [homepageActiveForm, setHomepageActiveForm] = useState<"referral" | "contact_us">("contact_us");
  const [homeReferralFeedback, setHomeReferralFeedback] = useState(false);
  const [homeContactFeedback, setHomeContactFeedback] = useState(false);
  const [homeFormError, setHomeFormError] = useState<string | null>(null);
  const [homepageIsSubmitting, setHomepageIsSubmitting] = useState<boolean>(false);

  const [homepageReferralForm, setHomepageReferralForm] = useState({
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

  const [homepageGeneralForm, setHomepageGeneralForm] = useState({
    name: "",
    email: "",
    phone: "",
    relation: "Family Member / Guardian",
    message: ""
  });

  const handleHomepageReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homepageReferralForm.commissionerName || !homepageReferralForm.email || !homepageReferralForm.serviceUserName) {
      setHomeFormError("Please fill in high priority validation fields (Your Name, email, and Resident Name).");
      return;
    }
    setHomeFormError(null);
    setHomepageIsSubmitting(true);
    
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homepageReferralForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit referral to MySQL database.");
      }

      setHomepageIsSubmitting(false);
      setHomeReferralFeedback(true);
    } catch (err: any) {
      console.error("Homepage referral submission failed:", err);
      setHomepageIsSubmitting(false);
      setHomeFormError(err.message || "Could not save referral to secure database. Connection to Hostinger MySQL failed.");
    }
  };

  const handleHomepageGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homepageGeneralForm.name || !homepageGeneralForm.email || !homepageGeneralForm.message) {
      setHomeFormError("Please fill in high priority validation fields (Your Name, email, and Consultation Message).");
      return;
    }
    setHomeFormError(null);
    setHomepageIsSubmitting(true);

    try {
      const res = await fetch("/api/family_messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homepageGeneralForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Family Message Can't Received");
      }

      setHomepageIsSubmitting(false);
      setHomeContactFeedback(true);
    } catch (err: any) {
      console.error("Homepage inquiry submission failed:", err);
      setHomepageIsSubmitting(false);
      setHomeFormError(err.message || "Could not save query to secure database. Connection to Hostinger MySQL failed.");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 lg:py-24 xl:py-32 flex items-center bg-gradient-to-br from-white via-warm-bg to-care-green/5 overflow-hidden text-slate-800"
    >
      {/* Absolute Decorative Blobs for premium ambiance */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gov-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-care-green/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Primary messaging column */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6 sm:space-y-8">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gov-blue/[0.04] px-3.5 py-1.5 rounded-full border border-gov-blue/10"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-gov-blue animate-pulse" />
              <span className="text-xs font-semibold text-gov-blue tracking-wide font-sans">
                Registered UK Healthcare Provider • CQC Registered Operations
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-2xl xs:text-3.5xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[48px] 2xl:text-[54px] font-extrabold text-gov-blue tracking-tight leading-tight sm:leading-[1.12] font-sans">
                Creating <span className="text-calm-blue">Homes</span>, Building
                <span className="block text-care-green border-b-2 border-premium-gold/40 pb-0.5 mt-1 sm:mt-2 w-fit lg:inline-block">Meaningful Lives</span>
              </h1>
              
              <div className="space-y-4 text-text-secondary max-w-2xl">
                <p className="text-sm sm:text-base font-medium text-gov-blue/80 leading-relaxed">
                  PRO Care Homes provides high-quality, person-centred support designed to promote independence across our key service areas:
                </p>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start space-x-3 text-sm sm:text-[15px] leading-relaxed text-text-primary">
                    <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-care-green" />
                    <span><strong>Fully compliant specialist residential support</strong> for adults with learning disabilities and autism options.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-sm sm:text-[15px] leading-relaxed text-text-primary">
                    <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-calm-blue" />
                    <span><strong>Supported living, independent living and preparation for adulthood.</strong> Supporting our people out and about in their community as well as their homes, through unregulated support.</span>
                  </li>
                </ul>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-base sm:text-lg font-black text-gov-blue tracking-tight">
                    Quick referrals, Caring admissions, Stable placements.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 sm:gap-6 items-center text-xs text-text-secondary font-sans font-semibold tracking-wide text-slate-500"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-care-green rounded-full animate-ping" />
                <span>ACTIVE CQC FRAMEWORK</span>
              </div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div>PBS CERTIFIED STAFF</div>
              <div className="hidden sm:block text-slate-300">•</div>
              <div>PERSONALISED SUPPORT DESIGNS</div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Prominent Referral Framework Section in Top Right with increased padding and centered layout */}
          <div className="lg:col-span-12 xl:col-span-5 relative py-10 sm:py-14 xl:py-6 flex justify-center items-center w-full" id="referral-framework">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-lg bg-white border border-gov-blue/15 shadow-2xl rounded-3xl p-5 sm:p-7.5 space-y-4.5 sm:space-y-5.5 relative overflow-hidden"
            >
              {/* Decorative NHS blue / Care green secure accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-care-green to-gov-blue" />
              
              {/* Card Title & Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
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

              {/* Tab Selector for Referral Framework */}
              <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setHomepageActiveForm("referral");
                    setHomeFormError(null);
                  }}
                  className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    homepageActiveForm === "referral"
                      ? "bg-white text-gov-blue shadow-sm"
                      : "text-slate-500 hover:text-gov-blue"
                  }`}
                >
                  Local Authority Referral
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHomepageActiveForm("contact_us");
                    setHomeFormError(null);
                  }}
                  className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    homepageActiveForm === "contact_us"
                      ? "bg-white text-gov-blue shadow-sm"
                      : "text-slate-500 hover:text-gov-blue"
                  }`}
                >
                  General Family Inquiry
                </button>
              </div>

              {homeFormError && (
                <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-semibold rounded-xl flex items-start space-x-1.5 animate-fadeIn">
                  <span className="mt-0.5">⚠️</span>
                  <span>{homeFormError}</span>
                </div>
              )}

              {/* Scrollable Form Body Container with consistent height */}
              <div className="h-[360px] font-sans">
                {homepageActiveForm === "referral" ? (
                  homeReferralFeedback ? (
                    <div className="h-full flex flex-col justify-between animate-scaleUp">
                      <div className="flex-1 overflow-y-auto py-6 text-center space-y-4 pr-1 sm:pr-[7px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                        <div className="w-12 h-12 bg-care-green/10 text-care-green rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6 text-care-green" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs.5 font-black text-gov-blue uppercase tracking-wide">
                            Pre-Admission Dossier Initiated
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                            Thank you, <strong>{homepageReferralForm.commissionerName}</strong>. The placement file for <strong>{homepageReferralForm.serviceUserName}</strong> has been secured on our system.
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
                            <span>{homepageReferralForm.diagnosis}</span>
                            <span className="font-extrabold text-gov-blue">{homepageReferralForm.requiredRatios}</span>
                          </div>
                          <div className="text-[9.5px] text-slate-400 mt-1 border-t border-slate-100 pt-1 text-center">
                            A formal validation digest was routed to: <strong className="text-slate-600">{homepageReferralForm.email}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100 bg-white">
                        <button
                          type="button"
                          onClick={() => {
                            setHomeReferralFeedback(false);
                            setHomepageReferralForm({
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
                    <form onSubmit={handleHomepageReferralSubmit} className="h-full flex flex-col justify-between">
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
                              value={homepageReferralForm.commissionerName}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, commissionerName: e.target.value })}
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
                              value={homepageReferralForm.authority}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, authority: e.target.value })}
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
                              value={homepageReferralForm.email}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, email: e.target.value })}
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
                              value={homepageReferralForm.phone}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, phone: e.target.value })}
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
                              value={homepageReferralForm.serviceUserName}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, serviceUserName: e.target.value })}
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
                              value={homepageReferralForm.dob}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, dob: e.target.value })}
                              className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 font-sans text-slate-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Primary Diagnostic Profile
                          </label>
                          <select
                            value={homepageReferralForm.diagnosis}
                            onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, diagnosis: e.target.value })}
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
                              value={homepageReferralForm.requiredRatios}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, requiredRatios: e.target.value })}
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
                              value={homepageReferralForm.fundingStatus}
                              onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, fundingStatus: e.target.value })}
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
                            value={homepageReferralForm.riskDetails}
                            onChange={(e) => setHomepageReferralForm({ ...homepageReferralForm, riskDetails: e.target.value })}
                            className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 resize-none font-sans"
                          />
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 bg-white space-y-1.5">
                        <button
                          type="submit"
                          disabled={homepageIsSubmitting}
                          className="w-full py-2.5 bg-gov-blue hover:bg-care-green text-white font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-xs shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                        >
                          {homepageIsSubmitting ? (
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
                  homeContactFeedback ? (
                    <div className="h-full flex flex-col justify-between animate-scaleUp">
                      <div className="flex-1 overflow-y-auto py-8 text-center space-y-4 pr-1 sm:pr-[7px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                        <div className="w-12 h-12 bg-care-purple/10 text-care-purple rounded-full flex items-center justify-center mx-auto">
                          <HeartHandshake className="w-6 h-6 text-gov-blue" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs.5 font-black text-gov-blue uppercase tracking-wide">
                            Family Message Received
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                            Dear <strong>{homepageGeneralForm.name}</strong>, thank you for writing to us. Your consultation request has been successfully registered.
                          </p>
                          <p className="text-[9.5px] text-slate-400 font-sans">
                            A compassionate support specialist will contact you shortly via <strong>{homepageGeneralForm.email}</strong> to discuss your relative's needs.
                          </p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100 bg-white">
                        <button
                          type="button"
                          onClick={() => {
                            setHomeContactFeedback(false);
                            setHomepageGeneralForm({
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
                    <form onSubmit={handleHomepageGeneralSubmit} className="h-full flex flex-col justify-between">
                      <div className="flex-1 overflow-y-auto pr-1 sm:pr-[7px] space-y-3 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. David Jenkins"
                            value={homepageGeneralForm.name}
                            onChange={(e) => setHomepageGeneralForm({ ...homepageGeneralForm, name: e.target.value })}
                            className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Relationship to Resident
                          </label>
                          <select
                            value={homepageGeneralForm.relation}
                            onChange={(e) => setHomepageGeneralForm({ ...homepageGeneralForm, relation: e.target.value })}
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
                              value={homepageGeneralForm.email}
                              onChange={(e) => setHomepageGeneralForm({ ...homepageGeneralForm, email: e.target.value })}
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
                              value={homepageGeneralForm.phone}
                              onChange={(e) => setHomepageGeneralForm({ ...homepageGeneralForm, phone: e.target.value })}
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
                            value={homepageGeneralForm.message}
                            onChange={(e) => setHomepageGeneralForm({ ...homepageGeneralForm, message: e.target.value })}
                            className="w-full text-xs font-medium text-gov-blue bg-slate-50/50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-care-green/20 resize-none font-sans"
                          />
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 bg-white">
                        <button
                          type="submit"
                          disabled={homepageIsSubmitting}
                          className="w-full py-2.5 bg-gov-blue hover:bg-care-green text-white font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-xs shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                        >
                          {homepageIsSubmitting ? (
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
      </div>
    </section>
  );
}
