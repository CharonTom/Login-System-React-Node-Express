const express = require("express");

const app = express();

app.listen(5000, () => {
  console.log(`le serveur est lancée sur le port : ${5000}`);
});
