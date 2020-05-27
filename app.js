const express = require('express');
const app = express();

require('dotenv').config();
require('./bootstrap/config')();
require('./bootstrap/routes')(app);
require('./bootstrap/db')();

module.exports = app;