const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const users = require("./users");
const product = require("./product");
const cart = require("./cart");
const cart_row = require("./cart_row");
const rating = require("./ratings");

users.hasMany(cart, { foreignKey: "user_id" });
cart.belongsTo(users, { foreignKey: "user_id" });

product.hasMany(rating, { foreignKey: "product_id" });
rating.belongsTo(product, { foreignKey: "product_id" });

cart.hasMany(cart_row, { foreignKey: "cart_id" });
cart_row.belongsTo(cart, { foreignKey: "cart_id" });

product.hasMany(cart_row, { foreignKey: "product_id" });
cart_row.belongsTo(product, { foreignKey: "product_id" });

module.exports = {
  sequelize,
  users,
  product,
  cart,
  cart_row,
  rating,
};
