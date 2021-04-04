import { CarEntity } from './car';
export class OwnerEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  carsEntity!: CarEntity[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    middleName: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
  }

  static createFromAny(data: any): OwnerEntity {
    return new OwnerEntity(
      data.id,
      data.firstName,
      data.lastName,
      data.middleName
    );
  }
}
