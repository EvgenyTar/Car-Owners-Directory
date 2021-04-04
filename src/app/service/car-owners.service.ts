import { CarEntity } from './../model/car';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TestData } from '../data/TestData';
import ICarOwnersService from '../interface/interfaces';
import { OwnerEntity } from '../model/owner';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  constructor() {}

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

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return of(true).pipe(
      map((_) => {
        const findOwner = TestData.owners.find((item) => item.id === aId);
        if (!findOwner) {
          return new OwnerEntity(-1, '', '', '');
        }
        const idOwner = findOwner.id;
        const cars = this.getCarsByOwnerId(idOwner);
        const owner = OwnerEntity.createFromAny(findOwner);
        owner.carsEntity = cars;
        return owner;
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
