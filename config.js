require('dotenv').config();

module.exports = {
    port: process.env.PORT || 1000,
    socketURI: process.env.SOCKET_URI
}