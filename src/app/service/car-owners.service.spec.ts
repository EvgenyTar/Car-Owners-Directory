import { TestBed } from '@angular/core/testing';

import { CarOwnersService } from './car-owners.service';

describe('CarOwnersServiceService', () => {
  let service: CarOwnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarOwnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
