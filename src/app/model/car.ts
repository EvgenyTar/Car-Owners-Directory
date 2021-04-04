export class CarEntity {
  id!: number;
  idOwner!: number;
  registrationMark!: string;
  carManufacturer!: string;
  carModel!: string;
  productionYear!: number;

  constructor(
    id: number,
    idOwner: number,
    regMark: string,
    carManufacturer: string,
    carModel: string,
    prodYear: number
  ) {
    this.id = id;
    this.idOwner = idOwner;
    this.registrationMark = regMark;
    this.carManufacturer = carManufacturer;
    this.carModel = carModel;
    this.productionYear = prodYear;
  }
}
