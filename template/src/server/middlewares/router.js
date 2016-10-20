const express = require('express');
const appRoutes = require('../routes/app');

exports.router = function (config) {
  const router = express.Router({
    mergeParams: true
  });

  router.use('/assets', appRoutes.assets);
  router.use('*', appRoutes.render);

  return router;
};
