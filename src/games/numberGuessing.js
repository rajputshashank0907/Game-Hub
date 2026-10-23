// ============================================================
// numberGuessing.js — Number Guessing Challenge game
// The player tries to guess a randomly generated number (1-100)
// with a limited number of attempts based on difficulty.
// ============================================================

import { showGameTitle, showMessage, showSuccess, showError, showWarning } from '../utils/display.js';
import { askNumber, askChoice } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';

/**
 * Plays a single round of the Number Guessing game.
 * @param {object} stats - The player's stats object (modified in-place).
 * @returns {object} The updated stats object.
 */
async function playNumberGuessing(stats) {
  // --- Show game title and instructions ---
  showGameTitle('🔢 Number Guessing Challenge');
  showMessage("I'm thinking of a number between 1 and 100. Can you guess it?");
  showMessage('');

  // --- Choose difficulty ---
  showMessage('Select difficulty:');
  showMessage('  1) Easy   — 10 attempts');
  showMessage('  2) Medium —  7 attempts');
  showMessage('  3) Hard   —  5 attempts');

  const difficulty = await askChoice('Choose difficulty', ['1', '2', '3']);

  // Map difficulty to max attempts and score multiplier
  let maxAttempts, multiplier, difficultyName;
  switch (difficulty) {
    case '1':
      maxAttempts = 10;
      multiplier = 1;
      difficultyName = 'Easy';
      break;
    case '2':
      maxAttempts = 7;
      multiplier = 2;
      difficultyName = 'Medium';
      break;
    case '3':
      maxAttempts = 5;
      multiplier = 3;
      difficultyName = 'Hard';
      break;
  }

  showMessage(`\n🎯 Difficulty: ${difficultyName} (${maxAttempts} attempts)\n`);

  // --- Generate the secret number ---
  const secretNumber = getRandomInt(1, 100);

  // --- Guessing loop ---
  let attemptsUsed = 0;
  let won = false;

  while (attemptsUsed < maxAttempts) {
    const remaining = maxAttempts - attemptsUsed;
    const guess = await askNumber(
      `Attempt ${attemptsUsed + 1}/${maxAttempts} — Enter your guess`,
      1,
      100
    );
    attemptsUsed++;

    if (guess === secretNumber) {
      // Player guessed correctly!
      won = true;
      break;
    } else if (guess > secretNumber) {
      showWarning('📈 Too high!');
    } else {
      showWarning('📉 Too low!');
    }

    // Show how many attempts remain (if any)
    if (attemptsUsed < maxAttempts) {
      showMessage(`   Attempts remaining: ${maxAttempts - attemptsUsed}`);
    }
  }

  // --- Handle result ---
  if (won) {
    // Calculate points: multiplier * (remaining attempts + 1) * 10
    const points = multiplier * (maxAttempts - attemptsUsed + 1) * 10;
    showSuccess(`🎉 Congratulations! You guessed it in ${attemptsUsed} attempt(s)!`);
    showSuccess(`   The number was ${secretNumber}.`);
    showSuccess(`   You earned ${points} points! (${difficultyName} bonus x${multiplier})`);

    // Update stats for a win
    stats.numberGuessing.gamesPlayed++;
    stats.numberGuessing.gamesWon++;
    stats.totalGamesPlayed++;
    stats.totalPoints += points;

    // Track the best (highest) score
    if (points > (stats.numberGuessing.bestScore || 0)) {
      stats.numberGuessing.bestScore = points;
    }
  } else {
    showError(`💔 Out of attempts! The number was ${secretNumber}.`);

    // Update stats for a loss
    stats.numberGuessing.gamesPlayed++;
    stats.totalGamesPlayed++;
  }

  // --- Ask to play again ---
  showMessage('');
  const playAgain = await askChoice('Play again? (y/n)', ['y', 'n']);

  if (playAgain === 'y') {
    return playNumberGuessing(stats); // Recurse for another round
  }

  return stats;
}

export { playNumberGuessing };
