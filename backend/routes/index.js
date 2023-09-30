// const adminRoute = require('./admin');
// const shipperRoute = require('./shipper');
const userRoute = require("./user");
// const storeRoute = require('./store');
function route(app) {
  // app.use('/admin',adminRoute);
  // app.use('/shipper',shipperRoute);
  app.use("/user", userRoute);
  // app.use('/store',storeRoute);
}
module.exports = route;
