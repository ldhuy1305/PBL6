// const adminRoute = require('./admin');
const shipperRoute = require("./shipper");
const userRoute = require("./user");
const authRoute = require("./auth");
const contactRoute = require("./contact");
const storeRoute = require("./store");

// const storeRoute = require('./store');
function route(app) {
  // app.use('/admin',adminRoute);
  app.use("/api/shipper", shipperRoute);
  app.use("/api", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/contact", userRoute);
  app.use("/api/store", storeRoute);
}
module.exports = route;
