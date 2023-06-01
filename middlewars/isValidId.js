//* при передаче значения id в методы поиска findById() или findOne() надо обращать внимание на формат id. Так как если id не соответсвует формату то тогда будет ошибка. В случае если же id соответсвует формату, но конкретно его нет в базе данных, то тогда вернется null и ошибка 404. Для проверки валидности формата id создается такой мидлвар.
const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers/");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid`));
  } //* эта функция просто проверяет валидный или нет переданный ей id. если да то вернет true, если нет false. Если не валидный то прокинет ошибку, если все норм то пойдет дальше.
  next();
};

module.exports = isValidId;
