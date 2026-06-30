import React from "react";
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  Home, 
  HeartHandshake, 
  FileText, 
  Compass, 
  Sparkles, 
  Scale, 
  ChevronRight, 
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Award,
  Fingerprint,
  GraduationCap,
  Briefcase,
  Brain
} from "lucide-react";

interface PageHeroProps {
  sectionId?: string;
  titleOverride?: string;
  subOverride?: string;
  badgeOverride?: string;
  gradientOverride?: string;
  onNavigate?: (sectionId: string) => void;
}

export default function PageHero({ 
  sectionId, 
  titleOverride, 
  subOverride, 
  badgeOverride, 
  gradientOverride,
  onNavigate 
}: PageHeroProps) {
  
  // Normalise possible sectionIds or aliases
  let currentKey = sectionId || "about";
  if (currentKey === "careers-recruitment" || currentKey === "direct-pipelines-recruitment") {
    currentKey = "recruitment";
  }
  if (currentKey === "careers-training" || currentKey === "direct-pipelines-training") {
    currentKey = "training";
  }

  // Dynamic Route/Section metadata repository
  const routeMeta: Record<string, {
    title: string;
    sub: string;
    badge: string;
    gradient: string;
    icon: React.ComponentType<any>;
    breadcrumbParent: string;
    breadcrumbParentId: string;
    breadcrumbLabel?: string;
  }> = {
    "about": {
      title: "About PRO Care Homes Ltd",
      sub: "Creating safe, supportive homes where individuals can thrive, enjoy positive relationships, and lead self-directed lives filled with purpose.",
      badge: "Our Core Story",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Users,
      breadcrumbParent: "Home Dashboard",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "About PRO"
    },
    "model-of-care": {
      title: "Our Specialised Model of Care",
      sub: "Underpinned by trauma-informed systems, Positive Behaviour Support (PBS), and proactive, positive risk empowerment.",
      badge: "Quality Support Standard",
      gradient: "from-gov-blue via-care-purple to-[#0d5055]",
      icon: Activity,
      breadcrumbParent: "Home Dashboard",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "Approach"
    },
    "services-hub": {
      title: "CQC-Registered Residential Care and Supported Living",
      sub: "Structured quality placement pathways engineered for intellectual learning challenges, supported living, and mental health.",
      badge: "CQC Registered Service lines",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: ShieldCheck,
      breadcrumbParent: "Home",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "Care Specialties"
    },
    "property": {
      title: "6 Flags House Environment",
      sub: "A premier physical habitat with private en-suite wetrooms, sensory quiet cabins, and low-acoustic safety design.",
      badge: "CQC Safe Physical Haven",
      gradient: "from-gov-blue via-care-purple to-[#036a71]",
      icon: Home,
      breadcrumbParent: "Home Dashboard",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "6 Flags House"
    },
    "leadership": {
      title: "Our Executive & Support Leadership Board",
      sub: "Led by Strategic Director Salman Muhammad and CQC Nominated Individual Boston Murray to assure absolute regulatory alignment.",
      badge: "Board of Governance",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Users,
      breadcrumbParent: "About PRO",
      breadcrumbParentId: "about",
      breadcrumbLabel: "Leadership"
    },
    "governance": {
      title: "Quality Governance & CQC Audits",
      sub: "Uncompromising compliance benchmarks targeting Outstanding ratings across all Care Quality Commission lines of inquiry.",
      badge: "Strict Governance & Standards",
      gradient: "from-gov-blue via-care-purple to-[#04334f]",
      icon: ShieldCheck,
      breadcrumbParent: "Governance",
      breadcrumbParentId: "governance",
      breadcrumbLabel: "CQC Quality"
    },
    "careers": {
      title: "Join Our Team – Apply to Become a Support Worker",
      sub: "Fulfil your care calling. We are actively recruiting compassionate support workers to help people build independence and live fulfilling lives.",
      badge: "Work With Us",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Users,
      breadcrumbParent: "Home",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "Careers"
    },
    "contact": {
      title: "Contact & On-Duty Placement Gateway",
      sub: "We co-ordinate closely with UK Local Authorities, Social Teams, and family networks. Get in touch with us 24/7.",
      badge: "MDT Access Gateway",
      gradient: "from-gov-blue via-care-purple to-[#0b6c73]",
      icon: HeartHandshake,
      breadcrumbParent: "Home",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "Contact Us"
    },
    "referrals": {
      title: "Secure Referrals & Commissioning Log",
      sub: "NHSmail-compliant gateways for care commissioners and funding authorities checking placement compatibility.",
      badge: "Confidential Admissions Portal",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: ClipboardCheck,
      breadcrumbParent: "Home Dashboard",
      breadcrumbParentId: "hero",
      breadcrumbLabel: "Referrals"
    },
    "policies": {
      title: "Policies, Compliance & Practice Standards",
      sub: "Comprehensive transparency. Read our adult safeguarding standards, complaints handling, and equality policy maps.",
      badge: "Public Transparency Registry",
      gradient: "from-gov-blue via-care-purple to-[#10486c]",
      icon: FileText,
      breadcrumbParent: "Governance",
      breadcrumbParentId: "governance",
      breadcrumbLabel: "Policies"
    },
    "feedback": {
      title: "Quality Feedback & Compliant Loop",
      sub: "Promoting co-production. Record family satisfaction feedback, regulatory recommendations, or complaints instantly.",
      badge: "Compliance Quality Loop",
      gradient: "from-gov-blue via-care-purple to-[#055a6d]",
      icon: MessageSquare,
      breadcrumbParent: "Governance",
      breadcrumbParentId: "governance",
      breadcrumbLabel: "Feedback Loop"
    },
    "digital": {
      title: "Planned Digital Care Systems & Logs",
      sub: "Active transition plans to replace paper records with 100% auditable client logs, automatic compliance indicators, and live digital care planning.",
      badge: "Quality Management Portal",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Activity,
      breadcrumbParent: "Governance",
      breadcrumbParentId: "governance",
      breadcrumbLabel: "Digital Care"
    },
    "community": {
      title: "Community Integration Activities Program",
      sub: "Promoting active citizenship and social confidence through step-by-step local travel training and mobility benchmarks.",
      badge: "Citizen Integration Program",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Sparkles,
      breadcrumbParent: "MDT Approach",
      breadcrumbParentId: "model-of-care",
      breadcrumbLabel: "Community Participation"
    },
    "recruitment": {
      title: "Recruitment Pipeline & Hiring Center",
      sub: "Join our values-led support team and fast-track your CQC-compliant employment sequence today.",
      badge: "Values-Led Workforce Sourcing",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Briefcase,
      breadcrumbParent: "Careers Portal",
      breadcrumbParentId: "careers",
      breadcrumbLabel: "Recruitment"
    },
    "training": {
      title: "Training Academy & Skills Development",
      sub: "Unlocking continuous certified professional development courses across trauma-informed models & positive behaviour support.",
      badge: "Continuous CPD Certification",
      gradient: "from-[#0a1e3b] via-care-purple to-care-green",
      icon: GraduationCap,
      breadcrumbParent: "Careers Portal",
      breadcrumbParentId: "careers",
      breadcrumbLabel: "Training Academy"
    },
    "services-learning-disabilities": {
      title: "Learning Disabilities",
      sub: "Bespoke Active Support Pathways focused on self-care, communication, and cognitive growth.",
      badge: "CQC Safe & Effective Key Goal",
      gradient: "from-[#0a1e3b] via-care-purple to-care-green",
      icon: Award,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Learning Disabilities"
    },
    "services-autism-support": {
      title: "Autism",
      sub: "Low-arousal sensory habitats engineered to reduce anxiety and promote self-advocacy.",
      badge: "MDT Sensory Engineered",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Fingerprint,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Autism"
    },
    "services-mental-health-support": {
      title: "Mental Health",
      sub: "Trauma-Informed transition pathways from acute wards to secure residential communities.",
      badge: "Trauma-Informed Core Profile",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Activity,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Mental Health"
    },
    "services-personal-care": {
      title: "Dignified Personal Care Excellence Portfolio",
      sub: "Dignity-first physical care assistance with hygiene, nutrition, and medicine management.",
      badge: "Quality Care Excellence",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: ShieldCheck,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Personal Care"
    },
    "services-community-participation": {
      title: "Community Participation & Active Citizenship Pathway",
      sub: "Ending social isolation through local high-street integration and travel independence.",
      badge: "Active Citizenship Program",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Sparkles,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Community Citizenship"
    },
    "services-independent-living": {
      title: "Supported Living",
      sub: "Active step-by-step training roadmaps for cooking, budgeting, and home logistics.",
      badge: "Graduated Skill Academy",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: BookOpen,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Supported Living"
    },
    "services-residential-support": {
      title: "Residential Care",
      sub: "Premium, dignified 24/7 supported placement focusing on permanent safety and comfort.",
      badge: "Outstanding Environment Model",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Home,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Residential Care"
    },
    "services-positive-behaviour-support": {
      title: "Community-Based Support",
      sub: "Restraint-reduction support approach removing restrictions and empowering safe communication.",
      badge: "MDT Positive Behaviour Support Approved",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: ShieldCheck,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Community-Based Support"
    },
    "services-dementia-care": {
      title: "Specialist Dementia & Memory Pathways",
      sub: "Cognitive validation therapies and secure, memory-optimised environments designed to promote ongoing familiarity.",
      badge: "MDT Dementia & Memory Care",
      gradient: "from-gov-blue via-care-purple to-care-green",
      icon: Brain,
      breadcrumbParent: "Care Specialties",
      breadcrumbParentId: "services-hub",
      breadcrumbLabel: "Dementia Care"
    }
  };

  // Extract metadata based on normalized key
  const defaultMeta = routeMeta[currentKey] || {
    title: "Specialist Care Ecosystem",
    sub: "Delivering specialist support embedded in profound warmth, understanding, and personal growth.",
    badge: "Care Quality & Safeguards",
    gradient: "from-gov-blue via-care-purple to-care-green",
    icon: ShieldCheck,
    breadcrumbParent: "Home Dashboard",
    breadcrumbParentId: "hero",
    breadcrumbLabel: currentKey.charAt(0).toUpperCase() + currentKey.slice(1).replace("-", " ")
  };

  // Final strings resolved through overrides or automatic route maps
  const finalTitle = titleOverride || defaultMeta.title;
  const finalSub = subOverride || defaultMeta.sub;
  const finalBadge = badgeOverride || defaultMeta.badge;
  const finalGradient = gradientOverride || defaultMeta.gradient;
  const Icon = defaultMeta.icon;

  const handleBreadcrumbClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <section className={`relative pt-44 pb-20 bg-gradient-to-br ${finalGradient} text-white overflow-hidden select-none`}>
      {/* Glow and decoration backdrops for premium aesthetic overlay consistency */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-care-green/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-5">
          
          {/* Breadcrumbs Navigation */}
          {onNavigate && (
            <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider font-mono text-white/70">
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={(e) => handleBreadcrumbClick("hero", e)}>
                PRO Care
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="hover:text-premium-gold transition cursor-pointer" onClick={(e) => handleBreadcrumbClick(defaultMeta.breadcrumbParentId, e)}>
                {defaultMeta.breadcrumbParent}
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-premium-gold font-extrabold">
                {defaultMeta.breadcrumbLabel || currentKey.charAt(0).toUpperCase() + currentKey.slice(1).replace("-", " ")}
              </span>
            </nav>
          )}

          {/* Premium Badge block */}
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full shadow-inner">
            <Icon className="w-4 h-4 text-premium-gold animate-bounce" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/95">
              {finalBadge}
            </span>
          </div>

          {/* Core Descriptive Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {finalTitle}
          </h1>

          {/* Descriptive Subtitle Text */}
          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal max-w-2xl font-sans">
            {finalSub}
          </p>

          {/* Action triggers for better UX */}
          {onNavigate && (
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
          )}

        </div>
      </div>
    </section>
  );
}
