import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { concat, Observable, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
}
