import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {

constructor(private http: HttpClient){}

  public getPendingPayments(): Observable<any>{
  return this.http.get('/api/v1/payments');
}
}
