const Joi = require("joi");
const JoiObjectId = require("joi-objectid");

module.exports = function () {
  Joi.objectId = JoiObjectId(Joi); // Adds Joi.objectId()
};
