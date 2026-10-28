import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Filter, 
  PlusCircle, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Ticket, 
  Navigation, 
  ArrowRight, 
  SlidersHorizontal,
  RefreshCw,
  Search
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RideCard } from './components/RideCard';
import { SeatPickerModal } from './components/SeatPickerModal';
import { BookingModal } from './components/BookingModal';
import { DigitalBoardingPass } from './components/DigitalBoardingPass';
import { PostRideModal } from './components/PostRideModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { StadiumGateGuideModal } from './components/StadiumGateGuideModal';
import { RouteCorridorGuideModal } from './components/RouteCorridorGuideModal';
import { DriverManifestModal } from './components/DriverManifestModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_SCHEDULED_RIDES, 
  INITIAL_BOOKINGS, 
  DESTINATION_CITIES, 
  STADIUM_GATES,
  HIGHWAY_IMAGE,
  SUV_IMAGE,
  MPV_IMAGE
} from './data/mockData';
import { ScheduledRide, BookingRecord, Seat, ZambianProvince, VehicleCategory } from './types';

export default function App() {
  // Persistent State
  const [rides, setRides] = useState<ScheduledRide[]>(() => {
    try {
      const saved = localStorage.getItem('heroes_express_rides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_SCHEDULED_RIDES;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('heroes_express_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('heroes_express_rides', JSON.stringify(rides));
    } catch (e) {}
  }, [rides]);

  useEffect(() => {
    try {
      localStorage.setItem('heroes_express_bookings', JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  // Filters State
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedGate, setSelectedGate] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'time' | 'price-asc' | 'price-desc' | 'seats-left'>('time');

  // Modals State
  const [seatPickerRide, setSeatPickerRide] = useState<ScheduledRide | null>(null);
  const [bookingRide, setBookingRide] = useState<ScheduledRide | null>(null);
  const [bookingSeats, setBookingSeats] = useState<Seat[]>([]);
  const [activeBoardingPass, setActiveBoardingPass] = useState<BookingRecord | null>(null);
  const [isPostRideOpen, setIsPostRideOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isGateGuideOpen, setIsGateGuideOpen] = useState(false);
  const [isCorridorGuideOpen, setIsCorridorGuideOpen] = useState(false);
  const [driverManifestRide, setDriverManifestRide] = useState<ScheduledRide | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter Logic
  const filteredRides = rides.filter((ride) => {
    // Province filter
    if (selectedProvince !== 'All' && ride.destinationProvince !== selectedProvince) {
      return false;
    }
    // Destination City filter
    if (selectedDestination !== 'All' && ride.destinationCity.toLowerCase() !== selectedDestination.toLowerCase()) {
      return false;
    }
    // Stadium Gate filter
    if (selectedGate !== 'All' && ride.stadiumGate !== selectedGate) {
      return false;
    }
    // Date filter
    if (selectedDate && ride.departureDate !== selectedDate) {
      return false;
    }
    // Vehicle Category filter
    if (selectedCategory !== 'All' && ride.vehicle.category !== selectedCategory) {
      return false;
    }
    // Time of day filter
    if (timeOfDayFilter !== 'All') {
      const hour = parseInt(ride.departureTime.split(':')[0], 10);
      if (timeOfDayFilter === 'Morning' && (hour < 5 || hour >= 9)) return false;
      if (timeOfDayFilter === 'Midday' && (hour < 9 || hour >= 13)) return false;
      if (timeOfDayFilter === 'Afternoon' && (hour < 13 || hour >= 18)) return false;
      if (timeOfDayFilter === 'Night' && hour < 18) return false;
    }
    return true;
  });

  // Sort Logic
  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === 'time') {
      return a.departureTime.localeCompare(b.departureTime);
    }
    if (sortBy === 'price-asc') {
      return a.pricePerSeatZMW - b.pricePerSeatZMW;
    }
    if (sortBy === 'price-desc') {
      return b.pricePerSeatZMW - a.pricePerSeatZMW;
    }
    if (sortBy === 'seats-left') {
      return b.availableSeats - a.availableSeats;
    }
    return 0;
  });

  // Handlers
  const handleSelectRideForSeatPicker = (ride: ScheduledRide) => {
    setSeatPickerRide(ride);
  };

  const handleProceedToBooking = (selectedSeats: Seat[]) => {
    if (!seatPickerRide) return;
    setBookingRide(seatPickerRide);
    setBookingSeats(selectedSeats);
    setSeatPickerRide(null);
  };

  const handleBookingSuccess = (newBooking: BookingRecord) => {
    // Update bookings
    setBookings([newBooking, ...bookings]);

    // Update available seats on the ride
    setRides((prevRides) =>
      prevRides.map((r) => {
        if (r.id === newBooking.rideId) {
          const bookedCodes = newBooking.selectedSeats;
          const updatedLayout = r.vehicle.seatLayout.map((seat) => {
            if (bookedCodes.includes(seat.code)) {
              return { ...seat, isBooked: true, passengerName: newBooking.passengerName };
            }
            return seat;
          });
          const newAvailable = updatedLayout.filter((s) => !s.isBooked).length;
          return {
            ...r,
            availableSeats: newAvailable,
            vehicle: {
              ...r.vehicle,
              seatLayout: updatedLayout,
            },
          };
        }
        return r;
      })
    );

    setBookingRide(null);
    setBookingSeats([]);
    setActiveBoardingPass(newBooking);
    showToast(`Booking confirmed! Reference ${newBooking.id} generated.`);
  };

  const handleRideCreated = (newRide: ScheduledRide) => {
    setRides([newRide, ...rides]);
    showToast(`Your trip to ${newRide.destinationCity} has been posted to the schedule!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find((b) => b.id === bookingId);
    if (!bookingToCancel) return;

    if (window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
      setBookings(bookings.filter((b) => b.id !== bookingId));

      // Re-open seats
      setRides((prevRides) =>
        prevRides.map((r) => {
          if (r.id === bookingToCancel.rideId) {
            const freedCodes = bookingToCancel.selectedSeats;
            const updatedLayout = r.vehicle.seatLayout.map((seat) => {
              if (freedCodes.includes(seat.code)) {
                return { ...seat, isBooked: false, passengerName: undefined };
              }
              return seat;
            });
            const newAvailable = updatedLayout.filter((s) => !s.isBooked).length;
            return {
              ...r,
              availableSeats: newAvailable,
              vehicle: {
                ...r.vehicle,
                seatLayout: updatedLayout,
              },
            };
          }
          return r;
        })
      );

      showToast(`Booking ${bookingId} cancelled. Seats released.`);
    }
  };

  const handleResetFilters = () => {
    setSelectedProvince('All');
    setSelectedDestination('All');
    setSelectedGate('All');
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedCategory('All');
    setTimeOfDayFilter('All');
    setSortBy('time');
  };

  const handleSelectCityQuickFilter = (cityName: string) => {
    setSelectedDestination(cityName);
    const dest = DESTINATION_CITIES.find((d) => d.name === cityName);
    if (dest) {
      setSelectedProvince(dest.province);
    }
    const scheduleSection = document.getElementById('scheduled-departures');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar adhering to 3-zone contract */}
      <Navbar
        onOpenPostRide={() => setIsPostRideOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenGateGuide={() => setIsGateGuideOpen(true)}
        onOpenCorridorGuide={() => setIsCorridorGuideOpen(true)}
        onSelectProvinceFilter={(prov) => {
          setSelectedProvince(prov);
          if (prov === 'All') setSelectedDestination('All');
        }}
        bookings={bookings}
        activeProvince={selectedProvince}
      />

      <main className="flex-1">
        {/* Dominant Hero Section with generated Stadium photography & central search */}
        <HeroSection
          selectedDestination={selectedDestination}
          onDestinationChange={(val) => {
            setSelectedDestination(val);
            if (val !== 'All') {
              const dest = DESTINATION_CITIES.find((d) => d.name === val);
              if (dest) setSelectedProvince(dest.province);
            }
          }}
          selectedGate={selectedGate}
          onGateChange={setSelectedGate}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onQuickRouteSelect={handleSelectCityQuickFilter}
        />

        {/* Corridor Highlight & Province Explorer (Bento format) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <span>Zambia Inter-Provincial Corridors</span>
                <span aria-hidden="true">·</span>
                <span>Departing National Heroes Stadium</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 font-outfit mt-1">
                Featured Travel Corridors
              </h2>
            </div>
            <button
              onClick={() => setIsCorridorGuideOpen(true)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View highway milestones & toll gates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Copperbelt Express Card (Primary Focus) */}
            <div 
              onClick={() => { setSelectedProvince('Copperbelt'); setSelectedDestination('All'); }}
              className="relative rounded-2xl bg-slate-900 text-white p-6 overflow-hidden border border-slate-800 shadow-sm cursor-pointer group"
            >
              <img
                src={HIGHWAY_IMAGE}
                alt="Copperbelt Highway"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

              <div className="relative z-10 flex flex-col justify-between h-full min-h-[190px]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                    <span>Primary Corridor</span>
                    <span aria-hidden="true">·</span>
                    <span>T2 / T3 Highway</span>
                  </div>
                  <h3 className="text-xl font-bold font-outfit">
                    Copperbelt Express
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Daily scheduled rides to Ndola, Kitwe, Chingola, Mufulira, and Luanshya. Smooth dual-carriageway cruising.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-bold">From ZMW 320</span>
                  <span className="font-semibold text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Explore Rides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Central & Southern Provinces */}
            <div 
              onClick={() => { setSelectedProvince('Central'); setSelectedDestination('Kabwe'); }}
              className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px] cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <span>T2 Great North Road</span>
                  <span aria-hidden="true">·</span>
                  <span>140 km</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 font-outfit">
                  Kabwe & Kapiri Commuter
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fast 1h 45m executive sedan and SUV shuttles. Perfect for Mulungushi University students, faculty, and business travelers.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-900 font-bold">From ZMW 180</span>
                <span className="font-semibold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1">
                  <span>View Departures</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 3. North-Western & Southern Tourism */}
            <div 
              onClick={() => { setSelectedProvince('North-Western'); setSelectedDestination('Solwezi'); }}
              className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between min-h-[190px] cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <span>Mining & Tourism Arteries</span>
                  <span aria-hidden="true">·</span>
                  <span>Long Distance</span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 font-outfit">
                  Solwezi & Livingstone
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Heavy-duty Toyota Fortuner & Prado 4x4 rides to Solwezi Kansanshi mining zone, or luxury Alphard rides to Victoria Falls.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-900 font-bold">From ZMW 480</span>
                <span className="font-semibold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1">
                  <span>View Departures</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Scheduled Departures Section */}
        <section id="scheduled-departures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Staging: National Heroes Stadium (Lusaka)</span>
                <span aria-hidden="true">·</span>
                <span>Active Schedule: {selectedDate}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 font-outfit mt-1">
                Scheduled Private Departures ({sortedRides.length})
              </h2>
            </div>

            {/* Functional Segmented Controls / Interactive Province Filter Tabs */}
            <div className="flex items-center flex-wrap gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-medium">
              {[
                { id: 'All', label: 'All Provinces' },
                { id: 'Copperbelt', label: 'Copperbelt' },
                { id: 'Central', label: 'Central' },
                { id: 'Southern', label: 'Southern' },
                { id: 'North-Western', label: 'North-Western' },
                { id: 'Eastern', label: 'Eastern' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedProvince(tab.id);
                    if (tab.id !== 'All' && selectedDestination !== 'All') {
                      const dest = DESTINATION_CITIES.find((d) => d.name === selectedDestination);
                      if (dest && dest.province !== tab.id) {
                        setSelectedDestination('All');
                      }
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedProvince === tab.id
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Filters Toolbar: Time of Day, Sorting, Reset */}
          <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Time:
              </span>
              {['All', 'Morning', 'Midday', 'Afternoon', 'Night'].map((timeSlot) => (
                <button
                  key={timeSlot}
                  onClick={() => setTimeOfDayFilter(timeSlot)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer border ${
                    timeOfDayFilter === timeSlot
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {timeSlot === 'Morning'
                    ? 'Early Morning (05:00 - 09:00)'
                    : timeSlot === 'Midday'
                    ? 'Midday (09:00 - 13:00)'
                    : timeSlot === 'Afternoon'
                    ? 'Afternoon (13:00 - 18:00)'
                    : timeSlot === 'Night'
                    ? 'Evening / Night (18:00+)'
                    : 'All Hours'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-600">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="time">Departure Time (Earliest)</option>
                  <option value="price-asc">Price (Lowest first)</option>
                  <option value="price-desc">Price (Highest first)</option>
                  <option value="seats-left">Most Seats Available</option>
                </select>
              </div>

              {(selectedProvince !== 'All' ||
                selectedDestination !== 'All' ||
                selectedGate !== 'All' ||
                selectedCategory !== 'All' ||
                timeOfDayFilter !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Ride List */}
          {sortedRides.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 shadow-xs">
              <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">
                No private rides found matching these criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
                There are currently no listed departures for this specific gate, date, or vehicle category. You can clear your filters or schedule your own trip departing from Heroes Stadium.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  View All Departures
                </button>
                <button
                  onClick={() => setIsPostRideOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post a Ride for this Route</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 my-2">
              {sortedRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onSelectRide={handleSelectRideForSeatPicker}
                  onViewDriverManifest={(r) => setDriverManifestRide(r)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Stadium Departure Hub Information Banner */}
        <section className="bg-slate-900 text-white py-12 border-t border-slate-800 my-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                  <span>Seamless Boarding Experience</span>
                  <span aria-hidden="true">·</span>
                  <span>Lusaka Great North Road</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-outfit">
                  Why National Heroes Stadium is the Ideal Rendezvous Point
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
                  Unlike traditional crowded bus stations in downtown Lusaka, National Heroes Stadium offers secure perimeter parking, broad multi-lane staging bays, instant access to the T2 Great North Road with zero traffic holdups, and 24-hour illuminated security.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-white text-xs">Direct T2 Highway</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Exit right onto the Great North Road towards Katuba Toll and Kabwe.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-white text-xs">Safe Passenger Lounge</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Shaded VIP concourse, mobile money booths, clean restrooms, and tea tuckshops.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-white text-xs">Verified RTSA Carpools</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      All vehicles vetted for roadworthiness, passenger insurance, and fitness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <button
                  onClick={() => setIsGateGuideOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shadow-sm text-center mb-3"
                >
                  Explore Stadium Gate Map & Bays
                </button>
                <button
                  onClick={() => setIsPostRideOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                >
                  Driving to Copperbelt? Post Your Ride
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      {seatPickerRide && (
        <SeatPickerModal
          ride={seatPickerRide}
          onClose={() => setSeatPickerRide(null)}
          onProceedToBooking={handleProceedToBooking}
        />
      )}

      {bookingRide && (
        <BookingModal
          ride={bookingRide}
          selectedSeats={bookingSeats}
          onClose={() => {
            setBookingRide(null);
            setBookingSeats([]);
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {activeBoardingPass && (
        <DigitalBoardingPass
          booking={activeBoardingPass}
          onClose={() => setActiveBoardingPass(null)}
          onViewAllBookings={() => {
            setActiveBoardingPass(null);
            setIsMyBookingsOpen(true);
          }}
        />
      )}

      {isPostRideOpen && (
        <PostRideModal
          onClose={() => setIsPostRideOpen(false)}
          onRideCreated={handleRideCreated}
        />
      )}

      {isMyBookingsOpen && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setIsMyBookingsOpen(false)}
          onViewPass={(b) => {
            setIsMyBookingsOpen(false);
            setActiveBoardingPass(b);
          }}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {isGateGuideOpen && (
        <StadiumGateGuideModal
          onClose={() => setIsGateGuideOpen(false)}
          onSelectGateFilter={(gate) => {
            setSelectedGate(gate);
            const schedule = document.getElementById('scheduled-departures');
            if (schedule) schedule.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {isCorridorGuideOpen && (
        <RouteCorridorGuideModal
          onClose={() => setIsCorridorGuideOpen(false)}
          onFilterProvince={(prov) => {
            setSelectedProvince(prov);
            setIsCorridorGuideOpen(false);
          }}
        />
      )}

      {driverManifestRide && (
        <DriverManifestModal
          ride={driverManifestRide}
          allBookings={bookings}
          onClose={() => setDriverManifestRide(null)}
        />
      )}

      {/* Quiet, Clean Footer */}
      <Footer
        onOpenGateGuide={() => setIsGateGuideOpen(true)}
        onOpenCorridorGuide={() => setIsCorridorGuideOpen(true)}
        onSelectProvince={(prov) => {
          setSelectedProvince(prov);
          setSelectedDestination('All');
          const schedule = document.getElementById('scheduled-departures');
          if (schedule) schedule.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
