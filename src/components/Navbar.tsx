import React from 'react';
import { Car, Ticket, PlusCircle, Compass, MapPin } from 'lucide-react';
import { BookingRecord } from '../types';

interface NavbarProps {
  onOpenPostRide: () => void;
  onOpenMyBookings: () => void;
  onOpenGateGuide: () => void;
  onOpenCorridorGuide: () => void;
  onSelectProvinceFilter: (province: string) => void;
  bookings: BookingRecord[];
  activeProvince: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPostRide,
  onOpenMyBookings,
  onOpenGateGuide,
  onOpenCorridorGuide,
  onSelectProvinceFilter,
  bookings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); onSelectProvinceFilter('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-sm">
            HE
          </div>
          <span className="font-outfit font-extrabold text-xl tracking-tight text-slate-950">
            Heroes<span className="text-emerald-700">Express</span>
          </span>
        </a>

        {/* Zone 2: Concise Nav Links (Single line, subtle hover) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectProvinceFilter('Copperbelt')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Copperbelt Corridor
          </button>
          <button
            onClick={() => onSelectProvinceFilter('All')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Provinces
          </button>
          <button
            onClick={onOpenGateGuide}
            className="flex items-center gap-1.5 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Stadium Gates</span>
          </button>
          <button
            onClick={onOpenCorridorGuide}
            className="flex items-center gap-1.5 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Toll & Highway Guide</span>
          </button>
          <button
            onClick={onOpenMyBookings}
            className="flex items-center gap-1.5 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-700 font-semibold"
          >
            <Ticket className="w-4 h-4 text-slate-700" />
            <span>My Bookings</span>
            {bookings.length > 0 && (
              <span className="ml-1 text-xs font-mono font-bold bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {bookings.length}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPostRide}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post a Ride</span>
          </button>

          {/* Mobile Booking shortcut */}
          <button
            onClick={onOpenMyBookings}
            aria-label="View My Bookings"
            className="md:hidden relative p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Ticket className="w-5 h-5" />
            {bookings.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-mono font-bold bg-slate-900 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {bookings.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
