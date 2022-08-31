const Joi = require("joi");
const { email } = require("./custom.validation");

const interestedUsersSchema = Joi.object().keys({
  jobId: Joi.string().length(24).alphanum().required(),
});

const addJob = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  deadline: Joi.date().required(),
  phno: Joi.string().length(10).required(),
  email: Joi.string().custom(email).required(),
  status: Joi.string().required(),
});

module.exports = { interestedUsersSchema, addJob };
