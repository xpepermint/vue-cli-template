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
    this._config = config;

    this._app = null;
    this._server = null;
  }

  /*
  * Returns a promise which starts the server.
  */

  listen() {
    return new Promise((resolve) => {
      if (this._server) return this;

      let config = this._config;
      let isDev = config.env === 'development';
      let {port, host} = config.server;

      this._app = express();
      this._app.use((req, res, next) => {
        req.config = config;
        next();
      });
      this._app.use(vueHandler(config));
      this._app.use(router(config));

      this._server = this._app.listen(port, host, resolve);
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
