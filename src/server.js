//importar dependências
var express = require("express");
var path = require("path");
var pages = require('./pages.js');

//iniciar express
var server = express();
server
  //utilizar body do req
  .use(express.urlencoded({ extended: true}))

  //utilizar arquivos estáticos
  .use(express.static("public"))

  //configurar template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

  //rotas da aplicação
  .get("/", pages.index)
  .get("/orphanage", pages.orphanage)
  .get("/orphanages", pages.orphanages)
  .get("/create-orphanage", pages.createOrphanage)
  .post("/save-data", pages.saveData)

//ligar servidor
server.listen(5500);
