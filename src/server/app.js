const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const teste1 = require("../teste1");
const teste2 = require("../teste2");
const teste3 = require("../teste3");
const teste4 = require("../teste4");
const teste5 = require("../teste5");
const { createToken, validateJWT } = require("../middlewares/authorization")

require('dotenv').config();

app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.get("/user/:id", teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", teste2.createUser)
app.delete("/user/:id", validateJWT, teste3.removeUser)
app.patch("/user/:id", validateJWT, teste4.updateUser)
app.get("/user/access/:id", teste5.countAcess);
app.get("/getToken", createToken);

module.exports = app;
