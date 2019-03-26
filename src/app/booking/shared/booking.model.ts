import { Rental } from '../../rental/shared/rental.model'


export class Booking{
  _id: String;
  startAt: String;
  endAt: String;
  totalPrice: number;
  guests: number;
  days: number;
  createdAt: String;
  rental: Rental;
}