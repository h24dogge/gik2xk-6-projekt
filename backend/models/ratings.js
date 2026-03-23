const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const rating = sequelize.define("Rating", {
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
  rating: { type: DataTypes.DOUBLE, allowNull: false },
});

module.exports = rating;
