import { CarEntity } from '../model/car';
import { OwnerEntity } from '../model/owner';

export class TestData {
  static owners = [
    { id: 1, firstName: 'Петр', lastName: 'Петров', middleName: 'Петрович' },
    { id: 2, firstName: 'Иван', lastName: 'Иванов', middleName: 'Иванович' },
    { id: 3, firstName: 'Ефим', lastName: 'Ефимов', middleName: 'Ефимович' },
    { id: 4, firstName: 'Илья', lastName: 'Ильин', middleName: 'Ильич' },
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
    {
      id: 6,
      idOwner: 3,
      registrationMark: 'ЛВ5434ЕН',
      carManufacturer: 'Kia',
      carModel: 'Accent',
      productionYear: 1999,
    },
    {
      id: 7,
      idOwner: 4,
      registrationMark: 'НИ6789НИ',
      carManufacturer: 'DAEWOO',
      carModel: 'Matiz',
      productionYear: 2015,
    },
    {
      id: 8,
      idOwner: 4,
      registrationMark: 'КУ6633КУ',
      carManufacturer: 'BMW',
      carModel: '501',
      productionYear: 1995,
    },
    {
      id: 9,
      idOwner: 4,
      registrationMark: 'ДН5645НД',
      carManufacturer: 'Huinday',
      carModel: 'i20',
      productionYear: 2012,
    },
    {
      id: 10,
      idOwner: 4,
      registrationMark: 'ДП5234НМ',
      carManufacturer: 'Seat',
      carModel: 'Ibiza',
      productionYear: 2009,
    },
    {
      id: 11,
      idOwner: 4,
      registrationMark: 'ЖИ6598ЖИ',
      carManufacturer: 'Suzuki',
      carModel: 'Vitara',
      productionYear: 2019,
    },
  ];
}
