import { motion } from "motion/react";
import { Smile, HeartHandshake, Sparkles, MapPin, Coffee, Hand, Users } from "lucide-react";

import bakingImg from "../assets/images/baking_together_new_1782404223721.jpg";
import teaImg from "../assets/images/companionship_tea_new_1782404201863.jpg";
import outdoorImg from "../assets/images/outdoor_support_new_1782404242879.jpg";
import groupImg from "../assets/images/creative_group_new_1782404262116.jpg";

interface HumanCareProps {
  onNavigate?: (sectionId: string) => void;
}

export default function HumanCare({ onNavigate }: HumanCareProps) {
  const experiences = [
    {
      title: "Gentle, Compassionate Companionship",
      tagline: "Quiet Shared Afternoons",
      desc: "True emotional comfort isn't rushed. We sit down to listen, laugh, and connect over a refreshing cup of tea—sharing stories and building genuine, heartwarming friendships that make everyone feel completely safe and valued.",
      imgSrc: teaImg,
      badge: "Emotional Safety",
      icon: Coffee,
      bgAccent: "group-hover:border-rose-300 hover:bg-rose-50/10",
      badgeClass: "bg-rose-50 text-rose-850 border-rose-100",
      iconClass: "text-rose-700 bg-rose-50/80"
    },
    {
      title: "Shared Joy & Cooking Together",
      tagline: "Warm Kitchen Belonging",
      desc: "We believe that days are brighter when shared. Preparing delicious treats and home-style baking together in our warm kitchen creates beautiful moments of simple achievement, real laughter, and shared happiness.",
      imgSrc: bakingImg,
      badge: "Dignity & Happiness",
      icon: Smile,
      bgAccent: "group-hover:border-emerald-300 hover:bg-emerald-50/10",
      badgeClass: "bg-emerald-50 text-emerald-850 border-emerald-100",
      iconClass: "text-emerald-700 bg-emerald-50/80"
    },
    {
      title: "Active Outdoor Freedom",
      tagline: "Comfortable Park Walkies",
      desc: "Stepping out with confident, friendly guidance. Gentle morning strolls in green leafy parks and supportive neighborhood visits help build healthy physical strength, real peace of mind, and a joyful sense of independence.",
      imgSrc: outdoorImg,
      badge: "Supported Living Outings",
      icon: MapPin,
      bgAccent: "group-hover:border-sky-300 hover:bg-sky-50/10",
      badgeClass: "bg-sky-50 text-sky-850 border-sky-100",
      iconClass: "text-sky-700 bg-sky-50/80"
    },
    {
      title: "Warm Creative Gatherings",
      tagline: "Joyful Activities Together",
      desc: "Nurturing creative expression and mutual companionship. Social arts workshops, friendly group storytelling, and seasonal hobbies unite neighbors in laughter, offering a true sense of emotional belonging.",
      imgSrc: groupImg,
      badge: "Inclusion & Gentle Smiles",
      icon: Users,
      bgAccent: "group-hover:border-amber-300 hover:bg-amber-50/10",
      badgeClass: "bg-amber-50 text-amber-850 border-amber-100",
      iconClass: "text-amber-700 bg-amber-50/80"
    }
  ];

  return (
    <section 
      id="human-moments" 
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white relative overflow-hidden border-t border-slate-100"
      aria-label="Human Care and Real Life Moments Exhibition"
    >
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern high-contrast header section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/15 px-3.5 py-1.5 rounded-full shadow-xs">
            <HeartHandshake className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span className="text-[10px] tracking-widest uppercase font-extrabold text-emerald-700 font-sans">
              Human Care &amp; Everyday Smiles
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gov-blue tracking-tight leading-snug">
            Warm Hearts, Kind Hands &amp; Cozy Living
          </h2>
          
          <div className="w-12 h-1 bg-premium-gold mx-auto rounded-full" />
          
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            A clinical space can never replace the warm security and familiarity of home. Guided by gentle support workers, our focus is placed on life's simple, happy moments: baking together, beautiful walks, creative hobbies, and unhurried chats.
          </p>
        </div>

        {/* Cinematic Grid Layout - Fully responsive 1 -> 2 -> 3 -> 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={idx}
                tabIndex={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group flex flex-col justify-between bg-white border border-slate-200/90 rounded-[24px] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${exp.bgAccent} focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-500/20 active:scale-98`}
                aria-label={`Real Life Moment Card: ${exp.title}`}
              >
                {/* 1. Cinematic Soft Photography Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-150">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10 transition-opacity duration-300 group-hover:opacity-85" />
                  
                  {/* Subtle hover zoom */}
                  <img
                    src={exp.imgSrc}
                    alt={exp.tagline}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  />

                  {/* High Quality Category Badge over Image */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className={`px-2.5 py-1 text-[9px] font-extrabold tracking-wider uppercase rounded-lg border shadow-xs ${exp.badgeClass}`}>
                      {exp.badge}
                    </span>
                  </div>
                </div>

                {/* 2. Text & Interaction Details Section */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2 text-left">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg flex items-center justify-center border border-slate-100 ${exp.iconClass}`}>
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] tracking-wide font-extrabold text-slate-400 font-sans uppercase">
                        {exp.tagline}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-gov-blue group-hover:text-emerald-700 transition-colors font-sans leading-tight">
                      {exp.title}
                    </h3>

                    <p className="text-[11.5px] text-slate-600 leading-relaxed font-sans">
                      {exp.desc}
                    </p>
                  </div>

                  {/* Micro aesthetic outcome line indicator */}
                  <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-sans font-semibold text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-premium-gold" aria-hidden="true" />
                      <span>Comfort &amp; Wellness</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                      Active Choice
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Emotion-Centered Governance Callout / Bottom Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#FAFCFB] border border-emerald-500/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_12px_rgba(16,185,129,0.01)] text-left"
        >
          <div className="space-y-2 flex-1 md:pr-4">
            <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-600 font-bold flex items-center gap-1">
              <Hand className="w-3.5 h-3.5" /> Our Promise of Kind Support
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-gov-blue tracking-tight">
              Because real quality of life is felt in the heart, not just counted in paperwork.
            </h3>
            <p className="text-[11.5px] text-slate-600 leading-relaxed max-w-2xl font-sans">
              "We understand that true care lives in absolute patience, warm gestures, and authentic local friendships. Here, our residents are surrounded with total comfort, sweet choices, and natural emotional comfort." — <strong>Salman Muhammad, Support Coordinator</strong>
            </p>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate && onNavigate("about")}
              className="w-full md:w-auto px-5 py-3 bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 font-bold text-xs rounded-xl transition shadow-xs active:scale-95 cursor-pointer block text-center"
            >
              Learn More About Our Philosophy
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
