const User = require('src/domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, user_id, name, age, first_name, last_name, email, password, registration_key, reset_password_key, registration_identifier, nickname, active} = dataValues;

    return new User({ id, user_id, name, age, first_name, last_name, email, password, registration_key, reset_password_key, registration_identifier, nickname, active });
  },

  toDatabase(survivor) {
    const { user_id, name, age, first_name, last_name, email, password, registration_key, reset_password_key, registration_identifier, nickname, active } = survivor;

    return { user_id, name, age, first_name, last_name, email, password, registration_key, reset_password_key, registration_identifier, nickname, active };
  }
};

module.exports = SequelizeUserMapper;
