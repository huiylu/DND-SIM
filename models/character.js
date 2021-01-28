'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models.character.belongsTo(models.username)
      models.character.hasMany(models.attribute)
    }
  };
  character.init({
    name: DataTypes.STRING,
    acStack: DataTypes.INTEGER,
    health: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};