const {VueBuilder} = require('vue-builder');
const settings = require('../config/settings');
const webpack = require('../config/webpack');

let options = webpack(
  process.argv[2],
  Object.assign({}, settings, {env: 'production'})
);
new VueBuilder(options).build().catch(console.log);
