const express = require("express");
const app = express();
require("dotenv").config();
const Stripe = require("stripe");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const stripe = new Stripe(process.env.STRIPE_KEY);

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/checkout", jsonParser, async (req, res) => {
  const { amount, id } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "eur",
    description: "BeeTrips booking",
    payment_method: id,
    confirm: true,
  });

  res.send({ ok: true });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
