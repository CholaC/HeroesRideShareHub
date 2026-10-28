import React, { useState } from 'react';
import { X, Check, ShieldCheck, Phone, User, MapPin, Luggage, CreditCard, Smartphone, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScheduledRide, Seat, BookingRecord } from '../types';

interface BookingModalProps {
  ride: ScheduledRide;
  selectedSeats: Seat[];
  onClose: () => void;
  onBookingSuccess: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  ride,
  selectedSeats,
  onClose,
  onBookingSuccess,
}) => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('+260 97 ');
  const [nrcOrPassport, setNrcOrPassport] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('+260 ');
  const [dropoffPoint, setDropoffPoint] = useState(ride.dropoffLocations[0] || '');
  const [extraLuggage, setExtraLuggage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'MTN Mobile Money' | 'Airtel Money' | 'Zamtel Kwacha' | 'Visa / Card' | 'Cash at Stadium Gate'>('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState('+260 97 ');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const seatBaseCost = selectedSeats.reduce(
    (sum, s) => sum + ride.pricePerSeatZMW + (s.extraChargeZMW || 0),
    0
  );
  const extraLuggageCost = extraLuggage * 50; // ZMW 50 per extra bag
  const totalAmountZMW = seatBaseCost + extraLuggageCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!passengerName.trim()) {
      setErrorMsg('Please enter your full name as shown on your NRC or Passport.');
      return;
    }
    if (passengerPhone.replace(/\D/g, '').length < 9) {
      setErrorMsg('Please enter a valid Zambian phone number (+260...).');
      return;
    }
    if (!nrcOrPassport.trim()) {
      setErrorMsg('Please provide your NRC or Passport number for the inter-provincial manifest.');
      return;
    }
    if (!dropoffPoint.trim()) {
      setErrorMsg('Please specify your drop-off point in ' + ride.destinationCity);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing / gate confirmation
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#047857', '#059669', '#d97706', '#0284c7'],
        });
      } catch (err) {
        // Confetti fallback
      }

      const bookingRef = `HS-${ride.destinationCity.slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const newBooking: BookingRecord = {
        id: bookingRef,
        rideId: ride.id,
        passengerName: passengerName.trim(),
        passengerPhone: passengerPhone.trim(),
        passengerNrcOrPassport: nrcOrPassport.trim(),
        emergencyContact: emergencyPhone.trim(),
        selectedSeats: selectedSeats.map((s) => s.code),
        destinationCity: ride.destinationCity,
        destinationProvince: ride.destinationProvince,
        dropoffPoint: dropoffPoint.trim(),
        stadiumGate: ride.stadiumGate,
        departureDate: ride.departureDate,
        departureTime: ride.departureTime,
        vehicleMakeModel: ride.vehicle.makeModel,
        vehiclePlate: ride.vehicle.plateNumber,
        driverName: ride.driver.name,
        driverPhone: ride.driver.phone,
        farePerSeatZMW: ride.pricePerSeatZMW,
        extraLuggagePieces: extraLuggage,
        extraLuggageCostZMW: extraLuggageCost,
        totalAmountZMW: totalAmountZMW,
        paymentMethod: paymentMethod,
        paymentReference: paymentMethod === 'Cash at Stadium Gate' ? 'GATE-PAY-' + Math.floor(1000 + Math.random() * 9000) : 'MOM-' + Math.floor(1000000000 + Math.random() * 9000000000),
        paymentStatus: paymentMethod === 'Cash at Stadium Gate' ? 'Pending at Gate' : 'Paid',
        bookedAt: new Date().toISOString(),
        boardedStatus: 'Scheduled',
      };

      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>National Heroes Stadium Departure</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-700">{ride.destinationCity}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Passenger Details & Payment
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

          {/* Seat & Ride recap */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Selected Seats:</span>
              <span className="font-bold text-slate-900 font-mono">
                {selectedSeats.map((s) => `${s.code} (${s.label})`).join(', ')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Heroes Stadium Staging:</span>
              <span className="font-semibold text-slate-800">{ride.stadiumGate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Vehicle & Driver:</span>
              <span className="text-slate-700">
                {ride.vehicle.makeModel} ({ride.vehicle.plateNumber}) · {ride.driver.name}
              </span>
            </div>
          </div>

          {/* Passenger Information */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              1. Passenger Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (as on NRC/Passport) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juliet Mwamba"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Zambian Phone Number (for Driver Call/SMS) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+260 97 1234567"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NRC Number or Passport *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 293812/11/1 or ZM092182"
                  value={nrcOrPassport}
                  onChange={(e) => setNrcOrPassport(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Mandatory RTSA inter-provincial passenger manifest requirement
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="+260 96 0000000"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium font-mono"
                />
              </div>
            </div>
          </div>

          {/* Drop-off & Luggage */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              2. Destination Drop-off & Luggage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drop-off Location in {ride.destinationCity} *
                </label>
                <div className="space-y-1.5">
                  <select
                    value={dropoffPoint}
                    onChange={(e) => setDropoffPoint(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                  >
                    {ride.dropoffLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value="custom">Other Landmark (type below)</option>
                  </select>
                  {dropoffPoint === 'custom' && (
                    <input
                      type="text"
                      placeholder="Type specific landmark or street..."
                      onChange={(e) => setDropoffPoint(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Extra Luggage Pieces
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={extraLuggage}
                    onChange={(e) => setExtraLuggage(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                  >
                    <option value={0}>Standard Only (1 Suitcase included free)</option>
                    <option value={1}>+1 Extra Large Bag (+ZMW 50)</option>
                    <option value={2}>+2 Extra Large Bags (+ZMW 100)</option>
                    <option value={3}>+3 Extra Large Bags / Boxes (+ZMW 150)</option>
                  </select>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Private vehicles offer dedicated trunk storage space.
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              3. Payment Method
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'MTN Mobile Money', label: 'MTN MoMo', tag: 'Instant Prompt' },
                { id: 'Airtel Money', label: 'Airtel Money', tag: 'Fast Push' },
                { id: 'Zamtel Kwacha', label: 'Zamtel Kwacha', tag: 'Direct USSD' },
                { id: 'Visa / Card', label: 'Card / Visa', tag: 'Debit / Credit' },
                { id: 'Cash at Stadium Gate', label: 'Pay at Gate Bay', tag: 'Cash on Boarding' },
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === method.id
                      ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{method.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{method.tag}</p>
                </button>
              ))}
            </div>

            {/* Mobile money phone input */}
            {(paymentMethod === 'MTN Mobile Money' || paymentMethod === 'Airtel Money' || paymentMethod === 'Zamtel Kwacha') && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {paymentMethod} Registered Number for PIN Authorization
                </label>
                <input
                  type="tel"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-md font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  You will receive an instant push prompt on your phone to authorize ZMW {totalAmountZMW}.
                </span>
              </div>
            )}
          </div>

          {/* Price Breakdown & Confirmation */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">
                {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
                {extraLuggage > 0 && ` + ${extraLuggage} Extra Luggage`}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-slate-500">Total:</span>
                <span className="text-2xl font-extrabold font-mono tabular-nums text-emerald-950">
                  ZMW {totalAmountZMW}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isProcessing
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                {isProcessing ? (
                  <span>Processing Boarding Pass...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm Booking & Get Pass</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
