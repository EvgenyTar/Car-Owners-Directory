import { ActionType } from './../../model/action-type';
import { TestData } from './../../data/TestData';
import { OwnerEntity } from './../../model/owner';
import { CarEntity } from 'src/app/model/car';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarOwnersService } from 'src/app/service/car-owners.service';
import {
  FormBuilder,
  Validators,
  FormArray,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import {
  faPlus,
  faTrashAlt,
  faSave,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { registrationMarkValidator } from '../../shared/validators';

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
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOwnerSubscription = this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const ownerId = Number(params.get('id'));
          console.log('переход с параметром id: ', ownerId);
          this.actionType = String(params.get('act')) as ActionType;
          console.log('переход с параметром act: ', this.actionType);
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
        id: car.id,
        registrationMark: [
          car.registrationMark,
          [Validators.required, registrationMarkValidator],
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
      })
    );
  }

  // добавление нового авто в форму
  addCarToGroup() {
    this.cars.push(
      this.formBuilder.group({
        registrationMark: [
          '',
          [Validators.required, registrationMarkValidator],
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
    // this.selectedCarEntity = car;
    // if (this.selectedCarEntity && this.owner) {
    //   console.log(car);
    //   const indexSelectedCar = this.owner.cars.findIndex(
    //     (item) => item.id === car.id
    //   );
    //   console.log('index: ', indexSelectedCar);
    //   this.owner.cars.splice(indexSelectedCar, 1);
    // }
    if (this.owner && this.owner.cars && this.owner.cars.length > index) {
      this.owner.cars.splice(index, 1);
      this.cars.removeAt(index);
    }
  }

  saveOwner() {
    const owner: any = this.formOwnerEntity.value;
    console.log('Что там внутри OWNER-а при сохранении?: ', owner);
    console.log(
      'И что в this.formOwnerEntity.value : ',
      this.formOwnerEntity.value
    );
    switch (this.actionType) {
      case ActionType.Add:
        console.log('case ActionType.Add:');
        this.carOwnersService
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
        this.carOwnersService.editOwner(this.owner).subscribe((_) => {
          this.router.navigateByUrl('');
        });
        break;
    }
  }

  // Нажимаем кнопку "Сохранить"
  onSubmit() {
    this.saveOwner();
    console.log('Submit button:', this.formOwnerEntity.value);
  }

  goBack() {
    this.location.back();
  }
}
