"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users_tag.belongsTo(models.tags, { foreignkey: "tagId" });
      models.users_tag.belongsTo(models.users, { foreignkey: "userId" });
    }
  }
  users_tag.init(
    {},
    {
      sequelize,
      modelName: "users_tag",
    }
  );
  return users_tag;
};
