"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: { name: "user_id", allowNull: false },
      });
    }

    toJSON() {
      const token = this;
      const tokenObject = token.get({ plain: true });

      delete tokenObject.id;
      delete tokenObject.user_id;
      delete tokenObject.createdAt;
      delete tokenObject.updatedAt;
      return tokenObject;
    }
  }
  Token.init(
    {
      token: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "tokens",
      modelName: "Token",
    }
  );
  return Token;
};
