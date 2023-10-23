const Shipper = require("../models/shipper");
const Store = require("../models/store");
const ApiFeatures = require("../utils/ApiFeatures");
const appError = require("../utils/appError");
const axios = require("axios");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

require("dotenv").config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
class mapController {
  setAddress = catchAsync(async (req, res, next) => {
    fs.readFile("cities.json", "utf8", (err, data) => {
      if (err) {
        next(new appError("Không tìm thấy!", 404));
      }

      const { city, district } = req.query;
      const cities = JSON.parse(data);
      if (!city) data = cities.map((item) => item.Name);
      else {
        if (!district)
          data = cities
            .find((item) => item.Name == city)
            .Districts.map((item) => item.Name);
        else
          data = cities
            .find((item) => item.Name == city)
            .Districts.find((item) => item.Name == district)
            .Wards.map((item) => item.Name);
      }

      res.status(200).json({
        status: "success",
        data: data,
      });
    });
  });
  nearBySearch = catchAsync(async (req, res, next) => {
    const data = await search(req.query.address, 50000);
    if (!data) next(new appError("Không tìm thấy địa chỉ", 404));
    res.status(200).json({
      status: "success",
      data,
    });
  });
  findStore = catchAsync(async (req, res, next) => {
    let addresses = await Store.find({}, { address: 1, _id: 1 });
    const userAddress = req.query.user;
    const distance = 5;
    const filteredAddresses = [];
    for (const address of addresses) {
      let data = await getDistance(userAddress, address.address);
      data = +data.routes[0].legs[0].distance.text.split("km")[0];
      if (data < distance) {
        filteredAddresses.push(address);
      }
    }
    res.status(200).json({
      status: "success",
      data: filteredAddresses,
    });
  });

  viewGeoCode = catchAsync(async (req, res, next) => {
    console.log(req.query.address);
    const data = await getGeoCode(req.query.address);
    if (!data) next(new appError("Không tìm thấy địa chỉ", 404));
    res.status(200).json({
      status: "success",
      data,
    });
  });

  viewAddress = catchAsync(async (req, res, next) => {
    const data = await getAddress(req.query.latlng);
    if (!data) next(new appError("Không tìm thấy địa chỉ", 404));
    res.status(200).json({
      status: "success",
      data,
    });
  });
  viewDistance = catchAsync(async (req, res, next) => {
    let { destination, origin } = req.query;
    const data = await getDistance(origin, destination);
    if (!data) next(new appError("Không tìm thấy địa chỉ", 404));
    const distance = data.routes[0].legs[0].distance.text;
    const duration = data.routes[0].legs[0].duration.text;

    res.status(200).json({
      status: "success",
      data: { distance, duration },
    });
  });
}
getGeoCode = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status === "OK") {
    return response.data.results[0].geometry.location;
  }
};
getAddress = async (latlng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`;
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    return response.data.results[0].formatted_address;
  }
};
getPlaceId = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    return response.data.results[0].place_id;
  }
};
getDistance = async (origin, destination) => {
  destination = await getPlaceId(destination);
  origin = await getPlaceId(origin);
  const url = `https://maps.googleapis.com/maps/api/directions/json?destination=place_id:${destination}&origin=place_id:${origin}&units=metric&key=${API_KEY}`;
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    return response.data;
  }
};
search = async (location, radius) => {
  location = await getGeoCode(location);
  const url = `https://maps.googleapis.com/maps/api/place//nearbysearch/json?location=${location}&radius${radius}&key=${API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status === "OK") {
    return response.data;
  }
};
module.exports = new mapController();
