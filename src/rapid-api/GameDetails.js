const axios = require("axios");

const GameDetails = async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPID_APIHOST}/games/${req.query.gameId}?key=${process.env.RAWG_KEY}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.RAPID_APIHOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { GameDetails };
