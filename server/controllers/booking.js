
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors} = require('../helpers/mongoose')
const moment = require('moment');


exports.createBooking = function(req,res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
            .populate('bookings')
            .populate('user')
            .exec(function(err, foundRental){
        if(err){
          return  res.status(422).send({errors : normalizeErrors(err.errors)});
        }
        if (foundRental.user.id === user.id) {
          return res.status(422).send({errors:[{title:'Invalid user!!!', detail : 'Cannot create booking for your Rental!'}]});
          }
          if (isValidBooking(booking, foundRental)) {
            foundRental.bookings.push(booking); // if Booking Dates are not overlapping we will save the bookings back to Database
            foundRental.save();
            booking.save();
            // Update rental, update user
            return res.json({'created': true});
          }else{
            return res.status(422).send({errors:[{title:'Invalid Booking!!!', detail : 'Booking for selected dated is unavailable Try With Different ones'}]});
          }
            })

}

function isValidBooking(proposedBooking, rental){
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
  isValid =   rental.bookings.every(function(booking){
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart< proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd) && proposedEnd < actualStart)
      })
  }

  return isValid;
}
