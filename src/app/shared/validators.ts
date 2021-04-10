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
import { map, switchMap } from 'rxjs/operators';

export function registrationMarkValidator(
  control: FormControl
): ValidationErrors | null {
  const value = control.value;

  const correvalue = /[A-Z]{2}[0-9]{4}[A-Z]{2}/.test(value);
  if (!correvalue) {
    return { invalidNumber: 'Формат: АА7777КК' };
  }
  return null;
}

export function carLenthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cars = control as FormArray;
    if (cars && cars.length === 0) {
      return { error: 'At least one car should be added' };
    }
    return null;
  };
}

export class ExistCarValidation {
  static createValidator(carsService: CarsService) {
    return (control: AbstractControl) => {
      return of(control.dirty).pipe(
        switchMap((dirty) => {
          if (!dirty) {
            return of(null);
          }
          return carsService.isCarExist(control.value).pipe(
            map((carExist) => {
              return carExist ? { emailTaken: true } : null;
            })
          );
        })
      );
    };
  }
}
