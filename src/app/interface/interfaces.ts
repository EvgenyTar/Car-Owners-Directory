import { Observable } from 'rxjs';
import { CarEntity } from '../model/car';
import { OwnerEntity } from '../model/owner';

export default interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): void;
}
