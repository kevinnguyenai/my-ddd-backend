const { attributes } = require('structure');

const User = attributes({
  id: Number,
  user_id: String,
  name: {
    type: String,
    required: true
  },
  age: Number,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  registration_key: String,
  reset_password_key: String,
  registration_identifier: String,
  nickname: String,
  image: String,
  active: Boolean
})(class User {
  isLegal() {
    return this.age >= User.MIN_LEGAL_AGE;
  }
});

User.MIN_LEGAL_AGE = 18;

module.exports = User;
