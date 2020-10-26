const Operation = require('src/app/Operation');

class GetAllProductions extends Operation {
  constructor({ productionsRepository }) {
    super();
    this.productionsRepository = productionsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const productions = await this.productionsRepository.getAll({
        attributes: [
         'id',
         'product_id',
         'product_name',
         'product_price',
         'product_type',
         'product_img',
         'active'
        ]
      });

      this.emit(SUCCESS, productions);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProductions.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllProductions;
