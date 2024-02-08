const combineRouters = require('koa-combine-routers');

const filters = require('./filters');
const favorites = require('./favorites');
const deleteMessage = require('./message/delete');
const pinned = require('./pinned');

const router = combineRouters(
    filters,
    favorites,
    deleteMessage,
    pinned,
  );
  
  module.exports = router;
  