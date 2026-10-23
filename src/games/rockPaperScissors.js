// ============================================================
// rockPaperScissors.js — Rock, Paper, Scissors
// ============================================================
// Play a single round or a best-of-3 match against the computer.
// Demonstrates: conditions, random numbers, arrays, and
// function composition.
// ============================================================

import {
  showGameTitle, showSuccess, showError, showWarning,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askChoice } from '../utils/input.js';
import { getRandomElement } from '../utils/random.js';

// Mapping shorthand keys to full names with emoji
export const CHOICE_MAP = {
  r: '🪨  Rock',
  p: '📄  Paper',
  s: '✂️  Scissors',
};

// All valid choices
export const CHOICE_KEYS = ['r', 'p', 's'];

/**
 * Pure function to determine the winner of a single round.
 * @param {string} player   – 'r', 'p', or 's'
 * @param {string} computer – 'r', 'p', or 's'
 * @returns {'win' | 'loss' | 'draw'}
 */
export function getRoundResult(player, computer) {
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
 * @param {number} roundNumber – Current round number (for display).
 * @returns {Promise<'win' | 'loss' | 'draw'>}
 */
async function playSingleRound(roundNumber) {
  console.log(`\n${CYAN}${BOLD}  --- Round ${roundNumber} ---${RESET}`);

  // Player picks
  const playerChoice = await askChoice(
    '  Choose: (r)ock, (p)aper, (s)cissors: ',
    ['r', 'p', 's']
  );

  // Computer picks randomly
  const computerChoice = getRandomElement(CHOICE_KEYS);

  // Display both choices
  console.log(`${WHITE}  You chose:      ${GREEN}${CHOICE_MAP[playerChoice]}${RESET}`);
  console.log(`${WHITE}  Computer chose: ${RED}${CHOICE_MAP[computerChoice]}${RESET}`);

  // Determine and display result
  const result = getRoundResult(playerChoice, computerChoice);

  if (result === 'win') {
    showSuccess('🏆 You win this round!');
  } else if (result === 'loss') {
    showError('😞 Computer wins this round!');
  } else {
    showWarning("🤝 It's a draw!");
  }

  return result;
}

/**
 * Plays the full Rock Paper Scissors game.
 * @param {object} stats – Player stats object (modified in-place).
 * @returns {object} Updated stats.
 */
export async function playRockPaperScissors(stats) {
  showGameTitle('✊ Rock, Paper, Scissors');
  console.log(`${WHITE}  Beat the computer in the classic showdown!${RESET}\n`);

  // --- Choose match type ---
  console.log(`${CYAN}  Match type:${RESET}`);
  console.log(`${GREEN}  1)${WHITE} Single round${RESET}`);
  console.log(`${GREEN}  2)${WHITE} Best of 3${RESET}`);
  const matchType = await askChoice('  Choose match type (1/2): ', ['1', '2']);

  let matchResult; // 'win', 'loss', or 'draw' for the overall match

  if (matchType === '1') {
    // ---- Single round mode ----
    matchResult = await playSingleRound(1);
  } else {
    // ---- Best-of-3 mode ----
    let playerWins = 0;
    let computerWins = 0;
    let round = 0;

    console.log(`\n${YELLOW}${BOLD}  🏟️  Best of 3 — First to 2 wins!${RESET}\n`);

    while (playerWins < 2 && computerWins < 2) {
      round++;
      const result = await playSingleRound(round);

      if (result === 'win') playerWins++;
      else if (result === 'loss') computerWins++;
      // Draws don't count toward winning

      console.log(`${DIM}     Score: You ${playerWins} — ${computerWins} Computer${RESET}`);
    }

    matchResult = playerWins === 2 ? 'win' : 'loss';
  }

  // --- Show match summary ---
  console.log(`\n${CYAN}  ════════════ Match Result ════════════${RESET}`);
  if (matchResult === 'win') {
    showSuccess('🎉 You won the match!');
  } else if (matchResult === 'loss') {
    showError('💔 Computer won the match!');
  } else {
    showWarning("🤝 The match was a draw!");
  }
  console.log(`${CYAN}  ══════════════════════════════════════${RESET}\n`);

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
  const playAgain = await askChoice('  Play again? (y/n): ', ['y', 'n']);
  if (playAgain === 'y') {
    return playRockPaperScissors(stats);
  }

  return stats;
}
