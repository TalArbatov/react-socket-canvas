const http = require('http');
const app = require('./app')
const {port} = require('../config')
const socketIO = require('socket.io');

const server = http.createServer(app)

const socketClient = socketIO(server).sockets;

socketClient.on('connection', socket => {
    socket.on('draw', message => {
        socketClient.emit('draw_from_server', message)
    })
})


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});