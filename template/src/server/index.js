const express = require('express');
const {vueServer} = require('./middlewares/vue');
const {
  appServer,
  bundlesServer,
  publicServer
} = require('./middlewares/app');

/*
* HTTP server class.
*/

class Server {

  /*
  * Class constructor.
  */

  constructor (config) {
    this.config = config;
    this.app = null;
    this.server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  listen () {
    return new Promise((resolve) => {
      if (this.server) return this;

      this.app = express();
      this.app.use('/', vueServer(this));
      this.app.use('/', publicServer(this));
      this.app.use('/', bundlesServer(this));
      this.app.use('/*', appServer(this));

      let {serverPort, serverHost} = this.config;
      this.server = this.app.listen(serverPort, serverHost, resolve);
    });
  }

  /*
  * Returns a promise which stops the server.
  */

  close () {
    return new Promise((resolve) => {
      if (!this.server) return this;

      this.server.close(resolve);
      this.server = null;
      this.app = null;
    });
  }

}

/*
* Module interface.
*/

module.exports = {
  Server
};
