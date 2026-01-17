
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const session = require('express-session');
const PGStore = require('connect-pg-simple')(session);
const { pool } = require('./db');

const app = express();

// --- Database Initialization ---
const { initializeDatabase } = require('./db-init');
const db = require('./db');
const multer = require('multer');
const { put } = require('@vercel/blob');

const upload = multer({ storage: multer.memoryStorage() });

// Database initialization is now handled in startServer() at the bottom of the file

// --- Session Middleware ---
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set. Please set it in your .env file.');
}
app.use(session({
  store: new PGStore({
    pool: pool,
    tableName: 'user_sessions'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// --- CORS Configuration ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());

// --- Authentication Middleware ---
const requireAuth = (req, res, next) => {
  // If DISABLE_AUTH=1 in environment, bypass auth checks (convenience for local dev)
  if (process.env.DISABLE_AUTH === '1') {
    return next();
  }

  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// --- API Routes ---

// Auth Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      req.session.userId = user.id;
      res.json({ success: true, message: 'Logged in successfully.' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid'); // The default session cookie name
    res.json({ success: true, message: 'Logged out successfully.' });
  });
});

app.get('/api/check-auth', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.post('/api/reset-password-request', async (req, res) => {
  const { username, securityAnswer } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(securityAnswer, user.security_answer_hash);
    if (match) {
      // In a real app, generate a unique, single-use token
      req.session.resetToken = `${user.id}-${Date.now()}`;
      res.json({ success: true, resetToken: req.session.resetToken });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect security answer.' });
    }
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/reset-password-confirm', async (req, res) => {
  const { username, newPassword, resetToken } = req.body;

  // Basic validation
  if (req.session.resetToken !== resetToken) {
    return res.status(401).json({ success: false, message: 'Invalid or expired reset token.' });
  }

  try {
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE username = $2', [newPasswordHash, username]);

    // Invalidate the token after use
    delete req.session.resetToken;

    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Password reset confirmation error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Instructors API (Read is public, Write is protected)
app.get('/api/instructors', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM instructors ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching instructors from DB:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ success: false, message: 'Failed to fetch instructors.' });
  }
});

app.post('/api/instructors', requireAuth, async (req, res) => {
  const { name, bio, image } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO instructors (name, bio, image) VALUES ($1, $2, $3) RETURNING *',
      [name, bio, image]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating instructor in DB:', err);
    res.status(500).json({ success: false, message: 'Failed to create instructor.' });
  }
});

app.put('/api/instructors/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, bio, image } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE instructors SET name = $1, bio = $2, image = $3 WHERE id = $4 RETURNING *',
      [name, bio, image, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Instructor not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating instructor in DB:', err);
    res.status(500).json({ success: false, message: 'Failed to update instructor.' });
  }
});

app.delete('/api/instructors/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM instructors WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Instructor not found.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting instructor from DB:', err);
    res.status(500).json({ success: false, message: 'Failed to delete instructor.' });
  }
});

// Image Library API (Read is public)
app.get('/api/images', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM image_library ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching images from DB:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.status(500).json({ success: false, message: 'Failed to fetch images.' });
  }
});

// Generic Image Upload API (Protected)
app.post('/api/upload', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided.' });
  }
  try {
    const blob = await put(req.file.originalname, req.file.buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true,
    });

    // Save the image URL to the library
    try {
      await db.query('INSERT INTO image_library (image_url) VALUES ($1) ON CONFLICT (image_url) DO NOTHING', [blob.url]);
    } catch (dbErr) {
      console.error('Error saving image to library:', dbErr);
      // Non-critical error, so we don't send a failure response to the client
    }

    res.status(200).json({ success: true, url: blob.url });
  } catch (err) {
    console.error('Error uploading image to Vercel Blob:', err);
    res.status(500).json({ success: false, message: 'Failed to upload image.' });
  }
});

// Page Content API (Read is public, Write is protected)
app.get('/api/content/:section_id', async (req, res) => {
  const { section_id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM page_content WHERE section_id = $1', [section_id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Content not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error fetching content for section ${section_id}:`, {
      message: err.message,
      code: err.code,
      stack: err.stack,
      detail: err.detail // Postgres specific details often exist here
    });
    res.status(500).json({ success: false, message: 'Failed to fetch content.' });
  }
});

app.put('/api/content/:section_id', requireAuth, async (req, res) => {
  const { section_id } = req.params;
  const { content_type, content_value } = req.body;

  if (!content_type || content_value === undefined) {
    return res.status(400).json({ success: false, message: 'content_type and content_value are required.' });
  }

  try {
    const { rows } = await db.query(
      `INSERT INTO page_content (section_id, content_type, content_value)
         VALUES ($1, $2, $3)
         ON CONFLICT (section_id)
         DO UPDATE SET content_type = $2, content_value = $3
         RETURNING *`,
      [section_id, content_type, content_value]
    );
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(`Error upserting content for section ${section_id}:`, {
      message: err.message,
      code: err.code,
      stack: err.stack,
      detail: err.detail
    });
    res.status(500).json({ success: false, message: 'Failed to save content.' });
  }
});

// Webhook Contact Form API
app.post('/api/send-message', async (req, res) => {
  const { name, email, message } = req.body;
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Webhook URL is not configured in environment variables.');
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  try {
    await axios.post(webhookUrl, { name, email, message });
    console.log('Contact form data sent to webhook successfully.');
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending data to webhook:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Google Reviews API
app.get('/api/google-reviews', async (req, res) => {
  const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    console.log('Google Places API credentials not found.');
    return res.status(500).json({ success: false, message: 'API credentials not configured.' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    const place = response.data.result;

    if (place && place.reviews) {
      const fiveStarReviews = place.reviews.filter(review => review.rating === 5);
      res.json({ success: true, reviews: fiveStarReviews });
    } else {
      res.json({ success: true, reviews: [] });
    }
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
});


const IS_VERCEL = process.env.VERCEL === '1';

const startServer = async () => {
  try {
    // 1. Initialize Database
    console.log('Initializing database...');
    await initializeDatabase();
    console.log('Database initialized successfully.');

    // 2. Check Environment Variables
    const requiredEnv = [
      'DATABASE_URL',
      'SESSION_SECRET',
      'BLOB_READ_WRITE_TOKEN',
      'GOOGLE_PLACES_API_KEY',
      'GOOGLE_PLACE_ID'
    ];
    const missingEnv = requiredEnv.filter(key => !process.env[key]);

    console.log('--- ENV DEBUG ---');
    requiredEnv.forEach(key => {
      const val = process.env[key];
      if (val) {
        console.log(`✅ ${key}: LOADED (${val.substring(0, 5)}...)`);
      } else {
        console.error(`❌ ${key}: NOT FOUND`);
      }
    });
    console.log('-----------------');

    if (missingEnv.length > 0) {
      console.warn(`⚠️  WARNING: Missing environment variables: ${missingEnv.join(', ')}`);
    } else {
      console.log('✅ All key environment variables are present.');
    }

    // 3. Start Server (if not Vercel)
    if (!IS_VERCEL) {
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Server is running for local development on http://localhost:${PORT}`);
      });
    }
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
