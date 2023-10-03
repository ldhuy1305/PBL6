// Import
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes");
const cookieParser = require("cookie-parser");

// Connecting to the database
mongoose
  .connect(process.env.dbConfig, {
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
