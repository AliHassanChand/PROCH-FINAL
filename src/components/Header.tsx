import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { 
  ShieldCheck, 
  CalendarRange, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Users, 
  Home, 
  Activity, 
  Sparkles, 
  Award, 
  Briefcase, 
  Lock, 
  Scale, 
  FileText, 
  MapPin, 
  HeartHandshake, 
  BookOpen, 
  UserCheck, 
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Fingerprint,
  Compass,
  Eye
} from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"services" | "approach" | "governance" | null>(null);
  
  // Mobile accordion states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileApproachOpen, setMobileApproachOpen] = useState(false);
  const [mobileGovernanceOpen, setMobileGovernanceOpen] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isNavActive = (itemId: string): boolean => {
    if (activeSection === itemId) return true;

    const taxonomy: Record<string, string[]> = {
      services: ["services", "property", "community", "services-hub", "services-learning-disabilities", "services-autism-support", "services-mental-health-support", "services-positive-behaviour-support", "services-residential-support", "services-independent-living"],
      approach: ["approach", "model-of-care", "digital"],
      governance: ["governance", "feedback", "policies"]
    };

    if (taxonomy[itemId]) {
      return taxonomy[itemId].includes(activeSection) || activeSection.startsWith(itemId);
    }

    if (itemId.startsWith("services-") && activeSection === itemId) {
      return true;
    }

    if (itemId === "services-hub" && (activeSection.startsWith("services") || activeSection === "property" || activeSection === "community")) {
      return true;
    }
    if (itemId === "model-of-care" && (activeSection === "model-of-care" || activeSection === "digital")) {
      return true;
    }
    if (itemId === "governance" && (activeSection === "governance" || activeSection === "policies" || activeSection === "feedback")) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMenuHover = (menu: "services" | "approach" | "governance" | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (menu) {
      setActiveMegaMenu(menu);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
      }, 150);
    }
  };

  const servicesItems = [
    {
      title: "Residential Care",
      desc: "Premium, dignified placement environments at 6 Flags House with private ensuite bedrooms and personalised sensory safe hubs.",
      icon: Home,
      href: "services-residential-support"
    },
    {
      title: "Supported Living",
      desc: "Structured daily living and independent skill practices, domestic routines, budgeting, and travel graduation.",
      icon: MapPin,
      href: "services-independent-living"
    },
    {
      title: "Learning Disabilities",
      desc: "Holistic, sensory-optimized support pathways designed to foster autonomous living, active co-production and self-care milestone gains.",
      icon: Award,
      href: "services-learning-disabilities",
      badge: "CQC Safe Goal"
    },
    {
      title: "Autism",
      desc: "Dedicated neuro-affirming environments styled to lower anxiety, optimize sensory trigger schedules, and avoid systemic overload crises.",
      icon: Fingerprint,
      href: "services-autism-support",
      badge: "Low Arousal"
    },
    {
      title: "Mental Health",
      desc: "Compassionate, dual-diagnosis and trauma-informed stability support for complex emotional support needs transitioning from institutional wards.",
      icon: Activity,
      href: "services-mental-health-support"
    },
    {
      title: "Community-Based Support",
      desc: "Comprehensive integration and outreach pathways, utilizing Positive Behaviour Support (PBS) methodologies to reduce restrictions.",
      icon: UserCheck,
      href: "services-positive-behaviour-support",
      badge: "Outstanding Care"
    }
  ];

  const approachItems = [
    {
      title: "Trauma-Informed Care",
      desc: "Prioritising psychological safety and trauma awareness to understand behavioural antecedents without coercive intervention.",
      icon: HeartHandshake,
      badge: "PIE Framework",
      href: "model-of-care-tic"
    },
    {
      title: "PBS Support Approach",
      desc: "Underpinned by functional behaviour assessments, meticulous trigger logs, and continuous positive reinforcement standards.",
      icon: ShieldCheck,
      badge: "CQC Approved",
      href: "model-of-care-pbs"
    },
    {
      title: "Person-Centred Routines",
      desc: "Every resident co-creates their own weekly layout, choice framework, and leisure schedules with their dedicated support keyworker.",
      icon: Sparkles,
      href: "model-of-care-person-centred"
    },
    {
      title: "Psychologically Informed Environments",
      desc: "Architectural choices, calming neutral colours, soundproofing, and custom layouts tailored to support psychological stability.",
      icon: Home,
      href: "model-of-care-pie"
    },
    {
      title: "Positive Risk-Taking",
      desc: "Enabling residents to grasp real-world independence milestone goals through careful multi-agency risk assessments and frameworks.",
      icon: ChevronRight,
      href: "model-of-care-risk"
    },
    {
      title: "Digital Care Integration",
      desc: "Planned transition to industry-leading digital care planning networks to deliver real-time monitoring, automated audits, and transparent outcomes.",
      icon: FileText,
      badge: "Upcoming Setup",
      href: "model-of-care-digital"
    }
  ];

  const governanceItems = [
    {
      title: "Safeguarding and quality assurance",
      desc: "Active safeguarding protocols, multi-agency audits, and transparent digital care records using Nourish.",
      icon: ShieldCheck,
      badge: "Safe",
      href: "governance-safe"
    },
    {
      title: "Person-centred care and positive outcomes",
      desc: "Co-produced care plans, Active Support models, and individual skill-building pathways.",
      icon: Award,
      badge: "Effective",
      href: "governance-effective"
    },
    {
      title: "CQC Fundamental Standards",
      desc: "Upholding complete dignity, respect, consent, and safety benchmarks across all residential services.",
      icon: HeartHandshake,
      badge: "CQC Standards",
      href: "governance-caring"
    },
    {
      title: "Continuous improvement",
      desc: "Constructive feedback loops, continuous staff training, and learning from post-incident reflective logs.",
      icon: Compass,
      badge: "Improvement",
      href: "governance-responsive"
    },
    {
      title: "Governance & Board Leadership",
      desc: "Direct strategic and clinical oversight by Director Salman Muhammad and Registered Practitioner Boston Murray.",
      icon: Eye,
      badge: "Board Led",
      href: "governance-wellled"
    },
    {
      title: "Right Support, Right Care, Right Culture",
      desc: "Strict alignment with CQC regulatory guidance for supporting autistic people and learning disabilities.",
      icon: Sparkles,
      badge: "CQC Guidance",
      href: "governance-rightsupport"
    }
  ];

  function leadershipItemsLink() {
    return Users;
  }

  const secondaryNavItems = [
    { label: "6 Flags House", id: "property" },
    { label: "Specialist Services", id: "services-hub" },
    { label: "Support Model", id: "model-of-care" },
    { label: "Executive Leadership", id: "leadership" },
    { label: "Governance & Standards", id: "governance-safe" },
    { label: "Secure Referrals Portal", id: "referrals" },
    { label: "Policies & Standards", id: "policies" },
    { label: "Careers Portal", id: "careers" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none animate-fadeIn">
      
      {/* 1. PREMIUM TOPBAR: Slim, high-performance healthcare notification bar */}
      {isBannerVisible && (
        <div 
          id="premium-topbar" 
          className="hidden md:flex relative bg-gradient-to-r from-care-green via-care-purple to-gov-blue text-white px-4 md:px-8 py-2 md:py-2.5 items-center justify-between text-[11px] font-sans shadow-inner border-b border-white/10 overflow-hidden"
        >
          {/* Glow visual backdrops */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] -z-10" />
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" />

          {/* Info label left */}
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAF7F4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7E6DC]"></span>
            </span>
            <span className="tracking-wide uppercase font-bold text-[10px] text-white opacity-95 flex items-center space-x-1 font-mono">
              <span>GOVERNANCE-LED SPECIALIST CARE</span>
              <span className="hidden sm:inline-block">•</span>
              <span className="hidden sm:inline-block text-white">PRO-CARE HOMES LTD</span>
            </span>
          </div>

          {/* Core clinical text center */}
          <span className="hidden lg:inline-block font-sans font-semibold text-center tracking-tight text-[#EAF7F4]">
            ⭐ Providing Safe, Compassionate, Multidisciplinary Teams (MDT) and Fully CQC-Aligned Supported Placements
          </span>

          {/* Regulatory/Contact indicators right */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 font-mono font-bold text-[10px] text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7E6DC] flex-shrink-0" />
              <span className="tracking-wide">CQC REGISTRATION ACTIVE</span>
            </div>
            <span className="hidden md:inline-block text-white/40">|</span>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="hover:text-premium-gold transition-colors font-semibold text-white/95 mr-2"
            >
              PRO Care Referrals Gateway →
            </a>
            
            {/* Close announcement banner */}
            <button
              onClick={() => setIsBannerVisible(false)}
              className="p-1 hover:bg-white/15 rounded-md cursor-pointer transition text-white/90 hover:text-white"
              title="Dismiss Announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. PRIMARY EXECUTIVE NAVBAR: Floating layered header with glassmorphic backing */}
      <div 
        id="primary-executive-navbar"
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-gov-blue/10 shadow-lg py-2.5 px-4 md:px-8" 
            : "bg-white/90 backdrop-blur-sm border-b border-gov-blue/5 py-4 px-4 md:px-8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand/Logo Section Left */}
          <div 
            onClick={() => onNavigate("hero")} 
            className="cursor-pointer group flex-shrink-0"
          >
            <Logo className="w-10 h-10" />
          </div>

          {/* Core Navigation Center */}
          <nav className="hidden lg:flex items-center space-x-0.5 z-50">
            
            {/* Home trigger */}
            <button
              onClick={() => onNavigate("hero")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                isNavActive("hero") || isNavActive("home")
                  ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                  : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
              }`}
            >
              Home
            </button>

            {/* About trigger */}
            <button
              onClick={() => onNavigate("about")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                isNavActive("about")
                  ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                  : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
              }`}
            >
              About PRO
            </button>

            {/* Services Dropdown (MEGA MENU TRIGGER) */}
            <div 
              className="relative inline-block"
              onMouseEnter={() => handleMenuHover("services")}
              onMouseLeave={() => handleMenuHover(null)}
            >
              <button
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                  activeMegaMenu === "services" || isNavActive("services")
                    ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                    : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
                }`}
              >
                <span>Care Specialties</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === "services" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Care Approach Dropdown (MEGA MENU TRIGGER) */}
            <div 
              className="relative inline-block"
              onMouseEnter={() => handleMenuHover("approach")}
              onMouseLeave={() => handleMenuHover(null)}
            >
              <button
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                  activeMegaMenu === "approach" || isNavActive("approach")
                    ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                    : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
                }`}
              >
                <span>Our MDT Approach</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === "approach" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Governance Dropdown (MEGA MENU TRIGGER) */}
            <div 
              className="relative inline-block"
              onMouseEnter={() => handleMenuHover("governance")}
              onMouseLeave={() => handleMenuHover(null)}
            >
              <button
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                  activeMegaMenu === "governance" || isNavActive("governance")
                    ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                    : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
                }`}
              >
                <span>Governance & Standards</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === "governance" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Careers trigger */}
            <button
              onClick={() => onNavigate("careers")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                isNavActive("careers")
                  ? "bg-gov-blue/[0.04] text-gov-blue border-b-2 border-premium-gold"
                  : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
              }`}
            >
              Careers
            </button>

            {/* Contact trigger */}
            <button
              onClick={() => onNavigate("contact")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 ${
                isNavActive("contact")
                  ? "bg-gov-blue/[0.04] text-gov-blue border-care-green"
                  : "text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.02]"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Call to Actions Panel Right */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <button
              id="executive-btn-careers"
              onClick={() => onNavigate("careers")}
              className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-gov-blue hover:bg-calm-blue text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-md shadow-gov-blue/10 transform active:scale-95 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Join As Support staff</span>
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => onNavigate("referrals")}
              className="px-3.5 py-2 bg-gov-blue text-white rounded-xl text-xs font-extrabold shadow-sm active:scale-95 transition"
            >
              Referral
            </button>
            <button
              id="mobile-drawer-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-text-secondary hover:text-gov-blue hover:bg-gov-blue/[0.04] transition-colors border border-gov-blue/5"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MEGA MENU FLOATING DROPDOWN RENDER CARDS (Desktop) */}
      <div 
        className={`absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-b border-gov-blue/10 transition-all duration-250 z-40 ${
          activeMegaMenu 
            ? "opacity-100 translate-y-0 pointer-events-auto max-h-[85vh] overflow-y-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none max-h-0"
        }`}
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
        }}
        onMouseLeave={() => handleMenuHover(null)}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          
          {/* Services Menu block */}
          {activeMegaMenu === "services" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-care-green font-mono block">Specialist Residential Services</span>
                  <h4 className="text-base font-extrabold text-gov-blue">CQC-Registered Residential Care and Supported Living</h4>
                </div>
                <button 
                  onClick={() => {
                    onNavigate("services");
                    setActiveMegaMenu(null);
                  }}
                  className="text-xs font-bold text-gov-blue hover:text-care-green flex items-center space-x-1 hover:underline"
                >
                  <span>Explore all active structures</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        onNavigate(item.href);
                        setActiveMegaMenu(null);
                      }}
                      className="group/item p-4.5 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-care-green/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3.5">
                        <span className="p-2.5 bg-gov-blue/[0.04] group-hover/item:bg-care-green/10 text-gov-blue group-hover/item:text-care-green rounded-xl transition-colors flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-extrabold text-xs text-gov-blue group-hover/item:text-care-green transition-colors">{item.title}</h5>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-care-green/10 text-care-green text-[8px] font-bold rounded-full font-mono">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-3">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Care Approach Menu block */}
          {activeMegaMenu === "approach" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-care-green font-mono block">Quality support philosophy</span>
                  <h4 className="text-base font-extrabold text-gov-blue">Multidisciplinary Team (MDT) Active Frameworks</h4>
                </div>
                <button 
                  onClick={() => {
                    onNavigate("model-of-care");
                    setActiveMegaMenu(null);
                  }}
                  className="text-xs font-bold text-gov-blue hover:text-care-green flex items-center space-x-1 hover:underline"
                >
                  <span>Analyse Support Slices</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {approachItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        onNavigate(item.href);
                        setActiveMegaMenu(null);
                      }}
                      className="group/item p-4.5 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-care-green/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3.5">
                        <span className="p-2.5 bg-gov-blue/[0.04] group-hover/item:bg-care-green/10 text-gov-blue group-hover/item:text-care-green rounded-xl transition-colors flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-extrabold text-xs text-gov-blue group-hover/item:text-care-green transition-colors">{item.title}</h5>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-gov-blue/5 text-gov-blue text-[8px] font-bold rounded-full font-mono">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-3">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Governance Menu block */}
          {activeMegaMenu === "governance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-care-green font-mono block">Uncompromising statutory safeguards</span>
                  <h4 className="text-base font-extrabold text-gov-blue">Quality Governance Board & Operational Delivery Systems</h4>
                </div>
                <button 
                  onClick={() => {
                    onNavigate("governance");
                    setActiveMegaMenu(null);
                  }}
                  className="text-xs font-bold text-gov-blue hover:text-care-green flex items-center space-x-1 hover:underline"
                >
                  <span>Verify Audit Compliance Metrics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {governanceItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        onNavigate(item.href);
                        setActiveMegaMenu(null);
                      }}
                      className="group/item p-4.5 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-premium-gold/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3.5">
                        <span className="p-2.5 bg-gov-blue/[0.04] group-hover/item:bg-premium-gold/10 text-gov-blue group-hover/item:text-premium-gold rounded-xl transition-colors flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-extrabold text-xs text-gov-blue group-hover/item:text-premium-gold transition-colors">{item.title}</h5>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-brand-error/10 text-brand-error text-[8px] font-bold rounded-full font-mono">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-3">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 5. MOBILE ACCORDION DRAWER LAYOUT PANEL */}
      {isOpen && (
        <div 
          id="mobile-nav-panel" 
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-gov-blue/15 shadow-2xl py-4 px-5 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto w-full z-50 text-slate-800"
        >
          {/* General non-dropdown pages */}
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate("hero"); setIsOpen(false); }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-xs font-bold text-gov-blue hover:bg-slate-50 transition flex items-center justify-between"
            >
              <span className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-care-green" />
                <span>Home Direct Dashboard</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate("about"); setIsOpen(false); }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-xs font-bold text-gov-blue hover:bg-slate-50 transition flex items-center justify-between"
            >
              <span className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-care-green" />
                <span>About PRO Care Homes</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Accordion Group: Specialties */}
          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-extrabold text-gov-blue rounded-lg bg-slate-50/50"
            >
              <span className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-care-green" />
                <span>Our Specialties</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {mobileServicesOpen && (
              <div className="pl-6 pr-2 py-1.5 space-y-2.5 animate-scaleUp">
                {servicesItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { onNavigate(item.href); setIsOpen(false); }}
                    className="w-full text-left text-[11px] font-bold text-text-secondary hover:text-gov-blue flex items-center space-x-2"
                  >
                    <span>• {item.title}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 bg-care-green/10 text-care-green text-[7px] font-mono rounded">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion Group: Care Approach */}
          <div className="pt-1">
            <button
              onClick={() => setMobileApproachOpen(!mobileApproachOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-extrabold text-gov-blue rounded-lg bg-slate-50/50"
            >
              <span className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-care-green" />
                <span>MDT Support Pillars</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileApproachOpen ? "rotate-180" : ""}`} />
            </button>
            
            {mobileApproachOpen && (
              <div className="pl-6 pr-2 py-1.5 space-y-2.5 animate-scaleUp">
                {approachItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { onNavigate(item.href); setIsOpen(false); }}
                    className="w-full text-left text-[11px] font-bold text-text-secondary hover:text-gov-blue flex items-center space-x-2"
                  >
                    <span>• {item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion Group: Governance */}
          <div className="pt-1">
            <button
              onClick={() => setMobileGovernanceOpen(!mobileGovernanceOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-extrabold text-gov-blue rounded-lg bg-slate-50/50"
            >
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-premium-gold" />
                <span>Quality Governance</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileGovernanceOpen ? "rotate-180" : ""}`} />
            </button>
            
            {mobileGovernanceOpen && (
              <div className="pl-6 pr-2 py-1.5 space-y-2.5 animate-scaleUp">
                {governanceItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { onNavigate(item.href); setIsOpen(false); }}
                    className="w-full text-left text-[11px] font-bold text-text-secondary hover:text-gov-blue flex items-center space-x-2"
                  >
                    <span>• {item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom fixed callouts inside mobile navigation panel */}
          <div className="border-t border-slate-100 pt-4 flex flex-col space-y-2.5">
            <button
              onClick={() => { onNavigate("careers"); setIsOpen(false); }}
              className="w-full py-3 flex items-center justify-center space-x-2 border border-gov-blue/10 hover:border-gov-blue/25 text-gov-blue font-bold text-xs rounded-xl transition bg-slate-50"
            >
              <Users className="w-4 h-4" />
              <span>Careers Opportunities</span>
            </button>
            <button
              onClick={() => { onNavigate("contact"); setIsOpen(false); }}
              className="w-full py-3 flex items-center justify-center space-x-2 bg-gov-blue hover:bg-calm-blue text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              <CalendarRange className="w-4 h-4" />
              <span>Submit Secure Placement Referral</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
