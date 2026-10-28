import React from 'react';
import { X, Ticket, Calendar, Clock, MapPin, Car, Phone, MessageSquare, AlertCircle, Trash2 } from 'lucide-react';
import { BookingRecord } from '../types';

interface MyBookingsModalProps {
  bookings: BookingRecord[];
  onClose: () => void;
  onViewPass: (booking: BookingRecord) => void;
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  onClose,
  onViewPass,
  onCancelBooking,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Heroes Express</span>
              <span aria-hidden="true">·</span>
              <span>Passenger Trip Manager</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              My Scheduled Bookings ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-900">No active bookings found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Search available private vehicles leaving from National Heroes Stadium and select your seats to book.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const cleanPhone = booking.driverPhone.replace(/\s+/g, '');
                return (
                  <div
                    key={booking.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-emerald-800">
                          {booking.id}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-700">
                          {booking.destinationCity} ({booking.destinationProvince})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono tabular-nums font-bold text-slate-900">
                          ZMW {booking.totalAmountZMW}
                        </span>
                        <span className="text-emerald-700 font-medium">({booking.paymentStatus})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 text-xs">
                      <div>
                        <p className="text-slate-500 font-medium">Pickup Bay</p>
                        <p className="font-bold text-slate-900">{booking.stadiumGate}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">National Heroes Stadium, Lusaka</p>
                      </div>

                      <div>
                        <p className="text-slate-500 font-medium">Departure Schedule</p>
                        <p className="font-bold text-slate-900 font-mono">
                          {booking.departureDate} at {booking.departureTime}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Assigned Seat(s): <span className="font-bold font-mono text-slate-800">{booking.selectedSeats.join(', ')}</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 font-medium">Driver & Car</p>
                        <p className="font-semibold text-slate-800">{booking.driverName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {booking.vehicleMakeModel} · {booking.vehiclePlate}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 font-medium">Drop-off Destination</p>
                        <p className="font-semibold text-slate-800">{booking.dropoffPoint}</p>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="px-2.5 py-1 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-emerald-700" />
                          <span>Call Driver</span>
                        </a>
                        <a
                          href={`https://wa.me/${cleanPhone.replace('+', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-xs text-emerald-800 hover:text-emerald-950 bg-emerald-50 rounded-md transition-colors flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        >
                          Cancel Ride
                        </button>
                        <button
                          onClick={() => onViewPass(booking)}
                          className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                        >
                          View Boarding Pass
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
