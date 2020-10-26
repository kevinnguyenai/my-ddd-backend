'use strict';
const { encryptPassword } = require('src/infra/encryption')
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      age: { type: Sequelize.INTEGER, allowNull: true},
      first_name: { type: Sequelize.STRING, allowNull:true },
      last_name: { type: Sequelize.STRING, allowNull:true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true},
      password: {type: Sequelize.STRING, allowNull: false },
      registration_key: { type: Sequelize.STRING, allowNull: true },
      reset_password_key: { type: Sequelize.STRING, allowNull: true },
      registration_identifier: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      nickname: { type: Sequelize.STRING, allowNull: true },
      image: { type: Sequelize.BLOB, allowNull: true },
      active: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      //timestamps: false, true -> disable auto control createAT and updateAt
      classMethods: {
        associate() {
          // associations can be defined here
        }
      },
      hooks: {
        beforeCreate: ( user, options ) => {
          user.password = encryptPassword(user.password);
          //user.password = encrypto.encryptEntity(user.password);
          //for automatic encryption of password
        },
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
