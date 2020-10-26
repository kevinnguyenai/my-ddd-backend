'use strict';
module.exports = (sequelize, DataTypes) => {
  var Production = sequelize.define('production', {
    product_id: { type: DataTypes.UUID },
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_price: { type: DataTypes.INTEGER, allowNull: true },
    product_type: { type: DataTypes.STRING, allowNull: true },
    product_img: { type: DataTypes.BLOB, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Production;
};