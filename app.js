const express = require("express");
const logger = require("morgan"); //! надо что бы дебажить код
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); //! тут находятся маршруты для работ с контактами

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter); //! если появился какой либо запрос с таким маршрутом то его обработчик лежит в этом contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
}); //! что делать если пришел запрос на адрес которого нет

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
