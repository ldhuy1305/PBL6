const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config({ path: "./config.env" });
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

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
importData();
