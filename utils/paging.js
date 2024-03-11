const { numMoviesPerPage } = require("../data/variables");

// function to divide a movie list to multiple pages of 20 items per page

exports.getMoviesOfPage = (movieList, page) => {
  let totalPages = movieList.length / numMoviesPerPage;
  // if totalPages is a float number, round it to int
  if (totalPages > Math.floor(totalPages))
    totalPages = Math.floor(totalPages) + 1;

  return {
    results: page
      ? movieList.slice((page - 1) * numMoviesPerPage, page * numMoviesPerPage)
      : movieList.slice(0, numMoviesPerPage),
    // if user didn't specify page, default is page 1
    page: page ?? 1,
    total_pages: totalPages,
  };
};
