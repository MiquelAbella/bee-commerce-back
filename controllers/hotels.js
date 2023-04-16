const Hotel = require("../models/Hotel");

const getHotelsByCity = async (req, res) => {
  const country = req.params.name;
  console.log(country)
  try {
    const hotels = await Hotel.find({ 'city.capital': country });
    console.log(hotels)
    res.json({ hotels });
  } catch (error) {
    console.log(error)
    res.json({ ok: false });
  }
};

module.exports = { getHotelsByCity };
