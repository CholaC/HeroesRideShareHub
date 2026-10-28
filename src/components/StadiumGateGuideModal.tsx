import React from 'react';
import { X, MapPin, ShieldCheck, Clock, Navigation, CheckCircle2, AlertTriangle } from 'lucide-react';
import { STADIUM_GATES, HEROES_STADIUM_IMAGE } from '../data/mockData';

interface StadiumGateGuideModalProps {
  onClose: () => void;
  onSelectGateFilter?: (gate: string) => void;
}

export const StadiumGateGuideModal: React.FC<StadiumGateGuideModalProps> = ({
  onClose,
  onSelectGateFilter,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header with Stadium Banner */}
        <div className="relative bg-slate-950 text-white p-6 overflow-hidden">
          <img
            src={HEROES_STADIUM_IMAGE}
            alt="National Heroes Stadium Lusaka"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <span>Lusaka Departure Hub</span>
                <span aria-hidden="true">·</span>
                <span>Great North Road Corridor</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight font-outfit">
                National Heroes Stadium Gates & Staging Bays
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Official guide for passengers and private drivers staging at the 60,000-capacity National Heroes Stadium along the Great North Road (T2), Lusaka.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gate Directory */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STADIUM_GATES.map((gate) => (
              <div
                key={gate.name}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      {gate.bayLetter}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">T2 Corridor Access</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{gate.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {gate.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/70">
                  <p className="text-[11px] text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">How to locate: </span>
                    {gate.instructions}
                  </p>
                  {onSelectGateFilter && (
                    <button
                      onClick={() => {
                        onSelectGateFilter(gate.name);
                        onClose();
                      }}
                      className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Filter rides leaving from {gate.bayLetter}</span>
                      <Navigation className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Key Advantages & Passenger Instructions */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Why Depart from National Heroes Stadium?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <p className="font-semibold text-slate-900">Direct Highway Access</p>
                <p className="text-slate-600 mt-0.5">
                  Immediate slip road onto the T2 Great North Road heading to Kabwe and Copperbelt, avoiding central Lusaka jam.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">24/7 Security & Floodlights</p>
                <p className="text-slate-600 mt-0.5">
                  Stadium perimeter is guarded with lighted parking bays, clean amenities, and mobile money agents.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Arrive 20 Mins Prior</p>
                <p className="text-slate-600 mt-0.5">
                  Show your digital boarding pass on your phone to board your designated SUV or MPV.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
