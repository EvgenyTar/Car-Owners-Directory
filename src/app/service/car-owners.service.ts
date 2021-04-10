import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { TestData } from '../data/TestData';
import ICarOwnersService from '../interface/interfaces';
import { OwnerEntity } from '../model/owner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  private ownersUrl = 'api/owners';
  private carsUrl = 'api/cars';

  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<OwnerEntity[]> {
    return this._getOwners();
  }

  private _getOwners(ownerId?: number): Observable<OwnerEntity[]> {
    let ownersUrl = this.ownersUrl;
    if (ownerId) {
      ownersUrl += '?id=' + ownerId;
    }
    return this.httpClient.get<any[]>(ownersUrl).pipe(
      map((owners) => {
        return owners.map((item) => {
          const idOwner = item.id;
          const owner = OwnerEntity.createFromAny(item);
          return owner;
        });
      }),
      switchMap((owners) => {
        let carsUrl = this.carsUrl;
        if (ownerId) {
          carsUrl += '?idOwner=' + ownerId;
        }
        return this.httpClient.get<any[]>(carsUrl).pipe(
          map((cars) => {
            for (const owner of owners) {
              owner.cars = cars
                .filter((car) => car.idOwner === owner.id)
                .map((car) => {
                  return CarEntity.createFromAny(car);
                });
            }
            return owners;
          })
        );
      })
    );
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this._getOwners(aId).pipe(
      map((owners) => {
        if (owners && owners.length === 1) {
          return owners[0];
        }
        return new OwnerEntity(-1, '', '', '');
      })
    );
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity> {
    return this.httpClient
      .post(this.ownersUrl, {
        firstName: aFirstName,
        lastName: aLastName,
        middleName: aMiddleName,
      })
      .pipe(
        map((owner) => {
          return OwnerEntity.createFromAny(owner);
        }),
        switchMap((owner) => {
          return this._createCars(owner.id, aCars).pipe(
            switchMap((_) => this.getOwnerById(owner.id))
          );
        })
      );
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.httpClient.put(this.ownersUrl, aOwner).pipe(
      switchMap((_) => {
        return this.getOwnerById(aOwner.id);
      })
    );
  }

  deleteOwner(aOwnerId: number): Observable<void> {
    let ownersUrl = this.ownersUrl + '/' + aOwnerId;

    let cars = this.getCarsByOwnerId(aOwnerId);
    let carsId = cars.map((car) => car.id);

    return this.httpClient
      .delete<void>(ownersUrl)
      .pipe(switchMap((_) => this._deleteCars(carsId)));
  }

  private _createCars(idOwner: number, cars: CarEntity[]): Observable<any> {
    for (const car of cars) {
      car.idOwner = idOwner;
    }
    return concat(
      ...cars.map((item) => {
        return this.httpClient.post(this.carsUrl, item);
      })
    );
  }

  private _deleteCars(carsId: number[]): Observable<any> {
    return concat(
      ...carsId.map((id) => {
        return this.httpClient.delete(this.carsUrl + '/' + id);
      })
    );
  }

  getCarsByOwnerId(ownerId: number): CarEntity[] {
    return TestData.cars
      .filter((item) => item.idOwner === ownerId)
      .map((item) => {
        return CarEntity.createFromAny(item);
      });
  }
}
