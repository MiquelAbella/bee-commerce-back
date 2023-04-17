const express = require("express");
const app = express();
require("dotenv").config();
const Stripe = require("stripe");
const bodyParse = require("body-parser");
const {
  createUser,
  loginUser,
  getUserById,
  addHistory,
} = require("./controllers/user");

const stripe = new Stripe(process.env.STRIPE_KEY);

const cors = require("cors");
app.use(
  cors({
    origin: "https://main--illustrious-raindrop-0af8fd.netlify.app",
  })
);
app.use(bodyParse.urlencoded({ extended: true }));
const { dbConnection } = require("./database/config");
const { getCities } = require("./controllers/cities");
const { getHotelsByCity } = require("./controllers/hotels");

dbConnection();

app.use(express.json());

app.post("/checkout", async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      description: "BeeTrips booking",
      payment_method: id,
      confirm: true,
    });

    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false });
  }
});

/////////////////////////////7

app.post("/createUser", createUser);
app.post("/loginUser", loginUser);
app.post("/addhistory", addHistory);
app.get("/cities", getCities);
app.get("/hotels/:name", getHotelsByCity);
app.get("/users/:uid", getUserById);

const port = process.env.PORT || 4242;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${4242}!`));
