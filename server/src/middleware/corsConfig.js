const cors = require('cors');

const allowedOrigins = ['http://localhost:5173', 'https://example2.com', 'https://example3.com'];

const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    origin: allowedOrigins.includes(req.header('Origin')),
    methods: 'GET,POST,PUT', // Specify allowed methods here
    credentials: true,
    optionsSuccessStatus: 204
  };
  callback(null, corsOptions); // callback expects two parameters: error and corsOptions
};

module.exports = cors(corsOptionsDelegate);