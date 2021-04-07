import { ActionType } from './../../model/action-type';
import { TestData } from './../../data/TestData';
import { OwnerEntity } from './../../model/owner';
import { CarEntity } from 'src/app/model/car';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
// import { FormControl, FormGroup, FormArray } from '@angular/forms';
import {
  faPlus,
  faTrashAlt,
  faSave,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars-owner-detail',
  templateUrl: './cars-owner-detail.component.html',
  styleUrls: ['./cars-owner-detail.component.css'],
})
export class CarsOwnerDetailComponent implements OnInit {
  readOnly = false;

  selectedCarEntity!: CarEntity;

  //--------------------------------------------------------
  owner!: OwnerEntity;
  private getOwnerSubscription!: Subscription | null;
  private editOwnerSubscription!: Subscription;
  faSave = faSave;
  faArrowCircleLeft = faArrowCircleLeft;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  actionType: ActionType = ActionType.View;

  formOwnerEntity = this.formBuilder.group({
    lastName: [''],
    firstName: [''],
    middleName: [''],
    cars: this.formBuilder.array([]),
  });

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  // -----------------cars: formBuilder-------------

  get cars() {
    return this.formOwnerEntity.get('cars') as FormArray;
  }

  addCar() {
    this.cars.push(
      this.formBuilder.group({
        registrationMark: [''],
        carManufacturer: [''],
        carModel: [''],
        productionYear: [1990],
      })
    );
  }
  //-------------------edit-------------------------
  ngOnInit(): void {
    this.getOwnerSubscription = this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const ownerId = Number(params.get('id'));
          console.log('переход с параметром id: ', ownerId);
          this.actionType = String(params.get('act')) as ActionType;
          console.log('переход с параметром act: ', this.actionType);
          return this.carOwnersService.getOwnerById(ownerId);
        })
      )
      .subscribe((owner) => {
        this.owner = owner;
        console.log(this.owner);

        this.formOwnerEntity = this.formBuilder.group({
          lastName: this.owner.lastName,
          firstName: this.owner.firstName,
          middleName: this.owner.middleName,
          cars: this.formBuilder.array(this.getCarsGroups()),
          //   cars: this.formBuilder.array([
          //     {
          //       registrationMark: [''],
          //       carManufacturer: [''],
          //       carModel: [''],
          //       productionYear: [1990],
          //     },
          //   ]),
        });
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

  getCarsGroups() {
    return this.owner.cars.map((car) =>
      this.formBuilder.group({
        registrationMark: car.registrationMark,
        carManufacturer: car.carManufacturer,
        carModel: car.carModel,
        productionYear: car.productionYear,
      })
    );
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
  //--------------------------------------------------------

  saveDataOwnerEntity() {
    console.warn(this.formOwnerEntity.value);
    // this.formOwnerEntity.patchValue()  // Можно загружать часть данных, например без cars
    this.formOwnerEntity = this.formBuilder.group({
      lastName: ['Evgen'],
      firstName: ['Tar'],
      middleName: ['Vital'],
      cars: this.formBuilder.array([]),
    });
    console.warn(this.formOwnerEntity.value);
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

      // owner = this.carOwnersService.getOwnerById(idOwner);
    }
  }

  deleteCar(car: CarEntity) {
    this.selectedCarEntity = car;
    if (this.selectedCarEntity && this.owner) {
      console.log(car);
      const indexSelectedCar = this.owner.cars.findIndex(
        (item) => item.id === car.id
      );
      console.log('index: ', indexSelectedCar);
      this.owner.cars.splice(indexSelectedCar, 1);
    }
  }
}
