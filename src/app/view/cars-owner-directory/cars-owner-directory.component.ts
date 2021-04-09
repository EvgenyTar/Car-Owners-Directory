import { element } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { OwnerEntity } from '../../model/owner';
import { Router } from '@angular/router';
import {
  faPlus,
  faEdit,
  faEye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cars-owner-directory',
  templateUrl: './cars-owner-directory.component.html',
  styleUrls: ['./cars-owner-directory.component.css'],
})
export class CarsOwnerDirectoryComponent implements OnInit {
  title = 'Владельцы автомобилей';
  rowNoSelected = true;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrashAlt = faTrashAlt;

  selectedOwnerEntity!: OwnerEntity | null;

  owners!: OwnerEntity[];
  subscribeOwners!: Subscription;

  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeOwners = this.reloadOwners().subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscribeOwners) {
      this.subscribeOwners.unsubscribe();
    }
  }

  onSelect(owner: OwnerEntity) {
    this.selectedOwnerEntity = owner;
    console.log(this.selectedOwnerEntity); //          УБРАТЬ!!!!
  }

  reloadOwners(): Observable<OwnerEntity[]> {
    return this.carOwnersService.getOwners().pipe(
      tap((owners) => {
        this.owners = owners;
      })
    );
  }
  // get owners2(): Observable<OwnerEntity[]> {
  //   return this.carOwnersService.getOwners();
  // }

  // set owners(data: Observable<OwnerEntity[]>) {}

  addOwner() {
    this.router.navigateByUrl('/add');
  }

  editOwner() {
    if (this.selectedOwnerEntity && this.selectedOwnerEntity.id) {
      this.router.navigateByUrl('/edit/' + this.selectedOwnerEntity.id);
    }
  }

  deleteOwner() {
    if (this.selectedOwnerEntity && this.selectedOwnerEntity.id) {
      this.carOwnersService
        .deleteOwner(this.selectedOwnerEntity.id)
        .pipe(
          switchMap((_) => {
            return this.reloadOwners();
          })
        )
        .subscribe((_) => {
          this.selectedOwnerEntity = null;
        }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  }

  viewOwner() {
    if (this.selectedOwnerEntity && this.selectedOwnerEntity.id) {
      this.router.navigateByUrl('/view/' + this.selectedOwnerEntity.id);
    }
  }
}
