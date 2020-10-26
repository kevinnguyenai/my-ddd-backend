const UserMapper = require('./SequelizeUserMapper');
const { comparePassword } = require('../encryption')

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);

    return users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async getByOne(...args) {
    const user = await this._findOne(...args);

    return UserMapper.toEntity(user);

  }

  async authentication(...args) {
    try {
      const user = await this._findOneToken(...args);
      return UserMapper.toEntity(user);
    }
    catch(err){
      const error = new Error(err)
      error.details = err

      throw error;
    }
  }

  async validatePassword(...args){
    const cryptpass = await this._ComparePassword(...args);
    return cryptpass;
  }

  async add(user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newUser = await this.UserModel.create(UserMapper.toDatabase(user));
    return UserMapper.toEntity(newUser);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async update(id, newData) {
    const user = await this._getById(id);

    const transaction = await this.UserModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = UserMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return userEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.UserModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.UserModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
  
  async _findOne(...args) {
    try {
      const user =  await this.UserModel.findOne({where: {email: args[0]}}, { rejectOnEmpty: true});
      if(comparePassword(args[1], user.password)) {
        return user
      }
      else {
        throw(error)
      }
    } catch(error) {
      if(error.name == 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
  
  async _findOneToken(...args) {
    try {
      return await this.UserModel.findOne({where: {email: args[0]}}, { rejectOnEmpty: true});
    } catch(error) {
      if(error.name == 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  _ComparePassword(...args) {
    try {
      const bcryptpass =  comparePassword(args[0], args[1]);
      return bcryptpass;
    } catch(error) {
      if(error.name == 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

}


module.exports = SequelizeUsersRepository;
