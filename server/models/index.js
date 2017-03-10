const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);

  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`); // eslint-disable-line
    process.exit(1);
  });

  require('./user'); // eslint-disable-line
};
