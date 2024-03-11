const path = require("path");
const fs = require("fs");

// path to videoList file
const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

// model to get video about a movie from json file

module.exports = class Video {
  static fetchAllVideos(cb) {
    fs.readFile(DATA_PATH, (err, fileContent) => cb(JSON.parse(fileContent)));
  }

  // get all the videos of a movie
  static fetchVideoOfMovie(movieId, cb) {
    Video.fetchAllVideos((allMoviesVideos) => {
      const movie = allMoviesVideos.find((mov) => mov.id === movieId);
      cb(movie ? movie.videos : null);
    });
  }

  // filter the video list of a movie to meet requirements
  static fetchAndFilterMovieVideos(movieId, cb) {
    Video.fetchVideoOfMovie(movieId, (videos) => {
      // if there is no videos about this movie
      if (!videos) {
        cb([]);
        return;
      }

      // take only the videos that is official, from YouTube and type is Trailer or Teaser
      let filteredVideos = videos.filter(
        (vid) =>
          vid.official &&
          vid.site === "YouTube" &&
          (vid.type === "Trailer" || vid.type === "Teaser")
      );

      // if we found some Trailer with some Teaser, only take the Trailer
      if (filteredVideos.some((vid) => vid.type === "Trailer"))
        filteredVideos = filteredVideos.filter((vid) => vid.type === "Trailer");

      // sort the Trailer as publish date descending
      filteredVideos = filteredVideos.sort((a, b) => {
        const d1 = new Date(a.published_at).getTime();
        const d2 = new Date(b.published_at).getTime();

        if (d1 < d2) return 1;
        if (d1 > d2) return -1;
        return 0;
      });

      cb(filteredVideos);
    });
  }
};
