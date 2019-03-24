import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/Rx'; // Import this as this library Provides "Map" function we added

class DecodedToken{
  exp: number = 0;
  username: string = "";
}
@Injectable()
export class AuthService {
  private decodedToken;

constructor(private http:HttpClient) {}
  public register(userData: any): Observable <any>{
         return this.http.post('api/v1/users/register', userData);
  }
  public login(userData: any): Observable <any>{
         return this.http.post('api/v1/users/auth', userData).map(
           (token : string) => this.saveToken(token));
  }
  private saveToken(token: string): string {
    debugger;
    this.decodedToken = jwt.decode(token);

    localStorage.setItem('bwm_auth',token);
    localStorage.setItem('meta', JSON.stringify(this.decodedToken));

    return token;
  }
}
