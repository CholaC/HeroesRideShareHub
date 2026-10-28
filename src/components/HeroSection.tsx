import React from 'react';
import { Search, MapPin, Calendar, Car, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { HEROES_STADIUM_IMAGE, DESTINATION_CITIES, STADIUM_GATES } from '../data/mockData';
import { VehicleCategory } from '../types';

interface HeroSectionProps {
  selectedDestination: string;
  onDestinationChange: (val: string) => void;
  selectedGate: string;
  onGateChange: (val: string) => void;
  selectedDate: string;
  onDateChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  onQuickRouteSelect: (destinationCity: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedDestination,
  onDestinationChange,
  selectedGate,
  onGateChange,
  selectedDate,
  onDateChange,
  selectedCategory,
  onCategoryChange,
  onQuickRouteSelect,
}) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Graphic & Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HEROES_STADIUM_IMAGE}
          alt="National Heroes Stadium Lusaka Departure Bay"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3">
            <span>National Heroes Stadium Hub</span>
            <span aria-hidden="true">·</span>
            <span>Great North Road Corridor</span>
            <span aria-hidden="true">·</span>
            <span>Express Private Travel</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-outfit text-balance">
            Private Ride Sharing from Heroes Stadium to the Copperbelt & All Provinces
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Skip town-centre bus station congestion. Board vetted private SUVs, luxury 7-seaters, and sedans from secure, lighted bays at National Heroes Stadium directly onto the Great North Road.
          </p>

          {/* Quick Route Shortcuts (Segmented style buttons) */}
          <div className="flex items-center flex-wrap gap-2 mb-8">
            <span className="text-xs text-slate-400 font-medium mr-1">Popular routes:</span>
            {['Ndola', 'Kitwe', 'Chingola', 'Kabwe', 'Solwezi', 'Livingstone'].map((city) => (
              <button
                key={city}
                onClick={() => onQuickRouteSelect(city)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedDestination === city
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Central Search & Booking Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xl border border-slate-200 text-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Origin (Heroes Stadium Bay) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pickup At Stadium
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-emerald-700" />
                <select
                  value={selectedGate}
                  onChange={(e) => onGateChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900 font-medium"
                >
                  <option value="All">All Stadium Gates & Bays</option>
                  {STADIUM_GATES.map((g) => (
                    <option key={g.name} value={g.name}>
                      {g.name} ({g.bayLetter})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Destination City
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-700" />
                <select
                  value={selectedDestination}
                  onChange={(e) => onDestinationChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900 font-medium"
                >
                  <option value="All">All Destinations</option>
                  <optgroup label="Copperbelt Province">
                    <option value="Ndola">Ndola (via T2/T3 - 316 km)</option>
                    <option value="Kitwe">Kitwe (via Dual Carriageway - 360 km)</option>
                    <option value="Chingola">Chingola (Mining Corridor - 410 km)</option>
                    <option value="Mufulira">Mufulira (375 km)</option>
                    <option value="Luanshya">Luanshya (320 km)</option>
                    <option value="Chililabombwe">Chililabombwe / Kasumbalesa (440 km)</option>
                  </optgroup>
                  <optgroup label="Central Province">
                    <option value="Kabwe">Kabwe (140 km)</option>
                    <option value="Kapiri Mposhi">Kapiri Mposhi (210 km)</option>
                    <option value="Serenje">Serenje (390 km)</option>
                  </optgroup>
                  <optgroup label="Southern Province">
                    <option value="Choma">Choma (285 km)</option>
                    <option value="Livingstone">Livingstone / Victoria Falls (480 km)</option>
                    <option value="Mazabuka">Mazabuka (130 km)</option>
                  </optgroup>
                  <optgroup label="Other Provinces">
                    <option value="Solwezi">Solwezi (North-Western - 590 km)</option>
                    <option value="Chipata">Chipata (Eastern - 570 km)</option>
                    <option value="Mansa">Mansa (Luapula - 640 km)</option>
                    <option value="Kasama">Kasama (Northern - 850 km)</option>
                    <option value="Mongu">Mongu (Western - 590 km)</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Travel Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Departure Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-emerald-700" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onDateChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vehicle Preference
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-2.5 w-4 h-4 text-emerald-700" />
                <select
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-900 font-medium"
                >
                  <option value="All">All Vehicle Classes</option>
                  <option value="Executive SUV">Executive SUV (Fortuner / Prado)</option>
                  <option value="Luxury MPV">Luxury MPV (Alphard / Noah 7-seater)</option>
                  <option value="Comfort Sedan">Comfort Sedan (Mark X / Premio)</option>
                  <option value="Executive Van">Executive Van (Super Custom)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Proof & Corridor Strip (Below Hero Split) */}
      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Fast Copperbelt Express</p>
                <p className="text-sm font-semibold text-white">Ndola in 3h 45m · Kitwe 4h 15m</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Private Comfort</p>
                <p className="text-sm font-semibold text-white">100% Air-Conditioned Vehicles</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Verified Drivers</p>
                <p className="text-sm font-semibold text-white">RTSA Licenced & Police Cleared</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Departure Hub</p>
                <p className="text-sm font-semibold text-white">Heroes Stadium Secure Parking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
