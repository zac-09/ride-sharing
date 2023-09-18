export interface RideDTO {
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

export interface acceptRide {
  rideID: string;
}
