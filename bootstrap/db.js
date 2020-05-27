const mongoose = require('mongoose');

module.exports = function (host = '127.0.0.1', port = '27017', collection = 'static_server') {
    const database = `mongodb://${process.env.DB_HOST || host}:${process.env.DB_PORT || port}/${process.env.DB_NAME || collection}`;
    mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log(`Connected to ${database}...`));
}