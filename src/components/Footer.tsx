import Logo from "./Logo";
import { ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-gov-blue/15 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900 items-start">
          
          {/* Column A: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Logo className="w-9 h-9" lightText={true} />
            
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Specialist, de-institutionalised residential support for adults with Learning Disabilities, Autism Spectrum Conditions, and complex dual-diagnosis Mental Health needs in the UK.
            </p>

            <div className="text-[10px] space-y-1 text-slate-500 font-mono">
              <p>Registered in England & Wales: #14810239</p>
              <p>CQC Nominated Individual: Boston Murray</p>
            </div>
          </div>

          {/* Column B: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
              Governance & Map
            </h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { id: "about", name: "About PRO Care" },
                { id: "model-of-care", name: "MDT Care Model" },
                { id: "services-hub", name: "Specialist Services" },
                { id: "property", name: "6 Flags House Showcase" },
                { id: "leadership", name: "Executive Leadership" },
                { id: "governance-safe", name: "Governance & Standards" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-premium-gold transition duration-150 text-left text-[11px] cursor-pointer"
                  >
                    • {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C: Dynamic Programs */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
              Systems & Careers
            </h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { id: "referrals", name: "Secure Referrals & Placements" },
                { id: "policies", name: "Policies & Standards Hub" },
                { id: "careers", name: "Values Recruitment" },
                { id: "contact", name: "Professional Contacts" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-premium-gold transition duration-150 text-left text-[11px] cursor-pointer"
                  >
                    • {item.name}
                  </button>
                </li>
              ))}
              <li>
                <span className="text-slate-500 text-[10px] font-bold block mt-1">CQC CERTIFICATION CHECK:</span>
                <span className="bg-gov-blue/20 text-premium-gold border border-premium-gold/30 text-[9px] py-1 px-2.5 rounded-full font-mono font-bold mt-0.5 inline-block">
                  CQC Core Provider Link Active
                </span>
              </li>
            </ul>
          </div>

          {/* Column D: Immediate Contact Info */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
              Secure Inboxes
            </h4>
            <ul className="space-y-3.5 pt-1 text-slate-400">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-premium-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">+44 (0) 7904 908123</p>
                  <p className="text-[9px] text-slate-500">Direct referrals lead</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-care-green flex-shrink-0 mt-0.5" />
                <div className="break-all">
                  <p className="font-bold text-white text-[11px]">info@procarehomes.co.uk</p>
                  <p className="text-[9px] text-slate-500">Secured contact inbox</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Column Legal declaration */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {year} PRO Care Homes Ltd (PRO-CH). All rights reserved. Regulated by the Care Quality Commission (CQC) in England.</p>
          
          <div className="flex items-center space-x-4">
            <a href="#governance" className="hover:text-white transition">Quality & Complaints Policy</a>
            <span>•</span>
            <a href="#careers" className="hover:text-white transition">Safeguarding First Recruitment Policy</a>
            <span>•</span>
            <a href="#contact" className="hover:text-white transition flex items-center space-x-1">
              <span>Commissioners Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
