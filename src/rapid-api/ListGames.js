const axios = require("axios");
const gameData = require("../../data.json");
const ListGames = async (req, res) => {
  const page = req.query.page || 1;
  const ordering = req.query.sortBy?.toLowerCase() || "";
  const search = req.query.search || "";
  console.log(ordering, search);
  const options = {
    method: "GET",
    url: `https://${process.env.RAPID_APIHOST}/games?key=${process.env.RAWG_KEY}&page=${page}&ordering=${ordering}&search=${search}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_APIKEY,
      "X-RapidAPI-Host": process.env.RAPID_APIHOST,
    },
  };

  try {
    // return res.json(gameData);
    const response = await axios.request(options);
    if (!response.data) {
      console.error(JSON.stringify(response));
      throw new Error("Error in api fetching");
    }
    const total_games = response.data.count;
    const received_games = response.data.results.length;
    const total_pages = Math.ceil(total_games / received_games);
    let games = response.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        metacritic: game.metacritic,
        playtime: game.playtime,
        platforms: game.platforms,
        parent_platforms: game.parent_platforms,
      };
    });
    // console.log(response.data);
    res.json({
      error: false,
      total_games: total_games,
      received_games: received_games,
      total_pages: total_pages,
      page: page,
      data: games,
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: true,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = { ListGames };
