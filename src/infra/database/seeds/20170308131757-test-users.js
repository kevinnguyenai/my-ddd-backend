'use strict';

const dataFaker = require('src/infra/support/dataFaker');
const { encryptPassword } = require('src/infra/encryption')
module.exports = {
  up: function (queryInterface) {
    const testUsers = [];
    let _first_name, _last_name
    for(let i = 0; i < 20; i++) {
      _first_name = dataFaker.first();
      _last_name = dataFaker.last();
      testUsers.push({
        user_id: dataFaker.guid({ version: 4 }),
        //name: dataFaker.name(),
        first_name: _first_name,
        last_name: _last_name,
        name: _first_name + " " + _last_name,
        age: dataFaker.age(),
        email: dataFaker.email(),
        //password: dataFaker.string({ length: 16 }),
        password: encryptPassword(_first_name + "_" + _last_name + "@123#"),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
        
      });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
