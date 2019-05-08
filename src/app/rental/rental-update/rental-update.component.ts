import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import {Rental} from '../shared/rental.model';

import { Subject } from 'rxjs';


@Component({
  selector: 'bwm-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental:Rental;
  rentalCategories: string[] = Rental.CATEGORIES;

  locationSubject: Subject<any> = new Subject();

    constructor(private route: ActivatedRoute,
      private rentalService: RentalService) { }

    ngOnInit() {
      this.route.params.subscribe(
        (params) => {
          this.getRental(params['rentalId'])
        })
    }

    getRental(rentalId: string){
      this.rentalService.getRentalById(rentalId).subscribe(
        (rental: Rental)=> {
          this.rental = rental;
        });
    }

    updateRental(rentalId: string,rentalData: any){
      this.rentalService.updateRental(rentalId, rentalData).subscribe(
        (updatedRental: Rental)=>{
          this.rental = updatedRental;

          debugger;

          if(rentalData.city || rentalData.street){
            this.locationSubject.next(this.rental.city+ ', ' + this.rental.city);
          }
        },
        ()=>{

        })
    }
}
