const Joi = require("joi");
const { email, password } = require("./custom.validation");

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().custom(password).required(),
  email: Joi.string().custom(email).required(),
});

module.exports = { loginSchema, registerSchema };
