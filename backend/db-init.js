
const { query } = require('./db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const migrateInstructorsData = async () => {
  try {
    // Check if data already exists to avoid overwriting user edits
    const { rows } = await query('SELECT COUNT(*) FROM instructors');
    if (parseInt(rows[0].count, 10) > 0) {
      console.log('Instructors table already has data. Skipping migration to preserve edits.');
      return;
    }

    // Only clear and reseed if truly needed (or if force flag is implemented later)
    // await query('TRUNCATE TABLE instructors RESTART IDENTITY'); // Removed to be safe, logic above handles it.
    console.log('Seeding initial instructors data...');

    const filePath = path.join(__dirname, 'instructors.json');
    console.log(`Checking for instructors data at: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      console.warn('⚠️  instructors.json not found. Skipping migration.');
      return;
    }
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const instructors = JSON.parse(jsonData);
    console.log(`Found ${instructors.length} instructors to migrate.`);

    for (const instructor of instructors) {
      const { id, name, bio, image } = instructor;
      // Ensure bio is an array, if it's already a string, wrap it.
      const bioArray = Array.isArray(bio) ? bio : [bio];

      const bioHtml = bioArray.map(paragraph => {
        const p = paragraph.trim();
        if (p.startsWith('#')) {
          return `<h3>${p.substring(1).trim()}</h3>`;
        } else if (p.startsWith('*')) {
          return `<p><strong>${p.substring(1).trim()}</strong></p>`;
        } else {
          return `<p>${p}</p>`;
        }
      }).join('');

      console.log(`Migrating Instructor ${id}: ${name} -> HTML length ${bioHtml.length}`);

      await query(
        'INSERT INTO instructors (name, bio, image, original_id) VALUES ($1, $2, $3, $4)',
        [name, bioHtml, image, id]
      );
    }
    console.log('Successfully MIGRATED instructors data from JSON to HTML in DB.');
  } catch (err) {
    console.error('Error migrating instructors data:', err);
  }
};

const createInstructorsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS instructors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      bio TEXT NOT NULL,
      image VARCHAR(255),
      original_id VARCHAR(50)
    );
  `;
  try {
    await query(createTableQuery);
    console.log('Table "instructors" created or already exists.');
    await migrateInstructorsData();
  } catch (err) {
    console.error('Error creating instructors table:', err);
  }
};

const createPageContentTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS page_content (
      id SERIAL PRIMARY KEY,
      section_id VARCHAR(255) UNIQUE NOT NULL,
      content_type VARCHAR(50) NOT NULL,
      content_value TEXT
    );
  `;
  try {
    await query(createTableQuery);
    console.log('Table "page_content" created or already exists.');
  } catch (err) {
    console.error('Error creating page_content table:', err);
  }
};

const createUsersTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        security_question TEXT,
        security_answer_hash TEXT
      );
    `;
  try {
    await query(createTableQuery);
    console.log('Table "users" created or already exists.');

    const { rows } = await query('SELECT COUNT(*) FROM users');
    if (parseInt(rows[0].count, 10) === 0) {
      const username = 'moon';
      const password = 'reingrules';
      const securityQuestion = 'bjj';
      const securityAnswer = 'bjj';

      const passwordHash = await bcrypt.hash(password, 10);
      const securityAnswerHash = await bcrypt.hash(securityAnswer, 10);

      await query(
        'INSERT INTO users (username, password_hash, security_question, security_answer_hash) VALUES ($1, $2, $3, $4)',
        [username, passwordHash, securityQuestion, securityAnswerHash]
      );
      console.log('Initial user "moon" migrated to database.');
    }
  } catch (err) {
    console.error('Error creating users table:', err);
  }
};

const createImageLibraryTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS image_library (
      id SERIAL PRIMARY KEY,
      image_url TEXT NOT NULL UNIQUE
    );
  `;
  try {
    await query(createTableQuery);
    console.log('Table "image_library" created or already exists.');

    // Seed the library with one initial image if it's empty
    const { rows } = await query('SELECT COUNT(*) FROM image_library');
    if (parseInt(rows[0].count, 10) === 0) {
      const sampleImageUrl = 'https://i.imgur.com/8nLFCVP.png'; // An existing instructor image
      await query('INSERT INTO image_library (image_url) VALUES ($1)', [sampleImageUrl]);
      console.log('Image library seeded with initial image.');
    }
  } catch (err) {
    console.error('Error creating or seeding image_library table:', err);
  }
};

const initializeDatabase = async () => {
  await createInstructorsTable();
  await createPageContentTable();
  await createUsersTable();
  await createImageLibraryTable();
};

module.exports = { initializeDatabase };
