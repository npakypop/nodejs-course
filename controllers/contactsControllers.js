const contacts = require("../models/contactsRequests"); // * от сюда достаем функции запросов и вставляем их в обработчики маршутов
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params; // * параметры запроса
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found"); // * эта функция которая выполоняет код в 3 строках ниже
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const result = await contacts.updateContact(req.params.id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // *  что возвращать после удаления зависит от ситуации и поставленой задачи, ниже два варианта либо сообщение об удасном удалении  либо обьект который удалили
  // ?   ================== 1 вариант
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts), // * оборачиваем каждый контроллер в декоратор что бы не повторять везде конструкцию try/catch
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
