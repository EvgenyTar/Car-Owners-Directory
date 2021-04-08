import { ActionType } from './../../model/action-type';
import { TestData } from './../../data/TestData';
import { OwnerEntity } from './../../model/owner';
import { CarEntity } from 'src/app/model/car';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
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

  owner!: OwnerEntity;
  private getOwnerSubscription!: Subscription | null;
  private editOwnerSubscription!: Subscription;
  faSave = faSave;
  faArrowCircleLeft = faArrowCircleLeft;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  actionType: ActionType = ActionType.View;

  formOwnerEntity = this.formBuilder.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    cars: this.formBuilder.array([]),
  });

  //--------------------------------------------------------

  constructor(
    private router: Router,
    private carOwnersService: CarOwnersService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

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

  // -----------------cars: formBuilder-------------
  // геттер для массива авто(каждое авто - группа форм)
  get cars() {
    return this.formOwnerEntity.get('cars') as FormArray;
  }

  //Добавление в форму всех авто из owner-а
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

  // добавление нового авто в форму
  addCarToGroup() {
    this.cars.push(
      this.formBuilder.group({
        registrationMark: [
          '',
          [Validators.required, this.registrationMarkValidator],
        ],
        carManufacturer: ['', Validators.required],
        carModel: ['', Validators.required],
        productionYear: [
          1990,
          [Validators.required, this.productionYearValidator],
        ],
      })
    );
  }

  // -----------------Валидаторы--------------------

  private registrationMarkValidator(
    control: FormControl
  ): ValidationErrors | null {
    const value = control.value;

    const startCharacter = value.substring(0, 2);
    const numberInMark = value.substring(2, 6);
    const endCharacter = value.substring(6, 8);

    const correctLenth = value ? value.length === 8 : false;
    const correctStartCharacter = /[А-Я][А-Я]/.test(value);
    const correctNumberInMark = /[0-9][0-9][0-9][0-9]/.test(value);
    const correctEndharacter = /[А-Я][А-Я]/.test(value);

    const registrationMarkValid =
      correctLenth &&
      correctStartCharacter &&
      correctNumberInMark &&
      correctEndharacter;

    if (!registrationMarkValid) {
      return { invalidNumber: 'Формат: АА7777КК' };
    }
    return null;
  }

  private productionYearValidator(
    control: FormControl
  ): ValidationErrors | null {
    const value = control.value;

    const today = new Date();
    const thisYear = today.getFullYear();
    const correcProductionYear = value >= 1990 && value <= thisYear;

    if (!correcProductionYear) {
      return { invalidYear: '1990 - ' + thisYear };
    }
    return null;
  }

  //-------------------edit-------------------------
  editOwner() {
    console.log(this.owner);

    this.editOwnerSubscription = this.carOwnersService
      .editOwner(this.owner)
      .subscribe((_) => {
        this.router.navigateByUrl('');
      });
  }

  logOutOwner() {
    this.router.navigateByUrl('');
  }
  //--------------------------------------------------------

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

  // Нажимаем кнопку "Сохранить"
  onSubmit() {
    console.log('Submit button:', this.formOwnerEntity.value);
  }
}
