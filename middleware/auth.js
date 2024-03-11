const UserToken = require("../models/UserToken");

// middleware to authorize user based on the token in request, by searching for that token in the json file of available token

exports.authorizeUser = (req, res, next) => {
  const { token } = req.query;

  UserToken.fetchAll((users) => {
    // if the token exists in the file, move on the check for the routes
    if (users.some((user) => user.token === token)) next();
    // if not then it is error
    else res.status(401).send({ message: "Unauthorized" });
  });
};
