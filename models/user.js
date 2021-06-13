"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Token, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      // define association here
    }

    static findUserByCredentials = async function (email, password) {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found. Please signup and try again.");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid Password");
      }

      return user;
    };

    generateToken = function () {
      const user = this;
      const token = jwt.sign(
        { id: user.id.toString() },
        process.env.JWT_SECRET
      );
      return token;
    };

    toJSON = function () {
      const user = this;
      const userObject = user.get({ plain: true });

      delete userObject.id;
      delete userObject.password;
      delete userObject.createdAt;
      delete userObject.updatedAt;
      return userObject;
    };
    getUserHashedPassword = function () {
      const user = this;
      const userObject = user.get({ plain: true });
      return userObject.password;
    };
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );

  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};
