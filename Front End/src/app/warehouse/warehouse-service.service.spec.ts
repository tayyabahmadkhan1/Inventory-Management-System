import { TestBed } from '@angular/core/testing';

import { WarehouseServiceService } from './warehouse-service.service';

describe('WarehouseServiceService', () => {
  let service: WarehouseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
