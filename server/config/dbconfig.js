const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongoose connected successfully');
});

connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

module.exports = mongoose;