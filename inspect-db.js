require('dotenv').config();
const { pool } = require('./backend/db');

(async () => {
    try {
        console.log('--- Inspecting page_content table ---');

        // Check columns
        const res = await pool.query(`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns 
      WHERE table_name = 'page_content'
      ORDER BY ordinal_position;
    `);

        console.log('Columns found:', res.rows.length);
        console.log(JSON.stringify(res.rows, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Error inspecting DB:', err);
        process.exit(1);
    }
})();
