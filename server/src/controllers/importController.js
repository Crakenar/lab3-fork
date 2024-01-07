const DataImporter = require('./../db/models/Import');

exports.importData = async (req, res) => {

  const data = JSON.parse(req.file.buffer.toString()); 
  const columns = Object.keys(data[0]);
  const tableName = req.body.fileName;

  try {
    await DataImporter.createTable(tableName, columns);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating table');
  }

  try {
    await DataImporter.insertData(tableName, columns, data);
    res.status(200).send('Table created successfully and data inserted!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting values');
  }
};