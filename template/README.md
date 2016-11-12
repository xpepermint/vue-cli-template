# {{ name }}

> {{ description }}

## Build Setup

```
# install dependencies
npm install

# build for production (creates bundles)
npm run build

# configure the environment (sets the production mode)
npm config set {{ name }}:env production

# start the server
npm start

# use nodemon in development (reloads application when code changes)
nodemon --exec npm start
```
