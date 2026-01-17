require('dotenv').config();
const { pool } = require('./backend/db');

(async () => {
    try {
        console.log('--- Fixing Schema Mismatch ---');
        console.log('Renaming incompatible "page_content" table to "page_content_backup"...');

        await pool.query(`
      ALTER TABLE page_content 
      RENAME TO page_content_backup_${Date.now()};
    `);

        console.log('Success! Old table renamed.');
        console.log('Please restart your server ("npm run dev") to generate the new table.');
        process.exit(0);
    } catch (err) {
        if (err.code === '42P01') {
            console.log('Table "page_content" does not exist. It might have been already renamed.');
        } else {
            console.error('Error renaming table:', err);
            process.exit(1);
        }
        process.exit(0);
    }
})();
