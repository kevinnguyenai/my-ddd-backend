const { Enforcer } = require('casbin');
const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');



const PermissionController = {
    get router() {
        const router = Router();

        router.use('/api/', inject('config'), this.enforcer);

        return router;
    },

    enforcer(req, res, next)  {


        const { config } = req


        try {
            //console.log(config._model);
            //console.log(config._policy);
            const _enforcer = new Enforcer(config._model, config._policy);
            const sub = 'admin'
            const obj = 'User'
            const act = 'create'
            console.log(_enforcer.getRolesForUser(sub)); 
            if(_enforcer) {
                if(_enforcer.enforce(sub, obj, act) == true) {
                    //res.status(Status.OK).json({"data": sub})
                    res.status(Status.OK).json({"result": "Success", "data": _enforcer.getRolesForUser(sub)})
                }
                else { 
                    res
                    .status(Status.FORBIDDEN)
                    .json({
                        "result": "fail",
                        "data": "Forbidden Access"
                    })
                }
            }
        } catch(error) {
            res
            .status(Status.EXPECTATION_FAILED)
            .json({
                "result": "fail",
                "data": error
            }) 
        }
        
    }
}

module.exports = PermissionController;