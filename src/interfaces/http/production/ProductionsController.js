const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

// Define ProducitonController objects
const ProductionsController = {
  get router() {
    const router = Router();

    router.use(inject('productionSerializer'));

    router.get('/', inject('getAllProductions'), this.index);
    router.get('/:id', inject('getProduction'), this.show);
    router.post('/', inject('createProduction'), this.create);
    router.put('/:id', inject('updateProduction'), this.update);
    router.delete('/:id', inject('deleteProduction'), this.delete);

    return router;
  },
  index(req, res, next) {
    const { getAllProductions, productionSerializer } = req;
    const { SUCCESS, ERROR } = getAllProductions.outputs;

    getAllProductions
      .on(SUCCESS, (production) => {
        res
          .status(Status.OK)
          .json(production.map(productionSerializer.serialize));
      })
      .on(ERROR, next);

    getAllProductions.execute();
  },
  show(req, res, next) {

  },
  create(req, res, next) {

  },
  update(req, res, next) {

  },
  delete(req, res, next) {

  },
}
module.exports = ProductionsController;