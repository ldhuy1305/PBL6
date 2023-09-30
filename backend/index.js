// Import
const express = require("express");
const mongoose = require("mongoose");

//Configuring the database
const dbConfig = "mongodb://localhost:27017";
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// Connecting to the database
const DB = process.env.DATABASE;

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// route
route(app);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
