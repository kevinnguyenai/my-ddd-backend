const Operation = require('src/app/Operation');

class GetAllUsers extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.usersRepository.getAll({
        attributes: [
         'id',
         'user_id',
         'name',
         'age',
         'first_name',
         'last_name',
         'email',
         'nickname',
         'image',
         'active'
        ]
      });

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllUsers.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllUsers;
