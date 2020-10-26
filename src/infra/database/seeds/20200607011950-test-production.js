'use strict';
'use strict';

const dataFaker = require('src/infra/support/dataFaker');
const sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const testProduction = [];
    for(let i = 0; i < 20; i++) {
      testProduction.push({
        product_id : dataFaker.guid({ version: 4}),
        product_name : dataFaker.domain(),
        product_price: dataFaker.integer({ min: 0, max: 3000 }),
        product_type : "domain",
        active: true,
        createdAt : new Date(),
        updatedAt : new Date()
      });
    }
    return queryInterface.bulkInsert('productions', testProduction, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('productions', null, {});
  }
};
