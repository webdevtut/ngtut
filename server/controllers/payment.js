const Payment = require("../models/payment");
const { normalizederrors} = require('../helpers/mongoose')



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
