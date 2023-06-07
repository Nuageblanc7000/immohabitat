import { Test, TestingModule } from '@nestjs/testing';
import { GeolocalisaionService } from './geolocalisaion.service';

describe('GeolocalisaionService', () => {
  let service: GeolocalisaionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeolocalisaionService],
    }).compile();

    service = module.get<GeolocalisaionService>(GeolocalisaionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
