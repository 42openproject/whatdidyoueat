"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasMany(models.posts, { foreignKey: "userId" });
      models.users.hasMany(models.titles, { foreignKey: "userId" });
    }
  }
  users.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      jwt: DataTypes.STRING,
      profileImageURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
