const express = require("express");
const movieCtrl = require("../controllers/movie");

const router = express.Router();

// routes to get movies based on request params and request query

router.get("/trending", movieCtrl.getMoviesTrending);

router.get("/top-rate", movieCtrl.getMoviesTopRate);

router.get("/discover/:genreId", movieCtrl.getMoviesOfGenre);

router.post("/search", movieCtrl.postGetSearchMovies);

module.exports = router;
