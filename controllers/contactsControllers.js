// const contacts = require("../models/contactsRequests"); // * от сюда достаем функции запросов и вставляем их в обработчики маршутов
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { name, sortBy } = req.query;
  const query = name ? { name: { $regex: name, $options: "i" } } : {};
  const result = await Contact.find(query);

  if (sortBy === "asc") {
    result.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sortBy === "desc") {
    result.sort((a, b) => b.createdAt - a.createdAt);
  }

  res.status(200).json(result);
};

// const getAllContacts = async (req, res) => {
//   const result = await Contact.find(); //* в метод find() можно передать критерии поиска, и он будет искать полное совпадение например find({name:"Kennedy Lane"}), результатом запроса будет объект у которого есть поле {name:"Kennedy Lane"}. Если требуется вернуть не все поля объекта а только некоторые то можно сделать запрос find({}, "name email"), в котором строкой через пробел указать необходимые поля, елси же указать '-' перед именем поля то тогда такие поля наоборот не будут показаны find({}, "-name -email")
//   res.status(200).json(result);
// };

const getContactById = async (req, res) => {
  const { id } = req.params; // * параметры запроса
  // const result = await Contact.findOne({ _id: id }); //* findOne() находит первое совпадение и возращает этот объект, если не находит то возвращает null. Чаще используется для поиска по всем полям кроме id, так как для этого есть другой специальный метод.
  const result = await Contact.findById(id); // * еще один метод поиска по id, в него надо просто передать значение id.
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //* первым аргументом передается айди объекта который надо обновить, вторым новый объект которым надо обновить, по умолчанию этот метод не возвращает обновленный обьект , а возвращает старый, хотя в базу данных записывает обновленный. Для того что бы вернуть обновленный обьект надо добавить третим аргументом {new:true}
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
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
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
