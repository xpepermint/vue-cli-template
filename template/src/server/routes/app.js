const express = require('express');

/*
* Returns a middleware for serving precompiled files.
*/

exports.assets = express.static('dist/client');

/*
* Returns a middleware which renders the Vue.js application.
*/

exports.render = (req, res) => {
  let publicPath = req.config.client.publicPath;
  let page = req.vue.renderToStream();

  res.write(`<!DOCTYPE html>`);

  page.on('init', () => {
    res.write(`<html lang="en">`);
    res.write(`<head>`);
    res.write(  `<meta charset="utf-8">`);
    res.write(  `<title>Example</title>`);
    res.write(  `<link href="${publicPath}assets/bundle.css" rel='stylesheet' type='text/css'>`);
    res.write(`</head>`);
    res.write(`<body>`);
  });

  page.on('data', (chunk) => {
    res.write(chunk);
  });

  page.on('end', () => {
    res.write(  `<script src="${publicPath}assets/bundle.js"></script>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  });

  page.on('error', function (error) {
    console.error(error);
    res.status(500).send('Server Error');
  });
};
