import { Test, TestingModule } from '@nestjs/testing';
import { RideRequestService } from './ride-request.service';

describe('RideRequestService', () => {
  let service: RideRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideRequestService],
    }).compile();

    service = module.get<RideRequestService>(RideRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
