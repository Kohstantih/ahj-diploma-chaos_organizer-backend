const Router = require('koa-router');
const messages = require('../../db/messages');
const counters = require('../../db/counters');

const router = new Router();

router.put('/favorites', async (ctx) => {
    const id = ctx.request.body;

    const status = messages.toggleFavoritesStatus(id);
    
    counters.changeFavoritesCount(status);

    const favoritesCount = counters.box.favorites;

    ctx.response.body = {
        favoritesCount, 
    }
    ctx.response.status = 200;
});

module.exports = router;
