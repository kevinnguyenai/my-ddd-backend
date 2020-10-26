const { attributes } = require('structure');

const Production = attributes({
  id: Number,
  product_id: String,
  product_name: {
    type: String,
    required: true
  },
  product_price: Number,
  product_type: String,
  product_img: String,
  active: Boolean
})(class Production {
  isLegal() {

  }
});

module.exports = Production;
