const ProductionMapper = require('./SequelizeProductionMapper');

class SequelizeProductionsRepository {
  constructor({ ProductionModel }) {
    this.ProductionModel = ProductionModel;
  }

  async getAll(...args) {
    const production = await this.ProductionModel.findAll(...args);

    return production.map(ProductionMapper.toEntity);
  }

  async getById(id) {
    const production = await this._getById(id);

    return ProductionMapper.toEntity(production);
  }

  async add(production) {
    const { valid, errors } = production.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newProduction = await this.ProductionModel.create(ProductionMapper.toDatabase(production));
    return ProductionMapper.toEntity(newProduction);
  }

  async remove(id) {
    const production = await this._getById(id);

    await production.destroy();
    return;
  }

  async update(id, newData) {
    const production = await this._getById(id);

    const transaction = await this.ProductionModel.sequelize.transaction();

    try {
      const updatedProduction = await production.update(newData, { transaction });
      const productionEntity = ProductionMapper.toEntity(updatedProduction);

      const { valid, errors } = productionEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return productionEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.ProductionModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.ProductionModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeProductionsRepository;
