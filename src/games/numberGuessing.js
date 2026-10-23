// ============================================================
// numberGuessing.js — Number Guessing Challenge
// ============================================================
// The player tries to guess a randomly generated number (1–100)
// with a limited number of attempts based on difficulty.
// Demonstrates: loops, conditions, random numbers, input
// validation, and scoring logic.
// ============================================================

import {
  showGameTitle, showSuccess, showError, showWarning, showInfo,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askNumber, askChoice } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';

/**
 * Pure function to calculate score for a winning game.
 * Points = multiplier × (maxAttempts - attemptsUsed + 1) × 10
 * @param {number} multiplier - Difficulty multiplier (1, 2, or 3)
 * @param {number} maxAttempts - Total attempts allowed
 * @param {number} attemptsUsed - How many attempts were taken
 * @returns {number} Points earned
 */
export function calculateNumberGuessingScore(multiplier, maxAttempts, attemptsUsed) {
  return multiplier * (maxAttempts - attemptsUsed + 1) * 10;
}

/**
 * Plays the Number Guessing Challenge.
 * @param {object} stats – Player stats object (modified in-place).
 * @returns {object} Updated stats.
 */
export async function playNumberGuessing(stats) {
  // --- Show game title and instructions ---
  showGameTitle('🔢 Number Guessing Challenge');
  console.log(`${WHITE}  I'm thinking of a number between 1 and 100. Can you guess it?${RESET}\n`);

  // --- Choose difficulty ---
  console.log(`${CYAN}  Select difficulty:${RESET}`);
  console.log(`${GREEN}  1)${WHITE} Easy   — 10 attempts (1x multiplier)${RESET}`);
  console.log(`${YELLOW}  2)${WHITE} Medium —  7 attempts (2x multiplier)${RESET}`);
  console.log(`${RED}  3)${WHITE} Hard   —  5 attempts (3x multiplier)${RESET}`);

  const difficulty = await askChoice('  Choose difficulty (1/2/3): ', ['1', '2', '3']);

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

  console.log(`\n${CYAN}  🎯 Difficulty: ${YELLOW}${difficultyName}${CYAN} (${maxAttempts} attempts)${RESET}\n`);

  // --- Generate the secret number ---
  const secretNumber = getRandomInt(1, 100);

  // --- Guessing loop ---
  let attemptsUsed = 0;
  let won = false;

  while (attemptsUsed < maxAttempts) {
    const guess = await askNumber(
      `  Attempt ${attemptsUsed + 1}/${maxAttempts} — Enter your guess (1-100): `,
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

    // Show remaining attempts
    if (attemptsUsed < maxAttempts) {
      console.log(`${DIM}     Attempts remaining: ${maxAttempts - attemptsUsed}${RESET}`);
    }
  }

  // --- Handle result ---
  if (won) {
    const points = calculateNumberGuessingScore(multiplier, maxAttempts, attemptsUsed);
    showSuccess(`🎉 Congratulations! You guessed it in ${attemptsUsed} attempt(s)!`);
    showSuccess(`   The number was ${secretNumber}.`);
    showSuccess(`   You earned ${points} points! (${difficultyName} bonus ×${multiplier})`);

    // Update stats for a win
    stats.numberGuessing.gamesPlayed++;
    stats.numberGuessing.gamesWon++;
    stats.numberGuessing.totalPoints += points;
    stats.totalGamesPlayed++;
    stats.totalPoints += points;

    // Track the best (highest) score
    if (stats.numberGuessing.bestScore === null || points > stats.numberGuessing.bestScore) {
      stats.numberGuessing.bestScore = points;
    }
  } else {
    showError(`💔 Out of attempts! The number was ${secretNumber}.`);

    // Update stats for a loss
    stats.numberGuessing.gamesPlayed++;
    stats.totalGamesPlayed++;
  }

  // --- Ask to play again ---
  console.log('');
  const playAgain = await askChoice('  Play again? (y/n): ', ['y', 'n']);

  if (playAgain === 'y') {
    return playNumberGuessing(stats); // Recurse for another round
  }

  return stats;
}
