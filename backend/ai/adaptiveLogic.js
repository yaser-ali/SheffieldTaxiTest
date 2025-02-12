// backend/ai/adaptiveLogic.js
let difficultyLevel = "easy";

function adjustDifficulty(correctAnswers) {
  if (correctAnswers > 5) {
    difficultyLevel = "medium";
  } else if (correctAnswers > 10) {
    difficultyLevel = "hard";
  } else {
    difficultyLevel = "easy";
  }
}

function getNextQuestion(questions, userPerformance) {
  adjustDifficulty(userPerformance.correctAnswers);
  return questions.filter((q) => q.difficulty === difficultyLevel)[0];
}

module.exports = { getNextQuestion };
