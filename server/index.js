const express = require('express');    // This is How we import package inside of node
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');


const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users');


mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  const fakeDb = new FakeDb();
  // fakeDb.seedDb();
});



const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes); // Middleware
app.use('/api/v1/users', userRoutes); // Middleware


const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('server is Running on port 3001');
});
