const Operation = require('src/app/Operation');

class GetOneUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(email, password) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.usersRepository.getByOne(email, password);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetOneUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetOneUser;
