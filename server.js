const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const NAME = process.env.NAME_DB;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@${NAME}.2urdlad.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err));
