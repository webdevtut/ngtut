const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const { normalizeErrors} = require('../helpers/mongoose')


const UserCtrl = require('../controllers/user');


router.get('/secret', UserCtrl.authMiddleware, function (req,res) {
  res.json({"secret": 'true'});
})

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

router.get('', function(req,res){
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};


    Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals){
      if(err){
        return  res.status(422).send({errors : normalizeErrors(err.errors)});
      }
      if (city && foundRentals.length === 0) {
        res.status(422).send({errors:[{title:'No Rentals Found', detail : `There are no Rentals for specified city  ${city}`}]}); // string interpolation done
      }else{
        return res.json(foundRentals);
      }
    });
});



module.exports = router;
