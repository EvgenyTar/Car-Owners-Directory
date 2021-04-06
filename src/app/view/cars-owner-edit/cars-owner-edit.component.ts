import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OwnerEntity } from 'src/app/model/owner';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { faSave, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars-owner-edit',
  templateUrl: './cars-owner-edit.component.html',
  styleUrls: ['./cars-owner-edit.component.css'],
})
export class CarsOwnerEditComponent implements OnInit, OnDestroy {
  owner!: OwnerEntity;
  private getOwnerSubscription!: Subscription | null;
  private editOwnerSubscription!: Subscription;
  faSave = faSave;
  faArrowCircleLeft = faArrowCircleLeft;

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOwnerSubscription = this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const ownerId = Number(params.get('id'));
          return this.carOwnersService.getOwnerById(ownerId);
        })
      )
      .subscribe((owner) => {
        this.owner = owner;
      });
  }

  ngOnDestroy(): void {
    if (this.getOwnerSubscription) {
      this.getOwnerSubscription.unsubscribe();
    }
    if (this.editOwnerSubscription) {
      this.editOwnerSubscription.unsubscribe();
    }
  }

  editOwner() {
    console.log(this.owner);

    this.editOwnerSubscription = this.carOwnersService
      .editOwner(this.owner)
      .subscribe((_) => {
        this.router.navigateByUrl('');
      });
  }

  closeOwner() {
    this.router.navigateByUrl('');
  }
}
