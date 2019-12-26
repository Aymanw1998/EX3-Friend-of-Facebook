/* Mongoose connection using events */
const mongoose = require('mongoose');
const { DB_USER, DB_PASS, DB_HOST } = require('./constants');

const connection = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true // To remove annoying warning
};

mongoose.connect(connection, options)
        .then(db=>console.log(`Connection Success and ${db.connection.name}`))
        .catch(err => console.log(`Connection Error: ${err}`));