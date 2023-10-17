// Import
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const hsts = require("hsts");
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

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception occured! Shutting down...");
  process.exit(1);
});
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//DDOS
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "You have exceeded the 100 requests in 15 minutes limit!",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(cors());
app.use(xss());

app.use(
  hsts({
    maxAge: 15552000, // 180 days in seconds
  })
);
// Strict-Transport-Security: max-age: 15552000; includeSubDomains
// route
route(app);

port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
