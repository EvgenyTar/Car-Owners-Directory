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
import { NgxSpinnerService } from 'ngx-spinner';

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
  private subscribeOwners!: Subscription;
  private subscribeDeleteOwner!: Subscription;

  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscribeOwners = this.reloadOwners().subscribe((_) => {
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.subscribeOwners) {
      this.subscribeOwners.unsubscribe();
    }
    this.unsubscribeSubscribeDeleteOwner();
  }

  unsubscribeSubscribeDeleteOwner() {
    if (this.subscribeDeleteOwner) {
      this.subscribeDeleteOwner.unsubscribe();
    }
  }

  onSelect(owner: OwnerEntity) {
    this.selectedOwnerEntity = owner;
  }

  reloadOwners(): Observable<OwnerEntity[]> {
    return this.carOwnersService.getOwners().pipe(
      tap((owners) => {
        this.owners = owners;
      })
    );
  }

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
      this.unsubscribeSubscribeDeleteOwner();
      this.subscribeDeleteOwner = this.carOwnersService
        .deleteOwner(this.selectedOwnerEntity.id)
        .pipe(
          switchMap((_) => {
            return this.reloadOwners();
          })
        )
        .subscribe((_) => {
          this.selectedOwnerEntity = null;
        });
    }
  }

  viewOwner() {
    if (this.selectedOwnerEntity && this.selectedOwnerEntity.id) {
      this.router.navigateByUrl('/view/' + this.selectedOwnerEntity.id);
    }
  }
}
