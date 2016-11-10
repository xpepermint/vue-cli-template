const express = require('express');
const appRoutes = require('../routes/app');

exports.router = function (config) {
  const router = express.Router({
    mergeParams: true
  });

  router.use(appRoutes.public);
  router.use(appRoutes.assets);
  router.use(appRoutes.render);

  return router;
};
