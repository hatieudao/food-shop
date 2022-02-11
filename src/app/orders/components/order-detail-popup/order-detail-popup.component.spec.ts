import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailPopupComponent } from './order-detail-popup.component';

describe('OrderDetailPopupComponent', () => {
  let component: OrderDetailPopupComponent;
  let fixture: ComponentFixture<OrderDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
