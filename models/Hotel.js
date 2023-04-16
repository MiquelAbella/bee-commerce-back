const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    city: {
      country: {
        type: String,
        required: true,
      },
      capital: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    hotel: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("Hotel", HotelSchema);
