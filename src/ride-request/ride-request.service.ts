import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RideRequest } from 'src/types/ride-request';
import { RideDTO } from './ride-request.dto';

@Injectable()
export class RideRequestService {
  constructor(
    @InjectModel('RideRequest') private rideModel: Model<RideRequest>,
  ) {}

  async create(RideDTO: RideDTO) {
    const rideRequest = await this.rideModel.create(RideDTO);
    return rideRequest;
  }
  async acceptRideRequest(rideId: string, driverId: string) {
    const checkRide = await this.rideModel.findById(rideId);
    if (checkRide && checkRide.status === 'accepted') {
      throw new Error(
        'sorry another driver has already accepted the ride please try another ride',
      );
    }
    const checkDriver = await this.rideModel.findOne({
      driverId,
      status: 'accepted',
    });
    if (checkDriver) {
      throw new Error(
        'sorry you cannot accept ride when you have an ongoing ride already',
      );
    }
    const rideRequest = await this.rideModel.findByIdAndUpdate(
      rideId,
      {
        driverId,
        status: 'accepted',
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return rideRequest;
  }
  async completeRideRequest(rideId: string) {
    const checkRide = await this.rideModel.findById(rideId);
    if (checkRide && checkRide.status === 'completed') {
      throw new Error(
        'sorry ride has already completed the ride please try another ride',
      );
    }
    const rideRequest = await this.rideModel.findByIdAndUpdate(
      rideId,
      {
        status: 'completed',
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return rideRequest;
  }
  async cancelRideRequest(rideId: string) {
    const checkRide = await this.rideModel.findById(rideId);
    if (checkRide && checkRide.status === 'cancelled') {
      throw new Error(
        'sorry ride has already cancelled the ride please try another ride',
      );
    }
    const rideRequest = await this.rideModel.findByIdAndUpdate(
      rideId,
      {
        status: 'cancelled',
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return rideRequest;
  }
  async getAllRideRequests() {
    const rideRequests = await this.rideModel.find();
    return rideRequests;
  }
}
