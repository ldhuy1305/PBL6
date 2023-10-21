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
  viewGeoCode = catchAsync(async (req, res, next) => {
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
    destination = await getPlaceId(destination);
    origin = await getPlaceId(origin);
    const url = `https://maps.googleapis.com/maps/api/directions/json?destination=place_id:${destination}&origin=place_id:${origin}&units=imperial&key=${API_KEY}`;
    console.log(url);
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
module.exports = new mapController();
