"use strict";
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class user extends Model {
  // Hash password before saving user
  static async hashPassword(user) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}

user.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true, // Make sure emails are unique
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "user",
    paranoid: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: user.hashPassword,
      beforeUpdate: user.hashPassword,
    },
  }
);

module.exports = user;
