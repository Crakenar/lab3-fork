const pool = require('./../config/db');

exports.importData = async (req, res) => {
  console.log('importData is called');

  // Parse JSON file
  const data = JSON.parse(req.file.buffer.toString()); 

  // Extract column names
  const columns = Object.keys(data[0]);

  // Create table name
  const tableName = req.body.fileName;

  // Create SQL query
  const query = `CREATE TABLE ${tableName} (${columns.map((col) => `${col} text`).join(', ')});`;

  // Execute SQL query
  try {
    await pool.query(query);

    const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')})`;

    for (const row of data) {
      const values = Object.values(row);
      await pool.query(insertQuery, values);
    }

    res.status(200).send('Table created successfully and data inserted!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating table');
  }

};