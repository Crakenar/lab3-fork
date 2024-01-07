const pool = require('./../../config/db');

class DataExporter {
  static async getTables() {
    try {
      const result = await pool.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error('Error getting tables');
    }
  }

  static async getTableData(tableName, limit = 100) {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName} LIMIT $1`, [limit]);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error('Error getting table data');
    }
  }

  static async deleteTable(tableName) {
    try {
      await pool.query(`DROP TABLE ${tableName}`);
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting table');
    }
  }
}

module.exports = DataExporter;