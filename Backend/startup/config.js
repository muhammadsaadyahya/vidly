const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

// {
//   "jwtPrivateKey": "unsecureKey",
//   "db": "mongodb+srv://SaadYahya:0dAtIGg4oMytCTcN@cluster0.nsifcdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//   "port": "3900",
//   "requiresAuth": true
// }
