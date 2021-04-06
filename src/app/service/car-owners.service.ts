import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TestData } from '../data/TestData';
import ICarOwnersService from '../interface/interfaces';
import { OwnerEntity } from '../model/owner';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  constructor() {}

  getOwners(): Observable<OwnerEntity[]> {
    return of(
      TestData.owners.map((item) => {
        const idOwner = item.id;
        const cars = this.getCarsByOwnerId(idOwner);
        const owner = OwnerEntity.createFromAny(item);
        owner.carsEntity = cars;
        return owner;
      })
    );
  }

  // getOwnerById(aId: number): Observable<OwnerEntity> {
  //   return of(true).pipe(
  //     map((_) => {
  //       const findOwner = TestData.owners.find((item) => item.id === aId);
  //       if (!findOwner) {
  //         return new OwnerEntity(-1, '', '', '');
  //       }
  //       const cars = this.getCarsByOwnerId(aId);
  //       const owner = OwnerEntity.createFromAny(findOwner);
  //       owner.carsEntity = cars;
  //       return owner;
  //     })
  //   );
  // }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return of(aId).pipe(
      map((id) => {
        const findOwner = TestData.owners.find((item) => item.id === id);
        if (!findOwner) {
          return new OwnerEntity(-1, '', '', '');
        }
        const cars = this.getCarsByOwnerId(id);
        const owner = OwnerEntity.createFromAny(findOwner);
        owner.carsEntity = cars;
        return owner;
      })
    );
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity> {
    return of(true).pipe(
      switchMap((_) => {
        const newId =
          TestData.owners
            .map((item) => item.id)
            .reduce((max, val) => (max > val ? max : val)) + 1;

        TestData.owners.push({
          id: newId,
          firstName: aFirstName,
          lastName: aLastName,
          middleName: aMiddleName,
        });

        return this.getOwnerById(newId);
      })
    );
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return of(true).pipe(
      map((_) => {
        let findOwner = TestData.owners.find((item) => item.id === aOwner.id);
        if (!findOwner) {
          return new OwnerEntity(-1, '', '', '');
        }
        let maxCarId = 0;

        if (TestData.owners.find((item) => item.id === -1)) {
          maxCarId = TestData.getMaxIdCar() + 1;
        }
        findOwner.firstName = aOwner.firstName;
        findOwner.lastName = aOwner.lastName;
        findOwner.middleName = aOwner.middleName;

        for (let i = 0; i < aOwner.carsEntity.length; i++) {
          let findCarEntity = TestData.cars.find(
            (item) => item.id === aOwner.carsEntity[i].id
          );
          if (findCarEntity) {
            findCarEntity.carManufacturer =
              aOwner.carsEntity[i].carManufacturer;
            findCarEntity.carModel = aOwner.carsEntity[i].carModel;
            findCarEntity.productionYear = aOwner.carsEntity[i].productionYear;
            findCarEntity.registrationMark =
              aOwner.carsEntity[i].registrationMark;
          } else {
            if (aOwner.carsEntity[i].id === -1) {
              aOwner.carsEntity[i].id = maxCarId++;
              TestData.cars.push(aOwner.carsEntity[i]);
            }
          }
        }
        return aOwner;
      })
    );
  }

  deleteOwner(aOwnerId: number): void {
    // TestData.cars = TestData.cars.filter((item) => item.idOwner !== aOwnerId);
    // TestData.owners = TestData.owners.filter((item) => item.id !== aOwnerId);

    for (let i = 0; i < TestData.cars.length; i++) {
      if (TestData.cars[i].idOwner === aOwnerId) {
        TestData.cars.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < TestData.owners.length; i++) {
      if (TestData.owners[i].id === aOwnerId) {
        TestData.owners.splice(i, 1);
        i--;
      }
    }
  }

  getCarsByOwnerId(ownerId: number): CarEntity[] {
    return TestData.cars
      .filter((item) => item.idOwner === ownerId)
      .map((item) => {
        return CarEntity.createFromAny(item);
      });
  }
}
