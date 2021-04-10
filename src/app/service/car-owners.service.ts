import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import ICarOwnersService from '../interface/interfaces';
import { OwnerEntity } from '../model/owner';
import { HttpClient } from '@angular/common/http';
import { CarsService } from './cars.service';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  private ownersUrl = 'api/owners';

  constructor(
    private httpClient: HttpClient,
    private carsService: CarsService
  ) {}

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
        return this.carsService.getCarsByOwnerId(ownerId).pipe(
          map((cars) => {
            for (const owner of owners) {
              owner.cars = cars.filter((car) => car.idOwner === owner.id);
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
          return this.carsService
            .createCars(owner.id, aCars)
            .pipe(switchMap((_) => this.getOwnerById(owner.id)));
        })
      );
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.httpClient.put(this.ownersUrl, aOwner).pipe(
      switchMap((_) => {
        return this.carsService.editCars(aOwner.id, aOwner.cars);
      }),
      switchMap((_) => {
        return this.getOwnerById(aOwner.id);
      })
    );
  }

  deleteOwner(aOwnerId: number): Observable<void> {
    return this.carsService.getCarsByOwnerId(aOwnerId).pipe(
      switchMap((cars) => {
        let ownersUrl = this.ownersUrl + '/' + aOwnerId;
        return this.httpClient.delete<void>(ownersUrl).pipe(
          switchMap((_) => {
            let carsId = cars.map((car) => car.id);
            if (!carsId) {
              return of(_);
            }
            return this.carsService.deleteCars(carsId);
          })
        );
      })
    );
  }
}
