'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enemy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  enemy.init({
    name: DataTypes.STRING,
    favorited: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'enemy',
  });
  return enemy;
};