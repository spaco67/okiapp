export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  customerId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  packageSize: 'small' | 'medium' | 'large';
  price: number;
  estimatedTime: number; // in minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
} 