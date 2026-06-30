import React, { useState } from "react";
import { 
  FileText, 
  ShieldAlert, 
  HelpCircle, 
  Scale, 
  Lock, 
  Briefcase, 
  Search, 
  CheckCircle, 
  BookOpen, 
  Download, 
  FileSignature 
} from "lucide-react";
import PageHero from "./PageHero.tsx";

interface PoliciesProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Policies({ onNavigate }: PoliciesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] = useState("all");
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  const policyItems = [
    {
      id: "safeguarding",
      title: "Safeguarding Adults Policy & System Control",
      code: "POL-SG-101",
      category: "safeguarding",
      lastReviewed: "April 2026",
      summary: "Strict zero-tolerance policy against abuse. Defines physical, emotional, and institutional neglect with direct statutory reporting frameworks to local safeguarding boards.",
      highlights: [
        "Immediate reporting thresholds (under 2 Hours)",
        "Fully trained Designated Safeguarding Leads (DSL)",
        "Direct synchronization with CQC notification guidelines",
        "Staff whistleblowing immunity guaranteed"
      ]
    },
    {
      id: "complaints",
      title: "Complaints, Grievances & Resolution Procedure",
      code: "POL-COMP-202",
      category: "governance",
      lastReviewed: "March 2026",
      summary: "Establishes a dignified, non-punitive system for family members, social workers, and residents to log complaints, ensuring structured timelines for transparent resolution.",
      highlights: [
        "Receipt acknowledgment inside 24 working hours",
        "Formal investigation findings reported within 14 days",
        "Independent mediation pathways detailed",
        "Resident-accessible pictorial complaint guides"
      ]
    },
    {
      id: "governance",
      title: "Quality & Operational Governance Framework",
      code: "POL-GOV-303",
      category: "governance",
      lastReviewed: "May 2026",
      summary: "Oversight of care delivery standards, positive safety audits, documentation structures (Nourish), medication double-administrations, and quality support metrics.",
      highlights: [
        "Monthly independent Regulation 17 style audits",
        "MDT quality circles checking restrictive practice reductions",
        "Nourish live daily audits by Corporate Managers",
        "Strict incident reporting with systemic root cause analysis"
      ]
    },
    {
      id: "equality",
      title: "Equality, Diversity & Anti-Discriminatory Conduct",
      code: "POL-ED-404",
      category: "ethics",
      lastReviewed: "January 2026",
      summary: "Ensures no resident or colleague experiences barriers relating to neurotype, disability, gender, biological sex, race, spiritual practice or lifestyle choice.",
      highlights: [
        "Bespoke cultural dietary plans integrated into main menus",
        "Inclusive communication audits including sensory diets",
        "Active staff diversity training calendars",
        "Strict anti-discriminatory checks during job recruitment"
      ]
    },
    {
      id: "privacy",
      title: "Information Governance & GDPR Data Privacy",
      code: "POL-GDPR-505",
      category: "privacy",
      lastReviewed: "December 2025",
      summary: "Maintains full alignment with UK GDPR and NHS Information Governance Toolkits to guarantee robust confidentiality for patient care records and digital files.",
      highlights: [
        "Nourish recording dashboards encrypted at rest (AES-256)",
        "Mandatory annual data privacy training for all staff",
        "Secure physical storage for legal physical dossiers",
        "Clear resident-accessible Subject Access Request (SAR)"
      ]
    },
    {
      id: "recruitment",
      title: "Values-Based & Safeguarding Recruitment Protocol",
      code: "POL-REC-606",
      category: "recruitment",
      lastReviewed: "February 2026",
      summary: "Details our pre-employment inspection routines to prevent unsuitable individuals from joining PRO Care Homes teams, keeping residents exceptionally safe.",
      highlights: [
        "Enhanced DBS checks with Adult Barred List audits",
        "Full 5-year unbroken history verification",
        "Mandatory face-to-face values exploration panels",
        "Unplanned probation quality checks"
      ]
    }
  ];

  const filteredPolicies = policyItems.filter((policy) => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          policy.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          policy.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || policy.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="policies-view" className="animate-fadeIn">
      <PageHero sectionId="policies" onNavigate={onNavigate} />
      
      <section id="policies" className="py-20 bg-warm-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Info Box */}
        <div className="bg-gov-blue text-white rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-white/10 px-2 py-0.5 rounded text-premium-gold font-bold">
              NHS & LOCAL AUTHORITY AUDIT ASSURANCE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Active Policy Framework Integrity</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our Policies are updated dynamically in compliance with the Care Standards Act 2000, Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, and current Care Quality Commission (CQC) standards.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 border border-white/10 p-4 rounded-2xl relative z-10">
            <FileSignature className="w-8 h-8 text-premium-gold flex-shrink-0" />
            <div>
              <p className="text-xs font-bold font-mono">AUTHORIZED SCHEME</p>
              <p className="text-[10px] text-slate-350">Safeguarding Approved</p>
            </div>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Operating Frameworks" },
              { id: "safeguarding", label: "Safeguarded Care" },
              { id: "governance", label: "Quality Governance" },
              { id: "recruitment", label: "Professional Sourcing" },
              { id: "ethics", label: "Equal Rights & Inclusion" },
              { id: "privacy", label: "confidentiality" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-care-green text-white"
                    : "bg-white text-slate-650 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search policy titles/guidelines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-205 rounded-xl text-xs text-slate-800"
            />
          </div>

        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPolicies.map((p) => (
            <div key={p.id} className="bg-white border border-gov-blue/5 rounded-3xl p-6 hover:shadow-lg transition-all flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                    {p.code}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Last Reviewed: <strong className="font-semibold text-slate-700">{p.lastReviewed}</strong>
                  </span>
                </div>

                {/* Title & Body */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-gov-blue">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.summary}</p>
                </div>

                {/* Auditable Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block font-mono">
                    Mandated Audit Checkpoints:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-650 font-normal">
                    {p.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start space-x-1.5 leading-normal">
                        <span className="text-care-green mt-0.5 font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* simulated download buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                  Fully Verified
                </span>
                <button 
                  onClick={() => setVerificationStatus(`Policy Document verification successful: ${p.title} is fully verified and compliant.`)}
                  className="flex items-center space-x-1 text-xs text-care-green hover:text-gov-blue font-bold px-3 py-1.5 rounded-lg hover:bg-care-green/5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Interactive Verification</span>
                </button>
              </div>

            </div>
          ))}

          {filteredPolicies.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white/70 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-xs">No policies matched your specific filter/term.</p>
            </div>
          )}
        </div>

        {/* FAQ Safeguarding Section */}
        <section className="bg-white border border-gov-blue/5 p-8 rounded-3xl mb-12 shadow-xs">
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-lg font-extrabold text-care-green">Compliance Whistleblowing & Safeguarding Concerns</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              If you have any immediate concerns regarding a localized safeguarding incident, please do not use standard email templates. Escalations bypass standard hierarchies. You can write directly to our designated safeguarding lead via <strong>safeguarding@procarehomes.co.uk</strong> or telephone the local authority safeguarding crisis team on <strong>+44 (0) 7904 908123</strong>.
            </p>
          </div>
        </section>

        {/* Verification Success Toast */}
        {verificationStatus && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-emerald-500/20 flex items-start space-x-3.5 animate-fadeIn">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl mt-0.5">
              <CheckCircle className="w-5 h-5" />
            </span>
            <div className="flex-1 space-y-1 text-xs">
              <h5 className="font-extrabold text-white">Policy Verification Audit Pass</h5>
              <p className="text-[11px] text-slate-300 leading-normal">{verificationStatus}</p>
              <button 
                onClick={() => setVerificationStatus(null)} 
                className="text-[10px] text-emerald-400 hover:underline font-bold mt-1 block"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  </div>
);
}
