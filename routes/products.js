const express = require("express")
const router = express.Router()
const {Product, Category} = require("../models")

//////////////////////////////////////////////// products

router.get("/", (req, res, next) => {
    if(req.query.categoria) {
        Category.findAll({
            where: {
                nombre: req.query.categoria
            }
        })
        .then((categoria) => {
            let categoriaId = categoria[0].id
            Product.findAll({
                where: {
                    categoryId: categoriaId
                }
            })
            .then((productos) => res.send(productos))
        })
    } else {
        Product.findAll()
        .then((products) => {
            res.send(products)
        })
    }
})

router.get("/category", (req, res, next) => {
    Category.findAll()
    .then((categories) => res.send(categories))
})

router.post("/category", (req, res, next) => {
    Category.create({
        nombre: req.body.nombre
    })
    .then(() => res.send("Categoria creada"))
})

router.get("/:id", (req, res, next) => {
    Product.findByPk(req.params.id)
    .then((product) => {
        res.send(product)
    })
})

router.post("/", (req, res, next) => {
    Product.create(req.body)
    .then(() => res.send("Producto creado"))
})

router.put("/:id", (req, res, next) => {
    Product.findByPk(req.params.id)
    .then((product) => {
        product.update(req.body)
    })
    .then(() => res.send("Producto actualizado"))

})

router.delete("/:id", (req, res, next) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Producto Eliminado")
    })
})

module.exports = router