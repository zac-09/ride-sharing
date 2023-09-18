import { Test, TestingModule } from '@nestjs/testing';
import { RideRequestController } from './ride-request.controller';

describe('RideRequestController', () => {
  let controller: RideRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideRequestController],
    }).compile();

    controller = module.get<RideRequestController>(RideRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
