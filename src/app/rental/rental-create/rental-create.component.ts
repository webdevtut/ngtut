import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';


@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

   newRental: any = {};

  constructor() { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(){
    console.log(this.newRental);
  }

}
