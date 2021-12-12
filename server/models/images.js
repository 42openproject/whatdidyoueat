"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.images.hasOne(models.users, { foreignkey: "imageId" });
    }
  }
  images.init(
    {
      key: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "images",
    }
  );
  return images;
};
