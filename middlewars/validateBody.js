const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(HttpError(400, "missing fields"));
    }
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
