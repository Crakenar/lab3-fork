const pool = require('./../../config/db');

class DataImporter {
  static async createTable(tableName, columns) {
    try {
      const createTableQuery = `CREATE TABLE ${tableName} (${columns.map((col) => `${col} text`).join(', ')});`;
      await pool.query(createTableQuery);
    } catch (err) {
      console.error(err);
      throw new Error('Error creating table');
    }
  }

  static async insertData(tableName, columns, data) {
    try {
      const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')})`;

      for (const row of data) {
        const values = Object.values(row);
        await pool.query(insertQuery, values);
      }
    } catch (err) {
      console.error(err);
      throw new Error('Error inserting values');
    }
  }
}

module.exports = DataImporter;