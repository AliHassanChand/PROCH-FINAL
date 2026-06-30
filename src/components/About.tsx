import { motion } from "motion/react";
import { 
  Smile, 
  HeartPulse, 
  Sparkles, 
  Compass, 
  Shield, 
  Group, 
  Heart, 
  Clock, 
  Coffee, 
  UtensilsCrossed, 
  CheckCircle2,
  Users2
} from "lucide-react";
import PageHero from "./PageHero.tsx";
import ScrollReveal, { StaggerItem } from "./ScrollReveal.tsx";

// High-quality caring interaction images representing warm companionship
import bakingImg from "../assets/images/baking_together_new_1782404223721.jpg";
import teaImg from "../assets/images/companionship_tea_new_1782404201863.jpg";
import outdoorImg from "../assets/images/outdoor_support_new_1782404242879.jpg";
import groupImg from "../assets/images/creative_group_new_1782404262116.jpg";

interface AboutProps {
  onNavigate?: (sectionId: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const values = [
    {
      title: "Genuine Compassion",
      desc: "Delivering care embedded in profound personal warmth, active listening, and a commitment to understanding each individual's unique story.",
      icon: Smile,
      color: "bg-teal-50 text-teal-600 border-teal-100/60"
    },
    {
      title: "Kind Dignity & Respect",
      desc: "Honouring personal routines and autonomous choice. We support residents with absolute respect for their self-worth and identity.",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100/60"
    },
    {
      title: "Meaningful Lives",
      desc: "Cultivating real skills, pursuing hobbies, volunteering, and ensuring everyone enjoys the simple pleasures of everyday life.",
      icon: Sparkles,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100/60"
    },
    {
      title: "Shared Belonging",
      desc: "Helping residents become active, valued members of their local community, building positive relationships of true friendship.",
      icon: Group,
      color: "bg-sky-50 text-sky-600 border-sky-100/60"
    },
    {
      title: "Supported Independence",
      desc: "Empowering residents to direct their own lives, achieve personal outcomes, and manage daily tasks with confidence and pride.",
      icon: Compass,
      color: "bg-amber-50 text-amber-700 border-amber-100/60"
    },
    {
      title: "Emotional Wellbeing",
      desc: "Creating gentle, low-arousal home environments that feel safe, predictable, and reassuring, fostering continuous cognitive growth.",
      icon: HeartPulse,
      color: "bg-rose-50 text-rose-600 border-rose-100/60"
    }
  ];

  return (
    <div id="about-view" className="animate-fadeIn">
      {/* Page Hero with the updated subtext */}
      <PageHero sectionId="about" onNavigate={onNavigate} />
      
      <section id="about" className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Section 1: Human-Centred Introduction (Homes, Not Placements) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Wording emphasizing kindness, dignity and humanity */}
            <ScrollReveal variant="fade-right" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                <Heart className="w-3.5 h-3.5 text-care-green animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
                  Our Person-Centred Philosophy
                </span>
              </div>
              
              <h2 className="text-2.5xl sm:text-3xl.5 font-black text-gov-blue tracking-tight leading-tight">
                An Organisation Built Around Kindness, Dignity & Fulfilling Lives
              </h2>
              
              <p className="text-slate-650 text-sm leading-relaxed sm:text-base">
                At PRO Care Homes, we believe that real care begins with the understanding that we are creating <strong className="text-gov-blue">homes, not clinical placements</strong>. Our support pathways are built around the people we serve, assuring their life is rich with opportunities, companionship, and laughter.
              </p>
              
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                We remove the clinical barriers and corporate distance often found in traditional social care. Instead of rigid institutional processes, our staff are selected for their deep capacities of empathy, patience, and warmth, working to co-produce daily goals that represent authentic growth, respect, and long-term security.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <span className="text-emerald-600 font-extrabold text-xs block mb-1">✓ Homes, Not Beds</span>
                  <span className="text-[11px] text-slate-500 leading-normal block">Bespoke personal styling keeping and celebrating unique personal identities.</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                  <span className="text-emerald-600 font-extrabold text-xs block mb-1">✓ Positive Relationships</span>
                  <span className="text-[11px] text-slate-500 leading-normal block">Connecting families, residents, and caregivers with transparent, supportive loops.</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side: High-quality imagery collage representing human companionship */}
            <ScrollReveal variant="fade-left" className="lg:col-span-6 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
              
