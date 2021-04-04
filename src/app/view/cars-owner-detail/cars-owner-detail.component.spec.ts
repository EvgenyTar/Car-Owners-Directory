import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOwnerDetailComponent } from './cars-owner-detail.component';

describe('CarsOwnerDetailComponent', () => {
  let component: CarsOwnerDetailComponent;
  let fixture: ComponentFixture<CarsOwnerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOwnerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOwnerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
