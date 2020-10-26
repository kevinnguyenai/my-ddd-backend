const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { Enforcer } = require('casbin');



class Server {
  constructor({ config, router, logger, auth }) {
    this.config = config;
    this.logger = logger;
    this.https = https;
    this.fs = fs;
    this.enforcer = new Enforcer(config.casbinModel, config.casbinPolicy);
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.use(auth.initialize());
    this.express.use(router);
     
  }
  start() {
    return new Promise((resolve) => {
      const options = {
        key: this.fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
        cert: this.fs.readFileSync(path.join(__dirname,'./ssl/cert.pem'))
      }
      const http = this.https.createServer(options, this.express).listen(this.config.web.port, ()=> {
        const { port } = http.address();
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
  /*
  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.web.port, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
  */
}

module.exports = Server;
