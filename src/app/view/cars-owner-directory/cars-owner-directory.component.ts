import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { OwnerEntity } from '../../model/owner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-owner-directory',
  templateUrl: './cars-owner-directory.component.html',
  styleUrls: ['./cars-owner-directory.component.css'],
})
export class CarsOwnerDirectoryComponent implements OnInit {
  title = 'Владельцы автомобилей';
  rowNoSelected = true;

  SelectedOwnerEntity!: OwnerEntity;

  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelect(owner: OwnerEntity) {
    this.SelectedOwnerEntity = owner;
    console.log(owner);
  }

  get owners(): Observable<OwnerEntity[]> {
    return this.carOwnersService.getOwners();
  }

  addOwner() {
    this.router.navigateByUrl('/add');
  }
}
