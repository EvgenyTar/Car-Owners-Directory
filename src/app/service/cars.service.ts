import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { concat, Observable, of, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private carsUrl = 'api/cars';

  constructor(private httpClient: HttpClient) {}

  createCars(idOwner: number, cars: CarEntity[]): Observable<any> {
    for (const car of cars) {
      car.idOwner = idOwner;
    }
    return zip(
      ...cars.map((item) => {
        return this.httpClient.post(this.carsUrl, item);
      })
    );
  }

  deleteCars(carsId: number[]): Observable<any> {
    return zip(
      ...carsId.map((id) => {
        return this.httpClient.delete(this.carsUrl + '/' + id);
      })
    );
  }

  editCars(ownerId: number, cars: CarEntity[]): Observable<any> {
    const carsIds = cars.map((car) => car.id);

    return this.getCarsByOwnerId(ownerId).pipe(
      switchMap((previousCars) => {
        const deleteCarsIds = previousCars
          .filter((car) => {
            return !carsIds.includes(car.id);
          })
          .map((car) => car.id);
        if (deleteCarsIds.length !== 0) {
          return this.deleteCars(deleteCarsIds).pipe(map((_) => previousCars));
        }
        return of(previousCars);
      }),
      switchMap((previousCars) => {
        const createCars = cars.filter((car) => {
          return !car.id;
        });
        if (createCars.length !== 0) {
          return this.createCars(ownerId, createCars).pipe(
            map((_) => previousCars)
          );
        }
        return of(previousCars);
      }),
      switchMap((previousCars) => {
        const carsPreviousIds = previousCars.map((car) => car.id);
        const editCars = cars.filter((car) => {
          return carsPreviousIds.includes(car.id);
        });

        return zip(
          ...editCars.map((car) => {
            return this.httpClient.put(this.carsUrl, car);
          })
        );
      })
    );
  }

  getCarsByOwnerId(ownerId?: number): Observable<CarEntity[]> {
    let carsUrl = this.carsUrl;
    if (ownerId) {
      carsUrl += '?idOwner=' + ownerId;
    }
    return this.httpClient.get<any[]>(carsUrl).pipe(
      map((cars) => {
        return cars.map((car) => {
          return CarEntity.createFromAny(car);
        });
      })
    );
  }

  isCarExist(car: any): Observable<boolean> {
    let carsUrl = this.carsUrl;
    if (car) {
      carsUrl +=
        '?registrationMark=' +
        car.registrationMark +
        '&carManufacturer=' +
        car.carManufacturer +
        '&carModel=' +
        car.carModel +
        '&productionYear=' +
        car.productionYear;
    }
    return this.httpClient.get<any[]>(carsUrl).pipe(
      map((cars) => {
        return cars.filter((item) => car.id !== item.id).length > 0;
      })
    );
  }
}
