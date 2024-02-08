const Router = require('koa-router');
const messages = require('../../../db/messages');
const counters = require('../../../db/counters');

const router = new Router();

router.delete('/message/delete/:id', async (ctx) => {
    const { id } = ctx.params;
    
    const deletedEl = messages.getMessageById(id);
    
    counters.recalculation(deletedEl);
    
    messages.deleteMessage(id);

    const listCounters = counters.getFiltersList();

    ctx.response.body = {
        listCounters,
    }
    ctx.response.status = 200;
});

module.exports = router;
