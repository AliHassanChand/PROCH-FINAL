import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Compass, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Users, 
  Lock, 
  Activity, 
  BookOpen, 
  CheckCircle,
  AlertTriangle,
  UserCheck,
  TrendingUp,
  Clock,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Plus,
  Minus
} from "lucide-react";

interface GovernancePagesProps {
  activePageId: "safe" | "effective" | "caring" | "responsive" | "wellled" | "rightsupport";
  onNavigate: (sectionId: string) => void;
}

export default function GovernancePages({ activePageId, onNavigate }: GovernancePagesProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setOpenFaq(null);
  }, [activePageId]);

  const themeByPage = {
    safe: {
      primary: "text-rose-600",
      accentBg: "bg-rose-50",
      borderActive: "border-rose-500",
      iconActive: "text-rose-600",
      badgeText: "SAFE PRACTICE ASSURANCE"
    },
    effective: {
      primary: "text-emerald-600",
      accentBg: "bg-emerald-50",
      borderActive: "border-emerald-500",
      iconActive: "text-emerald-600",
      badgeText: "EFFECTIVE OUTCOMES METHODOLOGY"
    },
    caring: {
      primary: "text-purple-600",
      accentBg: "bg-purple-50",
      borderActive: "border-purple-500",
      iconActive: "text-purple-600",
      badgeText: "FUNDAMENTAL CARING STANDARDS"
    },
    responsive: {
      primary: "text-sky-600",
      accentBg: "bg-sky-50",
      borderActive: "border-sky-500",
      iconActive: "text-sky-600",
      badgeText: "CONTINUOUS IMPROVEMENT PROCESS"
    },
    wellled: {
      primary: "text-indigo-600",
      accentBg: "bg-indigo-50",
      borderActive: "border-indigo-500",
      iconActive: "text-indigo-600",
      badgeText: "GOVERNANCE & LEADERSHIP CHARTER"
    },
    rightsupport: {
      primary: "text-amber-600",
      accentBg: "bg-amber-50",
      borderActive: "border-amber-500",
      iconActive: "text-amber-600",
      badgeText: "RIGHT SUPPORT, CARE & CULTURE"
    }
  };

  const faqDataByPage = {
    safe: [
      {
        q: "How does PRO Care Homes respond to and manage safeguarding alerts?",
        a: "We operate a zero-tolerance policy. Any concern is logged immediately onto our digital care management platform (Nourish), triggering automated alerts to our senior leadership team and the local safeguarding board within 2 hours of the report."
      },
      {
        q: "What role does Positive Behaviour Support (PBS) play in ensuring resident safety?",
        a: "PBS is our primary tool for safety. Instead of using restrictive practices, we analyze communicative triggers, modify the sensory environment, and equip individuals with tailored visual coping tools to reduce distress and prevent incidents."
      },
      {
        q: "How are medication administration errors actively prevented?",
        a: "We utilize electronic Medication Administration Records (eMAR) with barcode scanning. This ensures accurate dosing schedules and mandates secondary digital verification for critical medicines, with regular double-audits by senior practitioners."
      },
      {
        q: "How do you design psychologically safe living environments?",
        a: "Through sensory adaptations. Our home, 6 Flags House, includes non-flicker acoustic lighting, warm temperature controls, soundproofing, and spacious private areas designed to minimize sensory overload and eliminate stress triggers."
      },
      {
        q: "Are staff trained to spot and prevent abuse or neglect?",
        a: "Yes, all team members undergo mandatory Care Certificate training and annual Level 3 Safeguarding training, supplemented by reflective post-incident debriefs to continuously sharpen observation and protective skills."
      },
      {
        q: "How do you maintain transparency with commissioners and regulatory bodies?",
        a: "Every incident, risk assessment, and medication record is stored on an immutable digital ledger. This system is accessible on demand to local authority commissioners, social workers, and CQC inspectors for complete oversight."
      }
    ],
    effective: [
      {
        q: "How do you ensure that care plans are genuinely co-produced with the resident?",
        a: "We use symbol-rich visual guides, communication tools, and speech-and-language resources. Each resident meets weekly with their keyworker to update their personal goals, choosing what they want to cook, achieve, and explore."
      },
      {
        q: "What is the 'Active Support' model and how does it promote independence?",
        a: "Active Support means doing tasks with the individual, not for them. We break down daily routines—like baking, laundry, or gardening—into small, manageable steps, allowing residents to build confidence and practical life skills at their own pace."
      },
      {
        q: "How do you track and measure daily lifestyle and functional outcomes?",
        a: "We measure 32 developmental criteria daily via our digital care system. This allows us to map progress in areas like motor skills, communication, personal care, and social interactions, producing monthly visual reports for review."
      },
      {
        q: "How are multidisciplinary team (MDT) assessments integrated into daily care?",
        a: "Our clinical lead, Boston Murray, coordinates directly with community learning disability teams, occupational therapists, and behavior analysts to translate professional assessments into clear, actionable daily routines for our support staff."
      },
      {
        q: "How do you support healthy nutritional and sensory diets?",
        a: "Each resident has a personalized food and sensory plan. We offer bespoke sensory diets (like swinging, rocking, or deep-pressure activities) alongside customized menus that accommodate food intolerances, swallowing guidelines, and personal preferences."
      },
      {
        q: "How do you ensure staff have the clinical competence to deliver effective support?",
        a: "Our training curriculum includes specialized modules in Autism Spectrum Conditions, PBS, Trauma-Informed Care, and epilepsy management. Competency is assessed through on-floor observations and structured theoretical tests."
      }
    ],
    caring: [
      {
        q: "How does PRO Care Homes uphold the dignity and privacy of each resident?",
        a: "Every resident enjoys a private, lockable en-suite bedroom. Staff always knock and await explicit permission before entering personal spaces, and personal care routines are delivered with maximum sensitivity, privacy, and respect."
      },
      {
        q: "How do you champion and amplify the voice of non-verbal residents?",
        a: "We implement augmentative and alternative communication (AAC) tools, including PECS cards, tablets, and customizable visual schedules. Every team member is trained to read subtle behavioral cues, ensuring no voice is overlooked."
      },
      {
        q: "What steps do you take to support diverse identities, cultures, and beliefs?",
        a: "We co-create individual identity plans that detail cultural preferences, spiritual beliefs, dietary rules, and personal celebrations. We support residents to attend local places of worship, prepare cultural foods, and celebrate key calendar events."
      },
      {
        q: "How do you foster meaningful, values-led companionship?",
        a: "We match residents with support staff who share similar hobbies, musical tastes, or interests. Our matching system ensures that support is not just practical, but built on authentic, warm human relationships."
      },
      {
        q: "How are family members involved in the care circle?",
        a: "We hold monthly family feedback sessions, invite relatives to key planning reviews, and utilize a secure family portal on our digital platform to share daily positive moments, photos, and progress updates."
      },
      {
        q: "What is your approach to supporting resident choices in daily schedules?",
        a: "Choice is paramount. From selecting daily outfits and decor choices to deciding weekend activities and bedtimes, residents hold full autonomy. We utilize visual choice boards to make decision-making accessible and clear."
      }
    ],
    responsive: [
      {
        q: "How do you handle and learn from complaints or constructive feedback?",
        a: "We view feedback as our best path to growth. Compliments, concerns, and formal complaints are logged, analyzed, and reviewed weekly. We host regular, accessible 'Speak Up' meetings to let residents express their views directly."
      },
      {
        q: "What is the process for reviewing and adjusting risk management plans?",
        a: "Rather than avoiding risk, we manage it positively. Risk assessments are reviewed monthly or immediately following any minor incident. We focus on steps that build individual confidence and allow positive risk-taking safely."
      },
      {
        q: "How are lessons learned from post-incident debriefs put into practice?",
        a: "Following any distress or incident, we hold structured, non-blaming debriefs with both the resident and staff. We identify the environmental or physiological triggers and immediately update the care plan with refined support strategies."
      },
      {
        q: "How do you facilitate smooth, personalized transitions into our homes?",
        a: "We use highly personalized introduction schedules. This includes gradual daytime visits, sharing meals, and overnight stays, coupled with a co-produced visual transition book featuring photos of the home and staff to build familiarity."
      },
      {
        q: "How do you support residents who wish to transition to more independent settings?",
        a: "We actively promote pathways to supported living or community independence. We work closely with commissioners to gradually adjust support ratios, teaching budgeting, cooking, and travel skills to prepare residents for their next step."
      },
      {
        q: "What measures are in place to ensure staff training is continually updated?",
        a: "We run a continuous professional development (CPD) program. Support workers have access to advanced training pathways in specialized leadership, clinical practice, and advanced behavioral therapies to ensure our methods remain modern."
      }
    ],
    wellled: [
      {
        q: "How is the clinical quality of PRO Care Homes monitored at the executive level?",
        a: "Our Director, Salman Muhammad, and Registered Practitioner, Boston Murray, conduct weekly on-site quality visits. They personally inspect care logs, speak with residents and staff, and audit clinical standards to ensure strict compliance."
      },
      {
        q: "What role do independent external consultants play in your governance?",
        a: "We employ independent CQC compliance experts to conduct quarterly 'mock inspections.' These rigorous, external audits review our medication systems, safeguarding logs, estate conditions, and staff files to provide unbiased quality benchmarks."
      },
      {
        q: "How does financial stability impact the standard of care provided?",
        a: "Led by accountant Deeshan Walpitagamage, our healthy financial structure enables continuous reinvestment. This guarantees high staff-to-resident ratios, spacious and premium adapted properties, and advanced technological tools like Nourish."
      },
      {
        q: "How do you promote an open, transparent, and honest workplace culture?",
        a: "We maintain a strict open-door policy and a robust, anonymous whistleblowing channel. Staff are encouraged to speak up about improvements, raise clinical suggestions, and challenge existing structures without fear of reprisal."
      },
      {
        q: "How do you track and report key clinical performance metrics?",
        a: "We compile a monthly Clinical Governance Dashboard. This tracks indicators such as incident rates, medication accuracy, training compliance, and family feedback, which is reviewed by the board to trigger immediate proactive adjustments."
      },
      {
        q: "How do you ensure complete alignment with CQC Regulation 17?",
        a: "By establishing clear, written schemes of delegation, structured policy reviews, and robust auditing loops. Every decision, from operational changes to policy updates, is documented, accountable, and easily inspectable."
      }
    ],
    rightsupport: [
      {
        q: "How does PRO Care Homes actively implement the 'Right Support' guidelines?",
        a: "We focus on individual choice and control. Residents are not fit into pre-existing schedules; instead, we build the staffing, daily routines, and local community activities entirely around the personal desires, skills, and goals of each resident."
      },
      {
        q: "What does 'Right Care' look like in practice for autistic individuals?",
        a: "It means deep sensory understanding. We avoid crowded environments, tailor home interiors to match sensory profiles (e.g., using calming colors and acoustic insulation), and ensure that staff communicate using clear, direct, and supportive language."
      },
      {
        q: "How do you foster a 'Right Culture' that rejects old, institutional habits?",
        a: "We promote a domestic, family-like atmosphere. Staff do not wear uniforms, and we reject rigid shift rules. Residents cook, dine, and relax side-by-side with staff, building an inclusive environment where everyone is a valued citizen."
      },
      {
        q: "How do you support residents to build meaningful community relationships?",
        a: "We assist residents to pursue genuine community roles, including local volunteering, sports clubs, art classes, and neighborhood events. We help them maintain close contact with family and build local friendships based on shared hobbies."
      },
      {
        q: "Are residents supported to manage their own personal finances and bank accounts?",
        a: "Absolutely. We co-develop financial capability plans. Through visual budgeting aids, supervised bank visits, and simple shopping logs, we help residents understand money management and retain control over their personal funds."
      },
      {
        q: "How do you ensure that support plans are dynamic and adapt as the individual grows?",
        a: "We run quarterly formal reviews and weekly informal check-ins. If a resident develops a new interest, expresses a change in routine, or shows increased independence, their care plan and support model are immediately updated to reflect their progress."
      }
    ]
  };

  const renderFaqSection = () => {
    const theme = themeByPage[activePageId];
    const faqs = faqDataByPage[activePageId];

    return (
      <section id="governance-methodology-faqs-section" className="py-24 bg-slate-50/70 border-t border-slate-200/60 relative overflow-hidden mt-12">
        {/* Subtle background visual anchor */}
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-slate-200/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.primary} ${theme.accentBg} px-3.5 py-1.5 rounded-full font-mono inline-block`}>
              {theme.badgeText}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-blue tracking-tight">
              Placement & Methodology FAQs
            </h2>
            <div className="w-12 h-1 bg-premium-gold mx-auto rounded-full" />
            <p className="text-slate-500 text-xs leading-relaxed">
              Find transparent answers to families' and clinical commissioners' most frequent inquiries regarding our governance, care quality, and regulatory alignment.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden shadow-xs ${
                    isOpen ? `${theme.borderActive} shadow-md` : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-extrabold text-gov-blue text-xs hover:bg-slate-50/50 transition cursor-pointer select-none"
                  >
                    <div className="flex items-center space-x-3.5">
                      <HelpCircle className={`w-4.5 h-4.5 flex-shrink-0 transition-colors duration-200 ${isOpen ? theme.iconActive : "text-premium-gold"}`} />
                      <span className="font-sans text-[12px] sm:text-[13px] font-bold leading-snug">{faq.q}</span>
                    </div>
                    <span className={`p-1 rounded-lg transition-colors ${isOpen ? `${theme.accentBg} ${theme.primary}` : "bg-slate-100 text-slate-400"}`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 flex-shrink-0" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-[12px] sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100/70 bg-slate-50/40 text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // 1. SAFE CARE PAGE CONTENT & RENDER
  const renderSafePage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-rose-600 font-mono bg-rose-50 px-2.5 py-1 rounded-md">
          CQC Standard: Safe
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          Safeguarding and quality assurance
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          Our priority is to protect our residents from unnecessary danger and distress while promoting positive, healthy risk-taking. We believe true safety is achieved through continuous training, strong behavioral planning, and safe environmental structures rather than restrictions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Operational Safety Pillars
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-rose-600">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Active Positive Support</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our support teams use Positive Behaviour Support (PBS) frameworks. We map individual stressors, communicative needs, and early triggers into supportive, visual coping folders designed to help de-escalate anxiety.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-rose-600">
                <Lock className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Psychologically Informed Environment</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                6 Flags House is designed to feel domestic and warm while maintaining safe standards. Built-in modern temperature regulators, gentle non-flicker acoustic lighting, and spacious layouts minimize environmental sensory overload.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-rose-600">
                <Activity className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Empathetic Safeguarding</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We maintain a robust safeguarding policy integrated with Local Safeguarding Adults Boards (SAB). Our teams are continuously trained to uphold human rights, spot concerns early, and report with absolute transparency.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-rose-600">
                <Clock className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Responsible Medication Safety</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our medication pathways employ digital logs with secondary signature verifications. We work closely with community pharmacies and visiting GPs to ensure that medical regimens are audited, well-balanced, and frequently reviewed.
              </p>
            </div>
          </div>

          {/* CQC Alignment */}
          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">CQC Regulation Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We align with <strong>CQC Regulation 12 (Safe care and treatment)</strong> and <strong>Regulation 13 (Safeguarding)</strong>. Staff receive values-based training to ensure every supportive interaction is gentle, respectful, and grounded in a thorough understanding of positive behavioral pathways.
            </p>
          </div>
        </div>

        {/* Sidebar Status Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono">Safety Oversight Protocols</h4>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="border-l-2 border-rose-500 pl-3 py-1">
                <p className="font-bold text-white">Daily Auditing Logs</p>
                <p className="text-[11px] text-slate-400">Night-shift senior support worker environmental checks and incident tracking.</p>
              </div>
              <div className="border-l-2 border-rose-500 pl-3 py-1">
                <p className="font-bold text-white">Incident Debriefs</p>
                <p className="text-[11px] text-slate-400">Post-distress reflective logs focusing on triggers, comfort, and lessons learned.</p>
              </div>
              <div className="border-l-2 border-rose-500 pl-3 py-1">
                <p className="font-bold text-white">Clinical Support Partners</p>
                <p className="text-[11px] text-slate-400">Proactive partnership with local community learning disability teams (CLDT).</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl text-xs space-y-2">
            <h5 className="font-bold text-rose-900">Important Compliance Note</h5>
            <p className="text-slate-700 leading-relaxed">
              All incident logging is updated via cryptographically locked digital systems (Nourish), preventing backward edits and ensuring absolute transparency for commissioners and families.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. EFFECTIVE OUTCOMES PAGE CONTENT & RENDER
  const renderEffectivePage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-md">
          CQC Standard: Effective
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          Person-centred care and positive outcomes
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          We focus on enabling residents to develop lifelong skills, achieve personal outcomes, and maintain excellent physical health. By co-producing daily schedules, we make learning practical and engaging for every individual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Our Effectiveness Approach
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                <Users className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Multidisciplinary Team Integration</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our homes work closely with community nurses, Speech and Language Therapy (SALT) experts, psychiatrists, and occupational therapists to design well-balanced profiles for sensory and behavioral health.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                <Award className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Active Support & Goal Customisation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We use an Active Support model to make daily tasks manageable and engaging. Instead of doing everything for residents, we break down domestic chores (like preparing snacks or folding laundry) into collaborative steps.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Specialist Sensory & Dietary Plans</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sensory profiles are mapped into environmental triggers. Menus are tailored to dietary needs, texture suitability, and choice, ensuring residents are both healthy and satisfied with their culinary options.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">CQC Regulation Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fully aligned with <strong>CQC Regulation 9 (Person-centred care)</strong> and <strong>Regulation 11 (Need for consent)</strong>. We focus on continuous capability reviews and multi-agency assessments to ensure support is adaptive, evidence-based, and empowering.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-950 text-white p-6 rounded-2xl space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-emerald-400">Our Focus Areas</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Alternative communication methods (Makaton, PECS) implemented across services.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Sensory regulation plans updated quarterly with resident participation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Daily living skill pathways custom-designed for positive risk-taking.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // 3. CARING, DIGNITY & RESPECT PAGE CONTENT & RENDER
  const renderCaringPage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600 font-mono bg-purple-50 px-2.5 py-1 rounded-md">
          CQC Standard: Caring
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          CQC Fundamental Standards
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          Kindness, warmth, and respect form the heart of our culture. We design environments that promote personal autonomy, empower individual voices, and foster meaningful social connections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Upholding Personal Dignity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-purple-600">
                <UserCheck className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">En-Suite Privacy</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                6 Flags House features spacious private bedrooms with full en-suite wetrooms, allowing residents to maintain their personal space and dignity in comfortable surroundings.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-purple-600">
                <FileText className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Easy-Read Care Co-Production</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe care plans should not be written about residents without them. We translate plans into easy-read formats rich with visual symbols, giving residents direct control.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-purple-600">
                <HeartHandshake className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Values-Based Recruitment</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We select our support workers based on their values of compassion, patience, and warmth, reducing staff turnover and ensuring comforting consistency.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-purple-600">
                <BookOpen className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Independent Advocacy Links</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We maintain active channels with independent advocacy networks, giving residents a safe, objective voice outside of the daily care team.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">CQC Regulation Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We align with <strong>CQC Regulation 10 (Dignity and respect)</strong>. Every resident is treated with kindness, and their unique identities, heritages, heritages, and preferences are celebrated and fully supported.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-purple-950 text-white p-6 rounded-2xl space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-purple-300">Dignity Assurances</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <p>Residents have absolute choice over bedroom decor, lighting choices, paint shades, and personal belongings.</p>
              <p>Personal laundry, hygiene assistance, and bathing routines are managed discreetly and respectfully with chosen support workers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. RESPONSIVE CARE & TRANSITIONS PAGE CONTENT & RENDER
  const renderResponsivePage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-sky-600 font-mono bg-sky-50 px-2.5 py-1 rounded-md">
          CQC Standard: Responsive
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          Continuous improvement
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          We believe support packages must adapt to residents as they grow. We respond actively to changing clinical needs, personal interests, transitions, and family feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Responsive Care Framework
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-sky-50 text-sky-600 rounded-xl flex-shrink-0">
                <Compass className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Customized, Staged Transitions</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Moving is a big milestone. We co-create structured transition pathways, facilitating introductory visits, lunch gatherings, overnight stays, and photo albums of our team prior to move-in.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-sky-50 text-sky-600 rounded-xl flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Positive Risk-Taking Pathways</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We empower residents to safely explore local transit systems, cooking skills, and independent social groups with carefully reviewed hazard assessments and gradual support hand-offs.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl flex items-start space-x-4 shadow-xs">
              <span className="p-3 bg-sky-50 text-sky-600 rounded-xl flex-shrink-0">
                <FileText className="w-5 h-5" />
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Transparent Grievance & Family Pathways</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We maintain transparent complaints channels. All feedback is logged, reviewed by senior management within 48 hours, and resolved constructively with families and social workers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">CQC Regulation Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fully aligned with <strong>CQC Regulation 16 (Receiving and acting on complaints)</strong> and standards of responsive person-centred planning. We work constructively to adjust care rosters and daily goals as residents grow in confidence.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-sky-400">Response Timelines</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-sky-450 flex-shrink-0 mt-0.5" />
                <span>Grievance Response: Under 48 hours initial senior manager check.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-sky-450 flex-shrink-0 mt-0.5" />
                <span>Progress Reviews: Comprehensive multi-agency updates each quarter.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-sky-450 flex-shrink-0 mt-0.5" />
                <span>Family Updates: Continuous communication through designated portals.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. WELL-LED LEADERSHIP & QUALITY PAGE CONTENT & RENDER
  const renderWellLedPage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 font-mono bg-indigo-50 px-2.5 py-1 rounded-md">
          CQC Standard: Well-Led
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          Governance & Board Leadership
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          Our senior board and direct management maintain an open, transparent, and honest workplace culture. We focus on clinical safety, values-led leadership, and constructive external quality reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Our Quality Governance Board
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-indigo-600">
                <Users className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Active On-Site Quality Reviews</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic leads Salman Muhammad and Boston Murray conduct weekly on-site quality reviews, ensuring operational standards are met with profound care.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-indigo-600">
                <FileText className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Computer-Audited Logs</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All daily activity files and shift checks are recorded on digital networks. This provides transparent audit trails for families, local authorities, and regulatory inspectors.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-indigo-600">
                <Award className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">External Practice Audits</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We recruit independent quality consultants and experienced practice advisors to audit our care logs, estate safety, and medicines management to encourage continuous progress.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center space-x-2.5 text-indigo-600">
                <TrendingUp className="w-5 h-5" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Stable Financial Resources</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under the strategic guidance of accountant Deeshan Walpitagamage, we maintain stable financial resources to fund spacious homes, premium adaptive equipment, and robust support ratios.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">CQC Regulation Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We align with <strong>CQC Regulation 17 (Good governance)</strong> and standards of transparent statutory reporting, promoting an open-door policy where staff can share suggestions and raise concerns in complete confidence.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-950 text-white p-6 rounded-2xl space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-indigo-400">Leadership Principles</h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Boston Murray</strong> oversees clinical standards, Positive Behaviour Support (PBS) applications, and CQC registration details.
              </p>
              <p>
                <strong>Salman Muhammad</strong> ensures active on-site support, local authority partnerships, and placement compatibility checks.
              </p>
              <p>
                <strong>Deeshan Walpitagamage</strong> coordinates strategic investment, estate budgeting, and long-term placement viability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. RIGHT SUPPORT, RIGHT CARE, RIGHT CULTURE PAGE CONTENT & RENDER
  const renderRightSupportPage = () => (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 font-mono bg-amber-50 px-2.5 py-1 rounded-md">
          CQC Standard: Right Support, Right Care, Right Culture
        </span>
        <h2 className="text-3xl font-extrabold text-gov-blue tracking-tight mt-3">
          Right Support, Right Care, Right Culture
        </h2>
        <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">
          This framework represents CQC&apos;s regulatory guidance for supporting autistic people and people with a learning disability to live rich, self-directed, and active lives in modern communities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Pillars */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold tracking-widest font-mono text-slate-400">
            Our Implementation Framework
          </h3>

          <div className="space-y-6">
            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Right Support: Autonomy & Control</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We focus on maximizing choices, control, and independence. Our support workers walk side-by-side with residents to co-design daily schedules, manage positive risks, and cultivate real-world vocational and life skills.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Right Care: Dignity & Human Rights</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We prioritize sensory-affirming, comfortable living. By creating custom acoustic spaces, lighting adaptations, and respecting personal boundaries, we ensure that every resident&apos;s environment is compassionate and dignified.
              </p>
            </div>

            <div className="bg-white p-6 border border-slate-150 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">Right Culture: Values-Led Leadership</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team rejects rigid, restrictive care models in favor of open, positive reinforcement and Positive Behaviour Support (PBS). Leaders promote an inclusive environment where individuals thrive as active citizens.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Regulatory Assurance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This framework ensures that PRO Care Homes delivers evidence-based placement stability where autistic people and individuals with learning disabilities lead fulfilling, self-directed lives in local neighborhoods.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-amber-950 text-white p-6 rounded-2xl space-y-4">
            <h4 className="font-extrabold text-xs uppercase tracking-wider font-mono text-amber-400">Guiding Ambitions</h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Choice:</strong> Support packages tailored around resident preferences, not staff shift rotas.
              </p>
              <p>
                <strong>Dignity:</strong> A profound respect for each resident&apos;s personal choice, style, and routines.
              </p>
              <p>
                <strong>Inclusion:</strong> Real community presence, hobbies, local volunteering, and life achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const pageMeta = {
    safe: {
      title: "Safeguarding and quality assurance",
      sub: "Active safeguarding protocols, multi-agency audits, and transparent digital care records using Nourish.",
      badge: "CQC Standard: Safe",
      gradient: "from-rose-950 via-slate-900 to-[#1e1114]",
      icon: ShieldCheck,
      breadcrumbLabel: "Safeguarding & Quality"
    },
    effective: {
      title: "Person-centred care and positive outcomes",
      sub: "Co-produced care plans, Active Support models, and individual skill-building pathways tailored to achieve key outcomes.",
      badge: "CQC Standard: Effective",
      gradient: "from-emerald-950 via-slate-900 to-[#0c1813]",
      icon: Award,
      breadcrumbLabel: "Person-Centred Outcomes"
    },
    caring: {
      title: "CQC Fundamental Standards",
      sub: "Upholding complete dignity, respect, consent, and safety benchmarks across all residential services.",
      badge: "CQC Standard: Caring",
      gradient: "from-purple-950 via-slate-900 to-[#190f1d]",
      icon: HeartHandshake,
      breadcrumbLabel: "Fundamental Standards"
    },
    responsive: {
      title: "Continuous improvement",
      sub: "Constructive feedback loops, continuous staff training, and learning from post-incident reflective logs to refine services daily.",
      badge: "CQC Standard: Responsive",
      gradient: "from-sky-950 via-slate-900 to-[#0b161c]",
      icon: Compass,
      breadcrumbLabel: "Continuous Improvement"
    },
    wellled: {
      title: "Governance & Board Leadership",
      sub: "Direct strategic and clinical oversight by Director Salman Muhammad and Registered Practitioner Boston Murray.",
      badge: "CQC Standard: Well-Led",
      gradient: "from-indigo-950 via-slate-900 to-[#0f1122]",
      icon: Eye,
      breadcrumbLabel: "Governance & Leadership"
    },
    rightsupport: {
      title: "Right Support, Right Care, Right Culture",
      sub: "Strict alignment with CQC regulatory guidelines for supporting autistic people and individuals with learning disabilities.",
      badge: "Key CQC Framework",
      gradient: "from-amber-950 via-slate-900 to-[#1e1811]",
      icon: Sparkles,
      breadcrumbLabel: "Right Support"
    }
  };

  const currentMeta = pageMeta[activePageId];
  const HeroIcon = currentMeta.icon;

  return (
    <div id="governance-pages-view" className="animate-fadeIn">
      {/* 1. DYNAMIC CQC SUB-PAGE HERO: Professionally placed and spaced to avoid Header conflicts */}
      <section className={`relative pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 lg:pb-24 bg-gradient-to-br ${currentMeta.gradient} text-white overflow-hidden select-none border-b border-white/5`}>
        {/* Glow & decorative backdrops */}
        <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[1px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-care-green/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            
            {/* Breadcrumbs Navigation */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono text-white/70">
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={() => onNavigate("hero")}>
                PRO Care
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={() => onNavigate("governance-safe")}>
                CQC Governance
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-premium-gold font-extrabold">
                {currentMeta.breadcrumbLabel}
              </span>
            </nav>

            {/* Premium Badge Block */}
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full shadow-inner">
              <HeroIcon className="w-3.5 h-3.5 text-premium-gold animate-bounce" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/95">
                {currentMeta.badge}
              </span>
            </div>

            {/* Core Descriptive Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {currentMeta.title}
            </h1>

            {/* Descriptive Subtitle Text */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal max-w-2xl font-sans">
              {currentMeta.sub}
            </p>

            {/* Action triggers */}
            <div className="pt-2.5 flex flex-wrap gap-3">
              <button 
                onClick={() => onNavigate("contact")}
                className="px-5 py-2.5 bg-premium-gold hover:bg-white text-gov-blue hover:text-gov-blue font-extrabold text-[11px] rounded-xl shadow-lg shadow-black/10 transition-all duration-200 transform active:scale-95 cursor-pointer"
              >
                Book Virtual Consultation
              </button>
              <button 
                onClick={() => onNavigate("referrals")}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-[11px] rounded-xl transition duration-200 cursor-pointer"
              >
                Inquire Pathways →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN SUB-PAGES BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Dynamic Page Rendering */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-lg">
          {activePageId === "safe" && renderSafePage()}
          {activePageId === "effective" && renderEffectivePage()}
          {activePageId === "caring" && renderCaringPage()}
          {activePageId === "responsive" && renderResponsivePage()}
          {activePageId === "wellled" && renderWellLedPage()}
          {activePageId === "rightsupport" && renderRightSupportPage()}
        </div>
      </div>

      {/* Placement & Methodology FAQs Section (themed dynamically per sub-page) */}
      {renderFaqSection()}
    </div>
  );
}
