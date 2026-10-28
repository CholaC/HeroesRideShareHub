import React, { useState } from 'react';
import { X, Users, Phone, CheckCircle, Clock, ShieldCheck, AlertCircle, Car, Check } from 'lucide-react';
import { ScheduledRide, BookingRecord } from '../types';

interface DriverManifestModalProps {
  ride: ScheduledRide;
  allBookings: BookingRecord[];
  onClose: () => void;
}

export const DriverManifestModal: React.FC<DriverManifestModalProps> = ({
  ride,
  allBookings,
  onClose,
}) => {
  // Find bookings for this ride
  const rideBookings = allBookings.filter((b) => b.rideId === ride.id);

  const [checkedInIds, setCheckedInIds] = useState<string[]>(['HS-CB-84920']);
  const [checklist, setChecklist] = useState({
    tolls: true,
    tyres: true,
    ac: true,
    rtsa: true,
  });

  const handleToggleCheckIn = (bookingId: string) => {
    if (checkedInIds.includes(bookingId)) {
      setCheckedInIds(checkedInIds.filter((id) => id !== bookingId));
    } else {
      setCheckedInIds([...checkedInIds, bookingId]);
    }
  };

  const totalBoarded = checkedInIds.filter((id) =>
    rideBookings.some((b) => b.id === id)
  ).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Driver Gate Operations</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{ride.stadiumGate}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Passenger Manifest & Gate Check-in
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
        <div className="p-6 space-y-6">
          {/* Trip Summary Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Corridor</p>
              <h4 className="font-bold text-slate-900 text-sm">
                Heroes Stadium → {ride.destinationCity} ({ride.destinationProvince})
              </h4>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Takeoff: {ride.departureDate} at {ride.departureTime} · {ride.stadiumGate}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 font-medium">Vehicle Plate</p>
              <p className="font-mono font-bold text-slate-900 text-sm">{ride.vehicle.plateNumber}</p>
              <p className="text-[11px] text-slate-600">{ride.vehicle.makeModel}</p>
            </div>
          </div>

          {/* Passenger List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Booked Passengers ({rideBookings.length})
              </h4>
              <span className="text-xs font-medium text-slate-500">
                {totalBoarded} of {rideBookings.length} Boarded at Gate
              </span>
            </div>

            {rideBookings.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                No bookings registered yet for this departure. Seats remain open on the public schedule.
              </div>
            ) : (
              <div className="space-y-3">
                {rideBookings.map((b) => {
                  const isCheckedIn = checkedInIds.includes(b.id);
                  const cleanPhone = b.passengerPhone.replace(/\s+/g, '');
                  return (
                    <div
                      key={b.id}
                      className={`p-3.5 rounded-xl border transition-all text-xs flex flex-wrap items-center justify-between gap-3 ${
                        isCheckedIn
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{b.passengerName}</span>
                          <span className="font-mono font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
                            Seats: {b.selectedSeats.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                          <span className="font-mono">NRC: {b.passengerNrcOrPassport}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">Phone: {b.passengerPhone}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Drop-off: <span className="font-semibold text-slate-700">{b.dropoffPoint}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => handleToggleCheckIn(b.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isCheckedIn
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {isCheckedIn ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Boarded</span>
                            </>
                          ) : (
                            <span>Check-In at Gate</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pre-Departure Vehicle & Highway Checklist */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2.5">
              Highway Departure Readiness Checklist (Great North Road T2)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.tolls}
                  onChange={(e) => setChecklist({ ...checklist, tolls: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Toll passes ready (Katuba & Kafulafuta)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.tyres}
                  onChange={(e) => setChecklist({ ...checklist, tyres: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Tyre pressure & spare wheel verified</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.ac}
                  onChange={(e) => setChecklist({ ...checklist, ac: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>Air conditioning & cabin fresh</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.rtsa}
                  onChange={(e) => setChecklist({ ...checklist, rtsa: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-700"
                />
                <span>RTSA fitness, road tax & insurance active</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Manifest
          </button>
        </div>
      </div>
    </div>
  );
};
