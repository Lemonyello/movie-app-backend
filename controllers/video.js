const Video = require("../models/Video");

// get the video about a movie based on movieId of that movie in request
exports.postGetMovieVideos = (req, res, next) => {
  const movieId = req.body.film_id;

  // if user didn't include movieId
  if (!movieId)
    return res.status(400).send({ message: "Not found film_id param" });

  Video.fetchAndFilterMovieVideos(movieId, (videos) => {
    // if there are no videos suitable
    if (!videos.length)
      return res.status(404).send({ message: "Not found video" });

    // send only one video
    res.status(200).send(videos[0]);
  });
};
