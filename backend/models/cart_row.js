const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const cart_row = sequelize.define("Cart_row", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  amount: { type: DataTypes.DOUBLE, allowNull: false },
});

module.exports = cart_row;
