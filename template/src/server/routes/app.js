const express = require('express');
const path = require('path');

/*
* Returns a middleware for serving precompiled files.
*/

exports.public = express.static('public');

/*
* Returns a middleware for serving precompiled files.
*/

exports.assets = express.static('dist/client');

/*
* Returns a middleware which renders the Vue.js application.
*/

exports.render = (req, res) => {
  let page = req.vue.renderToStream();

  let publicPath = req.config.publicPath;
  let cssBundlePath = path.join(publicPath, 'bundle.css');
  let jsBundlePath = path.join(publicPath, 'bundle.js');

  res.write(`<!DOCTYPE html>`);
  page.on('init', () => {
    res.write(`<html lang="en">`);
    res.write(`<head>`);
    res.write(  `<meta charset="utf-8">`);
    res.write(  `<title>Example</title>`);
    res.write(  `<link href="${cssBundlePath}" rel='stylesheet' type='text/css'>`);
    res.write(`</head>`);
    res.write(`<body>`);
  });
  page.on('data', (chunk) => {
    res.write(chunk);
  });
  page.on('end', () => {
    res.write(  `<script src="${jsBundlePath}"></script>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
  });
  page.on('error', function (error) {
    console.error(error);
    res.status(500).send('Server Error');
  });
};
