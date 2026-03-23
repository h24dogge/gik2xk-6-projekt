const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const cart = sequelize.define("Cart", {
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
  payed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

module.exports = cart;
