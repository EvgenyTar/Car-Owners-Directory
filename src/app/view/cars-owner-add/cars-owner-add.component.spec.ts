import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOwnerAddComponent } from './cars-owner-add.component';

describe('CarsOwnerAddComponent', () => {
  let component: CarsOwnerAddComponent;
  let fixture: ComponentFixture<CarsOwnerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOwnerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
