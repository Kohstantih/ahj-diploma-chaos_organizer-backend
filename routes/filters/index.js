const Router = require('koa-router');
const messages = require('../../db/messages');

const router = new Router();

router.get('/filters/:name', async (ctx) => {
    const { name } = ctx.params;
    console.log('name: ', name)
    const result = messages.getMessagesByFilter(name);

    ctx.response.body = result;
    ctx.response.status = 200;
});

module.exports = router;
