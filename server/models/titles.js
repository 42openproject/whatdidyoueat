"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class titles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.titles.belongsTo(models.users, { foreignkey: "userId" });
    }
  }
  titles.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "titles",
    }
  );
  return titles;
};
