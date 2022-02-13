import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemPopupComponent } from './food-item-popup.component';

describe('FoodItemPopupComponent', () => {
  let component: FoodItemPopupComponent;
  let fixture: ComponentFixture<FoodItemPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
