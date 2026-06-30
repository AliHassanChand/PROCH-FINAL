import React, { useState } from "react";
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  Check,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Sparkles,
  Award,
  ArrowRight,
  HeartHandshake
} from "lucide-react";
import PageHero from "./PageHero.tsx";

interface CareersProps {
  onNavigate?: (sectionId: string) => void;
}

interface SubQAState {
  [roleId: string]: {
    [questionIndex: number]: boolean;
  };
}

export default function Careers({ onNavigate }: CareersProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Apply to Become an Adult Support Worker",
    hasDBS: "yes",
    experience: "",
    statement: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Track open state of outer role cards (defaults first role to open)
  const [expandedRole, setExpandedRole] = useState<string | null>("adult-support-worker");

  // Track independent outer-and-inner sub Q&A states for the 5 points inside each role
  // Default first Q&A to be open automatically for rich initial state representation
  const [subQAOpen, setSubQAOpen] = useState<SubQAState>({
    "adult-support-worker": { 1: true, 2: false, 3: false, 4: false, 5: false },
    "childrens-support-worker": { 1: true, 2: false, 3: false, 4: false, 5: false },
    "residential-care": { 1: true, 2: false, 3: false, 4: false, 5: false },
    "supported-living": { 1: true, 2: false, 3: false, 4: false, 5: false },
    "independence": { 1: true, 2: false, 3: false, 4: false, 5: false }
  });

  const roles = [
    {
      id: "adult-support-worker",
      title: "Apply to Become an Adult Support Worker",
      badge: "Adult Specialist Care",
      tag: "Supported Living & Residential Mix",
      salary: "£12.50 - £14.00 per hour",
      hours: "Flexible Shift Patterns (Full & Part Time)",
      location: "Our Specialist Houses & Community Services",
      icon: Users,
      summary: "Walk beside wonderful, active adults on their journey to self-determination, offering companion-led routines and encouraging local community integration with positive reinforcement.",
      qas: [
        {
          q: "What is the role?",
          a: "As a dedicated Adult Support Worker, you are a professional companion, advocate, and facilitator of meaningful, independent living. Your role balances physical safety with heartwarming social coaching. You will support our residents with daily living skills, co-produce visual-schedules, Cook delicious recipes together, and help them log their daily achievements. We ensure that our care is co-produced with our clients, keeping their voices at the absolute heart of everything.",
          icon: HeartHandshake
        },
        {
          q: "Who will I be supporting?",
          a: "You will stand beside active, remarking adults living with autism, neurodiverse conditions, or learning disabilities. These individuals possess abundant creative potential, hobbies, and personal aspirations. They respond beautifully to reliable, calm routines, clear communications, and caring workers who practice unconditional positive regard and honor their emotional rhythms.",
          icon: Users
        },
        {
          q: "Where will I be working?",
          a: "You will work inside our warm, fully sensory-adapted, and light-filled specialist community houses and residential spaces. These properties are architecturally designed to feel like welcoming family homes rather than sterile clinical sites, complete with sensory gardens, safety rooms, and peaceful outdoor spaces.",
          icon: MapPin
        },
        {
          q: "Why should I work for Pro Care Homes?",
          a: "Because we wrap our outstanding staff in the same high level of care and security they show to our residents! You will enjoy fully funded accredited training (including full Care Certificate and positive behaviour support), paid Enhanced DBS subscription fees, flexible roster patterns to match your family life, regular mentoring, and professional progression with mental health champions.",
          icon: Award
        },
        {
          q: "How do I apply?",
          a: "We believe in making your entry into care as simple and stress-free as possible! No complicated CV databases or long questionnaires are needed to start. Simply complete our warm, 2-minute Expression of Interest form on this page. Our regional lead will reach out to you within 48 business hours for an informal, supportive call.",
          icon: Sparkles
        }
      ]
    },
    {
      id: "childrens-support-worker",
      title: "Apply to Become a Children’s Support Worker",
      badge: "Therapeutic Youth Services",
      tag: "Trauma-Informed Framework",
      salary: "£13.00 - £14.50 per hour",
      hours: "Permanent Rosters (Full-Time)",
      location: "Sensory-Adapted Children’s Homes",
      icon: Heart,
      summary: "Create a stable sanctuary of safety, playfulness, and therapeutic guidance for vulnerable children who require patience, consistency, and structured positive routines.",
      qas: [
        {
          q: "What is the role?",
          a: "In this deeply impactful role, you are a therapeutic anchor. Your day-to-day work is filled with nurturing, trauma-informed guidance. You will co-create stable daily structures, assist with schoolwork, supervise playful sensory sessions, and use Positive Behaviour Support (PBS) strategies to redirect distress. You will celebrate every small step toward emotional regulation, providing clear, therapeutic boundaries that make children feel secure.",
          icon: HeartHandshake
        },
        {
          q: "Who will I be supporting?",
          a: "Vulnerable children and youth who require high levels of safety, patience, and empathetic emotional alignment. Many have experienced previous placement instability or sensory sensitivities. They respond beautifully to calm, consistent, and safe parental-style role models who offer unconditional warmth and steady comfort.",
          icon: Users
        },
        {
          q: "Where will I be working?",
          a: "In our specialised, premium therapeutic children's homes. These are beautiful, non-clinical spaces complete with high-end sensory rooms, interactive kitchens, peaceful study corners, and vibrant outdoor areas designed for discovery and safe recreation.",
          icon: MapPin
        },
        {
          q: "Why should I work for Pro Care Homes?",
          a: "To honor your commitment, we fully fund your Level 3 or 4 Children & Young People's Workforce Diploma! You will also receive enhanced weekend/night premiums, standard travel mileage allowances, and access to dedicated clinical mental health champions who provide continuous safe spaces for reflective peer support.",
          icon: Award
        },
        {
          q: "How do I apply?",
          a: "Use our speedy express interest form on the right. Select 'Apply to Become a Children's Support Worker', explain what draws you to nurture young lives, and submit in seconds. We prioritize candidate values over formal essays, and will contact you for a welcoming first phone call.",
          icon: Sparkles
        }
      ]
    },
    {
      id: "residential-care",
      title: "Support Worker – Residential Care (Learning Disabilities and Autism)",
      badge: "Specialised Accommodation",
      tag: "Sensory Environment Specialism",
      salary: "£12.60 - £13.80 per hour",
      hours: "Flexible Shift Patterns",
      location: "Sensory-Adapted Residential Sites (e.g. 6 Flags House)",
      icon: Building2,
      summary: "Support residents inside high-standard sensory facilities, assisting them with life-enriching hobbies, positive risk-taking, and active culinary routines.",
      qas: [
        {
          q: "What is the role?",
          a: "You will be based inside a specialised therapeutic residential home, helping residents develop functional, lifelong care structures. From guiding structured cooking sessions to encouraging positive risk-taking in outdoor sports, you help turn everyday activities into developmental milestones. You will also collaborate with visiting therapists to apply adaptive plans and support clients in expressing their preferences daily.",
          icon: HeartHandshake
        },
        {
          q: "Who will I be supporting?",
          a: "Adult residents living inside our designated autism and sensory accommodation facilities. They require tailored routines, visual schedulers, specialised tactile activities, and carers who understand how to keep cognitive overstimulation and sensory bottlenecks to an absolute minimum.",
          icon: Users
        },
        {
          q: "Where will I be working?",
          a: "In our high-specification residential homes, such as the renowned 6 Flags House. These properties are architecturally adapted with relaxing low-arousal color palettes, custom acoustics, and outstanding sensory gardens, offering a tranquil, safe workplace.",
          icon: MapPin
        },
        {
          q: "Why should I work for Pro Care Homes?",
          a: "We offer exceptionally stable contracted hours, fully covered Enhanced DBS registration, free accredited qualifications, a dedicated 1:1 staff-to-resident ratio for many clients, and real-time guidance from our on-site clinical team to ensure you always feel fully confident and secure in your role.",
          icon: Award
        },
        {
          q: "How do I apply?",
          a: "Our recruitment pipeline is warm, human, and direct. Fill out our express form, specify 'Support Worker – Residential Care', and we will bypass old recruitment bottlenecks. Our home manager will review your submission and call you within 48 business hours.",
          icon: Sparkles
        }
      ]
    },
    {
      id: "supported-living",
      title: "Support Worker – Supported Living and Community Services",
      badge: "Community Pathways",
      tag: "Independence Facilitator",
      salary: "£12.50 - £13.50 per hour",
      hours: "Guaranteed & Contracted Hours",
      location: "Independent Domestic Tenancies & Regional Outreach",
      icon: Briefcase,
      summary: "Enable individuals to master community travel guidelines, household budgeting, and grocery shopping to experience authentic, active citizenship.",
      qas: [
        {
          q: "What is the role?",
          a: "Your role is that of a skill coach, trust builder, and community guide. You will visit clients in their own personal tenancies, helping them learn domestic skills like budgeting, nutritional meal prep, and travel routes. By walking beside them instead of taking over, you unlock their natural confidence and foster true self-sufficiency inside their own space.",
          icon: HeartHandshake
        },
        {
          q: "Who will I be supporting?",
          a: "Fabulous individuals transitioning from intensive residential facilities into independent living, or young adults looking to establish their first home. They are highly active, enjoy public engagement, and simply need a reassuring presence to master daily checklists and stay socially connected.",
          icon: Users
        },
        {
          q: "Where will I be working?",
          a: "In our clients' private community apartments, local colleges, vibrant public libraries, recreation centers, parks, and high streets during outings where you support travel confidence.",
          icon: MapPin
        },
        {
          q: "Why should I work for Pro Care Homes?",
          a: "Supported living offers marvelous autonomy and flexibility that fits around studies or family life. We offer official travel mileage compensation, mobile work data allowances, paid shadow shifts, and the profound joy of seeing a client lock their own front door with absolute pride.",
          icon: Award
        },
        {
          q: "How do I apply?",
          a: "Select this option on our express form, fill in your direct details, and write a small personal note showing your empathetic, caring nature. A regional community supervisor will contact you to discuss upcoming matches.",
          icon: Sparkles
        }
      ]
    },
    {
      id: "independence",
      title: "Support Worker – Helping People Build Independence and Live Fulfilling Lives",
      badge: "Active Citizenship",
      tag: "Vibrant Skill Development",
      salary: "£12.75 - £13.75 per hour",
      hours: "Days and Custom Weekends",
      location: "Bustling High Streets, Training Centers & Outreach",
      icon: Sparkles,
      summary: "Champion human rights and social inclusion by matching your personal hobbies directly with clients to co-produce life-changing experiences.",
      qas: [
        {
          q: "What is the role?",
          a: "You are an educator of life, a companion, and an advocate. You will assist clients to research community events, attend supported job interviews, join vocational training courses, and establish true self-advocacy. Your objective is and always will be to help people develop safe personal friendships, pursue active hobbies, and claim their human rights as active citizens.",
          icon: HeartHandshake
        },
        {
          q: "Who will I be supporting?",
          a: "Highly motivated individuals of all neurodiverse profiles who are passionate about discovering their unique place in society, standing up for their rights, and enjoying sports, cooking, crafts, or community life.",
          icon: Users
        },
        {
          q: "Where will I be working?",
          a: "Out in the wider community! Local community hubs, employment training centers, recreational hubs, sensory visual gardens, social clubs, and active culinary studios where we run skill workshops.",
          icon: MapPin
        },
        {
          q: "Why should I work for Pro Care Homes?",
          a: "We believe care is about authentic human connection. We uniquely match your specific personal hobbies (like gardening, singing, tech, or cooking) directly with clients' wishes. This means your shifts feel like sharing beautiful, rewarding activities with friends while enjoying excellent pay and certified training.",
          icon: Award
        },
        {
          q: "How do I apply?",
          a: "Use our speedy express form on the right. Just share your contact info and write down your unique values, personal hobbies, or what brings you joy. We prioritize matching hearts and minds, and will call you in under 48 hours!",
          icon: Sparkles
        }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.statement) {
      setFormError("Please enter your name, email, and statement of values.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: `${formData.position} (Has DBS: ${formData.hasDBS})`,
        experience: formData.experience,
        statement: formData.statement
      };

      const res = await fetch("/api/applications.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit career expression of interest.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "Apply to Become an Adult Support Worker",
        hasDBS: "yes",
        experience: "",
        statement: ""
      });
    } catch (err: any) {
      console.error("Careers application submission failed:", err);
      setIsSubmitting(false);
      setFormError(err.message || "Could not save your expression of interest. Connection to Hostinger MySQL failed.");
    }
  };

  // Toggle sub-question accordion in the selected role
  const toggleSubQA = (roleId: string, questionIndex: number) => {
    setSubQAOpen(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [questionIndex]: !prev[roleId]?.[questionIndex]
      }
    }));
  };

  // Helper to scroll smoothly to application form
  const scrollToApplication = (positionName: string) => {
    setFormData(prev => ({
      ...prev,
      position: positionName
    }));
    const element = document.getElementById("application-form-element");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Temporary highlight flash
      element.classList.add("ring-4", "ring-emerald-400/70");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-emerald-400/70");
      }, 2000);
    }
  };

  return (
    <div id="careers-view" className="animate-fadeIn">
      <PageHero sectionId="careers" onNavigate={onNavigate} />
      
      <section id="careers" className="py-16 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Direct Recruitment Call To Action Board */}
          <div className="bg-gradient-to-r from-gov-blue to-care-purple rounded-3xl p-8 sm:p-12 text-white mb-16 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
            <div className="relative z-10 max-w-3xl">
              <span className="bg-white/15 text-white text-xs font-bold py-1 px-3 rounded-full mb-4 inline-block tracking-wider uppercase">
                Active Recruitment Hub
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Apply to Become a Support Worker
              </h2>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-6">
                Are you compassionate, professional, and driven to make a real difference in people's lives? We have immediate, highly fulfilling support worker positions across our residential and community services. Express your interest in under two minutes below.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-2 rounded-lg border border-white/5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Competitive Rates & Paid Training</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-2 rounded-lg border border-white/5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Permanent Full-Time & Part-Time Roles</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-2 rounded-lg border border-white/5">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>No CV Required for Initial Registration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pillar values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-slate-800">
            <div className="bg-white p-6 rounded-2xl border border-slate-150 space-y-3 shadow-xs">
              <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl w-fit">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Values-First Matching</h4>
              <p className="text-xs text-slate-550 leading-relaxed">
                We screen candidates for resilience, warmth, and adherence to human rights. We can train care skills, but genuine empathy is an absolute prerequisite.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 space-y-3 shadow-xs">
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Outstanding Direct Training</h4>
              <p className="text-xs text-slate-550 leading-relaxed">
                Every support member goes through high-fidelity, fully certified pathways in positive behaviour support (PBS), trauma-informed care (TIC), and clinical record keeping.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 space-y-3 shadow-xs">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Robust Vetting & Support</h4>
              <p className="text-xs text-slate-550 leading-relaxed">
                Our onboarding includes face-to-face reference audits, fully compliant interview structures, and ongoing continuous Enhanced DBS subscription monitoring.
              </p>
            </div>
          </div>

          {/* Double Column: Focused Professional Roles vs Express Application Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Roles Left Side with Collapsible Question/Answers */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-200">
                <Users className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Reliable Support Careers & Q&A
                </h3>
              </div>
              
              <p className="text-xs text-slate-550 leading-relaxed">
                We have meticulously detailed our active support roles below. Select any role to view reliable, direct answers to essential questions regarding your potential career with Pro Care Homes.
              </p>

              <div className="space-y-5">
                {roles.map((item) => {
                  const isOpen = expandedRole === item.id;
                  const itemSubQA = subQAOpen[item.id] || { 1: true, 2: false, 3: false, 4: false, 5: false };
                  const RoleIcon = item.icon || Users;

                  return (
                    <div 
                      key={item.id} 
                      className={`border-l-4 transition-all duration-300 rounded-r-2xl border-y border-r bg-white overflow-hidden ${
                        isOpen 
                          ? "border-l-sky-600 border-sky-200 ring-2 ring-sky-50 shadow-md bg-gradient-to-b from-white to-slate-50/20" 
                          : "border-l-slate-400 border-slate-200 hover:border-slate-350 shadow-xs hover:shadow-sm"
                      }`}
                    >
                      {/* Accordion Trigger (Outer Role Title Row) */}
                      <button
                        onClick={() => setExpandedRole(isOpen ? null : item.id)}
                        className={`w-full p-5 sm:p-6 text-left focus:outline-none transition-colors ${
                          isOpen ? "bg-sky-500/[0.02]" : "hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="space-y-3.5">
                          {/* Metadata Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-sky-100 text-sky-850 text-[9px] font-extrabold py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                              {item.badge}
                            </span>
                            <span className="bg-indigo-50 text-indigo-750 text-[9px] font-extrabold py-0.5 px-2.5 rounded-full">
                              {item.tag}
                            </span>
                            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold py-0.5 px-2.5 rounded-md flex items-center gap-1.5 border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              {item.salary}
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              <div className={`p-2.5 rounded-xl hidden sm:block ${
                                isOpen ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-500"
                              }`}>
                                <RoleIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-extrabold text-sm sm:text-base text-slate-950 leading-snug cursor-pointer">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                  {item.summary}
                                </p>
                              </div>
                            </div>
                            <span className={`p-2 rounded-full bg-slate-100 text-slate-500 mt-1 transition-all duration-300 flex-shrink-0 ${
                              isOpen ? "rotate-180 bg-sky-100 text-sky-750" : "hover:bg-slate-200"
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </span>
                          </div>

                          {/* Collapsed Horizontal Quick Details */}
                          {!isOpen && (
                            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-450 pt-1 font-mono border-t border-slate-100/70">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {item.hours}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {item.location}
                              </span>
                              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                CQC Compliant
                              </span>
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Accordion Content which is the "Questions Dropdown QA" list */}
                      {isOpen && (
                        <div className="border-t border-slate-150 p-5 sm:p-6 bg-white space-y-4">
                          
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-[10.5px] font-extrabold text-slate-450 uppercase tracking-widest font-mono block">
                              Detailed Role Q&A • Point-by-Point
                            </span>
                            <span className="text-[10px] bg-sky-50 text-sky-700 py-0.5 px-2 rounded-full font-bold">
                              Press questions to expand
                            </span>
                          </div>

                          {/* The 5 numbered questions as interactive sub-accordion dropdown QA */}
                          <div className="space-y-3 mt-3">
                            {item.qas.map((qa, idx) => {
                              const qNum = idx + 1;
                              const isSubOpen = itemSubQA[qNum];
                              const QAIcon = qa.icon || HeartHandshake;
                              return (
                                <div 
                                  key={idx} 
                                  className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                                    isSubOpen 
                                      ? "border-sky-300 bg-sky-50/[0.12] shadow-xs" 
                                      : "border-slate-150 bg-slate-50/25 hover:bg-slate-50/70"
                                  }`}
                                >
                                  {/* Sub-question header toggle */}
                                  <button
                                    type="button"
                                    onClick={() => toggleSubQA(item.id, qNum)}
                                    className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none transition-colors"
                                  >
                                    <div className="flex items-center space-x-3.5">
                                      <span className={`w-7 h-7 rounded-lg font-extrabold text-xs flex items-center justify-center font-mono transition-colors ${
                                        isSubOpen 
                                          ? "bg-sky-650 text-white shadow-xs" 
                                          : "bg-slate-100 text-slate-600 border border-slate-200"
                                      }`}>
                                        {qNum}
                                      </span>
                                      <span className={`font-extrabold text-xs sm:text-sm transition-colors ${
                                        isSubOpen ? "text-sky-950" : "text-slate-800"
                                      }`}>
                                        {qa.q}
                                      </span>
                                    </div>
                                    <div className={`p-1 rounded-md transition-all ${
                                      isSubOpen ? "bg-sky-100 text-sky-700 rotate-180" : "text-slate-400"
                                    }`}>
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </div>
                                  </button>

                                  {/* Expandable Q&A Content */}
                                  {isSubOpen && (
                                    <div className="px-4 pb-4 pl-14 text-xs sm:text-sm text-slate-650 leading-relaxed font-sans space-y-3.5 animate-fadeIn">
                                      <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-sky-100/40 shadow-3xs">
                                        <div className="p-1.5 bg-sky-50 text-sky-700 rounded-lg mt-0.5 flex-shrink-0">
                                          <QAIcon className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-4 flex-1">
                                          <p className="font-medium text-slate-700 leading-relaxed text-xs sm:text-sm">
                                            {qa.a}
                                          </p>
                                          {qNum === 5 && (
                                            <div className="pt-1">
                                              <button
                                                type="button"
                                                onClick={() => scrollToApplication(item.title)}
                                                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer text-xs"
                                              >
                                                <span>Apply for this role now</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Express Form Right Side */}
            <div id="application-form-element" className="lg:col-span-5 transition-all">
              <div className="bg-white border-2 border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm hover:border-sky-500 duration-200">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-950 mb-4">
                  Simple Express Application
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Register your interest in seconds. Our local recruitment leads will reach out within 48 business hours.
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-emerald-950">Application Statement Received</h4>
                    <p className="text-slate-700 text-xs leading-relaxed max-w-sm mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Our support team at PRO Care Homes has received your registration for the <strong>{formData.position}</strong> position. We will contact you shortly to schedule a values-based conversation.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          position: "Apply to Become an Adult Support Worker",
                          hasDBS: "yes",
                          experience: "",
                          statement: ""
                        });
                      }}
                      className="mt-2 text-xs font-semibold text-sky-700 hover:underline"
                    >
                      Submit another expression of interest
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4 font-sans text-xs">
                    
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Rachel Higgins"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. rachel@example.com"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +44 7123 456789"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-705 block">Position of Interest *</label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none cursor-pointer"
                      >
                        <option>Apply to Become an Adult Support Worker</option>
                        <option>Apply to Become a Children’s Support Worker</option>
                        <option>Support Worker – Residential Care (Learning Disabilities and Autism)</option>
                        <option>Support Worker – Supported Living and Community Services</option>
                        <option>Support Worker – Helping People Build Independence and Live Fulfilling Lives</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Do you possess an active Enhanced Adult DBS? *</label>
                      <div className="flex flex-col sm:flex-row gap-2.5 pt-1 text-slate-700">
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="hasDBS"
                            value="yes"
                            checked={formData.hasDBS === "yes"}
                            onChange={handleInputChange}
                            className="text-sky-600 focus:ring-sky-500 cursor-pointer"
                          />
                          <span>Yes, registered on the Update Service</span>
                        </label>
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="hasDBS"
                            value="no"
                            checked={formData.hasDBS === "no"}
                            onChange={handleInputChange}
                            className="text-sky-600 focus:ring-sky-500 cursor-pointer"
                          />
                          <span>No, will require new application</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Previous Care Experience (if any)</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g. 2 years supporting autism in residential care"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Statement of Values & Caring Motivation *</label>
                      <textarea
                        name="statement"
                        value={formData.statement}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Briefly share why you want to support individuals to build independence..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold animate-shake">
                        ⚠️ {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-55"
                    >
                      <Send className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`} />
                      <span>{isSubmitting ? "Submitting Expression..." : "Submit Expression of Interest"}</span>
                    </button>

                    <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                      By submitting, you consent to our secure review of your expression under CQC Regulation 18 guidelines. We value your privacy and only process data for recruiting.
                    </p>

                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
