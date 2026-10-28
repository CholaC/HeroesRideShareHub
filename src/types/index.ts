export type ZambianProvince = 
  | 'Copperbelt'
  | 'Central'
  | 'Southern'
  | 'Eastern'
  | 'North-Western'
  | 'Northern'
  | 'Luapula'
  | 'Muchinga'
  | 'Western';

export type VehicleCategory = 'Executive SUV' | 'Comfort Sedan' | 'Luxury MPV' | 'Executive Van';

export interface DestinationCity {
  id: string;
  name: string;
  province: ZambianProvince;
  distanceKm: number;
  estDriveTime: string;
  highway: string; // e.g. "T2 / T3 Great North Road"
  tollsCount: number;
  popularDropoffs: string[];
  basePriceZMW: number;
}

export type StadiumGate = 
  | 'Gate 1 (Great North Road Bay)'
  | 'VIP / Presidential Concourse'
  | 'West Main Parking Lot'
  | 'East Concourse (OYDC Side)'
  | 'North Outer Terminal Bay';

export interface Seat {
  id: string;
  code: string; // e.g. 'F1', 'M1', 'M2', 'R1', 'R2'
  label: string; // e.g. "Front Passenger Window", "Middle Captain Chair"
  row: 'front' | 'middle' | 'rear';
  position: 'left' | 'center' | 'right';
  isBooked: boolean;
  passengerName?: string;
  extraChargeZMW?: number;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  rating: number;
  tripsCount: number;
  verifiedRTSA: boolean;
  avatarUrl?: string;
  memberSince: string;
  bio?: string;
}

export interface VehicleInfo {
  category: VehicleCategory;
  makeModel: string; // e.g. "Toyota Fortuner 2.8 GD-6"
  year: number;
  color: string;
  plateNumber: string; // e.g. "BAH 4921 ZM"
  imageUrl?: string;
  luggageCapacityBags: number;
  features: string[]; // e.g. "Air Conditioning", "High Speed Wi-Fi", "USB Fast Chargers", "Bottled Water"
  seatLayout: Seat[];
}

export interface ScheduledRide {
  id: string;
  driver: DriverInfo;
  vehicle: VehicleInfo;
  originHub: 'National Heroes Stadium, Lusaka';
  stadiumGate: StadiumGate;
  destinationCity: string;
  destinationProvince: ZambianProvince;
  dropoffLocations: string[];
  departureDate: string; // YYYY-MM-DD
  departureTime: string; // HH:MM (24h)
  estimatedArrival: string; // HH:MM
  pricePerSeatZMW: number;
  totalSeats: number;
  availableSeats: number;
  routeHighway: string;
  stopsEnRoute: string[];
  instantBooking: boolean;
  rules: string[];
  isCustomRide?: boolean;
}

export interface BookingRecord {
  id: string; // e.g. "HS-CB-84920"
  rideId: string;
  passengerName: string;
  passengerPhone: string;
  passengerNrcOrPassport: string;
  emergencyContact: string;
  selectedSeats: string[]; // Seat codes
  destinationCity: string;
  destinationProvince: ZambianProvince;
  dropoffPoint: string;
  stadiumGate: StadiumGate;
  departureDate: string;
  departureTime: string;
  vehicleMakeModel: string;
  vehiclePlate: string;
  driverName: string;
  driverPhone: string;
  farePerSeatZMW: number;
  extraLuggagePieces: number;
  extraLuggageCostZMW: number;
  totalAmountZMW: number;
  paymentMethod: 'MTN Mobile Money' | 'Airtel Money' | 'Zamtel Kwacha' | 'Visa / Card' | 'Cash at Stadium Gate';
  paymentReference: string;
  paymentStatus: 'Paid' | 'Pending at Gate';
  bookedAt: string;
  boardedStatus: 'Scheduled' | 'Checked In' | 'Completed' | 'Cancelled';
}

export interface CorridorTollInfo {
  name: string;
  location: string;
  highway: string;
  carFeeZMW: number;
  suvFeeZMW: number;
}
