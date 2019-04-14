const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizederrors} = require('../helpers/mongoose')


const UserCtrl = require('../controllers/user');


router.get('/secret', UserCtrl.authMiddleware, function (req,res) {
  res.json({"secret": 'true'});
})

router.get('/manage',  UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental
    .where({user})
    .populate('bookings')
    .exec(function(err, foundRentals) {

    if (err) {
      res.status(422).send({errors:[{title:'rental error', detail : 'Could not find rental'}]});
    }

    return res.json(foundRentals);
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



router.delete('/:id',UserCtrl.authMiddleware, function(req,res){
  const user  = res.locals.user;
  Rental.findById(req.params.id)
  .populate('user', '_id')
  .populate({
    path:'bookings',
    select:"startAt",
    match:{ startAt: { $gt: new Date()}}   // Logic for Selecting only future Bookings on rental
  })
  .exec(function(err, foundRental){
    if(err){
      return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
    }
    if(user.id !== foundRental.user.id){
      res.status(422).send({errors:[{title:'InValid User!', detail : 'You are not owner of this Rental!'}]});
    }
    if(foundRental.bookings.length > 0){
      res.status(422).send({errors:[{title:'There are Active Bookings on this Rental!', detail : 'Cannot Delete rental with active bookings'}]});
    }
    foundRental.remove(function(err){
      if(err){
        return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
      }
      return res.json({'status':'deleted'});
    });
  });
});


router.post('',UserCtrl.authMiddleware,function(req,res){
 const { title, city, street, category, image, shared, bedroomes, description, dailyRate} = req.body;
 const user = res.locals.user;
 const rental = new Rental({title, city, street, category, image, shared, bedroomes, description, dailyRate});
 rental.user = user;
 Rental.create(rental, function(err,newRental){
   if(err){
     return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});
   }
   User.update({_id: user.id}, {$push:{rentals:newRental}}, function(){});
   return res.json(newRental);
 });
});

router.get('', function(req,res){
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};


    Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals){
      if(err){
        return  res.status(422).send({errors : "Kindly Provide Correct Data /  submit Different input"});

      }
      if (city && foundRentals.length === 0) {
        res.status(422).send({errors:[{title:'No Rentals Found', detail : `There are no Rentals for specified city  ${city}`}]}); // string interpolation done
      }else{
        return res.json(foundRentals);
      }
    });
});



module.exports = router;
