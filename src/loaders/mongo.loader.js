const mongoose = require("mongoose");

function mongo(url) {
  mongoose
    .connect(url)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
}

module.exports = mongo;
