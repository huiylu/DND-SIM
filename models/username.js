'use strict';
const bcrypt=require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class username extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.username.hasMany(models.character)
    }
  };
  username.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [1,99],
          msg: 'Name must be between 1 to 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [8, 99],
          msg: 'Password must be between 8 to 99'
        },
        
        notContains:{
          args: this.name,
          msg: 'Password cannot have your name'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(pendingUser, options)=>{
        if(pendingUser && pendingUser.password){
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password=hash
        }
      }
    },
    sequelize,
    modelName: 'username',
  });
  return username;
};