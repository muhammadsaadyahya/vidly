const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      global.logger.info(`Connected to ${db}...`);
    })
    .catch((err) => {
      global.logger.error("Could not connect to MongoDB...", err);
      process.exit(1); // optional: stop app if DB fails
    });
};
