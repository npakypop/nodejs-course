const express = require("express");
const logger = require("morgan"); //! надо что бы дебажить код
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); //! тут находятся маршруты для работ с контактами

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //! из-за того что тело запроса может быть отправлено в разных форматах и для того что бы экспресс понял какой формат был отправлен и преобразовать его обьект используется такая мидлвара(она проверяет каждый запрос и есть ли в нем тело, если есть смотрит какого типа оно по заголовку content-type: )

app.use("/api/contacts", contactsRouter); //! если появился какой либо запрос с таким маршрутом то его обработчик лежит в этом contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
}); //! что делать если пришел запрос на адрес которого нет

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err; //! здесь по умолчанию в случае ошибки будет ошибка сервера 500
  res.status(status).json({ message });
}); //! эту функцию будет искать next(error) из контроллера для обработки ошибок. Где бы в коде не написали next(error) то будет найдена именно эта функция

module.exports = app;
