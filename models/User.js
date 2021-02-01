const S = require("sequelize")
const db = require("../db")

class User extends S.Model{}

User.init({
    name: {
        type: S.STRING,
        allowNull: false
    },
    lastname: {
        type: S.STRING,
        allowNull: false
    },
    email: {
        type: S.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    fullname: {
        type: S.VIRTUAL,
        get() {
            return this.getDataValue("name") + " " + this.getDataValue("lastname")
        }
    }
}, {
    sequelize: db, modelName: "user"
})

// HOOK

User.addHook("beforeCreate", (user) => {
    console.log("Creando usuario " + user.name)
})

// METODOS DE INSTANCIA

User.prototype.saludar = function() {
    return "Hola, mi nombre es " + this.name
}

module.exports = User