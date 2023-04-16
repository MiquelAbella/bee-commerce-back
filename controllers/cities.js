const City = require("../models/City");

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json({ cities });
  } catch (error) {
    res.json({ ok: false });
  }
};

module.exports = {getCities};
