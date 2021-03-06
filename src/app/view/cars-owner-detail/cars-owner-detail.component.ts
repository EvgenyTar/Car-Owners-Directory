import { CarsService } from './../../service/cars.service';
import { ActionType } from './../../model/action-type';
import { OwnerEntity } from './../../model/owner';
import { CarEntity } from 'src/app/model/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  faPlus,
  faTrashAlt,
  faSave,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  carCheckDuplicateValidator,
  carLengthValidator,
  ExistCarValidation,
} from '../../shared/validators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cars-owner-detail',
  templateUrl: './cars-owner-detail.component.html',
  styleUrls: ['./cars-owner-detail.component.css'],
})
export class CarsOwnerDetailComponent implements OnInit {
  readOnly = false;

  selectedCarEntity!: CarEntity;

  owner!: OwnerEntity;
  private getOwnerSubscription!: Subscription | null;
  private editOwnerSubscription!: Subscription;
  private createOwnerSubscription!: Subscription;

  faSave = faSave;
  faArrowCircleLeft = faArrowCircleLeft;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  actionType: ActionType = ActionType.View;

  formOwnerEntity = this.formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    cars: this.formBuilder.array(
      [],
      [carLengthValidator(), carCheckDuplicateValidator()]
    ),
  });

  //--------------------------------------------------------

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private carsService: CarsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getOwnerSubscription = this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const ownerId = Number(params.get('id'));
          console.log('?????????????? ?? ???????????????????? id: ', ownerId);
          this.actionType = String(params.get('act')) as ActionType;
          console.log('?????????????? ?? ???????????????????? act: ', this.actionType);
          if (this.actionType === ActionType.View) {
            this.readOnly = true;
          }
          return this.carOwnersService.getOwnerById(ownerId);
        })
      )
      .subscribe((owner) => {
        this.owner = owner;
        console.log(this.owner);

        this.formOwnerEntity = this.formBuilder.group({
          lastName: [this.owner.lastName, Validators.required],
          firstName: [this.owner.firstName, Validators.required],
          middleName: [this.owner.middleName, Validators.required],
          cars: this.formBuilder.array(
            this.getCarsGroups(),

            [carLengthValidator(), carCheckDuplicateValidator()]
          ),
        });
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    if (this.getOwnerSubscription) {
      this.getOwnerSubscription.unsubscribe();
    }
    this.unsubscribeEditOwnerSubscription();
  }

  unsubscribeEditOwnerSubscription() {
    if (this.editOwnerSubscription) {
      this.editOwnerSubscription.unsubscribe();
    }
  }

  unsubscribeCreateOwnerSubscription() {
    if (this.createOwnerSubscription) {
      this.createOwnerSubscription.unsubscribe();
    }
  }
  // -----------------cars: formBuilder-------------

  // ???????????? ?????? ?????????????? ????????(???????????? ???????? - ???????????? ????????)
  get cars() {
    return this.formOwnerEntity.get('cars') as FormArray;
  }

  //???????????????????? ?? ?????????? ???????? ???????? ???? owner-??
  getCarsGroups() {
    return this.owner.cars.map((car) =>
      this.formBuilder.group(
        {
          id: car.id,
          idOwner: car.idOwner,
          registrationMark: [
            car.registrationMark,
            [
              Validators.required,
              Validators.pattern(/[A-Z]{2}[0-9]{4}[A-Z]{2}/),
            ],
          ],
          carManufacturer: [car.carManufacturer, Validators.required],
          carModel: [car.carModel, Validators.required],
          productionYear: [
            car.productionYear,
            [
              Validators.required,
              Validators.min(1990),
              Validators.max(new Date().getFullYear()),
            ],
          ],
        },
        {
          asyncValidator: ExistCarValidation.createValidator(this.carsService),
        }
      )
    );
  }

  // ???????????????????? ???????????? ???????? ?? ??????????
  addCarToGroup() {
    this.cars.push(
      this.formBuilder.group(
        {
          id: '',
          idOwner: '',
          registrationMark: [
            '',
            [
              Validators.required,
              Validators.pattern(/[A-Z]{2}[0-9]{4}[A-Z]{2}/),
            ],
          ],
          carManufacturer: ['', Validators.required],
          carModel: ['', Validators.required],
          productionYear: [
            1990,
            [
              Validators.required,
              Validators.min(1990),
              Validators.max(new Date().getFullYear()),
            ],
          ],
        },
        {
          asyncValidator: ExistCarValidation.createValidator(this.carsService),
        }
      )
    );
  }

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
    }
  }

  deleteCar(index: number) {
    if (this.owner && this.owner.cars && this.owner.cars.length > index) {
      this.owner.cars.splice(index, 1);
    }
    if (this.cars && this.cars.length > index) {
      this.cars.removeAt(index);
    }
  }

  saveOwner() {
    const owner: any = this.formOwnerEntity.value;
    console.log('?????? ?????? ???????????? OWNER-?? ?????? ?????????????????????: ', owner);
    console.log(
      '?? ?????? ?? this.formOwnerEntity.value : ',
      this.formOwnerEntity.value
    );

    switch (this.actionType) {
      case ActionType.Add:
        console.log('case ActionType.Add:');
        this.unsubscribeCreateOwnerSubscription();
        this.createOwnerSubscription = this.carOwnersService
          .createOwner(
            owner.lastName,
            owner.firstName,
            owner.middleName,
            owner.cars
          )
          .subscribe((_) => {
            this.router.navigateByUrl('');
          });
        break;
      case ActionType.Edit:
        console.log(' case ActionType.Edit:');
        this.owner.lastName = owner.lastName;
        this.owner.firstName = owner.firstName;
        this.owner.middleName = owner.middleName;
        this.owner.cars = owner.cars;
        this.unsubscribeEditOwnerSubscription();
        this.editOwnerSubscription = this.carOwnersService
          .editOwner(this.owner)
          .subscribe((_) => {
            this.router.navigateByUrl('');
          });
        break;
    }
  }

  // ???????????????? ???????????? "??????????????????"
  onSubmit() {
    this.saveOwner();
    console.log('Submit button:', this.formOwnerEntity.value);
  }

  goBack() {
    this.location.back();
  }
}
