const { Client } = require("@googlemaps/google-maps-services-js");

const ApiFeatures = require("../utils/ApiFeatures");
const appError = require("../utils/appError");
const axios = require("axios");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

require("dotenv").config();
const client = new Client({});
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
  search = async (query) => {
    const response = await client.placeAutocomplete({
      params: {
        input: query,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000,
    });
    return response.data;
  };
  getGeoCode = catchAsync(async (req, res, next) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      req.query.address
    )}&key=${API_KEY}`;

    const k = await getCode(
      "193 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt Nam"
    );
    console.log(k);
    return axios
      .get(url)
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data.data.results[0].geometry.location,
        });
      })
      .catch((err) => {
        next(err);
      });
  });

  getAddress = catchAsync(async (req, res, next) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latlng}&key=${API_KEY}`;

    return axios
      .get(url)
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data.data.results[0].formatted_address,
        });
      })
      .catch((err) => {
        next(err);
      });
  });
  getDistance = catchAsync(async (req, res, next) => {
    const { destination, origin } = req.query;
    const url = `https://maps.googleapis.com/maps/api/directions/json
      ?destinations=${encodeURIComponent(destination)}
      &origins=${encodeURIComponent(origin)}
      &units=imperial
      &key=${API_KEY}`;
    return axios
      .get(url)
      .then((data) => {
        res.status(200).json({
          status: "success",
          data: data.data.results[0].formatted_address,
        });
      })
      .catch((err) => {
        next(err);
      });
  });
}
getCode = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  const res = await axios
    .get(url)
    .then((data) => {
      console.log(data.data.results[0].geometry.location);
      return data.data.results[0].geometry.location;
    })
    .catch();
};
module.exports = new mapController();
