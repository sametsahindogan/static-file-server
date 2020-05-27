const express = require('express');
const fileUpload = require('express-fileupload');
const bearerToken = require('express-bearer-token');
const filesRoutes = require('../routes/files');
const tokenRoutes = require('../routes/token');

module.exports = function (app) {
    app.use(fileUpload({
        createParentPath: true,
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }));
    app.use(bearerToken({
        bodyKey: 'token',
        queryKey: 'token',
        headerKey: 'Bearer',
        reqKey: 'token',
        cookie: false,
    }));
    app.use(express.json());
    app.use('/files', filesRoutes);
    app.use('/token', tokenRoutes);
}