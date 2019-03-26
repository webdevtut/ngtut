const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');


const UserCtrl = require('../controllers/user');


router.get('/secret', UserCtrl.authMiddleware, function (req,res) {
  res.json({"secret": 'true'});
})


router.get('', function(req,res){
  Rental.find({})
        .select('-bookings')
        .exec(function(err, foundRentals){
          res.json(foundRentals);
        });
});

router.get('/:id', function(req,res){
  const rentalId = req.params.id;
  Rental.findById(rentalId)
              .populate('user', 'username -_id')  // - is used for blocking the id only username will be sent back
              .populate('bookings','startAt endAt createdAt -_id')
              .exec(function(err, foundRental){
        if(err){
          res.status(422).send({errors:[{title:'rental error', detail : 'Could not find rental'}]});
          }
          res.json(foundRental);
  });
});

module.exports = router;
