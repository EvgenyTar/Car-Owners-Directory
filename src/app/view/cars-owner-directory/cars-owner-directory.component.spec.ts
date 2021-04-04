import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsOwnerDirectoryComponent } from './cars-owner-directory.component';

describe('CarsOwnerDirectoryComponent', () => {
  let component: CarsOwnerDirectoryComponent;
  let fixture: ComponentFixture<CarsOwnerDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsOwnerDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsOwnerDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
