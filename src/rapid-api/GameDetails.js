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
    let response = await axios.request(options);
    const screenshots = await axios.get(
      `${process.env.RAWG_ENDPOINT}/games/${req.query.gameId}/screenshots?key=${process.env.RAWG_KEY}`
    );
    const trailers = await axios.get(
      `${process.env.RAWG_ENDPOINT}/games/${req.query.gameId}/movies?key=${process.env.RAWG_KEY}`
    );
    // console.log(trailers.data.results);
    response.data.screenshots = screenshots.data.results;
    response.data.trailers = trailers.data.results;
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { GameDetails };
