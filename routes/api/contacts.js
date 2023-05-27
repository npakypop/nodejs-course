const express = require("express");

const contacts = require("../../models/contacts"); //! от сюда достаем функции запросов и вставляем их в обработчики маршутов

const router = express.Router();
//! тут у маршрутов ниже не указан полный путь /api/contacts так как в app.js уже указали это в роутинге и если запрос совпал с тем что укказали то тогда все остальное ищет здесь

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contacts.getContactById();
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const result = await contacts.addContact();
  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await contacts.removeContact();
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contacts.updateContact();
  res.json(result);
});

module.exports = router;
