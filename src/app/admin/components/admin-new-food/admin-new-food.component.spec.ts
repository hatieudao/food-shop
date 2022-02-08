import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewFoodComponent } from './admin-new-food.component';

describe('AdminNewFoodComponent', () => {
  let component: AdminNewFoodComponent;
  let fixture: ComponentFixture<AdminNewFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
