const Joi = require("joi"); // * библиотека для проверки тела запроса

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = { addSchema };
