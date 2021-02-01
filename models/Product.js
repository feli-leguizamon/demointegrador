const S = require("sequelize")
const db = require("../db")

class Product extends S.Model{}

Product.init({
    nombre: {
        type: S.STRING,
        allowNull: false
    },
    precio: {
        type: S.INTEGER,
        allowNull: false,
        get() {
            return "$" + this.getDataValue("precio")
        }
    },
    descripcion: {
        type: S.TEXT,
        allowNull: false
    },
    disponibilidad: {
        type: S.BOOLEAN
    },
    stock: {
        type: S.INTEGER,
        set(stock) {
            if(stock == 0) {
                this.setDataValue("stock", stock)
                this.setDataValue("disponibilidad", false)
            } else {
                this.setDataValue("stock", stock)
                this.setDataValue("disponibilidad", true)
            }
        }
    }
}, {
    sequelize: db, modelName: "product"
})

// METODO DE CLASE

Product.stock = function() {
    return Product.findAll({
        where: {
            [S.Op.or]: [{ stock: 0 }, { disponibilidad: false }]
        }
    })
}

// METODO DE INSTANCIA

Product.prototype.ganancia = function(product) {
    return product.precio * product.stock
}

// HOOKS

Product.addHook("beforeCreate", function(product) {
    if(product.disponibilidad === false) {
        product.nombre = product.nombre + " NO DISPONIBLE"
    }
})

module.exports = Product