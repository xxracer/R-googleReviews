const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render') ? { rejectUnauthorized: false } : false
});

const reseed = async () => {
    try {
        console.log("🔌 Connecting to Database...");

        // 1. Force Clean Instructors Table
        console.log("🗑️  Truncating Instructors table...");
        await pool.query('TRUNCATE TABLE instructors RESTART IDENTITY CASCADE');

        // 2. Read JSON
        const jsonPath = path.join(__dirname, 'backend', 'instructors.json');
        console.log(`📂 Reading JSON from ${jsonPath}`);
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const instructors = JSON.parse(rawData);

        // 3. Insert with Proper Parsing
        console.log(`📝 Parsing and Inserting ${instructors.length} instructors...`);

        for (const inst of instructors) {
            const { id, name, bio, image } = inst;

            // Parse markdown-like symbols to HTML
            const bioArray = Array.isArray(bio) ? bio : [bio];
            const bioHtml = bioArray.map(line => {
                let p = line.trim();
                if (p.startsWith('#')) {
                    // Check if it's the name (Redundancy check)
                    // If the line is EXACTLY the name with a #, maybe skipp it? 
                    // User said "Maintain json order/look", so we keep it as <H3> for now.
                    return `<h3>${p.substring(1).trim()}</h3>`;
                } else if (p.startsWith('*')) {
                    return `<p><strong>${p.substring(1).trim()}</strong></p>`;
                } else {
                    return `<p>${p}</p>`;
                }
            }).join('');

            await pool.query(
                'INSERT INTO instructors (name, bio, image, original_id) VALUES ($1, $2, $3, $4)',
                [name, bioHtml, image, id]
            );
            console.log(`   - Imported: ${name}`);
        }

        console.log("✅ SUCCESS: Instructors table re-seeded with formatted HTML.");
        process.exit(0);

    } catch (err) {
        console.error("❌ ERROR Reseeding:", err);
        process.exit(1);
    }
};

reseed();
