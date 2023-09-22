// Import
const express = require('express');
const mongoose = require('mongoose');

//Configuring the database
const dbConfig = 'mongodb://localhost:27017';
const mongoose = require('mongoose');

// Connecting to the database
console.log("connecting to", dbConfig);
mongoose
  .connect(dbConfig)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });


 
const app = express();
app.use(express.urlencoded({
    extended : true,
}))
app.use(express.json());

// route
route(app);

port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})