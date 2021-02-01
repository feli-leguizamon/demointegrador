const express = require("express")
const router = express.Router()
const {User} = require("../models")

router.get("/", (req, res, next) => {
    res.send("Bienvenido a la Home")
})

router.get("/users", (req, res, next) => {
    User.findAll()
    .then((users) => {
        res.send(users)
    })
})

router.post("/users", (req, res, next) => {
    User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    })
    .then(() => res.send("Usuario creado"))
})

router.get("/users/:id", (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        res.send(user)
    })
})  


module.exports = router