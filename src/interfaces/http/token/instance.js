
const container = require('src/container'); // we have to get the DI
const { post } = require('src/app/token');

module.exports = () => {
  const { 
    usersRepository,
    config,
    jwt } = container.cradle

  const postUseCase = post({
    usersRepository,
    config,
    webToken: jwt
  });
/*
  const getUseCase = get({
    usersRepository,
    webToken: jwt
  });

  const putUseCase = put({
    usersRepository,
    webToken: jwt
  });

  const deleteUseCase = del({
    usersRepository,
    webToken: jwt
  });
*/
  return {
    postUseCase,
    // getUseCase,
    // putUseCase,
    // deleteUseCase
  }
}
