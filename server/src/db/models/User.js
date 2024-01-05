const pool = require('./../../config/db');

const bcrypt = require('bcryptjs');

class User {
  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  static async create(username, email, hashedPassword) {
    // verify that username and email are unique
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.rows.length > 0) {
      throw new Error('Username or email already exists');
    }
    try {
      const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Error creating user');
    }
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }
}

module.exports = User;