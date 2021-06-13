"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: { name: "user_id", allowNull: false },
      });
    }

    toJson = function () {
      const task = this;
      const taskObject = task.get({ plain: true });

      delete taskObject.user_id;

      return taskObject;
    };
  }
  Task.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "Task",
    }
  );
  return Task;
};
