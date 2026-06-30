import React, { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import ModelOfCare from "./components/ModelOfCare.tsx";
import Services from "./components/Services.tsx";
import Property from "./components/Property.tsx";
import Leadership from "./components/Leadership.tsx";
import GovernancePages from "./components/GovernancePages.tsx";
import Careers from "./components/Careers.tsx";
import Community from "./components/Community.tsx";
import Feedback from "./components/Feedback.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import AssistantChat from "./components/AssistantChat.tsx";

// New specialized components
import ServiceDetail from "./components/ServiceDetail.tsx";
import Referrals from "./components/Referrals.tsx";
import Policies from "./components/Policies.tsx";
import warmCareInteraction from "./assets/images/warm_care_interaction_new_1782404279000.jpg";
import HumanCare from "./components/HumanCare.tsx";
import ScrollReveal, { StaggerItem } from "./components/ScrollReveal.tsx";

import { 
  ShieldCheck, 
  HeartHandshake, 
  PhoneCall, 
  ArrowRight, 
  Users, 
  BrainCircuit, 
  Home, 
  BarChart3, 
  FileCheck2, 
  FileText, 
  GraduationCap,
  // Added new premium visual features
  Compass,
  Heart,
  Smile,
  Sparkles,
  Coffee,
  Lock,
  Scale,
  TrendingUp,
  Award,
  ShieldAlert,
  ClipboardCheck,
  Activity,
  CheckCircle2,
  CalendarRange,
  Send,
  FileDown,
  Clock
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("model-of-care-")) {
      return "model-of-care";
    }
    return hash || "hero";
  });

  const [commActiveTab, setCommActiveTab] = useState<string>("admission"); // "admission" vs "homely"
  const [modelOfCareActiveTab, setModelOfCareActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("model-of-care-")) {
      return hash.replace("model-of-care-", "");
    }
    return "tic";
  });

  const handleNavigate = (sectionId: string) => {
    if (sectionId.startsWith("model-of-care-")) {
      const subTab = sectionId.replace("model-of-care-", "");
      setModelOfCareActiveTab(subTab);
      setActiveSection("model-of-care");
      if (window.location.hash !== `#${sectionId}`) {
        window.location.hash = sectionId;
      } else {
        setTimeout(() => {
          const element = document.getElementById("model-of-care");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
      return;
    }
    if (sectionId === "commissioners-hub" || sectionId === "referral-framework" || sectionId === "contact-referral") {
      // Direct referral traffic to the homepage's prominent gateway
      setActiveSection("home");
      window.location.hash = "home";
      setTimeout(() => {
        const element = document.getElementById("referral-framework");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        if (hash.startsWith("model-of-care-")) {
          const subTab = hash.replace("model-of-care-", "");
          setModelOfCareActiveTab(subTab);
          setActiveSection("model-of-care");
          setTimeout(() => {
            const element = document.getElementById("model-of-care");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
          return;
        } else {
          setActiveSection(hash);
        }
      } else {
        setActiveSection("hero");
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Process initial hash on mount as well
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Central Router Node
  const renderActivePage = () => {
    if (activeSection.startsWith("services-") && activeSection !== "services-hub") {
      const serviceId = activeSection.replace("services-", "");
      return <ServiceDetail serviceId={serviceId} onNavigate={handleNavigate} />;
    }

    if (activeSection.startsWith("governance-")) {
      const pageId = activeSection.replace("governance-", "") as "safe" | "effective" | "caring" | "responsive" | "wellled" | "rightsupport";
      return <GovernancePages activePageId={pageId} onNavigate={handleNavigate} />;
    }

    switch (activeSection) {
      case "about":
        return <About onNavigate={handleNavigate} />;
      case "model-of-care":
        return (
          <ModelOfCare 
            onNavigate={handleNavigate} 
            activeTab={modelOfCareActiveTab} 
            setActiveTab={setModelOfCareActiveTab} 
          />
        );
      case "services-hub":
        return <Services onNavigate={handleNavigate} />;
      case "property":
        return <Property onNavigate={handleNavigate} />;
      case "leadership":
        return <Leadership onNavigate={handleNavigate} />;
      case "governance":
        return <GovernancePages activePageId="safe" onNavigate={handleNavigate} />;
      case "careers":
        return <Careers onNavigate={handleNavigate} />;
      case "referrals":
        return <Referrals onNavigate={handleNavigate} />;
      case "policies":
        return <Policies onNavigate={handleNavigate} />;
      case "contact":
        return <Contact onNavigate={handleNavigate} />;
      case "feedback":
        return <Feedback onNavigate={handleNavigate} />;
      case "digital":
        return <GovernancePages activePageId="responsive" onNavigate={handleNavigate} />;
      case "community":
        return <Community onNavigate={handleNavigate} />;
      case "hero":
      case "home":
      default:
        return renderHomeDashboard();
    }
  };

  // Lighter, executive, emotionally powerful Home dashboard summaries
  const renderHomeDashboard = () => {
    const dashboardCards = [
      {
        id: "about",
        title: "About Our Story & Values",
        desc: "Specialist, relationship-based care focusing on placement stability and genuine warm home feelings.",
        icon: Users,
        badge: "Company Core Ethos",
        accent: "border-sky-100 bg-sky-50/40 text-sky-700"
      },
      {
        id: "model-of-care",
        title: "Quality Support Framework",
        desc: "Underpinned by trauma-informed principles, active choices, Positive Behaviour Support and risk empowerment.",
        icon: BrainCircuit,
        badge: "Specialist Support",
        accent: "border-care-green/20 bg-care-green/5 text-care-green"
      },
      {
        id: "services-hub",
        title: "Support Specialties Portfolios",
        desc: "Structured support pathways for developmental challenges, emotional stability and personal care.",
        icon: BarChart3,
        badge: "8 Pathways",
        accent: "border-emerald-100 bg-emerald-50/30 text-emerald-700"
      },
      {
        id: "property",
        title: "6 Flags House Environment",
        desc: "Our high-specification home offering private en-suite wetrooms, therapeutic escape rooms, and sensory courtyards.",
        icon: Home,
        badge: "Homely Safety",
        accent: "border-indigo-100 bg-indigo-50/30 text-indigo-700"
      },
      {
        id: "governance-safe",
        title: "CQC Quality & Audits",
        desc: "Strict monthly regulation audits, digital Nourish recording, and alignment with safety and care standards.",
        icon: ShieldCheck,
        badge: "CQC Compliant",
        accent: "border-rose-100 bg-rose-50/30 text-rose-700"
      },
      {
        id: "referrals",
        title: "Commissioner Referrals Portal",
        desc: "Secure fast-track pre-admission audits, local authority pathways, and compatibility mapping inside 48 hours.",
        icon: FileCheck2,
        badge: "LA Partnerships",
        accent: "border-amber-100 bg-amber-50/40 text-amber-800"
      },
      {
        id: "policies",
        title: "Policies & Governance Hub",
        desc: "Full transparency. Access our mandated adult safeguarding, equality regulations, and complaint procedures instantly.",
        icon: FileText,
        badge: "Compliance Docs",
        accent: "border-slate-205 bg-slate-50/60 text-slate-700"
      },
      {
        id: "careers",
        title: "Careers & Recruitment Sourcing",
        desc: "Join our values-led support workforce. Explore our developmental academies and pre-employment DBS checks.",
        icon: GraduationCap,
        badge: "Work Here",
        accent: "border-care-purple/20 bg-care-purple/5 text-care-purple"
      }
    ];

    return (
      <div className="animate-fadeIn">
        {/* 1. Header Hero Panel */}
        <Hero onNavigate={handleNavigate} />

        {/* SECTION 1: Commissioner Hub & Placement Pathway Evaluation (Featured Higher for Family & Commissioner Access) */}
        <section id="commissioners-hub" className="py-24 bg-[#FAFBFD] relative overflow-hidden border-t border-slate-100">
          {/* Decorative ambient background glows */}
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-care-green/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gov-blue/5 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Commissioner Information Hub & Live Environments */}
              <ScrollReveal variant="fade-right" className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-care-green/10 border border-care-green/20 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-care-green" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans text-care-green">
                    Commissioner & Family Strategic Gateway
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gov-blue tracking-tight leading-tight">
                  Quick Referral Support, Stable Placements
                </h2>
                
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  PRO Care Homes is built entirely for resilience and placement stability. We remove commissioning risk by offering structured stability commitments, rapid pre-admission assessments completed within <strong className="font-semibold text-gov-blue">48 hours</strong>, and a proactive policy aimed at preventing placement breakdown.
                </p>

                {/* Tab Selector - Professional & Interactive Theme */}
                <div className="flex p-1 bg-slate-100 rounded-xl max-w-sm border border-slate-200">
                  <button
                    onClick={() => setCommActiveTab("admission")}
                    className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
                      commActiveTab === "admission"
                        ? "bg-white text-gov-blue shadow-sm"
                        : "text-slate-500 hover:text-gov-blue text-xs cursor-pointer"
                    }`}
                  >
                    Transitions Support & Info
                  </button>
                  <button
                    onClick={() => setCommActiveTab("homely")}
                    className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
                      commActiveTab === "homely"
                        ? "bg-white text-gov-blue shadow-sm"
                        : "text-slate-500 hover:text-gov-blue text-xs cursor-pointer"
                    }`}
                  >
                    The 6 Flags Homely Spec
                  </button>
                </div>

                {commActiveTab === "admission" ? (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[11.5px] text-slate-500 leading-relaxed">
                      We collaborate closely with Integrated Care Boards (ICBs), clinical practitioners, and local authorities to ensure safe, well-planned handovers. Our support patterns prioritize long-term success.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition duration-150">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-care-green" />
                          <span>48-Hour Assessment Goal</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Full, thorough evaluation conducted by our experienced staff to verify support alignment.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition duration-150">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-care-green" />
                          <span>Collaborative Transition</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Creating personalized transition timetables co-produced with families to prevent any distress.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition duration-150">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-care-green" />
                          <span>Robust Placement Stability</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Positive Behaviour Support models and proactive action prevent sudden placement breakdowns.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition duration-150">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-care-green" />
                          <span>Transition Passport</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">New admissions are reviewed at the two, six and 12 week stage, ensuring that the person is thriving in their new home through our transition passport.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[11.5px] text-slate-500 leading-relaxed">
                      Every individual we support is empowered to build skills and co-produce their schedules in a high-trust, welcoming environment:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <Compass className="w-4 h-4 text-sky-600" />
                          <span>Support Out &amp; About</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Support out and about in the community for shopping, wellbeing activities and appointments. Travel training and safe support ratios from admission.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Sensory Calibration</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Quiet, sensory-safe environment models, low-arousal illumination, and private calming breakout areas.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <Coffee className="w-4 h-4 text-care-green" />
                          <span>Skills Cooking Zones</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Induction-heated instructional kitchens guiding individuals through cooking security milestones step by step.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl hover:border-care-green/25 transition">
                        <h4 className="font-extrabold text-xs text-gov-blue flex items-center space-x-1.5">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>Meaningful Lives</span>
                        </h4>
                        <p className="text-[10px] text-text-secondary mt-1">Staff support people to have meaningful lives. This then drives routine and gives people a reason to get out of bed and ready for the day ahead.</p>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollReveal>
              
              {/* Right Column: Warm, People-Focused Representative Imagery */}
              <ScrollReveal variant="fade-left" className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center">
                <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-slate-150 shadow-xl bg-white p-3 group">
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl border border-slate-50">
                    <img
                      src={warmCareInteraction}
                      alt="Compassionate support worker sharing a friendly laugh with an adult we support in a warm supported living room"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
                    
                    {/* Embedded soft badge for warm connection */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl shadow-md flex items-center space-x-2 border border-slate-100">
                      <HeartHandshake className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span className="text-[11px] font-bold text-gov-blue tracking-tight leading-snug">
                        Person-Centred Care & Active Opportunities
                      </span>
                    </div>
                  </div>
                  
                  {/* Supportive caption below the photo */}
                  <div className="p-3.5 bg-[#FCFDFE] border-t border-slate-50 rounded-xl mt-2 flex items-center justify-between text-xs text-text-secondary select-none">
                    <span className="font-semibold text-gov-blue">Registered Gloucestershire Housing Specs</span>
                    <span className="text-care-green font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-care-green" />
                      <span>Personalised Care Plans</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* SECTION 2: Pathways of Care & Core Support Pillars (Swapped here to flow perfectly) */}
        <section className="py-20 bg-white border-t border-slate-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-20">
              <span className="text-xs font-bold uppercase tracking-wider text-gov-blue font-sans block">
                ORGANISATIONAL OVERVIEW
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gov-blue tracking-tight leading-snug">
                Our Pathways of Care & Supported Living
              </h2>
              <div className="w-16 h-1 bg-premium-gold mx-auto rounded-full" />
              <p className="text-text-secondary text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                We provide structured support pathways tailored to promote independence, positive risks, and personalised outcomes. Explore our core services below:
              </p>
            </ScrollReveal>

            {/* Premium Bento Summaries Grid */}
            <ScrollReveal variant="stagger-container" threshold={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={card.id} scale={true} className="flex h-full">
                    <div
                      onClick={() => handleNavigate(card.id)}
                      className="group w-full bg-[#FCFDFE] hover:bg-white border hover:border-gov-blue/15 rounded-3xl p-6.5 transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-gov-blue/5 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`p-2.5 rounded-xl border ${card.accent}`}>
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="text-[8px] uppercase tracking-widest font-bold bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded font-sans">
                            {card.badge}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold text-xs sm:text-sm text-gov-blue group-hover:text-care-green transition-colors leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-[11.5px] text-text-secondary leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                      <div className="pt-6 flex justify-end">
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-gov-blue group-hover:text-care-green hover:underline">
                          <span>Access Volume</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </ScrollReveal>

            {/* Placement Stability Commitment Callout Card (Rewritten in Plain sectorspeak English) */}
            <ScrollReveal variant="zoom-in" threshold={0.1} className="mt-16 bg-gradient-to-br from-care-green to-gov-blue text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="text-xs font-bold text-premium-gold uppercase tracking-widest font-sans">
                  Our Commitment to Commissioners, Social Workers & Families
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
                  Our Commitment to Placement Stability & Preventing Placement Breakdown
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans">
                  We know that adults with learning disabilities struggle with disruption when support packages break down. At Pro Care Homes, we build our services around stability. We work proactively with families, clinicians, and social workers to support individuals through challenging times without resorting to short-notice moves. Our purpose-built environment and Positive Behaviour Support (PBS) focus ensure that everyone is supported safely and with complete dignity.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => handleNavigate("referrals")}
                    className="px-5 py-3 bg-premium-gold hover:bg-white text-gov-blue font-bold text-xs rounded-xl transition shadow-lg transform active:scale-95 text-xs tracking-wide cursor-pointer"
                  >
                    Find Out if We're the Right Fit
                  </button>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Human Care & Real Life Moments Section */}
        <HumanCare onNavigate={handleNavigate} />

        {/* SECTION 2: Trusted Governance & Quality Commitment */}
        <section className="py-24 bg-white relative border-t border-slate-100">
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-100/30 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header */}
            <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-care-green font-mono block">
                COMPLIANCE & COMMISSIONER ASSURANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gov-blue tracking-tight">
                Trusted Governance & Quality Commitment
              </h2>
              <div className="w-16 h-1 bg-care-green mx-auto rounded-full" />
              <p className="text-text-secondary text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Operating with absolute care quality integrity, strict statutory transparency, and constant multidisciplinary team supervision to satisfy critical standards of Care Quality Commission (CQC) lines of inquiry.
              </p>
            </ScrollReveal>

            {/* Main Commitment centerpiece panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
              
              {/* Centerpiece Panel (NHS/Governance Commitment Dashboard Card) */}
              <ScrollReveal variant="fade-right" className="lg:col-span-5 flex flex-col">
                <div className="bg-gradient-to-br from-gov-blue to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between h-full relative overflow-hidden shadow-xl border-l-4 border-premium-gold shadow-gov-blue/10">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                      <Scale className="w-4 h-4 text-premium-gold" />
                      <span className="text-[9.5px] font-bold uppercase tracking-widest font-mono text-premium-gold">
                        Executive Board Standards
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Quality Assurance Architecture
                    </h3>
                    
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Under the direct operational oversight of Salman Muhammad and Nominated Individual Boston Murray, PRO Care Homes complies with the Health and Social Care Act regulations. We practice proactive support oversight to maintain secure environments.
                    </p>

                    <div className="space-y-3.5 border-t border-white/10 pt-6 text-[11px] text-slate-300">
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-care-green flex-shrink-0" />
                        <span>Monthly independent Regulation 17 style internal audits</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-care-green flex-shrink-0" />
                        <span>Electronic medicine tracking ensuring robust administration safety</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-care-green flex-shrink-0" />
                        <span>Trauma-informed post-incident debriefing frameworks</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate-400 relative z-10">
                    <span>INTEGRATED CARE BOARD ALIGNED</span>
                    <span>CQC REGULATION 17</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Sub Governance Cards (Surrounding features) */}
              <ScrollReveal variant="stagger-container" threshold={0.05} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Governance Card 1: Safe & Structured */}
                <StaggerItem scale={true} className="flex h-full flex-col">
                  <div className="w-full h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between group hover:bg-white hover:border-care-green/25 transition duration-200">
                    <div className="space-y-3">
                      <div className="w-9 h-9 bg-sky-50 text-sky-700 rounded-xl flex items-center justify-center group-hover:bg-care-green/10 group-hover:text-care-green transition">
                        <Lock className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-extrabold text-xs text-gov-blue">Safe & Structured Care</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        Rigorous pre-admission triggers matching and skin-integrity logging preventing institutional hazards.
                      </p>
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 block pt-4">Safety Practice Protocol</span>
                  </div>
                </StaggerItem>

                {/* Governance Card 2: Continuous Improvement */}
                <StaggerItem scale={true} className="flex h-full flex-col">
                  <div className="w-full h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between group hover:bg-white hover:border-care-green/25 transition duration-200">
                    <div className="space-y-3">
                      <div className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center group-hover:bg-care-green/10 group-hover:text-care-green transition">
                        <TrendingUp className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-extrabold text-xs text-gov-blue">Continuous Improvement</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        Systemic audits identifying environmental stress trends to iterate low-arousal accommodations quickly.
                      </p>
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 block pt-4">Nourish Analytics Logs</span>
                  </div>
                </StaggerItem>

                {/* Governance Card 3: CQC-Oriented Standards */}
                <StaggerItem scale={true} className="flex h-full flex-col">
                  <div className="w-full h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between group hover:bg-white hover:border-care-green/25 transition duration-200">
                    <div className="space-y-3">
                      <div className="w-9 h-9 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center group-hover:bg-care-green/10 group-hover:text-care-green transition">
                        <ClipboardCheck className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-extrabold text-xs text-gov-blue">CQC-Oriented Standards</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        Sustaining high competencies in Safe, Effective, Caring, Responsive, and Well-Led disciplines.
                      </p>
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 block pt-4">Continuous Audit Readiness</span>
                  </div>
                </StaggerItem>

                {/* Governance Card 4: Safeguarding Priority */}
                <StaggerItem scale={true} className="flex h-full flex-col">
                  <div className="w-full h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between group hover:bg-white hover:border-care-green/25 transition duration-200">
                    <div className="space-y-3">
                      <div className="w-9 h-9 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center group-hover:bg-care-green/10 group-hover:text-care-green transition">
                        <ShieldAlert className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-extrabold text-xs text-gov-blue">Safeguarding Commitment</h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        Statutory whistleblowing immunities and speedy reporting to designated Local Authority Safeguarding Boards.
                      </p>
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 block pt-4">Zero-Tolerance Safeguards</span>
                  </div>
                </StaggerItem>

              </ScrollReveal>
            </div>

            {/* Quick trust metrics row */}
            <ScrollReveal variant="fade-up" delay={0.2} className="border-t border-slate-100 pt-10 flex flex-wrap justify-around items-center gap-6 text-center">
              <div>
                <span className="text-xl sm:text-2xl font-black text-care-green block">98%</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-400 block font-bold">Placement Stability Index</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-care-green block">15+ Yrs</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-400 block font-bold">Clinical Leadership</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-care-green block">48 hrs</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-400 block font-bold">Response to Referrals</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-care-green block">32</span>
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-400 block font-bold">Co-produced Goals Tracked</span>
              </div>
            </ScrollReveal>

          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-white min-h-screen relative selection:bg-sky-500 selection:text-white">
      
      {/* Floating immediate action bar to assist social workers */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center space-x-2 bg-slate-900/95 backdrop-blur-md text-white border border-slate-800 shadow-xl px-4 py-3 rounded-full cursor-pointer hover:bg-slate-800 transition">
        <PhoneCall className="w-4 h-4 text-emerald-400 animate-bounce" />
        <a href="tel:+447904908123" className="text-[10px] font-mono tracking-widest font-bold">
          +44 7904 908123 REFERRALS HOTLINE
        </a>
      </div>

      {/* 1. Universal Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* 2. Major Routed Layout Section */}
      <main className="min-h-screen">
        {renderActivePage()}
      </main>

      {/* 3. Unified Digital Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Floating CQC Regulatory assistant advisor */}
      <AssistantChat />
      
    </div>
  );
}
