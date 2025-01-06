export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: 'customer' | 'driver';
  rating?: number;
  completedOrders?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerProfile extends UserProfile {
  userType: 'customer';
  savedAddresses?: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  }[];
}

export interface DriverProfile extends UserProfile {
  userType: 'driver';
  isOnline: boolean;
  vehicleType: 'bike' | 'car' | 'truck';
  currentLocation?: {
    lat: number;
    lng: number;
  };
} 