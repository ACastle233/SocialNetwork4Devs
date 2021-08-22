const http = require("http");
const express = require("express");
const cors = require("cors");

require("dotenv").config();
const apiRouter = require("./routes/api");
const app = express();
require("./db/connection");
const bodyParser = require("body-parser");
//const { Producto } = require("./db"); //Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use("/api", apiRouter);



app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`
  );
});
