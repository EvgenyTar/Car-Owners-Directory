import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOwnerEditComponent } from './cars-owner-edit.component';

describe('CarsOwnerEditComponent', () => {
  let component: CarsOwnerEditComponent;
  let fixture: ComponentFixture<CarsOwnerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOwnerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOwnerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
