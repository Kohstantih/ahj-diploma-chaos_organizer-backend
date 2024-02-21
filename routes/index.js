const combineRouters = require('koa-combine-routers');

const filters = require('./filters');
const favorites = require('./favorites');
const deleteMessage = require('./message/delete');
const pinned = require('./pinned');
const bot = require('./bot');
const files = require('./files');
const search = require('./search');
const messageSearch = require('./message/search');

const router = combineRouters(
    filters,
    favorites,
    deleteMessage,
    pinned,
    bot,
    files,
    search,
    messageSearch,
  );
  
  module.exports = router;
  