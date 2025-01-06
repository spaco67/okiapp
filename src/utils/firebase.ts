import { 
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  GeoPoint
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { UserProfile, CustomerProfile, DriverProfile } from '../types/user';
import type { Order } from '../types/order';

export async function createUserProfile(
  userId: string,
  data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
) {
  const userRef = doc(db, 'users', userId);
  const now = Timestamp.now();
  
  await setDoc(userRef, {
    ...data,
    id: userId,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getUserProfile(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    throw new Error('User not found');
  }
  
  return userSnap.data() as UserProfile;
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  const ordersRef = collection(db, 'orders');
  const orderDoc = doc(ordersRef);
  const now = Timestamp.now();
  
  await setDoc(orderDoc, {
    ...order,
    id: orderDoc.id,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
  });
  
  return orderDoc.id;
}

export function subscribeToOrders(
  userId: string,
  userType: 'customer' | 'driver',
  callback: (orders: Order[]) => void
) {
  const ordersRef = collection(db, 'orders');
  const q = query(
    ordersRef,
    where(userType === 'customer' ? 'customerId' : 'driverId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Order[];
    
    callback(orders);
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  driverId?: string
) {
  const orderRef = doc(db, 'orders', orderId);
  const now = Timestamp.now();
  
  await updateDoc(orderRef, {
    status,
    driverId,
    updatedAt: now,
  });
}

export async function updateDriverLocation(
  driverId: string,
  lat: number,
  lng: number
) {
  const driverRef = doc(db, 'users', driverId);
  const now = Timestamp.now();
  
  await updateDoc(driverRef, {
    currentLocation: new GeoPoint(lat, lng),
    updatedAt: now,
  });
} 