const isDocker = process.env.DOCKER_ENV === 'true';

if (isDocker){
  require('dotenv').config();
  console.log('docker env');
} else {
  require('dotenv').config({ path: '../.env' });
  console.log('local env');
}

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: isDocker ? process.env.DB_PORT_DOCKER : process.env.DB_PORT_LOCAL,
});

module.exports = pool;