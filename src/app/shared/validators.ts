import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import {
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function registrationMarkValidator(
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

export function productionYearValidator(
  control: FormControl
): ValidationErrors | null {
  const value = control.value;

  const today = new Date();
  const thisYear = today.getFullYear();
  const correcProductionYear = value >= 1990 && value <= thisYear;

  if (!correcProductionYear) {
    return { invalidNo: '1990 - ' + thisYear };
  }
  return null;
}

// export function carLenthValidator(): ValidatorFn {
//   return (cars: FormArray): { [key: string]: any } => {
//     if (cars.length !== 0) {
//       return null;
//     }
//     return { error: 'At least one car should be added' };
//   };
// }
