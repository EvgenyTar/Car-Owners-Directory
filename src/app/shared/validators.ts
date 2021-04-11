import { CarsService } from './../service/cars.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';

export function carLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cars = control as FormArray;
    if (cars && cars.length === 0) {
      return {
        errorLength: 'У автовладельца должен быть минимум один автомобиль',
      };
    }
    return null;
  };
}

export function carCheckDuplicateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const carsControls = control as FormArray;
    const cars = carsControls.controls.map((control) => control.value);
    const filterCars = cars.filter(
      (car, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.registrationMark === car.registrationMark &&
            t.carManufacturer === car.carManufacturer &&
            t.carModel === car.carModel &&
            t.productionYear === car.productionYear
        )
    );
    if (cars.length !== filterCars.length) {
      return { errorCarDoubled: 'Дублирование автомобилей' };
    }
    return null;
  };
}
export class ExistCarValidation {
  static createValidator(carsService: CarsService) {
    return (control: AbstractControl) => {
      return of(control.dirty).pipe(
        delay(500),
        switchMap((dirty) => {
          if (!dirty) {
            return of(null);
          }
          return carsService.isCarExist(control.value).pipe(
            map((carExistInDb) => {
              return carExistInDb
                ? { errorCarExistInDb: 'Такой автомобиль уже есть в базе' }
                : null;
            })
          );
        })
      );
    };
  }
}
