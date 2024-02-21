const Router = require('koa-router');
const messages = require('../../../db/messages');

const router = new Router();

router.get('/message/search/:id', async (ctx) => {
    const { id } = ctx.params;
    
    const result = messages.getMessageById(id);
    console.log(result);
    ctx.response.body = result;
    ctx.response.status = 200;
});

module.exports = router;