const Router = require('koa-router');
const bot = require('../../db/bot')

const router = new Router();

router.get('/bot/:code', async (ctx) => {
    const { code } = ctx.params;
    
    const result = bot.getInform(code);

    ctx.response.body = { code: code, inform: result };
    ctx.response.status = 200;
});

module.exports = router;
