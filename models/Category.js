const S = require("sequelize")
const db = require("../db")

class Category extends S.Model{}

Category.init({
    nombre: {
        type: S.STRING
    }
}, {
    sequelize: db, modelName: "category"
})

module.exports = Category