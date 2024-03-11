const Genre = require("../models/Genre");

// route to get only the genres to display on main page, not all available genres
exports.getGenres = (req, res, next) => {
  res.status(200).send(Genre.fetchGenresForClient());
};
