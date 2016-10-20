const {Server} = require('..');
const config = require('../config');

const app = new Server(config);
app.listen().then(() => {
  console.log(`Listening on ${config.server.host}:${config.server.port}`);
}).catch((error) => {
  app.close();
  console.log('Error', error);
});
