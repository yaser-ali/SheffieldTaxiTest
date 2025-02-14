const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Static files for React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// Sample questions categorized by difficulty
const questions = {
  easy: [
    {
      id: 1,
      question: 'You pick up a passenger at Sheffield Train Station, and they request a drop-off at Meadowhall Shopping Centre. What is the most efficient route?',
      choices: ['A) Via A61 and M1', 'B) Via B6075', 'C) Via A57', 'D) Via Sheffield Parkway'],
      correct: 'A',
      mapLocation: { pickup: 'Sheffield Train Station', dropoff: 'Meadowhall Shopping Centre' }
    },
    {
      id: 2,
      question: 'Which of the following landmarks is closest to Bramall Lane Stadium?',
      choices: ['A) Sheffield City Hall', 'B) The Crucible Theatre', 'C) London Road', 'D) Weston Park'],
      correct: 'C',
      mapLocation: { landmark: 'Bramall Lane Stadium' }
    }
  ],
  medium: [
    {
      id: 3,
      question: 'Which of these roads is a one-way street in Sheffield?',
      choices: ['A) Division Street', 'B) Ecclesall Road', 'C) Abbeydale Road', 'D) Penistone Road'],
      correct: 'A',
      mapLocation: { landmark: 'Division Street, Sheffield' }
    }
  ],
  hard: [
    {
      id: 4,
      question: 'What is the maximum number of passengers a private hire vehicle can carry?',
      choices: ['A) 4', 'B) 6', 'C) 8', 'D) Depends on the vehicle license'],
      correct: 'D',
      mapLocation: { landmark: 'Sheffield City Centre' }
    }
  ]
};

// AI-Driven Logic to select a question based on score
function getQuestionBasedOnScore(score) {
  if (score < 2) {
    // Easy question if score is low
    return questions.easy[Math.floor(Math.random() * questions.easy.length)];
  } else if (score >= 2 && score < 4) {
    // Medium question for mid-level score
    return questions.medium[Math.floor(Math.random() * questions.medium.length)];
  } else {
    // Hard question for high score
    return questions.hard[Math.floor(Math.random() * questions.hard.length)];
  }
}

// API to get a question dynamically based on user's score
app.post('/api/get-question', (req, res) => {
  const { score } = req.body;
  
  // Validate that score is provided
  if (typeof score === 'undefined') {
    return res.status(400).json({ error: "Score is required" });
  }

  const selectedQuestion = getQuestionBasedOnScore(score);
  
  // Send the selected question as a response
  res.json(selectedQuestion);
});

// Serve React frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
