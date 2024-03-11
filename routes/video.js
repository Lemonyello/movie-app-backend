const express = require("express");
const videoCtrl = require("../controllers/video");

const router = express.Router();

// routes to get videos to show on detail of a movie

router.post("/video", videoCtrl.postGetMovieVideos);

module.exports = router;
