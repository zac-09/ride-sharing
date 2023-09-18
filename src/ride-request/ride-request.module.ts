import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { RideRequestSchema } from 'src/models/rideRequest.schema';
import { RideRequestService } from './ride-request.service';
import { RideRequestController } from './ride-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RideRequest', schema: RideRequestSchema },
    ]),
  ],

  providers: [RideRequestService],
  controllers: [RideRequestController],
})
export class RideRequestModule {}
