import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BedDouble, Sun, Wind, Palette, ShieldCheck, HeartHandshake, Eye, Sparkles } from "lucide-react";
import PageHero from "./PageHero.tsx";

interface PropertyProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Property({ onNavigate }: PropertyProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");


  const highlights = [
    {
      id: "ensuite",
      title: "En-Suite Bathrooms & Bedrooms",
      category: "interior",
      icon: BedDouble,
      description: "Generous personal spaces styled like elegant domestic bedrooms, not institutional wards.",
      details: [
        "Spacious premium styling with customized color boards based on resident preferences",
        "Fully private en-suite wetrooms, affirming absolute self-respect and bodily dignity",
        "Acoustically sound walls and triple-glazed windows to minimize unwanted sound stress",
        "Adaptable underfloor heating controls for custom tactile comfort schedules"
      ],
      tagline: "Total privacy and personalized warmth designed around individual sensory preferences."
    },
    {
      id: "sensory",
      title: "Sensory & Relaxation Dens",
      category: "therapeutic",
      icon: Palette,
      description: "Dedicated therapeutic escape hubs that prevent nervous system over-stimulation.",
      details: [
        "Fiber-optic visual streams and adjustable bubble tubes for visual focus calming",
        "Acoustic Bluetooth speaker arrays for custom music, white noise, or nature sounds",
        "Deep-pressure therapy tools including high-quality heavy rugs and custom support chairs",
        "Indirect dimmable LED ambiance that avoids sudden glare triggers"
      ],
      tagline: "A safe, low-excitation environment for cognitive self-regulation."
    },
    {
      id: "outdoor",
      title: "Expansive Safe Garden Areas",
      category: "exterior",
      icon: Sun,
      description: "Beautiful private outdoor courtyards and active gardening beds.",
      details: [
        "High-security safe physical boundary fencing masked by beautiful native British trees",
        "Bespoke raised planting beds for physical gardening therapies and herbs cultivation",
        "Secluded comfortable sensory swings and premium heavy-timber patio furniture",
        "Evenly-leveled, anti-slip paved walking pathways to support stress-relieving pacing"
      ],
      tagline: "Connecting with organic air and soil to ground distress and promote physical peace."
    },
    {
      id: "communal",
      title: "Warm Communal Areas",
      category: "interior",
      icon: Eye,
      description: "Inviting open-plan family living spaces, dining spaces, and teaching kitchens.",
      details: [
        "Large farm-style dining tables to promote family-like social integration",
        "Ergonomic couches and warm domestic soft rugs for relaxed gaming, movies, and reading",
        "Co-cooking teaching island with custom physical safety features (cool-touch stoves)",
        "Spacious, non-cluttered walkways to prevent accidental spatial tension between residents"
      ],
      tagline: "Shared spaces built to mirror real-world companionable living."
    },
    {
      id: "safety",
      title: "Subtle Safeguarding Architecture",
      category: "governance",
      icon: ShieldCheck,
      description: "High-level risk management embedded seamlessly without feeling prison-like.",
      details: [
        "Concealed digital thermostat networks preventing sudden hot water burns",
        "Impact-resistant warm-colored wall finishes and shatterproof safe glass options",
        "Discreet, non-intrusive modern fire systems and soundboards",
        "Soft proximity logs that alarm staff to immediate emergency exits without triggering air-horns"
      ],
      tagline: "Protecting lives through smart, invisible engineering rather than locks and bars."
    },
    {
      id: "home",
      title: "Homely Ambiance Guarantee",
      category: "therapeutic",
      icon: HeartHandshake,
      description: "A total guarantee against cold institutional sanitization.",
      details: [
        "We avoid institutional signage, stainless steel carts, or rigid wall notices",
        "Photos of residents' triumphs, dynamic art paintings, and real plants fill the hallways",
        "The smells of home-baked bread, coffee, and customized meals instead of chemical disinfectants",
        "Personal door keys for residents who possess safe independent capacity"
      ],
      tagline: "“This is a genuine home environment, not an institution.”"
    }
  ];

  const filteredHighlights = selectedCategory === "all"
    ? highlights
    : highlights.filter(h => h.category === selectedCategory);

  return (
    <div id="property-view" className="animate-fadeIn">
      <PageHero sectionId="property" onNavigate={onNavigate} />
      
      <section id="property" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: "Entire Home Preview" },
            { id: "interior", label: "Interior Spaces" },
            { id: "therapeutic", label: "Therapeutic Ambiance" },
            { id: "exterior", label: "Gardens & Outdoors" },
            { id: "governance", label: "Safe Architecture" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-sky-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredHighlights.map((hl) => {
              const Icon = hl.icon;
              return (
                <motion.div
                  layout
                  key={hl.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50 hover:bg-white rounded-3xl p-6 sm:p-8 border hover:border-sky-100 hover:shadow-xl hover:shadow-sky-150/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header line icon */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] uppercase font-mono bg-white text-slate-500 border border-slate-100 px-2.5 py-0.5 rounded-full font-bold">
                        {hl.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900">{hl.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{hl.description}</p>
                    </div>

                    {/* Details bullet lines */}
                    <ul className="space-y-2.5">
                      {hl.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                          <span className="text-emerald-500 text-sm mt-0.5">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aesthetic tagline accent for warmth */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center space-x-2 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/30">
                    <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <p className="text-[10px] text-emerald-900 leading-relaxed font-sans italic font-medium">
                      {hl.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Emotion block */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-sky-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Would you like a physical or virtual tour?</h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              We understand that choosing a home is a delicate milestone. Social workers, commissioners, and families are welcome to book Compatibility Visits to explore our sensory gardens and ambient common spaces.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate && onNavigate("contact")}
                className="inline-block px-6 py-3 bg-white text-emerald-950 font-bold rounded-xl text-xs hover:bg-sky-50 transition cursor-pointer"
              >
                Arrange a Visit to 6 Flags House
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
);
}
