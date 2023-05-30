const contacts = require("../models/contactsRequests"); // * от сюда достаем функции запросов и вставляем их в обработчики маршутов
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params; // * параметры запроса
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found уищищ"); // * эта функция которая выполоняет код в 3 строках ниже
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // *  что возвращать после удаления зависит от ситуации и поставленой задачи, ниже два варианта либо сообщение об удасном удалении  либо обьект который удалили
  // ?   ================== 1 вариант
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts), // * оборачиваем каждый контроллер в декоратор что бы не повторять везде конструкцию try/catch
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
