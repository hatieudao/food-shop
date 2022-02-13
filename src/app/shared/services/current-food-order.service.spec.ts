import { TestBed } from '@angular/core/testing';

import { CurrentFoodOrderService } from './current-food-order.service';

describe('CurrentFoodOrderService', () => {
  let service: CurrentFoodOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentFoodOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
