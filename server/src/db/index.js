const pool = require('./../config/db');

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  connect: () => {
    return pool.connect()
      .then(client => {
        client.release();
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err.stack);
      });
  },
};