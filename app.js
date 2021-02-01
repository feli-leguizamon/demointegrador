const express = require("express")
const app = express()
const db = require("./db")
const volleyball = require("volleyball");
const  routes = require("./routes")
const bodyParser = require("body-parser")



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(volleyball);

app.use(routes);

app.use((err, req, res, next) => {
  res.sendStatus(404).send(err);
});

db.sync().then(() => {
    app.listen(3000, () => {
      console.log("Server escuchando en el puerto 3000..");
    });
  });