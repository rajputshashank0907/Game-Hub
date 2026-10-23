// ============================================================
// quizMaster.js — Quiz Master Trivia Game
// ============================================================
// Answer multiple-choice questions and earn points for each
// correct answer. Questions are shuffled each playthrough.
// Demonstrates: arrays, objects, loops, conditions, scoring.
// ============================================================

import {
  showGameTitle, showSuccess, showError,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askChoice } from '../utils/input.js';
import { shuffleArray } from '../utils/random.js';
import questions from '../data/questions.js';

/** Number of questions per quiz round */
const QUESTIONS_PER_ROUND = 10;

/** Points awarded for each correct answer */
const POINTS_PER_CORRECT = 10;

/**
 * Plays a round of Quiz Master.
 * @param {object} stats – Player stats object (modified in-place).
 * @returns {object} Updated stats.
 */
export async function playQuizMaster(stats) {
  showGameTitle('🧠 Quiz Master');
  console.log(`${WHITE}  Test your knowledge across various topics!${RESET}\n`);

  // Shuffle a copy so order is random each time
  const shuffled = shuffleArray([...questions]);
  // Pick up to QUESTIONS_PER_ROUND (or all if fewer available)
  const roundQuestions = shuffled.slice(0, Math.min(QUESTIONS_PER_ROUND, shuffled.length));
  const totalQuestions = roundQuestions.length;

  console.log(`${CYAN}  📋 ${totalQuestions} questions coming up. Good luck!${RESET}\n`);

  // --- Quiz loop ---
  let correctCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const q = roundQuestions[i];

    // Display question number and text
    console.log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${WHITE}${BOLD}  Question ${i + 1}/${totalQuestions}: ${q.question}${RESET}`);
    console.log('');

    // Display the four options
    for (const option of q.options) {
      console.log(`${GREEN}    ${option}${RESET}`);
    }
    console.log('');

    // Ask for the player's answer
    const answer = await askChoice('  Your answer (a/b/c/d): ', ['a', 'b', 'c', 'd']);

    // Check if correct
    if (answer === q.answer) {
      correctCount++;
      showSuccess('✅ Correct!');
    } else {
      // Find the full text of the correct option
      const correctIndex = q.answer.charCodeAt(0) - 'a'.charCodeAt(0);
      const correctText = q.options[correctIndex];
      showError(`❌ Wrong! The correct answer was: ${correctText}`);
    }
    console.log('');
  }

  // --- Show final results ---
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const points = correctCount * POINTS_PER_CORRECT;

  console.log(`${CYAN}  ╔══════════════════════════════════╗${RESET}`);
  console.log(`${CYAN}  ║      ${YELLOW}${BOLD}📊 Quiz Results${RESET}${CYAN}             ║${RESET}`);
  console.log(`${CYAN}  ╚══════════════════════════════════╝${RESET}`);
  console.log(`${WHITE}    Score:      ${GREEN}${correctCount}/${totalQuestions} correct${RESET}`);
  console.log(`${WHITE}    Percentage: ${YELLOW}${percentage}%${RESET}`);
  console.log(`${WHITE}    Points:     ${GREEN}+${points}${RESET}`);

  // Performance feedback
  if (percentage === 100) {
    showSuccess('🌟 Perfect score! Incredible!');
  } else if (percentage >= 80) {
    showSuccess('🎉 Excellent work!');
  } else if (percentage >= 60) {
    console.log(`${YELLOW}    👍 Good job! Keep learning!${RESET}`);
  } else if (percentage >= 40) {
    console.log(`${YELLOW}    📚 Not bad, but there's room to improve!${RESET}`);
  } else {
    console.log(`${YELLOW}    💪 Keep studying, you'll get there!${RESET}`);
  }
  console.log('');

  // --- Update stats ---
  stats.quizMaster.gamesPlayed++;
  stats.totalGamesPlayed++;
  stats.totalPoints += points;

  // Track best score
  if (stats.quizMaster.bestScore === null || points > stats.quizMaster.bestScore) {
    stats.quizMaster.bestScore = points;
  }

  // Track best percentage
  if (stats.quizMaster.bestPercentage === null || percentage > stats.quizMaster.bestPercentage) {
    stats.quizMaster.bestPercentage = percentage;
  }

  // Track cumulative correct/total
  stats.quizMaster.totalCorrect += correctCount;
  stats.quizMaster.totalQuestions += totalQuestions;

  // --- Ask to play again ---
  const playAgain = await askChoice('  Play again? (y/n): ', ['y', 'n']);
  if (playAgain === 'y') {
    return playQuizMaster(stats);
  }

  return stats;
}