              <div className="grid grid-cols-2 gap-4">
                {/* Image 1: Shared tea conversation (new warm image) - put at top-left for a great first impression */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                  <img 
                    src={teaImg} 
                    alt="Caregiver and resident sharing tea" 
                    className="w-full h-44 sm:h-52 object-cover transition duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-3 text-white text-[10px]">
                    <span className="font-extrabold flex items-center space-x-1 font-sans">
                      <Coffee className="w-3 h-3 text-emerald-400" />
                      <span>Quiet Companionship</span>
                    </span>
                    <p className="text-[9px] text-slate-350 mt-0.5 font-light">Sharing a warm tea and genuine conversations of trust.</p>
                  </div>
                </div>

                {/* Image 2: Baking together */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                  <img 
                    src={bakingImg} 
                    alt="Caregiver and resident baking together" 
                    className="w-full h-44 sm:h-52 object-cover object-top transition duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-3 text-white text-[10px]">
                    <span className="font-extrabold flex items-center space-x-1 font-sans">
                      <UtensilsCrossed className="w-3 h-3 text-amber-400" />
                      <span>Co-Producing Skills</span>
                    </span>
                    <p className="text-[9px] text-slate-350 mt-0.5 font-light">Learning, laughing & baking together as a family.</p>
                  </div>
                </div>

                {/* Image 3: Outdoor support */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                  <img 
                    src={outdoorImg} 
                    alt="Active outdoor support" 
                    className="w-full h-44 sm:h-52 object-cover transition duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-3 text-white text-[10px]">
                    <span className="font-extrabold flex items-center space-x-1 font-sans">
                      <Compass className="w-3 h-3 text-sky-400" />
                      <span>Independent Outings</span>
                    </span>
                    <p className="text-[9px] text-slate-350 mt-0.5 font-light">Empowering active social lives and local community outings.</p>
                  </div>
                </div>

                {/* Image 4: Creative group */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                  <img 
                    src={groupImg} 
                    alt="Creative group activity" 
                    className="w-full h-44 sm:h-52 object-cover transition duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-3 text-white text-[10px]">
                    <span className="font-extrabold flex items-center space-x-1 font-sans">
                      <Users2 className="w-3 h-3 text-purple-400" />
                      <span>Creative Community</span>
                    </span>
                    <p className="text-[9px] text-slate-350 mt-0.5 font-light">Celebrating special moments of co-produced activities.</p>
                  </div>
                </div>
              </div>

            </ScrollReveal>
          </div>

          {/* Section 2: Person-Centred Vision and Mission Statements */}
          <ScrollReveal variant="stagger-container" threshold={0.05} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Vision/Mission statement 1 */}
            <StaggerItem className="flex h-full flex-col">
              <div className="bg-[#f0f9ff]/70 rounded-3xl p-8 border border-sky-100 flex flex-col justify-between h-full space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/20 rounded-full blur-xl" />
                
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-sky-900 font-sans">
                    Our Warm Mission
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    To provide a genuine home environment where people feel safe, valued and supported to live fulfilling lives, develop independence, build meaningful relationships and actively participate within their communities.
                  </p>
                </div>
                <div className="pt-2 border-t border-sky-100/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-sky-850 uppercase tracking-widest font-mono">
                    Helping People Lead Meaningful Lives
                  </span>
                  <span className="text-xs text-sky-500 font-extrabold">★</span>
                </div>
              </div>
            </StaggerItem>

            {/* Mission statement 2 */}
            <StaggerItem className="flex h-full flex-col">
              <div className="bg-[#f2fdf5]/80 rounded-3xl p-8 border border-emerald-100 flex flex-col justify-between h-full space-y-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-250/20 rounded-full blur-xl" />
                
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-950 font-sans">
                    Our Compassionate Mission
                  </h3>
                  <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <p>
                      Pro Care Homes Ltd is committed to providing safe, high-quality, person-centred residential support for adults with Learning Disabilities, Autism Spectrum Conditions and associated Mental Health needs.
                    </p>
                    <p>
                      Through the delivery of Positive Behaviour Support (PBS), Trauma-Informed Care (TIC) and Psychologically Informed Environment (PIE) approaches, we aim to create a genuine home environment where people are supported to develop independence, build meaningful relationships, participate actively within their communities and achieve positive outcomes throughout their lives.
                    </p>
                    <p>
                      Our goal is to provide stable, long-term placements that promote wellbeing, choice, dignity, inclusion and personal growth.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-100/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-emerald-850 uppercase tracking-widest font-mono">
                    Genuine Care & Positive Outcomes
                  </span>
                  <span className="text-xs text-emerald-500 font-extrabold">❤</span>
                </div>
              </div>
            </StaggerItem>

          </ScrollReveal>

          {/* Section 3: Care Philosophy highlight panel (Relationship-Based Care & Trust) */}
          <ScrollReveal variant="zoom-in" threshold={0.1} className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl" />
            
            <div className="max-w-3xl space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                <Smile className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest font-mono text-emerald-400">
                  The Heart of our Philosophy
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Our Ethos: Fulfilling Lives Built on Resilience & Kindness
              </h3>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We understand that many individuals we support have experienced multiples transitions, stress, and broken placements in the past. We believe in walking alongside our residents with patience, warmth, and resilience. 
              </p>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                PRO Care Homes is not just a housing facility — it is a permanent community, a family of choice, and a sanctuary of trust and belonging. Our specialist support teams build compassionate daily environments where residents are valued for exactly who they are, as we work to nurture positive goals and daily stability. At PRO-CH, we pledge to focus on outcomes that promote fulfilling, safe lives with absolute dignity.
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-[11px] font-mono font-bold text-slate-400">
                <span className="flex items-center space-x-2 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.02]">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>RELATIONSHIP-BASED STANDARDS</span>
                </span>
                <span className="flex items-center space-x-2 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.02]">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                  <span>PLACEMENT LOUGEVITY & TRUST</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 4: Bento Grid Values (The Pillars of Our Compassionate Delivery) */}
          <div className="space-y-8">
            <ScrollReveal variant="fade-up" className="text-center space-y-2 max-w-xl mx-auto">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Our Pillars of Kind, Compassionate and Personalised Support
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Everything we do is built upon a simple, heartfelt promise: to walk alongside your loved ones with patience, warm understanding, and absolute dignity. These values guide our daily care pathways, helping to bring safety, comfort, and real joy to every single home.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="stagger-container" threshold={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <StaggerItem key={v.title} scale={true} className="flex h-full flex-col">
                    <div className="bg-white hover:bg-slate-50 border hover:border-sky-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg shadow-xs hover:shadow-sky-100/30 h-full w-full flex flex-col">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${v.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm.5 font-bold text-slate-950 mb-2 font-sans">{v.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed flex-grow">{v.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}
