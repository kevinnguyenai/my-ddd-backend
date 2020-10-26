const UserSerializer = {
  serialize({ id, user_id, name, age, first_name, last_name, email, password, nickname, image, active }) {
    return {
      id,
      //user_id,
      name,
      age,
      first_name,
      last_name,
      email,  
      //password,
      nickname,
      image,
      active
    };
  }
};

module.exports = UserSerializer;
