import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})

export class RentalDetailBookingComponent implements OnInit {

  @Input() price: number;
  @Input() bookings: Booking[];

  newBooking: Booking;

  daterange: any = {};
  bookedOutDates: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };
  constructor(private helper : HelperService) { }

    ngOnInit() {
      this.newBooking = new Booking();
      this.getBookedOutDates();
    }
    private checkForInvalidDates(date){
      return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
    }

    private getBookedOutDates(){
      if (this.bookings && this.bookings.length >0){
        this.bookings.forEach((booking: Booking) =>{
            const dateRange = this.helper.getBookingRangeOfDates(booking.startAt,booking.endAt);
            this.bookedOutDates.push(...dateRange);
            debugger;
        });
      }
    }

     selectedDate(value: any, datepicker?: any) {
        console.log(value);


        this.newBooking.startAt = this.helper.formatBookingDate(value.start);
        this.newBooking.endAt = this.helper.formatBookingDate(value.end);
        this.newBooking.days = value.end.diff(value.start, 'days');

        console.log(this.newBooking);


        // or manupulat your own internal property
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }

}
