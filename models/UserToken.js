const path = require("path");
const fs = require("fs");

// path to userToken file

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "userToken.json"
);

module.exports = class UserToken {
  static fetchAll(cb) {
    fs.readFile(DATA_PATH, (err, fileContent) => {
      cb(JSON.parse(fileContent));
    });
  }
};
