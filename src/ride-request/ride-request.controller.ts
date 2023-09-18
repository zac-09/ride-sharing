import {
  Body,
  Controller,
  Post,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { acceptRide, RideDTO } from './ride-request.dto';
import { RideRequestService } from './ride-request.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('ride-request')
export class RideRequestController {
  constructor(private rideService: RideRequestService) {}

  @Post('request')
  @UseGuards(AuthGuard('jwt'))
  async request(@Body() rideDTO: RideDTO, @Req() req: any) {
    try {
      rideDTO.clientId = req.user?.id;

      const rideRequest = await this.rideService.create(rideDTO);
      return rideRequest;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Post('accept')
  @UseGuards(AuthGuard('jwt'))
  async accept(@Body() body: acceptRide, @Req() req: any, @Res() res: any) {
    try {
      const driver = req.user;
      if (driver.status && driver.status === 'unavailable') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'You cannot accept a trip when you are unavailable',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const driverID = req.user?.id;
      const rideID = body.rideID;
      if (!rideID || rideID.length < 1) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Please supply a ride id',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const rideRequest = await this.rideService.acceptRideRequest(
        rideID,
        driverID,
      );
      if (!rideRequest) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Ride with that id not FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      res.status(200).json(rideRequest);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Post('complete')
  @UseGuards(AuthGuard('jwt'))
  async complete(@Body() body: acceptRide, @Res() res: any) {
    try {
      const rideID = body.rideID;
      if (!rideID || rideID.length < 1) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Please supply a ride id',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const rideRequest = await this.rideService.completeRideRequest(rideID);
      if (!rideRequest) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Ride with that id not FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      res.status(200).json(rideRequest);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Post('cancel')
  @UseGuards(AuthGuard('jwt'))
  async cancel(@Body() body: acceptRide, @Res() res: any) {
    try {
      const rideID = body.rideID;
      if (!rideID || rideID.length < 1) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Please supply a ride id',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const rideRequest = await this.rideService.cancelRideRequest(rideID);
      if (!rideRequest) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Ride with that id not FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      res.status(200).json(rideRequest);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Get('getAll')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Res() res: any) {
    try {
      const rideRequests = await this.rideService.getAllRideRequests();

      res.status(200).json(rideRequests);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
