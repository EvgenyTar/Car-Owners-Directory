import { element } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { OwnerEntity } from '../../model/owner';
import { Router } from '@angular/router';
import {
  faPlus,
  faEdit,
  faEye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars-owner-directory',
  templateUrl: './cars-owner-directory.component.html',
  styleUrls: ['./cars-owner-directory.component.css'],
})
export class CarsOwnerDirectoryComponent implements OnInit, OnDestroy {
  title = 'Владельцы автомобилей';
  rowNoSelected = true;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrashAlt = faTrashAlt;

  selectedOwnerEntity!: OwnerEntity;

  owners2!: OwnerEntity[];
  subscribeTest!: Subscription;

  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeTest = this.carOwnersService
      .getOwners()
      .subscribe((owners) => {
        this.owners2 = owners;
      });
  }

  ngOnDestroy(): void {
    if (this.subscribeTest) {
      this.subscribeTest.unsubscribe();
    }
  }

  onSelect(owner: OwnerEntity) {
    this.selectedOwnerEntity = owner;
    console.log(this.selectedOwnerEntity); //          УБРАТЬ!!!!
    const x = this.owners;
    this.owners = x;
    const x3 = this.owners3();
  }

  get owners(): Observable<OwnerEntity[]> {
    return this.carOwnersService.getOwners();
  }

  owners3(): Observable<OwnerEntity[]> {
    return this.carOwnersService.getOwners();
  }

  set owners(data: Observable<OwnerEntity[]>) {}

  addOwner() {
    this.router.navigateByUrl('/add');
  }

  editOwner() {
    if (this.selectedOwnerEntity.id) {
      this.router.navigateByUrl('/edit/' + this.selectedOwnerEntity.id);
    }
  }

  deleteOwner() {
    if (this.selectedOwnerEntity.id) {
      this.carOwnersService.deleteOwner(this.selectedOwnerEntity.id);
    }
  }

  viewOwner() {
    if (this.selectedOwnerEntity.id) {
      this.router.navigateByUrl('/view/' + this.selectedOwnerEntity.id);
    }
  }
}
