import React from 'react';
import { Clock, ShieldCheck, MapPin, User, ChevronRight, Wind, Wifi, BatteryCharging, Luggage } from 'lucide-react';
import { ScheduledRide } from '../types';

interface RideCardProps {
  ride: ScheduledRide;
  onSelectRide: (ride: ScheduledRide) => void;
  onViewDriverManifest?: (ride: ScheduledRide) => void;
}

export const RideCard: React.FC<RideCardProps> = ({
  ride,
  onSelectRide,
  onViewDriverManifest,
}) => {
  const isAlmostFull = ride.availableSeats <= 1 && ride.availableSeats > 0;
  const isSoldOut = ride.availableSeats === 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs hover:shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* Left Column: Vehicle Thumbnail & Gate Indicator */}
      <div className="md:w-64 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {ride.vehicle.imageUrl ? (
            <div className="rounded-lg overflow-hidden bg-slate-200 mb-3 aspect-[4/3]">
              <img
                src={ride.vehicle.imageUrl}
                alt={ride.vehicle.makeModel}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="rounded-lg bg-slate-200 mb-3 aspect-[4/3] flex items-center justify-center text-slate-400 text-xs">
              Vehicle Photo
            </div>
          )}

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {ride.vehicle.makeModel}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span>{ride.vehicle.color}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{ride.vehicle.plateNumber}</span>
            </div>
          </div>
        </div>

        {/* Departure Bay at Heroes Stadium */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-xs">
          <p className="font-semibold text-slate-800 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{ride.stadiumGate}</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">National Heroes Stadium Hub</p>
        </div>
      </div>

      {/* Center Column: Trip Times, Route, Driver & Vehicle Amenities */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header (NO PILLS) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{ride.vehicle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{ride.destinationProvince} Province</span>
              <span aria-hidden="true">·</span>
              <span>{ride.routeHighway}</span>
            </div>

            {ride.isCustomRide && (
              <span className="text-emerald-700 font-medium">User Scheduled Ride</span>
            )}
          </div>

          {/* Departure & Arrival Schedule */}
          <div className="flex items-center gap-4 sm:gap-8 my-3">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Departure</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  {ride.departureTime}
                </span>
                <span className="text-xs text-slate-500 font-medium">{ride.departureDate}</span>
              </div>
              <p className="text-xs font-medium text-emerald-800 mt-0.5">Heroes Stadium, Lusaka</p>
            </div>

            <div className="flex-1 flex flex-col items-center px-2">
              <span className="text-[11px] text-slate-400 font-medium mb-1">
                {ride.stopsEnRoute.length} stops en route
              </span>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <div className="h-0.5 flex-1 bg-slate-300" />
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[160px]">
                via {ride.stopsEnRoute[0] || 'T2 Corridor'}
              </span>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Est. Arrival</p>
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  {ride.estimatedArrival}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">{ride.destinationCity}</p>
            </div>
          </div>

          {/* Popular Drop-off Locations */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Drop-offs: </span>
              {ride.dropoffLocations.slice(0, 3).join(', ')}
              {ride.dropoffLocations.length > 3 && ` +${ride.dropoffLocations.length - 3} more`}
            </p>
          </div>

          {/* Driver & Features Row */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-[11px]">
                {ride.driver.name.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-slate-900">{ride.driver.name}</span>
                <span className="text-slate-400 ml-1.5">
                  ★ {ride.driver.rating} · {ride.driver.tripsCount} trips
                </span>
              </div>
              {ride.driver.verifiedRTSA && (
                <span className="inline-flex items-center gap-0.5 text-emerald-700 text-[11px] font-medium ml-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RTSA Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-slate-400" /> AC
              </span>
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-slate-400" /> Wi-Fi
              </span>
              <span className="flex items-center gap-1">
                <Luggage className="w-3.5 h-3.5 text-slate-400" /> {ride.vehicle.luggageCapacityBags} Bags
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Booking Action Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-slate-500">From</span>
              <span className="text-2xl font-extrabold font-mono tabular-nums text-emerald-900">
                ZMW {ride.pricePerSeatZMW}
              </span>
              <span className="text-xs text-slate-500">/ seat</span>
            </div>
            <p className="text-xs mt-0.5">
              {isSoldOut ? (
                <span className="text-rose-600 font-medium">Fully Booked</span>
              ) : isAlmostFull ? (
                <span className="text-amber-700 font-medium">Only {ride.availableSeats} seat left</span>
              ) : (
                <span className="text-slate-500">{ride.availableSeats} of {ride.totalSeats} seats open</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onViewDriverManifest && (
              <button
                onClick={() => onViewDriverManifest(ride)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Manifest
              </button>
            )}

            <button
              onClick={() => onSelectRide(ride)}
              disabled={isSoldOut}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs ${
                isSoldOut
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <span>{isSoldOut ? 'Sold Out' : 'Select Seat & Book'}</span>
              {!isSoldOut && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
