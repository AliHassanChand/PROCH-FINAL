import React, { useState } from "react";
import { 
  FileCheck2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HeartHandshake, 
  UserRoundPlus, 
  CheckCircle2, 
  Activity, 
  Users, 
  Sparkles, 
  ClipboardCheck, 
  Building 
} from "lucide-react";
import PageHero from "./PageHero.tsx";

interface ReferralsProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Referrals({ onNavigate }: ReferralsProps) {
  const [referralFeedback, setReferralFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
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

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralForm.commissionerName || !referralForm.email || !referralForm.serviceUserName) {
      setFormError("Please fill in high priority validation fields (Your Name, email, and Resident Name).");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/local_authority_referrals.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(referralForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit referral to MySQL database.");
      }

      setIsSubmitting(false);
      setReferralFeedback(true);
      // Reset form on success
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
    } catch (err: any) {
      console.error("Referrals submission failed:", err);
      setIsSubmitting(false);
      setFormError(err.message || "Could not save referral to secure database. Connection to Hostinger MySQL failed.");
    }
  };

  const placementSteps = [
    {
      step: "01",
      title: "Initial Secure Request",
      desc: "Commissioners or NHS brokers upload support profiles. Files undergo isolation protocols for digital confidentiality compliance.",
      time: "Within 4 Hours"
    },
    {
      step: "02",
      title: "MDT Desktop Review",
      desc: "Nominated Individual Boston Murray reviews files against existing resident matrix profiles to evaluate environmental compatibility.",
      time: "Within 24 Hours"
    },
    {
      step: "03",
      title: "In-Person Assessment",
      desc: "An on-site face-to-face assessment is conducted at the current provider or family home to establish precise communication profiles.",
      time: "Within 48 Hours"
    },
    {
      step: "04",
      title: "Staged Transition Plan",
      desc: "Individualized sensory visits, tea-visits, and sleepovers are scheduled at 6 Flags House before finalized funding sign-offs.",
      time: "Tailor-planned"
    }
  ];

  return (
    <div id="referrals-view" className="animate-fadeIn">
      <PageHero sectionId="referrals" onNavigate={onNavigate} />
      
      <section id="referrals" className="py-20 bg-warm-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Local Authority Pathway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-gov-blue/5 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 bg-gov-blue/5 text-gov-blue rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-gov-blue" />
            </div>
            <h3 className="font-extrabold text-xs text-gov-blue uppercase font-mono tracking-wider">Social Services Teams</h3>
            <p className="text-xs text-text-secondary leading-normal">
              Direct frameworks for local government complex social services sourcing, supported living step-downs, and CQC compliant residential packages.
            </p>
          </div>

          <div className="bg-white border border-gov-blue/5 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 bg-care-green/10 text-care-green rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-care-green" />
            </div>
            <h3 className="font-extrabold text-xs text-gov-blue uppercase font-mono tracking-wider">NHS Integrated Care Boards</h3>
            <p className="text-xs text-text-secondary leading-normal">
              Specialized fast-track placements for Continuing Healthcare (CHC) packages, Section 117 Aftercare, and hospital discharges.
            </p>
          </div>

          <div className="bg-white border border-gov-blue/5 p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 bg-premium-gold/15 text-premium-gold rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-premium-gold" />
            </div>
            <h3 className="font-extrabold text-xs text-gov-blue uppercase font-mono tracking-wider">Placement Brokers</h3>
            <p className="text-xs text-text-secondary leading-normal">
              Live updates on void availabilities, en-suite configurations, compatibility metrics and on-duty staffing ratios for instantaneous allocation.
            </p>
          </div>
        </div>

        {/* Step by Step Referral workflow */}
        <div className="bg-white border border-gov-blue/5 rounded-3xl p-8 sm:p-12 mb-16 shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-care-green font-mono block">OUR REPUTATION IN ACTION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-blue">Our Structured Admission Timeline</h2>
            <div className="w-12 h-1 bg-care-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {placementSteps.map((step, idx) => (
              <div key={idx} className="space-y-3.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gov-blue/15 font-mono">{step.step}</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                    {step.time}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Secure channels tickers */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-600">
            <div className="flex items-center space-x-2 text-emerald-700 font-semibold font-mono">
              <ShieldCheck className="w-4 h-4 text-care-green" />
              <span>PRO CARE SECURE RECEIPT: info@procarehomes.co.uk</span>
            </div>
            <div className="flex items-center space-x-2 text-gov-blue font-semibold font-mono">
              <ClipboardCheck className="w-4 h-4 text-premium-gold" />
              <span>CQC Registered Provider Framework System</span>
            </div>
          </div>
        </div>

        {/* Placement Referral Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 block">
              <h3 className="font-extrabold text-lg tracking-tight">Commissioner Guidelines</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We accept secure digital submissions or secure email queries. Standard pre-admission compatibility screening begins instantly upon entry.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-xs">
                  <span className="p-2 bg-slate-800 rounded-lg text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Direct referrals hotline</span>
                    <p className="font-bold">+44 (0) 7904 908123</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs">
                  <span className="p-2 bg-slate-800 rounded-lg text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Secure email channel</span>
                    <p className="font-bold">info@procarehomes.co.uk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-care-green/10 border border-care-green/20 rounded-2xl p-6 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block font-mono">
                COMPATIBILITY STANDARDS:
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Before admitting any individual to 6 Flags House, support managers compare cognitive milestones, sensory profiles, and physical environment needs to ensure a peaceful living dynamic for all residents.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-gov-blue/5 p-6 sm:p-10 rounded-3xl">
            {referralFeedback ? (
              <div className="bg-emerald-50/50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 animate-scaleUp">
                <div className="w-12 h-12 bg-emerald-650 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Referral Securely Lodged</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  Thank you for submitting a referral for <strong>{referralForm.serviceUserName}</strong>. Our support team audited by Nominated Individual <strong>Boston Murray</strong> will review this file and coordinate with your team at <strong>{referralForm.authority}</strong>. Initial placement compatibility review will be returned within 48 business hours.
                </p>
                <button
                  onClick={() => { setReferralFeedback(false); setReferralForm({ commissionerName: "", authority: "", email: "", phone: "", serviceUserName: "", dob: "", diagnosis: "Learning Disabilities & Autism Mix", fundingStatus: "Secured", riskDetails: "", requiredRatios: "1:1 Support Day & night", authorityType: "CCG (NHS Commissioning)" }); }}
                  className="text-xs text-sky-700 hover:underline font-bold"
                >
                  Submit another professional referral
                </button>
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit} className="space-y-6 font-sans text-xs text-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Secure Commissioner Referral Dossier Form</h3>
                  <p className="text-slate-500 text-[11.5px] mt-1">For UK Local Authorities, Integrated Care Boards (ICB/CCG), and social care brokers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Commissioner / Assessor Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Cartwright, Case Manager"
                      value={referralForm.commissionerName}
                      onChange={(e) => setReferralForm({ ...referralForm, commissionerName: e.target.value })}
                      className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Authority Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Birmingham City Council / NHS CHC"
                      value={referralForm.authority}
                      onChange={(e) => setReferralForm({ ...referralForm, authority: e.target.value })}
                      className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Secure / Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. d.cartwright@secure-email.co.uk"
                      value={referralForm.email}
                      onChange={(e) => setReferralForm({ ...referralForm, email: e.target.value })}
                      className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Commissioning Body Type</label>
                    <select
                      value={referralForm.authorityType}
                      onChange={(e) => setReferralForm({ ...referralForm, authorityType: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-205 rounded-lg font-medium"
                    >
                      <option>Sourcing Hub / Local Authority</option>
                      <option>CCG (NHS Commissioning)</option>
                      <option>Continuing Healthcare (CHC)</option>
                      <option>Private Placement Sourcing</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Resident Identifier / Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Client JW"
                      value={referralForm.serviceUserName}
                      onChange={(e) => setReferralForm({ ...referralForm, serviceUserName: e.target.value })}
                      className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Resident Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={referralForm.dob}
                      onChange={(e) => setReferralForm({ ...referralForm, dob: e.target.value })}
                      className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Diagnostic Classification</label>
                    <select
                      value={referralForm.diagnosis}
                      onChange={(e) => setReferralForm({ ...referralForm, diagnosis: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-205 rounded-lg font-medium"
                    >
                      <option>Autism Spectrum Condition</option>
                      <option>Learning Disabilities Only</option>
                      <option>Learning Disabilities & Autism Mix</option>
                      <option>Complex Associated Mental Health</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Suggested Staff Ratios</label>
                    <select
                      value={referralForm.requiredRatios}
                      onChange={(e) => setReferralForm({ ...referralForm, requiredRatios: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-205 rounded-lg font-medium"
                    >
                      <option>1:1 Support Day & night</option>
                      <option>1:1 Day, Shared Night</option>
                      <option>2:1 Staffing Capabilities Day</option>
                      <option>Shared Support Framework</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-705 block">Funding Sign-off</label>
                    <select
                      value={referralForm.fundingStatus}
                      onChange={(e) => setReferralForm({ ...referralForm, fundingStatus: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-205 rounded-lg font-medium"
                    >
                      <option>Secured</option>
                      <option>Awaiting Assessment Panel</option>
                      <option>Joint Funding (Health/SocialCare)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-705 block">Complex behaviours/forensic/risk history details to manage</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details on past placement breakdowns, specific sensory needs, communication barriers, or environmental requirements..."
                    value={referralForm.riskDetails}
                    onChange={(e) => setReferralForm({ ...referralForm, riskDetails: e.target.value })}
                    className="w-full p-2.5 bg-warm-bg border border-slate-205 rounded-lg text-slate-800 font-sans"
                  />
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium animate-shake">
                    ⚠️ {formError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gov-blue hover:bg-gov-blue/90 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-55"
                >
                  <FileCheck2 className={`w-4 h-4 text-premium-gold ${isSubmitting ? "animate-spin" : ""}`} />
                  <span>{isSubmitting ? "Filing Referral Securely..." : "File Secure Admission Referral"}</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  </div>
);
}
