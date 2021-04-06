import { OwnerEntity } from './../../model/owner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { faSave, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars-owner-add',
  templateUrl: './cars-owner-add.component.html',
  styleUrls: ['./cars-owner-add.component.css'],
})
export class CarsOwnerAddComponent implements OnInit {
  owner = new OwnerEntity(-1, '', '', '');
  faSave = faSave;
  faArrowCircleLeft = faArrowCircleLeft;

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService
  ) {}

  ngOnInit(): void {}

  addOwner() {
    this.carOwnersService
      .createOwner(
        this.owner.lastName,
        this.owner.firstName,
        this.owner.middleName,
        this.owner.cars
      )
      .subscribe((_) => {
        this.router.navigateByUrl('');
      });
  }

  closeOwner() {
    this.router.navigateByUrl('');
  }
}
