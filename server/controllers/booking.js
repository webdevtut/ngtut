
const Booking = require("../models/booking");
const Rental = require("../models/rental");
const Payment = require("../models/payment");
const User = require("../models/user");
const { normalizederrors} = require('../helpers/mongoose')
const moment = require('moment');

const config = require('../config');

const stripe = require('stripe')(config.STRIPE_SK);

const CUSTOMER_SHARE = 0.8;


exports.createBooking = function(req,res) {
  const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
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

            const { payment, err} = createPayment(booking, foundRental.user, paymentToken);

            if (payment) {

                booking.user = user;
                booking.rental = foundRental;
                booking.payment = payment;
                foundRental.bookings.push(booking); // if Booking Dates are not overlapping we will save the bookings back to Database

                booking.save(function(err){
                  if(err){

                    return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
                  }
                  foundRental.save();
                  User.update({_id: user.id},{$push: {bookings: booking}}, function(){});  // This will select the user with id and push the booking
                  return res.json({startAt: booking.startAt, endAt: booking.endAt});
                });
            } else {

              return res.status(422).send({errors:[{title:'Payment Error!!!', detail : err}]});
            }
          }else{

            return res.status(422).send({errors:[{title:'Invalid Booking!!!', detail : 'Booking on selected dates are unavailable Try With Different ones'}]});
          }
      })
}

exports.getUserBookings= function(req,res){
  const user = res.locals.user;
  Booking
    .where({user})
    .populate('rental')
    .exec(function(err,foundBookings){
      if(err){
        return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
      }
      return res.json(foundBookings);
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


async function createPayment(booking, toUser, token){
  const { user } = booking;


  const customer = await stripe.customers.create({
    source: token.id,
    email: user.email
  });

  if (customer) {
    User.update({_id: user.id}, {$set: {stripeCustomerId: customer.id}}, () => {});

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.amount * 100 * CUSTOMER_SHARE
    });

    try {
      const savedPayment = await payment.save();
      return {payment: savedPayment};
    } catch(err){
      return {err: err.message};
    }
  } else {
    return {err: 'cannot process payment!'}
  }
}
