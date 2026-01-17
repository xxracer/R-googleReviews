const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Add reasonable timeouts to fail fast if connection hangs
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

// The pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition encounters them
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // Don't exit process here, just log it. The pool should handle reconnection for new queries.
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
