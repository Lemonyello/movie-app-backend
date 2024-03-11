const fs = require("fs");
const path = require("path");

// path to genreList file
const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);

// model to get genres of the movies from json file

module.exports = class Genre {
  // only return specific genres to display on main page, not all genres
  static fetchGenresForClient() {
    const genres = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
    return {
      mainPage: genres.filter(
        (g) =>
          g.name === "Action" ||
          g.name === "Comedy" ||
          g.name === "Horror" ||
          g.name === "Documentary" ||
          g.name === "Romance"
      ),
      genres,
    };
  }

  static fetchGenres() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }
};
