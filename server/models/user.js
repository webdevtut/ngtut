const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username:{
    type: String,
    min: [4,"Too short, minimum 128 charachers allowed"],
    max:[32,"Too long, maximum 32 charachers allowed"]
  },
  email:{
    type: String,
    min: [4,"Too short, minimum 128 charachers allowed"],
    max:[32,"Too long, maximum 32 charachers allowed"],
    unique : true,
    lowecare: true,
    required:'Email is Required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password:{
    type:String,
    min: [4,"Too short, minimum 128 charachers allowed"],
    max:[32,"Too long, maximum 32 charachers allowed"],
    required: 'Password is required'
  },
  stripeCustomerId:String,
  revenue: Number,
  rentals:[{
    type:Schema.Types.ObjectId,
    ref:'Rental'
  }],
  bookings: [{
    type: Schema.Types.ObjectId, ref: 'Booking'
  }]

});

userSchema.methods.hasSamePassword = function (requestedPassword){
  return bcrypt.compareSync(requestedPassword,this.password);
}

userSchema.pre('save', function(next){
  const user = this;
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
        // Store hash in your password DB.
        next();
    });
});
})

module.exports = mongoose.model('User', userSchema);
