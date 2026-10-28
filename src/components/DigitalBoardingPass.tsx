import React, { useState } from 'react';
import { X, Printer, Check, Phone, MessageSquare, MapPin, Calendar, Clock, Car, ShieldCheck, Copy, Share2 } from 'lucide-react';
import { BookingRecord } from '../types';

interface DigitalBoardingPassProps {
  booking: BookingRecord;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const DigitalBoardingPass: React.FC<DigitalBoardingPassProps> = ({
  booking,
  onClose,
  onViewAllBookings,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const cleanDriverPhone = booking.driverPhone.replace(/\s+/g, '');
  const cleanPassengerPhone = booking.passengerPhone.replace(/\s+/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 print:shadow-none print:border-none print:m-0">
        {/* Pass Top Banner */}
        <div className="bg-slate-950 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                HE
              </div>
              <div>
                <h3 className="font-outfit font-bold text-lg leading-tight tracking-tight">
                  Heroes<span className="text-emerald-400">Express</span>
                </h3>
                <p className="text-[11px] text-slate-400">Inter-Provincial Official Boarding Pass</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors print:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ticket Reference Code Bar */}
          <div className="mt-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Boarding Pass Number
              </p>
              <p className="text-xl font-mono font-extrabold text-emerald-400 tracking-wider">
                {booking.id}
              </p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Boarding Pass Body */}
        <div className="p-6 space-y-6">
          {/* Origin & Destination Corridor */}
          <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-200">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Departure Hub</p>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">National Heroes Stadium</h4>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{booking.stadiumGate}</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Lusaka, Zambia (Great North Road)</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Destination City</p>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">{booking.destinationCity}</h4>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{booking.destinationProvince} Province</p>
              <p className="text-[11px] text-emerald-800 mt-1 truncate max-w-[200px] ml-auto">
                Drop-off: {booking.dropoffPoint}
              </p>
            </div>
          </div>

          {/* Departure Date & Assigned Seats Grid */}
          <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Date</p>
              <p className="font-bold text-slate-900 mt-0.5 font-mono">{booking.departureDate}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Departure Time</p>
              <p className="font-bold text-emerald-900 mt-0.5 font-mono text-sm">{booking.departureTime}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Assigned Seats</p>
              <p className="font-extrabold text-slate-950 mt-0.5 font-mono text-sm">
                {booking.selectedSeats.join(', ')}
              </p>
            </div>
          </div>

          {/* Passenger & Driver Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Passenger */}
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Passenger</p>
              <p className="font-bold text-slate-900 text-sm">{booking.passengerName}</p>
              <p className="text-slate-600 font-mono">NRC: {booking.passengerNrcOrPassport}</p>
              <p className="text-slate-600 font-mono">Phone: {booking.passengerPhone}</p>
            </div>

            {/* Driver & Vehicle */}
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Vehicle & Driver</p>
              <p className="font-bold text-slate-900 text-sm">{booking.vehicleMakeModel}</p>
              <p className="text-emerald-700 font-mono font-bold">Plate: {booking.vehiclePlate}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-700 font-medium">Driver: {booking.driverName}</span>
                <a
                  href={`tel:${cleanDriverPhone}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>
          </div>

          {/* Payment Status & Security Hash */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-800">Payment: {booking.paymentMethod}</span>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">Ref: {booking.paymentReference}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-900 text-base">
                ZMW {booking.totalAmountZMW}
              </span>
              <p className="text-[11px] text-emerald-700 font-medium">✓ {booking.paymentStatus}</p>
            </div>
          </div>

          {/* QR Code Simulation & Barcode */}
          <div className="pt-2 flex flex-col items-center justify-center text-center">
            <div className="p-2.5 bg-white border border-slate-300 rounded-xl shadow-xs inline-block">
              {/* Clean SVG QR representation */}
              <svg className="w-24 h-24 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                {/* 3 corner squares */}
                <rect x="10" y="10" width="24" height="24" rx="3" fill="#0f172a" />
                <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff" />
                <rect x="18" y="18" width="8" height="8" rx="1" fill="#0f172a" />

                <rect x="66" y="10" width="24" height="24" rx="3" fill="#0f172a" />
                <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff" />
                <rect x="74" y="18" width="8" height="8" rx="1" fill="#0f172a" />

                <rect x="10" y="66" width="24" height="24" rx="3" fill="#0f172a" />
                <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff" />
                <rect x="18" y="74" width="8" height="8" rx="1" fill="#0f172a" />

                {/* Pattern dots */}
                <rect x="42" y="12" width="6" height="6" rx="1" />
                <rect x="52" y="18" width="6" height="6" rx="1" />
                <rect x="42" y="28" width="6" height="6" rx="1" />
                <rect x="52" y="38" width="6" height="6" rx="1" />
                <rect x="20" y="44" width="6" height="6" rx="1" />
                <rect x="32" y="52" width="6" height="6" rx="1" />
                <rect x="44" y="52" width="8" height="8" rx="1" fill="#047857" />
                <rect x="60" y="52" width="6" height="6" rx="1" />
                <rect x="72" y="44" width="6" height="6" rx="1" />
                <rect x="80" y="58" width="6" height="6" rx="1" />
                <rect x="42" y="68" width="6" height="6" rx="1" />
                <rect x="54" y="78" width="6" height="6" rx="1" />
                <rect x="68" y="74" width="8" height="8" rx="1" />
                <rect x="82" y="82" width="6" height="6" rx="1" />
              </svg>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">
              Scan at Heroes Stadium Departure Gate for Express Check-in
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <a
              href={`https://wa.me/${cleanDriverPhone.replace('+', '')}?text=Hello%20${encodeURIComponent(booking.driverName)},%20I%20have%20booked%20seat(s)%20${booking.selectedSeats.join(',')}%20on%20Heroes%20Express%20(Ref:%20${booking.id})%20to%20${booking.destinationCity}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Driver</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewAllBookings}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              View in My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
