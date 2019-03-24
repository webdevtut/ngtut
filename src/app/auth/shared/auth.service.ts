import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';  // installed ES6 npm for "moment" added in package.json
import 'rxjs/Rx'; // Import this as this library Provides "Map" function we added

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
    this.decodedToken = jwt.decode(token);

    localStorage.setItem('bwm_auth',token);
    localStorage.setItem('meta', JSON.stringify(this.decodedToken));

    return token;
    }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp);  // checks for decoded token is expired or not
  }

  public register(userData: any): Observable <any>{
         return this.http.post('api/v1/users/register', userData);
  }

  public login(userData: any): Observable <any>{
         return this.http.post('api/v1/users/auth', userData).map(
           (token : string) => this.saveToken(token));
  }

  public isAuthenticated() : boolean{
      return moment().isBefore(this.getExpiration());  // checks if user is authenticated by using state of decodedTokenn
  }
}
