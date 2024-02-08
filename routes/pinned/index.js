const Router = require('koa-router');
const messages = require('../../db/messages');

const router = new Router();

router.put('/pinned', async (ctx) => {
    const id = ctx.request.body;

    const pinnedMessage = messages.changePinnedStatus(id);

    ctx.response.body = {
        pinnedMessage,
    }
    ctx.response.status = 200;
});

router.get('/pinned', async (ctx) => {
    const pinnedMessage = messages.getPinnedMessage();

    ctx.response.body = {
        pinnedMessage,
    };
    ctx.response.status = 200;
});

router.delete('/pinned', async (ctx) => {
    messages.deletePinnedStatus();

    ctx.response.status = 200;
});

module.exports = router;
