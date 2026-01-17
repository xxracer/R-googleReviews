require('dotenv').config();
const { pool } = require('./backend/db');

(async () => {
    try {
        console.log('--- Inspecting page_content data ---');
        const res = await pool.query(`SELECT * FROM page_content LIMIT 5`);
        console.log('Rows found:', res.rows.length);
        console.log(JSON.stringify(res.rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting DB:', err);
        process.exit(1);
    }
})();
