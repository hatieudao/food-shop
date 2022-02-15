import { TestBed } from '@angular/core/testing';

import { AdminFoodService } from './admin-food.service';

describe('AdminFoodService', () => {
  let service: AdminFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
