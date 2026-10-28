import React from 'react';
import { X, Navigation, Fuel, DollarSign, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { TOLL_GATES, HIGHWAY_IMAGE } from '../data/mockData';

interface RouteCorridorGuideModalProps {
  onClose: () => void;
  onFilterProvince?: (province: string) => void;
}

export const RouteCorridorGuideModal: React.FC<RouteCorridorGuideModalProps> = ({
  onClose,
  onFilterProvince,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header with Scenic Highway Image */}
        <div className="relative bg-slate-950 text-white p-6 overflow-hidden">
          <img
            src={HIGHWAY_IMAGE}
            alt="Zambian Highway Corridor to Copperbelt"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <span>Zambia Inter-Provincial Corridors</span>
                <span aria-hidden="true">·</span>
                <span>T2 / T3 Great North Highway</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight font-outfit">
                Highway Corridors, Distances & Toll Guide
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Comprehensive travel advisory from National Heroes Stadium (Lusaka) along key arteries into Copperbelt, Central, Southern, Eastern, and North-Western provinces.
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Copperbelt Corridor Milestone Step-by-Step */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Lusaka to Copperbelt Highway Milestones (T2 → T3)
            </h4>
            <div className="space-y-3">
              {[
                {
                  point: 'National Heroes Stadium (Lusaka)',
                  km: '0 km',
                  time: '0h 00m',
                  detail: 'Secure departures from Gates 1, VIP Concourse, or West Lot directly onto T2 North.',
                },
                {
                  point: 'Katuba Toll Plaza',
                  km: '15 km',
                  time: '0h 15m',
                  detail: 'First toll plaza north of Lusaka. Car ZMW 20 / SUV ZMW 40 (Electronic toll tag lanes).',
                },
                {
                  point: 'Kabwe Town (Central Province)',
                  km: '140 km',
                  time: '1h 45m',
                  detail: 'Big Tree monument, Kabwe Mall & Shoprite, Fig Tree Cafe rest stop.',
                },
                {
                  point: 'Kapiri Mposhi Junction',
                  km: '210 km',
                  time: '2h 30m',
                  detail: 'Crucial T-junction. T2 continues north-east to Mpika/Tanzania; T3 branches north-west into Copperbelt.',
                },
                {
                  point: 'Kafulafuta Toll Plaza',
                  km: '275 km',
                  time: '3h 15m',
                  detail: 'Gateway toll gate directly leading into Ndola and Luanshya boundaries.',
                },
                {
                  point: 'Ndola (Commercial Capital)',
                  km: '316 km',
                  time: '3h 45m',
                  detail: 'Broadway, Kansenshi Mall, Indeni Roundabout, Levy Mwanawasa Stadium.',
                },
                {
                  point: 'Kitwe (Via Dual Carriageway)',
                  km: '360 km',
                  time: '4h 15m',
                  detail: 'Mukuba Mall, Parklands, Copperbelt University (CBU), Kitwe Town Centre.',
                },
                {
                  point: 'Chingola (Mining Heartland)',
                  km: '410 km',
                  time: '4h 50m',
                  detail: '11th Street Mall, Kabundi, Nchanga Mine entrance, Kasumbalesa border link.',
                },
              ].map((step, idx) => (
                <div key={step.point} className="flex items-start gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </div>
                    {idx < 7 && <div className="w-0.5 h-7 bg-slate-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{step.point}</span>
                      <span className="font-mono text-slate-500 font-medium">
                        {step.km} · {step.time}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toll Plazas Directory */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Official Toll Plaza Rates (National Road Fund Agency)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {TOLL_GATES.map((toll) => (
                <div
                  key={toll.name}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">{toll.name}</p>
                    <p className="text-[11px] text-slate-500">{toll.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-emerald-900">
                      ZMW {toll.carFeeZMW} / ZMW {toll.suvFeeZMW}
                    </p>
                    <p className="text-[10px] text-slate-400">Sedan / SUV</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Provinces Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2">Other Provincial Corridors from Lusaka</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Southern (T1)</p>
                <p className="text-[11px] mt-0.5">Livingstone (480 km), Choma (285 km), Mazabuka (130 km). Scenic Victoria Falls highway.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Eastern (T4)</p>
                <p className="text-[11px] mt-0.5">Chipata (570 km), Petauke (400 km). Great East Road through Luangwa Valley bridge.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">North-Western (T5)</p>
                <p className="text-[11px] mt-0.5">Solwezi (590 km), Lumwana, Kalumbila via Chingola. Rapidly growing mining corridor.</p>
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
