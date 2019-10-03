const Payment = require("../models/payment");
const { normalizederrors} = require('../helpers/mongoose')

const config = require('../config');

const stripe = require('stripe')(config.STRIPE_SK);

exports.getPendingPayments = function(req,res) {
  const user =  res.locals.user;
  Payment
  .where({toUser:user})
  .populate({
    path: 'booking',
    populate: {path: 'rental'}
  })
  .populate('fromUser')
  .exec(function(err, foundPayments) {
    if (err) {
      return res.status(422).send({errors: normalizederrors(err.errors)});
    }
    return res.json(foundPayments);
  })

}

exports.confirmPayment = function(req, res) {
  const payment = req.body;
  const user = res.locals.user;

  Payment.findById(payment._id)
    .populate('toUser')
    .populate('booking')
    .exec(function(err, foundPayment){
      if(err){
        return res.status(422).send({errors: normalizederrors(err.errors)});
      }
      if (foundPayment.status === 'pending' && user.id === foundPayment.toUser.id){

        const booking = foundPayment.booking;
        const charge = stripe.charges.create({
          amount: booking.totalPrice,
          currency: 'inr',
          customer: payment.fromStripeCustomerId
        })
        if (charge) {
          Booking.update({_id : booking.id}, { status: 'active'}, function(){});

          foundPayment.charge = charge;
          foundPayment.status = 'paid';

          foundPayment.save(function(err){
            if(err){
              return res.status(422).send({errors: normalizederrors(err.errors)});
            }

            User.update({_id: foundPayment.toUser}, { $inc: {revenue: foundPayment.amount}}, function(err, user){
              if(err){
                return res.status(422).send({errors: normalizederrors(err.errors)});
              }
              return res.json({status : 'paid'});
            })
          })
        }
      }
    });
}


exports.declinePayment = function(req,res) {
  const payment = req.body;
  const { booking } = payment;


  Booking.deleteOne({id: booking.id}, (err, deletedBooking) => {
    if (err) {
      return res.status(422).send({errors: normalizederrors(err.errors)});
    }

    Payment.update({_id: payment._id}, {status: 'declined'}, function() {});
    Rental.upadte({_id: booking.rental}, {$pull: {bookings: booking._id}}, () => {});

    return res.json({status: 'deleted'});
  })
 }
