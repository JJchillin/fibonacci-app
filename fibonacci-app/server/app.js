const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Create a new SQLite database and table for Fibonacci numbers
const db = new sqlite3.Database('fibonacci.db');
db.run('CREATE TABLE IF NOT EXISTS fibonacci (n INTEGER PRIMARY KEY, numbers TEXT)');

// Function to compute the first n Fibonacci numbers
function computeFibonacci(n) {
  if (n == 1) {
    return [0]
  }
  else if (n == 2) {
    return [0,1]
  }
  const fibonacciSequence = [0, 1];
  for (let i = 2; i < n; i++) {
    fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
  }
  return fibonacciSequence;
}

// API endpoint to get the first n Fibonacci numbers
app.get('/api/fibonacci/:n', (req, res) => {
  const n = parseInt(req.params.n, 10);
  if (isNaN(n) || n <= 0) {
    return res.status(400).json({ error: 'Invalid input. n must be a positive integer.' });
  }

  // Check if the Fibonacci numbers are already in the database
  db.get('SELECT numbers FROM fibonacci WHERE n = ?', n, (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (row) {
      // Return the cached Fibonacci numbers from the database
      const numbers = JSON.parse(row.numbers);
      return res.json({ fibonacciNumbers: numbers });
    }

    // Compute the Fibonacci numbers and store them in the database
    const fibonacciNumbers = computeFibonacci(n);
    const numbersJson = JSON.stringify(fibonacciNumbers);
    db.run('INSERT INTO fibonacci (n, numbers) VALUES (?, ?)', [n, numbersJson], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json({ fibonacciNumbers });
    });
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});