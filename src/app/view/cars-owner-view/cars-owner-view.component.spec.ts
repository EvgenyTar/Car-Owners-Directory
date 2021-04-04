import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOwnerViewComponent } from './cars-owner-view.component';

describe('CarsOwnerViewComponent', () => {
  let component: CarsOwnerViewComponent;
  let fixture: ComponentFixture<CarsOwnerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOwnerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOwnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
