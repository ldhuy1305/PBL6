const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Store = require("../models/Store");

dotenv.config();
// Connecting to the database
console.log(process.env.DATABASE);
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

// READ JSON FILE
// const store = JSON.parse(fs.readFileSync(`${__dirname}/store.json`, "utf-8"));
const store = JSON.parse(fs.readFileSync(`${__dirname}/store.json`, "utf-8"));
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Store.create(store);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
importData();
