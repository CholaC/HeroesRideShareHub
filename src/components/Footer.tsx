import React from 'react';
import { MapPin, Phone, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onOpenGateGuide: () => void;
  onOpenCorridorGuide: () => void;
  onSelectProvince: (prov: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGateGuide,
  onOpenCorridorGuide,
  onSelectProvince,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
                HE
              </div>
              <span className="font-outfit font-extrabold text-lg text-white tracking-tight">
                Heroes<span className="text-emerald-400">Express</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Premier private vehicle ride sharing platform headquartered at National Heroes Stadium along the Great North Road, Lusaka, Zambia.
            </p>
            <div className="pt-1 text-[11px] text-slate-500">
              <p>Staging: National Heroes Stadium, Gates 1 to 5</p>
              <p>Corridor: T2 / T3 Great North Highway</p>
            </div>
          </div>

          {/* Copperbelt Routes */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Copperbelt Corridors
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectProvince('Copperbelt')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Heroes Stadium → Ndola (316 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Copperbelt')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Heroes Stadium → Kitwe (360 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Copperbelt')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Heroes Stadium → Chingola (410 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Copperbelt')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Heroes Stadium → Mufulira (375 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Copperbelt')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Heroes Stadium → Luanshya (320 km)
                </button>
              </li>
            </ul>
          </div>

          {/* Other Provinces */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Other Provincial Express
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectProvince('Central')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Central: Kabwe & Kapiri Mposhi (T2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Southern')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Southern: Livingstone & Choma (T1)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('North-Western')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  North-Western: Solwezi Mining Express (T5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Eastern')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Eastern: Chipata & South Luangwa (T4)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProvince('Luapula')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Luapula: Mansa via Pedicle (T3)
                </button>
              </li>
            </ul>
          </div>

          {/* Stadium Hub & Safety */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Safety & Staging Hub
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenGateGuide}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Stadium Gate Map & Bays</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorridorGuide}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Toll Plaza Rates & Highway Milestones</span>
                </button>
              </li>
              <li className="pt-2 text-slate-500 text-[11px]">
                <p>Zambia Police Toll Free: 991</p>
                <p>RTSA Highway Safety: 983</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Heroes Express Zambia. Private inter-provincial ride sharing network.</p>
          <div className="flex items-center gap-4">
            <span>RTSA Certified Drivers</span>
            <span aria-hidden="true">·</span>
            <span>National Registration Manifest Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Lusaka Great North Corridor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
