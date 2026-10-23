// ============================================================
// rockPaperScissors.js — Rock, Paper, Scissors game
// Play a single round or a best-of-3 match against the computer.
// ============================================================

import { showGameTitle, showMessage, showSuccess, showError, showWarning } from '../utils/display.js';
import { askChoice } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';

// Mapping shorthand keys to full names with emoji
const CHOICE_MAP = {
  r: '🪨 Rock',
  p: '📄 Paper',
  s: '✂️ Scissors',
};

// All valid choices as an array (for random computer pick)
const CHOICE_KEYS = ['r', 'p', 's'];

/**
 * Determines the winner of a single round.
 * @param {string} player - 'r', 'p', or 's'
 * @param {string} computer - 'r', 'p', or 's'
 * @returns {'win' | 'loss' | 'draw'}
 */
function getRoundResult(player, computer) {
  if (player === computer) return 'draw';
  // Win conditions for the player
  if (
    (player === 'r' && computer === 's') ||
    (player === 'p' && computer === 'r') ||
    (player === 's' && computer === 'p')
  ) {
    return 'win';
  }
  return 'loss';
}

/**
 * Plays a single round and returns the result.
 * @param {number} roundNumber - The current round number (for display).
 * @returns {Promise<'win' | 'loss' | 'draw'>}
 */
async function playSingleRound(roundNumber) {
  showMessage(`\n--- Round ${roundNumber} ---`);

  // Player picks
  const playerChoice = await askChoice(
    'Choose: (r)ock, (p)aper, (s)cissors',
    ['r', 'p', 's']
  );

  // Computer picks randomly
  const computerChoice = CHOICE_KEYS[getRandomInt(0, CHOICE_KEYS.length - 1)];

  // Display both choices
  showMessage(`  You chose:      ${CHOICE_MAP[playerChoice]}`);
  showMessage(`  Computer chose: ${CHOICE_MAP[computerChoice]}`);

  // Determine and display result
  const result = getRoundResult(playerChoice, computerChoice);

  if (result === 'win') {
    showSuccess('  🏆 You win this round!');
  } else if (result === 'loss') {
    showError('  😞 Computer wins this round!');
  } else {
    showWarning("  🤝 It's a draw!");
  }

  return result;
}

/**
 * Plays the full Rock Paper Scissors game (single round or best-of-3).
 * @param {object} stats - The player's stats object (modified in-place).
 * @returns {object} The updated stats object.
 */
async function playRockPaperScissors(stats) {
  // --- Show game title ---
  showGameTitle('✊ Rock, Paper, Scissors');
  showMessage('Beat the computer in the classic showdown!\n');

  // --- Choose match type ---
  showMessage('Match type:');
  showMessage('  1) Single round');
  showMessage('  2) Best of 3');
  const matchType = await askChoice('Choose match type', ['1', '2']);

  let matchResult; // 'win', 'loss', or 'draw' for the overall match

  if (matchType === '1') {
    // ---- Single round mode ----
    matchResult = await playSingleRound(1);
  } else {
    // ---- Best of 3 mode ----
    let playerWins = 0;
    let computerWins = 0;
    let round = 0;

    showMessage('\n🏟️  Best of 3 — First to 2 wins!\n');

    while (playerWins < 2 && computerWins < 2) {
      round++;
      const result = await playSingleRound(round);

      if (result === 'win') {
        playerWins++;
      } else if (result === 'loss') {
        computerWins++;
      }
      // Draws don't count toward winning

      showMessage(`  Score: You ${playerWins} — ${computerWins} Computer`);
    }

    // Determine overall match result
    if (playerWins === 2) {
      matchResult = 'win';
    } else {
      matchResult = 'loss';
    }
  }

  // --- Show match summary ---
  showMessage('\n========== Match Result ==========');
  if (matchResult === 'win') {
    showSuccess('🎉 You won the match!');
  } else if (matchResult === 'loss') {
    showError('💔 Computer won the match!');
  } else {
    showWarning("🤝 The match was a draw!");
  }
  showMessage('==================================\n');

  // --- Update stats ---
  stats.rockPaperScissors.gamesPlayed++;
  stats.totalGamesPlayed++;

  if (matchResult === 'win') {
    stats.rockPaperScissors.wins++;
  } else if (matchResult === 'loss') {
    stats.rockPaperScissors.losses++;
  } else {
    stats.rockPaperScissors.draws++;
  }

  // --- Ask to play again ---
  const playAgain = await askChoice('Play again? (y/n)', ['y', 'n']);

  if (playAgain === 'y') {
    return playRockPaperScissors(stats); // Recurse for another match
  }

  return stats;
}

export { playRockPaperScissors };
