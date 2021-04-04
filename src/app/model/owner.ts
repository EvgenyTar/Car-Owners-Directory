export class OwnerEntity {
  id!: number;
  firstName!: string;
  lastName!: string;
  middleName!: string;

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
}
