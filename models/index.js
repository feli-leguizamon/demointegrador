const Product = require("./Product")
const Category = require("./Category")

Category.hasMany(Product)

module.exports = {Product, Category}