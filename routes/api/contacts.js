const express = require("express");
const Joi = require("joi"); //! библиотека для проверки тела запроса
const contacts = require("../../models/contacts"); //! от сюда достаем функции запросов и вставляем их в обработчики маршутов

const router = express.Router();
//! тут у маршрутов ниже не указан полный путь /api/contacts так как в app.js уже указали это в роутинге и если запрос совпал с тем что укказали то тогда все остальное ищет здесь

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error ebobo" }); //! если произошла ошибка с базой данный на сервере то тогда будет отправлена ошибка на фронтенд
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; //! параметры запроса
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found уищищ"); //! эта функция которая выполоняет код в 3 строках ниже
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error; //! прокидываем ошибку в catch так как обрабатывать ошибку лучше в одном месте.
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    next(error); //! если передать в некст ошибку то тогда он будет искать именно обработчик ошибок. Обработчик ошибок это функция с 4 параметрами(err, req, res, next) и именно такую функцию будет искать некст) эта функция лежит в файле апп и это единственная функция с 4 параметрами.
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body); //! валидация тела запроса
    if (error) {
      //! перед тем как добавить контакт проверяем есть ли ошибка после валидации
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body); //! валидация тела запроса
    if (error) {
      //! перед тем как обновить контакт проверяем есть ли ошибка после валидации
      throw HttpError(400, error.message);
    }
    const result = await contacts.updateContact(req.params.id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}); //! поскольку этот запрос обновляет абсолютно весь объект, от в тело запроса надо передавать все поля и те которые я хочу обновить и те которые остануться без обновления

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // !  что возвращать после удаления зависит от ситуации и поставленой задачи, ниже два варианта либо сообщение об удасном удалении  либо обьект который удалили
    // ?   ================== 1 вариант
    res.json({
      message: "Delete success",
    });
    // ?   ================== 2 вариант
    // res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
