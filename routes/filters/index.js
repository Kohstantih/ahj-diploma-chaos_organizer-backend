const Router = require('koa-router');
const messages = require('../../db/messages');

const router = new Router();

router.get('/filters/:filter/:count/:lastId', async (ctx) => {
    const { filter, count, lastId } = ctx.params;
    
    const result = messages.getMessagesList(filter, count, lastId);

    ctx.response.body = result;
    ctx.response.status = 200;
});

module.exports = router;
