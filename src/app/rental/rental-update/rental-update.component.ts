import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import {Rental} from '../shared/rental.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{ HttpErrorResponse } from '@angular/common/http';



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
                private rentalService: RentalService,
                private toastr: ToastsManager,
                private vcr: ViewContainerRef
                    ) {
                      this.toastr.setRootViewContainerRef(vcr);
                    }

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
          if(rentalData.city || rentalData.street){
            this.locationSubject.next(this.rental.city+ ', ' + this.rental.city);
          }
        },
        (errorResponse: HttpErrorResponse)=>{
          this.toastr.error("Provide Suitable Data to update Rental", 'Error');
          this.getRental(rentalId);

        })
    }
}
