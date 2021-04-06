import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { OwnerEntity } from 'src/app/model/owner';
import { CarOwnersService } from 'src/app/service/car-owners.service';

@Component({
  selector: 'app-cars-owner-view',
  templateUrl: './cars-owner-view.component.html',
  styleUrls: ['./cars-owner-view.component.css'],
})
export class CarsOwnerViewComponent implements OnInit {
  owner!: OwnerEntity;

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap
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

  closeOwner() {
    this.router.navigateByUrl('');
  }
}
