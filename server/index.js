const express = require('express');    // This is How we import package inside of node
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./models/rental');
const Rental = require('path');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings'),
      imageUploadRoutes = require('./routes/image-upload');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  const fakeDb = new FakeDb();
  // fakeDb.seedDb();
});



const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes); // Middleware
app.use('/api/v1/users', userRoutes); // Middleware
app.use('/api/v1/bookings', bookingRoutes); // BookingRoutes
app.use('/api/v1/', imageUploadRoutes);

const appPath = path.join(__dirname, '..', 'dist');

app.use(express.static(appPath));
app.get('*', function(req,res){
  res.sendFile(path.resolve(appPath, 'index.html'));
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('server is Running on port 3001');
});
