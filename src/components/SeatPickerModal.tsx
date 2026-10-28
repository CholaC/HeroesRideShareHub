import React, { useState } from 'react';
import { X, Check, Info, ShieldCheck, Car } from 'lucide-react';
import { ScheduledRide, Seat } from '../types';

interface SeatPickerModalProps {
  ride: ScheduledRide;
  onClose: () => void;
  onProceedToBooking: (selectedSeats: Seat[]) => void;
}

export const SeatPickerModal: React.FC<SeatPickerModalProps> = ({
  ride,
  onClose,
  onProceedToBooking,
}) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const handleToggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeats = ride.vehicle.seatLayout.filter((s) => selectedSeatIds.includes(s.id));

  const totalSeatsPrice = selectedSeats.reduce((acc, seat) => {
    return acc + ride.pricePerSeatZMW + (seat.extraChargeZMW || 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{ride.vehicle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{ride.vehicle.makeModel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-600">{ride.vehicle.plateNumber}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Select Your Preferred Seats
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Trip Summary Quick Banner */}
          <div className="mb-6 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-emerald-950">
                Heroes Stadium ({ride.stadiumGate.split('(')[0].trim()}) → {ride.destinationCity}
              </span>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Departs {ride.departureDate} at {ride.departureTime} (Est. Arrival {ride.estimatedArrival})
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[11px]">Base Fare</p>
              <p className="font-mono font-bold text-emerald-900 text-sm">
                ZMW {ride.pricePerSeatZMW}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Visual Vehicle Interior (RHD layout - Zambia drive on left, steering on right) */}
            <div className="md:col-span-7 bg-slate-100/80 rounded-2xl p-5 border border-slate-200">
              <div className="text-center mb-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Front Windscreen / Travel Direction
                </span>
                <div className="w-20 h-1 bg-slate-300 mx-auto mt-1 rounded-full" />
              </div>

              {/* Vehicle Cabin Layout */}
              <div className="space-y-4 max-w-[280px] mx-auto py-2">
                {/* Front Row (Driver on Right for Zambia RHD) */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left Passenger Seat (F1) */}
                  {ride.vehicle.seatLayout
                    .filter((s) => s.row === 'front')
                    .map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      return (
                        <button
                          key={seat.id}
                          onClick={() => handleToggleSeat(seat)}
                          disabled={seat.isBooked}
                          className={`flex-1 p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            seat.isBooked
                              ? 'bg-slate-200/80 border-slate-300 text-slate-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-emerald-700 border-emerald-800 text-white shadow-sm'
                              : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-600'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold">{seat.code}</span>
                          <span className="text-[10px] mt-0.5 font-medium">Front</span>
                          {seat.extraChargeZMW ? (
                            <span className="text-[9px] opacity-80 mt-0.5">
                              +{seat.extraChargeZMW} ZMW
                            </span>
                          ) : null}
                        </button>
                      );
                    })}

                  {/* Steering Wheel / Driver Box (Right Hand Drive) */}
                  <div className="flex-1 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-200/50 flex flex-col items-center justify-center text-slate-500">
                    <span className="text-xs font-semibold">Driver</span>
                    <span className="text-[9px] text-slate-400 truncate max-w-[70px]">
                      {ride.driver.name.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Middle Row */}
                <div className="flex items-center justify-center gap-3">
                  {ride.vehicle.seatLayout
                    .filter((s) => s.row === 'middle')
                    .map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      return (
                        <button
                          key={seat.id}
                          onClick={() => handleToggleSeat(seat)}
                          disabled={seat.isBooked}
                          className={`flex-1 p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            seat.isBooked
                              ? 'bg-slate-200/80 border-slate-300 text-slate-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-emerald-700 border-emerald-800 text-white shadow-sm'
                              : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-600'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold">{seat.code}</span>
                          <span className="text-[10px] mt-0.5 font-medium truncate max-w-[65px]">
                            {seat.label.includes('Captain') ? 'Captain' : 'Middle'}
                          </span>
                          {seat.extraChargeZMW ? (
                            <span className="text-[9px] opacity-80 mt-0.5">
                              {seat.extraChargeZMW > 0 ? `+${seat.extraChargeZMW}` : seat.extraChargeZMW} ZMW
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                </div>

                {/* Rear Row (if applicable) */}
                {ride.vehicle.seatLayout.some((s) => s.row === 'rear') && (
                  <div className="flex items-center justify-center gap-3 pt-1 border-t border-slate-200">
                    {ride.vehicle.seatLayout
                      .filter((s) => s.row === 'rear')
                      .map((seat) => {
                        const isSelected = selectedSeatIds.includes(seat.id);
                        return (
                          <button
                            key={seat.id}
                            onClick={() => handleToggleSeat(seat)}
                            disabled={seat.isBooked}
                            className={`flex-1 p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                              seat.isBooked
                                ? 'bg-slate-200/80 border-slate-300 text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-700 border-emerald-800 text-white shadow-sm'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-600'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold">{seat.code}</span>
                            <span className="text-[10px] mt-0.5 font-medium">Rear</span>
                            {seat.extraChargeZMW ? (
                              <span className="text-[9px] opacity-80 mt-0.5">
                                {seat.extraChargeZMW > 0 ? `+${seat.extraChargeZMW}` : seat.extraChargeZMW} ZMW
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Rear Boot / Trunk Indication */}
              <div className="text-center mt-3 pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 font-medium">
                  Spacious Luggage Boot · {ride.vehicle.luggageCapacityBags} Large Suitcase Capacity
                </span>
              </div>
            </div>

            {/* Right Column: Seat Breakdown & Selection Overview */}
            <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Seat Status Legend
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded bg-white border border-slate-300" />
                    <span className="text-slate-600">Available Seat</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded bg-emerald-700 border border-emerald-800" />
                    <span className="text-slate-800 font-medium">Your Selected Seat</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300" />
                    <span className="text-slate-400">Booked by Other Passenger</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Selected Seats ({selectedSeats.length})
                  </h4>
                  {selectedSeats.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      Click any available seat on the car diagram to select.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedSeats.map((seat) => (
                        <div
                          key={seat.id}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-100"
                        >
                          <span className="font-semibold text-slate-800">
                            Seat {seat.code} ({seat.label})
                          </span>
                          <span className="font-mono tabular-nums text-slate-900 font-bold">
                            ZMW {ride.pricePerSeatZMW + (seat.extraChargeZMW || 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total & Checkout button */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-slate-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-extrabold font-mono tabular-nums text-emerald-900">
                    ZMW {totalSeatsPrice}
                  </span>
                </div>

                <button
                  onClick={() => onProceedToBooking(selectedSeats)}
                  disabled={selectedSeats.length === 0}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedSeats.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    Proceed with {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
