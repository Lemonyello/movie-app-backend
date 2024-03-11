const path = require("path");
const fs = require("fs");
const { getMoviesOfPage } = require("../utils/paging");

// path to movieList file
const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

// model to get movies from file

module.exports = class Movie {
  static fetchAllMovies(cb) {
    fs.readFile(DATA_PATH, (err, fileContent) => {
      cb(JSON.parse(fileContent));
    });
  }

  static fetchTrendingMovies(page, cb) {
    function comparePopularity(a, b) {
      if (a.popularity < b.popularity) return 1;

      if (a.popularity > b.popularity) return -1;

      return 0;
    }

    // get all movies then sort popularity descending, then divide result into pages
    Movie.fetchAllMovies((movies) =>
      cb(getMoviesOfPage(movies.sort(comparePopularity), page))
    );
  }

  static fetchTopRateMovies(page, cb) {
    function compareRating(a, b) {
      if (a.vote_average < b.vote_average) return 1;

      if (a.vote_average > b.vote_average) return -1;

      return 0;
    }

    // get all movies then sort rating descending, then divide result into pages
    Movie.fetchAllMovies((movies) =>
      cb(getMoviesOfPage(movies.sort(compareRating), page))
    );
  }

  // get movies of a specific genre
  static fetchMoviesOfGenre(genreId, page, cb) {
    Movie.fetchAllMovies((movies) => {
      cb(
        getMoviesOfPage(
          movies.filter((movie) =>
            movie.genre_ids.some((genre) => genre === genreId)
          ),
          page
        )
      );
    });
  }

  // search movies by keyword, and some other information
  static fetchMoviesByKeyword(
    { keyword, genre, mediaType, language, year },
    page,
    cb
  ) {
    // the word to search for in the movies can be uppercase and lowercase
    keyword = keyword.toLowerCase();

    Movie.fetchAllMovies((movies) => {
      // find movies that has keyword in overview or title
      movies = movies.filter(
        (movie) =>
          (movie.overview && movie.overview.toLowerCase().includes(keyword)) ||
          (movie.title && movie.title.toLowerCase().includes(keyword))
      );

      // if user specify the additional info to search for, filter for it, else ignore

      if (genre !== "All")
        movies = movies.filter((movie) =>
          movie.genre_ids.some((id) => id === Number(genre))
        );

      if (mediaType !== "all")
        movies = movies.filter((movie) => movie.media_type === mediaType);

      if (language !== "All")
        movies = movies.filter((movie) => movie.original_language === language);

      if (year)
        movies = movies.filter(
          (movie) => movie.release_date && movie.release_date.includes(year)
        );

      // then divide the result into pages
      cb(getMoviesOfPage(movies, page));
    });
  }
};
