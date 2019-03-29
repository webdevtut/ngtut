import { Component, OnInit, Input } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { Rental } from '../../shared/rental.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})

export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  newBooking: Booking;
  modalRef : any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };
  constructor(private helper : HelperService,
              private modalService: NgbModal,
              private bookingService : BookingService) { }

    ngOnInit() {
      this.newBooking = new Booking();
      this.getBookedOutDates();
    }
    private checkForInvalidDates(date){
      return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
    }

    private getBookedOutDates(){
      const bookings: Booking[] = this.rental.bookings;
      if (bookings && bookings.length >0){
        bookings.forEach((booking: Booking) =>{
            const dateRange = this.helper.getBookingRangeOfDates(booking.startAt,booking.endAt);
            this.bookedOutDates.push(...dateRange);
            debugger;
        });
      }
    }

    private addNewBookedOutDates(bookingData: any){
      const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt,bookingData.endAt);
      this.bookedOutDates.push(...dateRange); /// three dots added to format daterange we are getting

    }

    openConfirmModel(content){
      this.errors = [];
      this.modalRef = this.modalService.open(content);
    }
    createBooking(){
      this.newBooking.rental = this.rental;
      this.bookingService.createBooking(this.newBooking).subscribe(
        (bookingData) => {
          this.addNewBookedOutDates(bookingData);
          this.newBooking = new Booking();
          this.modalRef.close();
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        }
      )
    }
     selectedDate(value: any, datepicker?: any) {
        this.newBooking.startAt = this.helper.formatBookingDate(value.start);
        this.newBooking.endAt = this.helper.formatBookingDate(value.end);
        this.newBooking.days = value.end.diff(value.start, 'days');
        this.newBooking.totalPrice =  this.newBooking.days * this.rental.dailyRate;

    }

}
