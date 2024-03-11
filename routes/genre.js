const express = require("express");
const genreCtrl = require("../controllers/genre");

const router = express.Router();

// route to get all genres of movies and some genres to use on main page

router.get("/genres", genreCtrl.getGenres);

module.exports = router;
