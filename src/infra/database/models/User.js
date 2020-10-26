'use strict';
const { encryptPassword } = require('src/infra/encryption')


module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {type: DataTypes.UUID, defaultValue: sequelize.Sequelize.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true},
    first_name: { type: DataTypes.STRING, allowNull:true },
    last_name: { type: DataTypes.STRING, allowNull:true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false },
    registration_key: { type: DataTypes.STRING, allowNull: true },
    reset_password_key: { type: DataTypes.STRING, allowNull: true },
    registration_identifier: { type: DataTypes.UUID, defaultValue: sequelize.Sequelize.UUIDV4 },
    nickname: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.BLOB, allowNull: true },
    //createAt: {},  automatic control
    //updateAt: {},  automatic control
    active: { type: DataTypes.BOOLEAN, defaultValue: false }

  }, {
    //timestamps: false, true -> disable auto control createAT and updateAt
    classMethods: {
      associate() {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: ( user, options ) => {
        user.password =  encryptPassword(user.password);
        //for automatic encryption of password
      },
    }
  });

  return User;
};
