const express = require('express');

const app = express();

const publicPath = require('path').join(__dirname, '..', 'client' , 'public');

app.use(express.static(publicPath))
//middleware

module.exports = app;
