const ProductionSerializer = {
    serialize({ id, product_id, product_name, product_price, product_type, product_image, active }) {
      return {
        id,
        product_id,
        product_name,
        product_price,
        product_type,
        product_image,
        active
      };
    }
  };
  
  module.exports = ProductionSerializer;
  