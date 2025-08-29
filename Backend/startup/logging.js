const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  // Create a logger instance
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logfile.log" }),
    ],
    exceptionHandlers: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    ],
    rejectionHandlers: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "unhandledRejections.log" }),
    ],
  });

  // Make logger globally available
  global.logger = logger;
};
