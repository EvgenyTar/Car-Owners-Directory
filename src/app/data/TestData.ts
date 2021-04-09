import { CarEntity } from '../model/car';
import { OwnerEntity } from '../model/owner';

export class TestData {
  static owners = [
    { id: 1, firstName: 'Петр', lastName: 'Петров', middleName: 'Петрович' },
    { id: 2, firstName: 'Иван', lastName: 'Иванов', middleName: 'Иванович' },
    { id: 3, firstName: 'Ефим', lastName: 'Ефимов', middleName: 'Ефимович' },
  ];

  static cars = [
    {
      id: 1,
      idOwner: 1,
      registrationMark: 'АН2343ХК',
      carManufacturer: 'BMW',
      carModel: '701',
      productionYear: 1999,
    },
    {
      id: 2,
      idOwner: 1,
      registrationMark: 'АП3333ХК',
      carManufacturer: 'Fiat',
      carModel: 'Panda',
      productionYear: 1999,
    },
    {
      id: 3,
      idOwner: 2,
      registrationMark: 'УХ7777АХ',
      carManufacturer: 'Renault',
      carModel: 'Sandero',
      productionYear: 1999,
    },
    {
      id: 4,
      idOwner: 3,
      registrationMark: 'КИ6543КИ',
      carManufacturer: 'Dachia',
      carModel: 'Sandero',
      productionYear: 1999,
    },
    {
      id: 5,
      idOwner: 3,
      registrationMark: 'КА6756КА',
      carManufacturer: 'DAEWOO',
      carModel: 'Lanos',
      productionYear: 1999,
    },
  ];

  static getMaxIdCar() {
    return this.cars.reduce(
      (maxId, currentCar, index, cars) =>
        currentCar.id > maxId ? currentCar.id : maxId,
      0
    );
  }
}
