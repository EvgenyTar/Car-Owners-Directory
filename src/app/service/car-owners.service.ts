import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
    // return of(
    //   TestData.owners.map((item) => {
    //     const idOwner = item.id;
    //     const cars = this.getCarsByOwnerId(idOwner);
    //     const owner = OwnerEntity.createFromAny(item);
    //     owner.cars = cars;
    //     return owner;
    //   })
    // );
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
    // return of(aId).pipe(
    //   map((id) => {
    //     const findOwner = TestData.owners.find((item) => item.id === id);
    //     if (!findOwner) {
    //       return new OwnerEntity(-1, '', '', '');
    //     }
    //     const cars = this.getCarsByOwnerId(id);
    //     const owner = OwnerEntity.createFromAny(findOwner);
    //     owner.cars = cars;
    //     return owner;
    //   })
    // );
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
        })
      );
    // return of(true).pipe(
    //   switchMap((_) => {
    //     const newId =
    //       TestData.owners
    //         .map((item) => item.id)
    //         .reduce((max, val) => (max > val ? max : val)) + 1;

    //     TestData.owners.push({
    //       id: newId,
    //       firstName: aFirstName,
    //       lastName: aLastName,
    //       middleName: aMiddleName,
    //     });

    //     let maxCarId = TestData.getMaxIdCar() + 1;

    //     for (let i = 0; i < aCars.length; i++) {
    //       aCars[i].idOwner = newId;
    //       aCars[i].id = maxCarId++;
    //       TestData.cars.push(aCars[i]);
    //     }
    //     return this.getOwnerById(newId);
    //   })
    // );
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.httpClient.put(this.ownersUrl, aOwner).pipe(
      switchMap((_) => {
        return this.getOwnerById(aOwner.id);
      })
    );
    // return of(true).pipe(
    //   map((_) => {
    //     let findOwner = TestData.owners.find((item) => item.id === aOwner.id);
    //     if (!findOwner) {
    //       return new OwnerEntity(-1, '', '', '');
    //     }
    //     let maxCarId = 0;

    //     if (TestData.owners.find((item) => item.id === -1)) {
    //       maxCarId = TestData.getMaxIdCar() + 1;
    //     }
    //     findOwner.firstName = aOwner.firstName;
    //     findOwner.lastName = aOwner.lastName;
    //     findOwner.middleName = aOwner.middleName;

    //     for (let i = 0; i < aOwner.cars.length; i++) {
    //       let findCarEntity = TestData.cars.find(
    //         (item) => item.id === aOwner.cars[i].id
    //       );
    //       if (findCarEntity) {
    //         findCarEntity.carManufacturer = aOwner.cars[i].carManufacturer;
    //         findCarEntity.carModel = aOwner.cars[i].carModel;
    //         findCarEntity.productionYear = aOwner.cars[i].productionYear;
    //         findCarEntity.registrationMark = aOwner.cars[i].registrationMark;
    //       } else {
    //         if (aOwner.cars[i].id === -1) {
    //           aOwner.cars[i].id = maxCarId++;
    //           TestData.cars.push(aOwner.cars[i]);
    //         }
    //       }
    //     }
    //     return aOwner;
    //   })
    // );
  }

  deleteOwner(aOwnerId: number): Observable<void> {
    let ownersUrl = this.ownersUrl + '/' + aOwnerId;

    return this.httpClient.delete<void>(ownersUrl);

    // for (let i = 0; i < TestData.cars.length; i++) {
    //   if (TestData.cars[i].idOwner === aOwnerId) {
    //     TestData.cars.splice(i, 1);
    //     i--;
    //   }
    // }

    // const ownerIndex = TestData.owners.findIndex(
    //   (item) => item.id === aOwnerId
    // );
    // if (ownerIndex !== -1) {
    //   TestData.owners.splice(ownerIndex, 1);
    // }
  }

  getCarsByOwnerId(ownerId: number): CarEntity[] {
    return TestData.cars
      .filter((item) => item.idOwner === ownerId)
      .map((item) => {
        return CarEntity.createFromAny(item);
      });
  }
}
