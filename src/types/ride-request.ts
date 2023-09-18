import { Document } from 'mongoose';

export interface RideRequest extends Document {
  status: string;

  clientId: string;
  driverId: string;
  pickupLocation: location;
  destination: location;
}
interface location {
  lat: number;
  lon: number;
}
