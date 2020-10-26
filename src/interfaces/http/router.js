const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const { partialRight } = require('ramda')
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const new_controller = require('./utils/new_createControllerRoutes');

module.exports = ({ config, containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware, auth }) => {
  const router = Router();

  /* istanbul ignore if */
  if(config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if(config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors({
      origin: [
        'https://localhost:4000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  const tokenRouter = Router();
  tokenRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors({
      origin: [
        'https://localhost:4000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  const permissionRouter = Router();
  permissionRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors({
      origin: [
        'https://localhost:4000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type']
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  /*
   * Add your API routes here 
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */
  //tokenRouter.use('/', new_controller('index'));

  tokenRouter.use('/token', new_controller('token').router);
  permissionRouter.use('/', controller('casbin/PermissionController'))
  apiRouter.use('/users', controller('user/UsersController'));
  apiRouter.use('/productions', controller('production/ProductionsController'));

  router.use('/', tokenRouter);
  router.use(auth.authenticate());
  router.use(permissionRouter);
  router.use('/v1/', apiRouter);
  
  router.use(partialRight(errorHandler, [loggerMiddleware, config]));

  return router;
};
