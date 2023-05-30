const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body); // * валидация тела запроса
    if (error) {
      // * перед тем как добавить контакт проверяем есть ли ошибка после валидации
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
