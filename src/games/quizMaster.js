// ============================================================
// quizMaster.js — Quiz Master trivia game
// Answer multiple-choice questions and earn points for each
// correct answer. Questions are shuffled each playthrough.
// ============================================================

import { showGameTitle, showMessage, showSuccess, showError } from '../utils/display.js';
import { askChoice } from '../utils/input.js';
import { shuffleArray } from '../utils/random.js';
import questions from '../data/questions.js';

/** Number of questions per quiz round */
const QUESTIONS_PER_ROUND = 10;

/** Points awarded for each correct answer */
const POINTS_PER_CORRECT = 10;

/**
 * Plays a round of Quiz Master.
 * @param {object} stats - The player's stats object (modified in-place).
 * @returns {object} The updated stats object.
 */
async function playQuizMaster(stats) {
  // --- Show game title ---
  showGameTitle('🧠 Quiz Master');
  showMessage('Test your knowledge across various topics!\n');

  // --- Prepare questions ---
  // Shuffle a copy of the questions array so order is random each time
  const shuffled = shuffleArray([...questions]);
  // Pick up to QUESTIONS_PER_ROUND questions (or all if fewer available)
  const roundQuestions = shuffled.slice(0, Math.min(QUESTIONS_PER_ROUND, shuffled.length));
  const totalQuestions = roundQuestions.length;

  showMessage(`📋 ${totalQuestions} questions coming up. Good luck!\n`);

  // --- Quiz loop ---
  let correctCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const q = roundQuestions[i];

    // Display question number and text
    showMessage(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    showMessage(`Question ${i + 1}/${totalQuestions}: ${q.question}`);
    showMessage('');

    // Display the four options
    for (const option of q.options) {
      showMessage(`  ${option}`);
    }
    showMessage('');

    // Ask for the player's answer
    const answer = await askChoice('Your answer (a/b/c/d)', ['a', 'b', 'c', 'd']);

    // Check if correct
    if (answer === q.answer) {
      correctCount++;
      showSuccess('  ✅ Correct!');
    } else {
      // Find the full text of the correct option
      const correctIndex = q.answer.charCodeAt(0) - 'a'.charCodeAt(0);
      const correctText = q.options[correctIndex];
      showError(`  ❌ Wrong! The correct answer was: ${correctText}`);
    }

    showMessage('');
  }

  // --- Show final results ---
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const points = correctCount * POINTS_PER_CORRECT;

  showMessage('╔══════════════════════════════════╗');
  showMessage('║        📊 Quiz Results           ║');
  showMessage('╚══════════════════════════════════╝');
  showMessage(`  Score:      ${correctCount}/${totalQuestions} correct`);
  showMessage(`  Percentage: ${percentage}%`);
  showMessage(`  Points:     +${points}`);

  // Give feedback based on performance
  if (percentage === 100) {
    showSuccess('  🌟 Perfect score! Incredible!');
  } else if (percentage >= 80) {
    showSuccess('  🎉 Excellent work!');
  } else if (percentage >= 60) {
    showMessage('  👍 Good job! Keep learning!');
  } else if (percentage >= 40) {
    showMessage('  📚 Not bad, but there\'s room to improve!');
  } else {
    showMessage('  💪 Keep studying, you\'ll get there!');
  }

  showMessage('');

  // --- Update stats ---
  stats.quizMaster.gamesPlayed++;
  stats.totalGamesPlayed++;
  stats.totalPoints += points;

  // Track best score (highest points in a single round)
  if (points > (stats.quizMaster.bestScore || 0)) {
    stats.quizMaster.bestScore = points;
  }

  // Track best percentage
  if (percentage > (stats.quizMaster.bestPercentage || 0)) {
    stats.quizMaster.bestPercentage = percentage;
  }

  // Track cumulative correct/total
  stats.quizMaster.totalCorrect = (stats.quizMaster.totalCorrect || 0) + correctCount;
  stats.quizMaster.totalQuestions = (stats.quizMaster.totalQuestions || 0) + totalQuestions;

  // --- Ask to play again ---
  const playAgain = await askChoice('Play again? (y/n)', ['y', 'n']);

  if (playAgain === 'y') {
    return playQuizMaster(stats); // Recurse for another round
  }

  return stats;
}

export { playQuizMaster };
