//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let novoItem = []; //Essa variável de escopo global está aqui porque vai ser usada tanto no app.get quanto no app.post

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = new Date();
  let day = today.toLocaleDateString("pt-BR", options);

  res.render("list", { qualDia: day, novoItem: novoItem }); //O res.render carrega como página na rota "/" o "list.ejs". O res.render precisa conter todos os <%= %> da página de uma vez no app.get. Para que quando a página renderize, ela já saiba o que fazer.
});

app.post("/", (req, res) => {
  let item = req.body.adicionar;
  novoItem.push(item); //Inclui o valor submetido pelo botão no array de escopo global.
  res.redirect("/"); //Faz com que o conteúdo do app.post seja enviado de volta ao site com valores atualizados, e levando em conta o res.render.
});

app.listen(3000, function () {
  console.log("A porta 3000 está funcionando.");
});
