const express = require("express");

const controllers = require("../../controllers/contactsControllers");

const { validateBody } = require("../../middlewars");

const schemas = require("../../schemas/contactSchema");

const router = express.Router();
// * тут у маршрутов ниже не указан полный путь /api/contacts так как в app.js уже указали это в роутинге и если запрос совпал с тем что укказали то тогда все остальное ищет здесь

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact); // * тут выполняется проверка и валидация с помощью декоратора и схемы валидации. Если будет ошибка то она прокинется с помощью некст в обработчик ошибок если нет то передаст управление дальше тоесть контроллеру запроса(). Мидлвары это все что между адресом и контроллером, контроллер это уже финальная функция

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllers.updateContact
); // * поскольку этот запрос обновляет абсолютно весь объект, от в тело запроса надо передавать все поля и те которые я хочу обновить и те которые остануться без обновления

router.delete("/:contactId", controllers.deleteContact);

module.exports = router;
