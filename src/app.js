
const app = require('./index');
const http = require('http');
const {port} = require('./config');
const sockets = require('./sockets');
const { Server } = require('socket.io');

const servidor = http.createServer(app);
const httpserver = servidor.listen(port || 5000);
console.log('listening on port ' + port)

const io = new Server(httpserver, {
    cors: {
      origin: '*',
    },
    connectionStateRecovery: {
      connectionTimeout: 5000
    }
  });
sockets(io);