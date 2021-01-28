'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.attribute.belongsTo(models.character)
    }
  };
  attack.init({
    name: DataTypes.STRING,
    attackbonus: DataTypes.INTEGER,
    damage: DataTypes.STRING,
    characterId: DataTypes.INTEGER,
    savingDc: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attack',
  });
  return attack;
};