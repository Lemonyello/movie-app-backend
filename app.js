const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routerMovie = require("./routes/movie");
const routerVideo = require("./routes/video");
const routerGenre = require("./routes/genre");
const middlewareAuth = require("./middleware/auth");

const app = express();

// add cors to enable API to be called from client
app.use(cors());
// middlewareAuth to authorize user based on user token
app.use(middlewareAuth.authorizeUser);
// parse request body to json
app.use(bodyParser.json());

// route get movies
app.use("/api/movies", routerMovie);

// route to get videos about a movie
app.use("/api/movies", routerVideo);

// route to get genres of all movies
app.use("/api/genres", routerGenre);

// if user enter a false address, send message to inform user
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(5000);
