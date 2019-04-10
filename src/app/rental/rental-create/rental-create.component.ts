import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import {RentalService} from '../shared/rental.service';


@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

   newRental: any = {};
   rentalCategories = Rental.CATEGORIES;

  constructor(private rentalService : RentalService) { }

  handleImageChange(){
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg";
  }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(){
      this.rentalService.createRental(this.newRental).subscribe(
        () => {

        },
        () => {

        }
      )
  }

}
