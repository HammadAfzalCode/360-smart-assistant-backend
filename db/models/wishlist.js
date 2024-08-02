"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Wishlist extends Model {}

Wishlist.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Wishlist",
    paranoid: true,
    freezeTableName: true,
  }
);

module.exports = Wishlist;
