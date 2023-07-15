//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const novosItens = []; //Essa variável de escopo global está aqui porque vai ser usada tanto no app.get quanto no app.post
const itensDoTrabalho = [];

app.get("/", (req, res) => {

  const day = date.getDate();
  res.render("list", { listTitle: day, novoItem: novosItens }); //O res.render carrega como página na rota "/" o "list.ejs". O res.render precisa conter todos os <%= %> da página de uma vez no app.get. Para que quando a página renderize, ela já saiba o que fazer.
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Trabalho",
    novoItem: itensDoTrabalho,
  });
});

app.get("/sobre", function(req, res) {
  res.render("sobre");
})

app.post("/", (req, res) => {
  const item = req.body.adicionar;

  if (req.body.item === "Trabalho") {
    itensDoTrabalho.push(item);
    res.redirect("/work"); //Faz com que o conteúdo do app.post seja enviado de volta ao site com valores atualizados, e levando em conta o res.render.
  } else {
    novosItens.push(item); //Inclui o valor submetido pelo botão no array de escopo global.
    res.redirect("/"); //Faz com que o conteúdo do app.post seja enviado de volta ao site com valores atualizados, e levando em conta o res.render.
  }
});

app.listen(3000, function () {
  console.log("A porta 3000 está funcionando.");
});
