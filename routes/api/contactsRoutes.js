const express = require("express");

const controllers = require("../../controllers/contactsControllers");

const { validateBody, isValidId } = require("../../middlewars");

const { schemas } = require("../../models/contact");

const router = express.Router();
// * тут у маршрутов ниже не указан полный путь /api/contacts так как в app.js уже указали это в роутинге и если запрос совпал с тем что укказали то тогда все остальное ищет здесь

router.get("/", controllers.getAllContacts);

router.get("/:id", isValidId, controllers.getContactById); //* добавлена isValidId для проверки валидности передаваемого id

router.post("/", validateBody(schemas.addSchema), controllers.addContact); // * тут выполняется проверка и валидация с помощью декоратора и схемы валидации. Если будет ошибка то она прокинется с помощью некст в обработчик ошибок если нет то передаст управление дальше тоесть контроллеру запроса(). Мидлвары это все что между адресом и контроллером, контроллер это уже финальная функция

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  controllers.updateContact
); // * поскольку этот запрос обновляет абсолютно весь объект, от в тело запроса надо передавать все поля и те которые я хочу обновить и те которые остануться без обновления

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
); // * обновление конкретного поля, в маршруте указывается это поле "/:id/favorite", в таком случае схема валидации Joi addSchema уже не подходит и мы создаем новую схему updateFavoriteSchema

router.delete("/:id", isValidId, controllers.deleteContact);

module.exports = router;
