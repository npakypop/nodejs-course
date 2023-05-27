//! запуск сервера вынесен в отдельный файл

const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
