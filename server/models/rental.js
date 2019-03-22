const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rentalSchema = new Schema({
  title: { type: String, required: true, max:[128, 'Too long, maximum 128 charachers allowed']},
  city: { type: String, required: true, lowecare:true},
  street: { type: String, required: true ,min:[4, 'Too short, minimum 4 charachers needed']},
  category: { type: String, required: true,lowecare:true},
  image: { type: String, required: true},
  bedrooms: Number,
  shared: Boolean,
  description: { type: String, required: true},
  dailyRate: Number,
  createdAt: { type: Date, defaults: Date.now},
  user:{ type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Rental', rentalSchema);
 
