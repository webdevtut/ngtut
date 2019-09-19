import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { environment } from '../../environments/environment'

@Component({
  selector: 'bwm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  elements: any;

  @ViewChild('cardNumber') cardNumRef : ElementRef;
  @ViewChild('cardExp') cardExpRef : ElementRef;
  @ViewChild('cardCVV') cardCVVRef : ElementRef;

cardNumber: any;
cardExp: any;
cardCVV : any;

  constructor() {
  this.stripe = Stripe(environment.STRIPE_PK);
  this.elements = this.stripe.elements();
 }

  ngOnInit() {
    this.cardNumber = this.elements.create('cardNumber', {style});
    this.cardNumber.mount(this.cardNumRef.nativeElement);

    this.cardExp = this.elements.create('cardExpiry', {style});
    this.cardExp.mount(this.cardExpRef.nativeElement);

    this.cardCVV = this.elements.create('cardCvc', {style});
    this.cardCVV.mount(this.cardCVVRef.nativeElement);
  }

  onSubmit(){

  }

}

const style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};
