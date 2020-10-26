const Production = require('src/domain/production/Production');

const SequelizeProductionMapper = {
  toEntity({ dataValues }) {
    const { id, product_id, product_name, product_price, product_type, product_img, active } = dataValues;

    return new Production({ id, product_id, product_name, product_price, product_type, product_img, active });
  },

  toDatabase(survivor) {
    const { product_id, product_name, product_price, product_type, product_img, active } = survivor;

    return { product_id, product_name, product_price, product_type, product_img, active };
  }
};

module.exports = SequelizeProductionMapper;
