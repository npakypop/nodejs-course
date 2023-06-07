const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi"); // * библиотека для проверки тела запроса

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
); //* первым объектом передается описание оъекта который будет храниться в бд, а вторым объект настроек. В данном случае здесь отключается автоматическое добаоление поля версии к объекту и добавляется два поля дата последнего обновление и дата создания.

contactSchema.post("save", handleMongooseError); //* методы монгуса выбрасывают ошибку без статуса, а если не будет статуса то обработчик ошибок присвоит статус 500 по умолчанию, хотя ошибка валидации это 400, поэтому создается мидлвара которая будет запускаться если случилась ошибка при добавление. Этот код означает что когда при сохранении обьекта случилась ошибка то значит надо вызвать мидлвар handleMongooseError

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}); //* обе схемы валидации джои и монгус хранить лучше в одном файле, что бы изменении одной и в случае добавления полей или правил не забыть поменяь эти правила и вдругой схеме.

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema); //* создание модели(класс который будет работать с коллекцией). В базе данных название коллекции должно быть обязательно во вмножественном числе.

module.exports = { Contact, schemas };
