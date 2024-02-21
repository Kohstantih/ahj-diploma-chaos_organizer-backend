const Router = require('koa-router');
const searcher = require('../../db/search');

const router = new Router();

router.get('/search/:value', async (ctx) => {
    const { value } = ctx.params;

    const result = searcher.startSearch(value);
    
    ctx.response.body = result;
    ctx.response.status = 200;
});

module.exports = router;
