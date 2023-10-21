// Import
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

require("./utils/googleAuth");

dotenv.config({ path: "./config.env" });
// Connecting to the database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const app = express();
app.set("view engine", "pug");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// route
route(app);

port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
