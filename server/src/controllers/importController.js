const fs = require('fs');
const xml2js = require('xml2js');

exports.importData = async (req, res) => {
  console.log('importData is called');
  /* const parser = new xml2js.Parser();
  fs.readFile(__dirname + '/data.xml', async (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    parser.parseString(data, async (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const insertText = 'INSERT INTO table_name(column1, column2) VALUES($1, $2)';
        for (let item of result.root.record) {
          const insertValues = [item.field1[0], item.field2[0]];
          await client.query(insertText, insertValues);
        }
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
      res.status(200).send('Data imported successfully');
    });
  }); */
};