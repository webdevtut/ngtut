
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizederrors} = require('../helpers/mongoose')
const moment = require('moment');


exports.createBooking = function(req,res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
            .populate('bookings')
            .populate('user')
            .exec(function(err, foundRental){
              // console.log(foundRental._id);
              // console.log(user._id);
        if(err){
          return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
        }
        if (foundRental.user.id === user.id) {
          return res.status(422).send({errors:[{title:'Invalid user!!!', detail : 'Cannot create booking for your Rental!'}]});
          }
          if (isValidBooking(booking, foundRental)) {
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking); // if Booking Dates are not overlapping we will save the bookings back to Database

            booking.save(function(err){
              if(err){
                return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
              }
              foundRental.save();
              User.update({_id: user.id},{$push: {bookings: booking}}, function(){});  // This will select the user with id and push the booking
              return res.json({startAt: booking.startAt, endAt: booking.endAt});
            });
          }else{
            return res.status(422).send({errors:[{title:'Invalid Booking!!!', detail : 'Booking on selected dates are unavailable Try With Different ones'}]});
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
