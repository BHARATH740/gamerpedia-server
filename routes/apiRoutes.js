const router = require("express").Router();

const { ListGames } = require("../src/rapid-api/ListGames");
const { GameDetails } = require("../src/rapid-api/GameDetails");

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/ListGames", ListGames);
router.get("/GameDetails", GameDetails);

module.exports = router;
