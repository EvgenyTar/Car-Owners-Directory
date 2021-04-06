import { TestData } from './../../data/TestData';
import { OwnerEntity } from './../../model/owner';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CarEntity } from 'src/app/model/car';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars-owner-detail',
  templateUrl: './cars-owner-detail.component.html',
  styleUrls: ['./cars-owner-detail.component.css'],
})
export class CarsOwnerDetailComponent implements OnInit {
  @Input() owner!: OwnerEntity;
  @Input() readOnly = false;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  constructor() {}

  ngOnInit(): void {}

  createCar() {
    if (this.owner) {
      const newCar = CarEntity.createFromAny({
        id: -1,
        idOwner: this.owner.id,
        registrationMark: '',
        carManufacturer: '',
        carModel: '',
        productionYear: 1990,
      });
      this.owner.cars.push(newCar);

      // owner = this.carOwnersService.getOwnerById(idOwner);
    }
  }
}
