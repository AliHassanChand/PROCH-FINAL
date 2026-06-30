import { Rocket, GraduationCap, MapPin, Smile, Landmark, CalendarCheck2 } from "lucide-react";
import PageHero from "./PageHero.tsx";

interface CommunityProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Community({ onNavigate }: CommunityProps) {
  const items = [

    {
      title: "Real-World Education",
      desc: "We coordinate admissions with local UK Further Education colleges for customized foundation studies, digital literacy courses, and creative crafts.",
      icon: GraduationCap,
      color: "bg-teal-50 text-teal-700 border-teal-100"
    },
    {
      title: "Volunteering & Micro-Jobs",
      desc: "Promoting genuine citizenship through local partnerships — including animal shelters, environment clean-ups, charity shops, and allotment gardens.",
      icon: Smile,
      color: "bg-sky-50 text-sky-700 border-sky-100"
    },
    {
      title: "Accessible Outings & Travel",
      desc: "Our positive risk-taking programs offer structured travel training, teaching residents how to navigate local buses, trains, and crosswalks safely.",
      icon: MapPin,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    {
      title: "Active Family Relationships",
      desc: "We maintain highly interactive channels, helping residents invite families for Sunday meals, planning home visits, and coordinating holiday trips.",
      icon: Rocket,
      color: "bg-amber-50 text-amber-700 border-amber-100"
    }
  ];

  return (
    <div id="community-view" className="animate-fadeIn">
      <PageHero sectionId="community" onNavigate={onNavigate} />
      
      <section id="community" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dynamic Highlight Card with layout splits */}
          <div className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Story Text Left */}
            <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 font-mono block">
                The Community Roadmap Philosophy
              </span>
              <h3 className="text-2xl font-bold text-slate-905 tracking-tight font-sans">
                Realizing Life Milestones, One Step at a Time
              </h3>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                Too often, social care organizations rely on pre-booked service mini-vans that isolate residents as a group. At PRO Care Homes, we dismantle this artificial separation. 
              </p>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                By designing mapped, incremental positive risk profiles under the guidance of Nominated Individual Boston Murray, we help residents shop for their own ingredients, utilize public high streets, participate in recreation clubs, and find volunteering opportunities.
              </p>

              <div className="border-t border-slate-100 pt-4 flex items-center space-x-3 text-xs">
                <Landmark className="w-5 h-5 text-indigo-700" />
                <span className="font-semibold text-slate-700">
                  Approved by local UK Health & Wellbeing boards.
                </span>
              </div>
            </div>

            {/* Illustrative Outcome Milestones Block Right */}
            <div className="bg-slate-900/95 p-8 sm:p-12 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-emerald-400">
                  Proven Milestone Accomplishments
                </h4>
                <p className="text-xs text-slate-300">
                  In our monthly reviews, we measure and track milestones of community integration. Examples include:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3 text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                    <span className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">1</span>
                    <div>
                      <p className="font-bold">Independent Travel Graduation</p>
                      <p className="text-[10px] text-slate-350">Successfully taking a local bus line to the library.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">2</span>
                    <div>
                      <p className="font-bold">Weekly Volunteering placement</p>
                      <p className="text-[10px] text-slate-350">Maintaining a Friday shift at the community greenhouse.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">3</span>
                    <div>
                      <p className="font-bold">Self-directed Budget Mastery</p>
                      <p className="text-[10px] text-slate-350">Purchasing weekly toiletries using pocket envelopes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-[10px] text-slate-350 italic text-center sm:text-left border-t border-slate-800 mt-6 sm:mt-0">
                ⭐ All results are mapped transparently within our CQC-inspected Nourish dashboard.
              </div>
            </div>

          </div>
        </div>

        {/* Bento Grid Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border hover:border-sky-200 rounded-2xl p-6 space-y-4 hover:shadow-md transition duration-300">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-sans">{item.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  </div>
);
}
