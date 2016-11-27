# {{ name }}

> {{ description }}

## Build Setup

```
# install dependencies
npm install

# [development]
# start application in development (it's a good practice to use `nodemon`
# in development which will automatically reload the server on code changes
# e.g. `nodemon --exec npm start`)
npm start

# [production]
# build production bundles, switch environment to production and run the server
npm run build
npm config set {{ name }}:env production
npm start
```

## Tutorials

Vue.js tutorials: [Vue.js Cheatsheet](https://xpepermint.gitbooks.io/vue-js-cheatsheet/content/)
