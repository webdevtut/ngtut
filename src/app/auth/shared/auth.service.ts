
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from 'moment';  // installed ES6 npm for "moment" added in package.json
import 'rxjs/Rx'; // Import this as this library Provides "Map" function we added

const jwt = new JwtHelperService();


class DecodedToken{
  exp: number = 0;
  username: string = "";
}
@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http:HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken(); //  We have to Add this as initially no value is defined for it either from localstorage or by ceating one object
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('bwm_auth',token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
    }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp);  // checks for decoded token is expired or not
  }

  public register(userData: any): Observable <any>{
         return this.http.post('api/v1/users/register', userData);
  }

  public login(userData: any): Observable <any>{
         return this.http.post('api/v1/users/auth', userData).pipe(map(
           (token : string) => this.saveToken(token)));
  }
  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated() : boolean{
      return moment().isBefore(this.getExpiration());  // checks if user is authenticated by using state of decodedTokenn
  }

  public getAuthToken(): string{
    return localStorage.getItem('bwm_auth');
  }

  public getUsername(){
    return this.decodedToken.username;
  }
}
