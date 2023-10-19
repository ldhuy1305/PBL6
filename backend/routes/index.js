// const adminRoute = require('./admin');
const shipperRoute = require("./shipper");
const userRoute = require("./user");
const authRoute = require("./auth");
const storeRoute = require("./store");
const ownerRoute = require("./owner");
const productRoute = require("./product");
const categoryRoute = require("./category");
const favouriteRoute = require("./favourite");
const globalErrorHandler = require("../controllers/errorController");
function route(app) {
  // app.use('/admin',adminRoute);
  app.use("/api/shipper", shipperRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/store", storeRoute);
  app.use("/api/owner", ownerRoute);
  app.use("/api/product", productRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/favourite", favouriteRoute);
  app.all("*", (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
}
module.exports = route;
