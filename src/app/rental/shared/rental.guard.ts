import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import {RentalService} from './rental.service';
import {Observable} from 'rxjs';

@Injectable()
export class RentalGuard implements CanActivate {
  private url : string;

  constructor(private rentalService:RentalService,
              private router: Router) {}



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const rentalId: string = route.params.rentalId;
    debugger;
    return this.rentalService.verifyRentalUser(rentalId).map(() =>{
      return true;
    }).catch(() =>{
      return Observable.of(false);
    })
  }

}
