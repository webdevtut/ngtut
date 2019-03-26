import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';


@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})

export class RentalDetailBookingComponent implements OnInit {

  @Input() price: number;
  @Input() bookings: Booking[];

  daterange: any = {};
  bookedOutDates: any[] = [];

  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };
  constructor(private helper : HelperService) { }

    ngOnInit() {
      this.getBookedOutDates();
    }

    private getBookedOutDates(){
      if (this.bookings && this.bookings.length >0){
        this.bookings.forEach((booking: Booking) =>{
            const dateRange = this.helper.getRangeOfDates(booking.startAt,booking.endAt);
            this.bookedOutDates.push(...dateRange);
            debugger;
        });
      }
    }

     selectedDate(value: any, datepicker?: any) {
        console.log(value);

        // any object can be passed to the selected event and it will be passed back here
        datepicker.start = value.start;
        datepicker.end = value.end;

        // or manupulat your own internal property
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }

}
