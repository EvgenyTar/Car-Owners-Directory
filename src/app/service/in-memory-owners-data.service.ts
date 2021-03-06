import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryOwnersDataService implements InMemoryDbService {
  createDb() {
    // const owners = [
    //   {
    //     id: 1,
    //     firstName: 'Петр',
    //     lastName: 'Петров',
    //     middleName: 'Петрович',
    //     cars: [
    //       {
    //         id: 1,
    //         idOwner: 1,
    //         registrationMark: 'АН2343ХК',
    //         carManufacturer: 'BMW',
    //         carModel: '701',
    //         productionYear: 1999,
    //       },
    //       {
    //         id: 2,
    //         idOwner: 1,
    //         registrationMark: 'АП3333ХК',
    //         carManufacturer: 'Fiat',
    //         carModel: 'Panda',
    //         productionYear: 1999,
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Иван',
    //     lastName: 'Иванов',
    //     middleName: 'Иванович',
    //     cars: [
    //       {
    //         id: 3,
    //         idOwner: 2,
    //         registrationMark: 'УХ7777АХ',
    //         carManufacturer: 'Renault',
    //         carModel: 'Sandero',
    //         productionYear: 1999,
    //       },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Ефим',
    //     lastName: 'Ефимов',
    //     middleName: 'Ефимович',
    //     cars: [
    //       {
    //         id: 4,
    //         idOwner: 3,
    //         registrationMark: 'КИ6543КИ',
    //         carManufacturer: 'Dachia',
    //         carModel: 'Sandero',
    //         productionYear: 1999,
    //       },
    //       {
    //         id: 5,
    //         idOwner: 3,
    //         registrationMark: 'КА6756КА',
    //         carManufacturer: 'DAEWOO',
    //         carModel: 'Lanos',
    //         productionYear: 1999,
    //       },
    //     ],
    //   },
    // ];

    const owners = [
      { id: 1, firstName: 'Петр', lastName: 'Петров', middleName: 'Петрович' },
      { id: 2, firstName: 'Иван', lastName: 'Иванов', middleName: 'Иванович' },
      { id: 3, firstName: 'Ефим', lastName: 'Ефимов', middleName: 'Ефимович' },
    ];

    const cars = [
      {
        id: 1,
        idOwner: 1,
        registrationMark: 'BV2343MN',
        carManufacturer: 'BMW',
        carModel: '701',
        productionYear: 1999,
      },
      {
        id: 2,
        idOwner: 1,
        registrationMark: 'RF3333IJ',
        carManufacturer: 'Fiat',
        carModel: 'Panda',
        productionYear: 1999,
      },
      {
        id: 3,
        idOwner: 2,
        registrationMark: 'DD7777LL',
        carManufacturer: 'Renault',
        carModel: 'Sandero',
        productionYear: 1999,
      },
      {
        id: 4,
        idOwner: 3,
        registrationMark: 'GG6543BB',
        carManufacturer: 'Dachia',
        carModel: 'Sandero',
        productionYear: 1999,
      },
      {
        id: 5,
        idOwner: 3,
        registrationMark: 'VV6756VV',
        carManufacturer: 'DAEWOO',
        carModel: 'Lanos',
        productionYear: 1999,
      },
    ];

    return { owners, cars };
  }

  genId(myTable: { id: number }[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 11;
  }
}
