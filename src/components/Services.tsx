import React, { useState } from "react";
import { motion } from "motion/react";
import { Home, Accessibility, ShieldCheck, Heart, UserPlus, Milestone, Sparkles, BookOpen, Fingerprint } from "lucide-react";
import PageHero from "./PageHero.tsx";

export default function Services({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: "residential",
      icon: Home,
      title: "Residential Care",
      category: "residential",
      description: "Comprehensive, 24/7 specialist therapeutic residential care at our high-specification homes, including 6 Flags House.",
      approach: "Creating comfortable, warm environments where our staff genuinely care, fostering long-term stability and absolute dignity.",
      methodology: [
        "24-hour highly trained on-site support staffing",
        "Individualized sensory environment configurations",
        "Weekly therapeutic multidisciplinary reviews"
      ],
      outcomes: [
        "A true feeling of homely ownership",
        "Significant reduction in crisis events",
        "Durable, long-term placement stability and comfort"
      ],
      cqc: "Safe & Caring: Promoting absolute safety in beautiful home environments."
    },
    {
      id: "supported-living",
      icon: Milestone,
      title: "Supported Living",
      category: "supported-living",
      description: "Personalized support packages empowering individuals to live independently in their own homes or shared accommodations.",
      approach: "Building self-reliance through structured independent travel training, financial budgeting, and active daily-living skill graduation.",
      methodology: [
        "Structured independent travel training & roadmaps",
        "Co-developed grocery and budgeting planners",
        "Domestic skill graduation with progressive task mapping"
      ],
      outcomes: [
        "Dramatically improved confidence and self-directed domestic pride",
        "Ability to manage small weekly allowances and personal items",
        "Successful transitions to lower dependency settings or independent units"
      ],
      cqc: "Effective: Direct training leading to real life-skill graduation."
    },
    {
      id: "learning-disabilities",
      icon: Accessibility,
      title: "Learning Disabilities",
      category: "specialist",
      description: "Holistic, sensory-optimised support pathways designed to foster autonomous living, active co-production, and life-skill growth.",
      approach: "Focusing on capabilities rather than deficits. We utilise alternative communication modalities ensuring every resident is fully heard.",
      methodology: [
        "Alternative Communication Support (PECS, Makaton, Visual Schedules)",
        "Progressive task analysis structures for daily tasks",
        "Bespoke adult-learning & tailored leisure plans"
      ],
      outcomes: [
        "Enhanced expressive capability and visual autonomy",
        "Mastery of basic daily living elements",
        "Significant lifestyle choice autonomy and pride"
      ],
      cqc: "Effective: Customizing support to matched developmental capabilities."
    },
    {
      id: "autism",
      icon: Sparkles,
      title: "Autism",
      category: "specialist",
      description: "Neuro-affirming care plans mapped to individual sensory profiles and structured within low-arousal home environments.",
      approach: "Adapting spaces to the individual, honoring neurodivergent traits, and providing consistent, predictable daily routines to reduce anxiety.",
      methodology: [
        "Sensory integration audit led by occupational therapists",
        "Consistent daily rosters keeping transition anxiety to a minimum",
        "Quiet sensory escape spaces and low-arousal environmental layout"
      ],
      outcomes: [
        "Decreased emotional and sensory overload events by over 80%",
        "Increased focus on personal special interests and hyper-fixations",
        "Self-advocacy and improved social confidence"
      ],
      cqc: "Responsive: Designing structures directly responsive to sensory differences."
    },
    {
      id: "mental-health",
      icon: Heart,
      title: "Mental Health",
      category: "specialist",
      description: "Dual-diagnosis and trauma-informed stability pathways facilitating safe transitions from inpatient settings back to community living.",
      approach: "A compassionate, non-punitive framework that promotes emotional accountability, coping strategies, and psychological well-being.",
      methodology: [
        "Weekly coordinates with community mental health teams (CMHT)",
        "Structured relapse prevention triggers and coping protocols",
        "Stress-regulation techniques including mindfulness and somatic exercises"
      ],
      outcomes: [
        "Stabilized mood states and greater personal emotional accountability",
        "Fewer emergency inpatient admissions and readmissions",
        "Rebuilding of supportive connections with remote family networks"
      ],
      cqc: "Effective & Responsive: Integrated supportive care to ensure psychological safety."
    },
    {
      id: "community-support",
      icon: UserPlus,
      title: "Community-Based Support",
      category: "supported-living",
      description: "Active integration and outreach services enabling individuals to connect, volunteer, learn, and engage with their local community.",
      approach: "Using Positive Behaviour Support (PBS) as a structured approach to understand distress, reduce restrictions, and foster safe community integration.",
      methodology: [
        "Travel training under Positive Risk-Taking framework",
        "Liaison with volunteering teams, micro-employment, and sports clubs",
        "Highly specialised Positive Behaviour Support (PBS) planning to manage distress triggers"
      ],
      outcomes: [
        "Ending social isolation through active local citizenship",
        "Successful integration with college courses, hubs, or public spaces",
        "Increased emotional safety for the resident, family, and staff lists"
      ],
      cqc: "Safe & Well-Led: Meticulous behavioural logging and restraint reduction oversight."
    }
  ];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <div id="services-hub-view" className="animate-fadeIn">
      <PageHero sectionId="services-hub" onNavigate={onNavigate} />
      
      <section id="services" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Toolbar */}
          <div className="flex justify-center flex-wrap gap-2 mb-12 bg-white/45 p-3 rounded-2xl border border-slate-100 max-w-2xl mx-auto backdrop-blur-sm shadow-xs">
          {[
            { id: "all", label: "All Services" },
            { id: "residential", label: "Residential Care" },
            { id: "supported-living", label: "Supported Living & Community" },
            { id: "specialist", label: "Specialist Support" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 hover:border-sky-100 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between">
                    <span className="p-3 bg-sky-50 text-sky-600 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Approach section */}
                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <span className="font-bold text-slate-800 text-[10px] block uppercase font-mono tracking-wide">
                      Our Support Approach:
                    </span>
                    <p className="text-slate-600 italic leading-relaxed text-[11px]">
                      &ldquo;{service.approach}&rdquo;
                    </p>
                  </div>

                  {/* Methodology Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      Selected Actions & Schedules:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.methodology.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start space-x-1.5">
                          <span className="text-sky-500 text-xs mt-0.5">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block font-mono">
                      Proven Care Outcomes:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.outcomes.map((o, oIdx) => (
                        <li key={oIdx} className="flex items-start space-x-1.5">
                          <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CQC alignment & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-[10px] text-slate-450 italic leading-snug">
                    <strong className="text-slate-800 font-semibold font-mono uppercase">CQC Alignment:</strong> {service.cqc}
                  </div>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="w-full py-2 border border-sky-100 hover:border-sky-500 hover:bg-sky-50 text-sky-700 font-bold rounded-lg text-xs transition duration-200"
                  >
                    Discuss Placement Options
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  </div>
);
}
