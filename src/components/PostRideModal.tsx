import React, { useState } from 'react';
import { X, Check, Car, Plus, ShieldCheck, MapPin, Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { ScheduledRide, StadiumGate, ZambianProvince, VehicleCategory } from '../types';
import { DESTINATION_CITIES, STADIUM_GATES, generateSeatLayout, SUV_IMAGE, MPV_IMAGE } from '../data/mockData';

interface PostRideModalProps {
  onClose: () => void;
  onRideCreated: (ride: ScheduledRide) => void;
}

export const PostRideModal: React.FC<PostRideModalProps> = ({
  onClose,
  onRideCreated,
}) => {
  const [destinationCity, setDestinationCity] = useState('Ndola');
  const [stadiumGate, setStadiumGate] = useState<StadiumGate>('Gate 1 (Great North Road Bay)');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [departureTime, setDepartureTime] = useState('07:00');
  const [estimatedArrival, setEstimatedArrival] = useState('11:00');
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('Executive SUV');
  const [makeModel, setMakeModel] = useState('Toyota Fortuner 2.8');
  const [vehicleColor, setVehicleColor] = useState('Pearl White');
  const [plateNumber, setPlateNumber] = useState('BAJ 3920 ZM');
  const [seatsToOffer, setSeatsToOffer] = useState(3);
  const [pricePerSeatZMW, setPricePerSeatZMW] = useState(350);
  const [luggageBags, setLuggageBags] = useState(4);
  const [driverName, setDriverName] = useState('Mwamba Chanda');
  const [driverPhone, setDriverPhone] = useState('+260 97 ');
  const [driverBio, setDriverBio] = useState('Daily business commuter along the Lusaka-Copperbelt corridor.');
  const [dropoffsInput, setDropoffsInput] = useState('Town Centre, Kansenshi Mall, Broadway');
  const [amenities, setAmenities] = useState<string[]>([
    'Dual Climate A/C',
    'USB Fast Chargers',
    'Chilled Bottled Water',
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedDestObj = DESTINATION_CITIES.find((d) => d.name === destinationCity) || DESTINATION_CITIES[0];

  const handleToggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleCityChange = (city: string) => {
    setDestinationCity(city);
    const dest = DESTINATION_CITIES.find((d) => d.name === city);
    if (dest) {
      setPricePerSeatZMW(dest.basePriceZMW);
      setDropoffsInput(dest.popularDropoffs.slice(0, 3).join(', '));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!driverName.trim()) {
      setErrorMsg('Please enter your full driver name.');
      return;
    }
    if (driverPhone.replace(/\D/g, '').length < 9) {
      setErrorMsg('Please provide a valid Zambian phone number (+260...).');
      return;
    }
    if (!plateNumber.trim()) {
      setErrorMsg('Please enter your vehicle license plate (e.g. BAH 1234 ZM).');
      return;
    }

    const { seatLayout } = generateSeatLayout(vehicleCategory);

    const newRide: ScheduledRide = {
      id: `ride-custom-${Date.now()}`,
      driver: {
        id: `drv-${Date.now()}`,
        name: driverName.trim(),
        phone: driverPhone.trim(),
        rating: 5.0,
        tripsCount: 1,
        verifiedRTSA: true,
        memberSince: '2026',
        bio: driverBio.trim(),
      },
      vehicle: {
        category: vehicleCategory,
        makeModel: makeModel.trim(),
        year: 2023,
        color: vehicleColor.trim(),
        plateNumber: plateNumber.trim().toUpperCase(),
        imageUrl: vehicleCategory === 'Luxury MPV' ? MPV_IMAGE : SUV_IMAGE,
        luggageCapacityBags: luggageBags,
        features: amenities,
        seatLayout: seatLayout.slice(0, seatsToOffer),
      },
      originHub: 'National Heroes Stadium, Lusaka',
      stadiumGate: stadiumGate,
      destinationCity: selectedDestObj.name,
      destinationProvince: selectedDestObj.province,
      dropoffLocations: dropoffsInput.split(',').map((s) => s.trim()).filter(Boolean),
      departureDate: departureDate,
      departureTime: departureTime,
      estimatedArrival: estimatedArrival,
      pricePerSeatZMW: Number(pricePerSeatZMW),
      totalSeats: seatsToOffer,
      availableSeats: seatsToOffer,
      routeHighway: selectedDestObj.highway,
      stopsEnRoute: ['Katuba Toll Plaza', 'Kabwe Rest Stop'],
      instantBooking: true,
      rules: ['Punctual departure at Heroes Stadium', 'Clean interior', 'RTSA compliant trip'],
      isCustomRide: true,
    };

    onRideCreated(newRide);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Car Owner / Driver Portal</span>
              <span aria-hidden="true">·</span>
              <span>National Heroes Stadium Staging</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Schedule & Post a Private Ride
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Route & Schedule */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              1. Route & Departure Staging
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination City *
                </label>
                <select
                  value={destinationCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                >
                  <optgroup label="Copperbelt Province">
                    <option value="Ndola">Ndola (T2 / T3 - 316 km)</option>
                    <option value="Kitwe">Kitwe (Dual Carriageway - 360 km)</option>
                    <option value="Chingola">Chingola (Mining Hub - 410 km)</option>
                    <option value="Mufulira">Mufulira (375 km)</option>
                    <option value="Luanshya">Luanshya (320 km)</option>
                    <option value="Chililabombwe">Chililabombwe (440 km)</option>
                  </optgroup>
                  <optgroup label="Central Province">
                    <option value="Kabwe">Kabwe (140 km)</option>
                    <option value="Kapiri Mposhi">Kapiri Mposhi (210 km)</option>
                  </optgroup>
                  <optgroup label="Other Provinces">
                    <option value="Solwezi">Solwezi (North-Western - 590 km)</option>
                    <option value="Livingstone">Livingstone (Southern - 480 km)</option>
                    <option value="Chipata">Chipata (Eastern - 570 km)</option>
                    <option value="Mansa">Mansa (Luapula - 640 km)</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Heroes Stadium Departure Gate *
                </label>
                <select
                  value={stadiumGate}
                  onChange={(e) => setStadiumGate(e.target.value as StadiumGate)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                >
                  {STADIUM_GATES.map((g) => (
                    <option key={g.name} value={g.name}>
                      {g.name} ({g.bayLetter})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure Date *
                </label>
                <input
                  type="date"
                  required
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Takeoff Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Est. Arrival
                  </label>
                  <input
                    type="time"
                    required
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drop-off Points (comma-separated landmarks in destination town)
                </label>
                <input
                  type="text"
                  value={dropoffsInput}
                  onChange={(e) => setDropoffsInput(e.target.value)}
                  placeholder="e.g. Town Centre, Kansenshi Mall, CBU Gate"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle & Pricing */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              2. Vehicle Specs & Seat Pricing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Class *
                </label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value as VehicleCategory)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                >
                  <option value="Executive SUV">Executive SUV (Fortuner / Prado)</option>
                  <option value="Luxury MPV">Luxury MPV (Alphard / Noah 7-seater)</option>
                  <option value="Comfort Sedan">Comfort Sedan (Mark X / Premio)</option>
                  <option value="Executive Van">Executive Van (Super Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Make & Model *
                </label>
                <input
                  type="text"
                  required
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="e.g. Toyota Fortuner 2.8"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Zambian License Plate *
                </label>
                <input
                  type="text"
                  required
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="e.g. BAH 4920 ZM"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seats to Offer *
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={seatsToOffer}
                  onChange={(e) => setSeatsToOffer(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price per Seat (ZMW) *
                </label>
                <input
                  type="number"
                  min={50}
                  step={10}
                  value={pricePerSeatZMW}
                  onChange={(e) => setPricePerSeatZMW(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Luggage Boot Capacity
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={luggageBags}
                  onChange={(e) => setLuggageBags(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Included Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Dual Climate A/C',
                  'High Speed Wi-Fi hotspot',
                  'USB Fast Chargers',
                  'Chilled Bottled Water',
                  'Spacious Leather Seats',
                  'Strictly Non-Smoking',
                  'Luggage Roof Rack',
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => handleToggleAmenity(item)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer border ${
                      amenities.includes(item)
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {amenities.includes(item) ? '✓ ' : '+ '}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Driver Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              3. Driver Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Driver Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Mwamba Chanda"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Driver Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="+260 97 1234567"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Publish Ride Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
