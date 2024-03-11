const Movie = require("../models/Movie");
const Genre = require("../models/Genre");

// get movies sorted by popularity descending
exports.getMoviesTrending = (req, res, next) => {
  const { page } = req.params;

  Movie.fetchTrendingMovies(page, (result) => res.status(200).send(result));
};

// get movies sorted by rating descending
exports.getMoviesTopRate = (req, res, next) => {
  const { page } = req.params;

  Movie.fetchTopRateMovies(page, (result) => res.status(200).send(result));
};

// get movies of a genre by genreId in request params
exports.getMoviesOfGenre = (req, res, next) => {
  let { genreId } = req.params;
  genreId = Number(genreId);
  const { page } = req.query;

  // if user didn't include genreId in request
  if (!genreId)
    return res.status(400).send({ message: "Not found genre param" });

  const genreList = Genre.fetchGenres();

  // if the genreId doesn't exist in the file data
  if (!genreList.some((genre) => genre.id === genreId))
    return res
      .status(400)
      .send({ message: "Not found that genre id" + genreId });

  Movie.fetchMoviesOfGenre(genreId, page, (result) => {
    res.status(200).send({
      ...result,
      genre_name: genreList.find((genre) => genre.id === genreId).name,
    });
  });
};

// search movies by keyword, year, media type, language, genre
exports.postGetSearchMovies = (req, res, next) => {
  const { keyword, page } = req.body;

  // if user didn't include keyword
  if (!keyword)
    return res.status(400).send({ message: "Not found keyword param" });

  Movie.fetchMoviesByKeyword(req.body, page, (result) =>
    res.status(200).send(result)
  );
};
