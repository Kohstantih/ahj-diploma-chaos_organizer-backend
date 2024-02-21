const http = require('http');
const Koa = require('koa');
const path = require('path');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const WS = require('ws');
const { v4 } = require('uuid');

const router = require('./routes');
const messages = require('./db/messages');
const counters = require('./db/counters');

const app = new Koa();

app.use(cors('Access-Control-Allow-Origin', '*'));

const public = path.join(__dirname, '/public');
app.use(require('koa-static')(public));

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}));

app.use(router());

const server = http.createServer(app.callback());
const port = process.env.PORT || 7000;

const wsServer = new WS.Server({
    server
});

wsServer.on('connection', (ws) => {
    // ws.on('close', (e) => {
    //   console.log('ws close', e);
    // });

    // ws.on('error', console.error);

    // ws.on('open', function open() {
    //     ws.send('open ws from server');
    // });

    ws.on('message', (message) => {
      const parseMessage = JSON.parse(message);
      parseMessage.id = v4();
      messages.box.push(parseMessage);
      counters.increaseCount(parseMessage.type);
      const listCounters = counters.getFiltersList();

      Array.from(wsServer.clients)
        .filter(client => client.readyState === WS.OPEN)
        .forEach(client => client.send(JSON.stringify({
          listCounters,
          listMessages: [parseMessage],
        })));
    });

    const listCounters = counters.getFiltersList();
    const listMessages = messages.getMessagesList('all', 10);

      ws.send(JSON.stringify({
        listCounters,
        listMessages,
      }));
  });

server.listen(port, (err) => {
    if (err) {
      return console.log('Error occured:', err);
    }
    console.log(`server is listening on ${port}`);
  });
