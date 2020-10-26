const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
  GetOneUser,
  Authentication
} = require('./app/user');
const {
  //CreateProduction,
  GetAllProductions
  //GetProduction,
  //UpdateProduction,
  //DeleteProduction
} = require('./app/production');
const {
  post,
  // get,
  // put,
  // del
} = require('./app/token');

const UserSerializer = require('./interfaces/http/user/UserSerializer');
const ProductionSerializer = require('./interfaces/http/production/ProductionSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');
const auth = require('./interfaces/http/auth');
const jwt = require('./infra/jwt');
const response = require('./infra/support/response')
const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeProductionsRepository = require('./infra/production/SequelizeProductionsRepository');
const { database, User: UserModel, Production: ProductionModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    auth: asFunction(auth).singleton(),
    jwt: asFunction(jwt).singleton(),
    response: asFunction(response).singleton(),
  })
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
    
  });


// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton(),
  productionsRepository: asClass(SequelizeProductionsRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel),
  ProductionModel: asValue(ProductionModel)
});

// Operations
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser),
  getOneUser: asClass(GetOneUser),
  authentication: asClass(Authentication),
  getAllProductions: asClass(GetAllProductions),
  post: asFunction(post)
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  productionSerializer: asValue(ProductionSerializer)
});

module.exports = container;
