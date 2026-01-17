const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Path to the bundled, read-only JSON file
const BUNDLED_DB_PATH = path.resolve(process.cwd(), 'backend/instructors.json');
// Path to the writable temporary file in the serverless environment
const TMP_DB_PATH = '/tmp/instructors.json';

// Initialize the database in the /tmp directory if it doesn't exist
if (!fs.existsSync(TMP_DB_PATH)) {
  const initialData = fs.readFileSync(BUNDLED_DB_PATH, 'utf8');
  fs.writeFileSync(TMP_DB_PATH, initialData, 'utf8');
}

// Helper function to read the database from the writable location
const readDB = () => {
  const data = fs.readFileSync(TMP_DB_PATH, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the database in the writable location
const writeDB = (data) => {
  fs.writeFileSync(TMP_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};

// --- API Routes ---
router.get('/instructors', (req, res) => {
  const instructors = readDB();
  res.json(instructors);
});

router.post('/instructors', (req, res) => {
  const instructors = readDB();
  const newInstructor = { id: Date.now().toString(), ...req.body };
  instructors.push(newInstructor);
  writeDB(instructors);
  res.status(201).json(newInstructor);
});

router.put('/instructors/:id', (req, res) => {
  let instructors = readDB();
  const { id } = req.params;
  const instructorIndex = instructors.findIndex(i => i.id === id);

  if (instructorIndex === -1) {
    return res.status(404).send('Instructor not found');
  }

  const updatedInstructor = { ...instructors[instructorIndex], ...req.body };
  instructors[instructorIndex] = updatedInstructor;
  writeDB(instructors);
  res.json(updatedInstructor);
});

router.delete('/instructors/:id', (req, res) => {
  let instructors = readDB();
  const { id } = req.params;
  const newInstructors = instructors.filter(i => i.id !== id);

  if (instructors.length === newInstructors.length) {
    return res.status(404).send('Instructor not found');
  }

  writeDB(newInstructors);
  res.status(204).send();
});

app.use(cors());
app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);