const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")(); // Sets up global.logger
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  global.logger.info(`Listening on port ${port}...`)
);

module.exports = server;
