// const adminRoute = require('./admin');
const shipperRoute = require("./shipper");
const userRoute = require("./user");
const authRoute = require("./auth");
const storeRoute = require("./store");
const ownerRoute = require("./owner");
const productRoute = require("./product");
const categoryRoute = require("./category");
const favouriteRoute = require("./favourite");
const mapRoute = require("./map");
const ratingRoute = require("./rating");
const adminRoute = require("./admin");
const globalErrorHandler = require("../controllers/errorController");
const appError = require("../utils/appError");
function route(app) {
  app.use("/api/admin", adminRoute);

  app.use("/api/shipper", shipperRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/store", storeRoute);
  app.use("/api/owner", ownerRoute);
  app.use("/api/product", productRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/favourite", favouriteRoute);
  app.use("/api/map", mapRoute);
  app.use("/api/rating", ratingRoute);
  // app.use("/", (req, res, next) => {
  //   res.status(200).json({ message: "Welcome to homepage" });
  // });
  // app.all("/*", (req, res, next) => {
  //   next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  // });
  app.use(globalErrorHandler);
}
module.exports = route;
