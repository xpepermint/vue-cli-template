const express = require('express');
const {vueHandler} = require('./middlewares/vue');
const {router} = require('./middlewares/router');

/*
* HTTP server class.
*/

exports.Server = class {

  /*
  * Class constructor.
  */

  constructor(config) {
    this._config = Object.assign(config);

    this._app = null;
    this._server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  listen() {
    return new Promise((resolve) => {
      if (this._server) return this;

      this._app = express();
      this._app.use((req, res, next) => {
        req.config = this._config;
        next();
      });
      this._app.use(vueHandler(this._config));
      this._app.use(router(this._config));

      let {serverPort, serverHost} = this._config;
      this._server = this._app.listen(serverPort, serverHost, resolve);
    });
  }

  /*
  * Returns a promise which stops the server.
  */

  close() {
    return new Promise((resolve) => {
      if (!this._server) return this;

      this._server.close(resolve);

      this._server = null;
      this._app = null;
    });
  }

}
