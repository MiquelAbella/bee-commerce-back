const { Schema, model } = require("mongoose");

const CitySchema = Schema(
  {
    country: { type: String, required: true },
    capital: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { minimize: false }
);

module.exports = model("City", CitySchema);
