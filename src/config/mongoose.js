const mongoose = require('mongoose');
const { mongoUri } = require('./config');

mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.log('Error', err)
    process.exit(-1);
});

mongoose.set('debug', true);

exports.connect = () => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // console.log(mongoose.connection)
    return mongoose.connection;
};
