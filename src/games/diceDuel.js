// ============================================================
// diceDuel.js — 🎲 Dice Duel Game
// ============================================================
// Roll the dice and beat the computer!
// Demonstrates: random numbers, loops, session tracking,
// comparison operators, and user input validation.
// ============================================================

import {
  showGameTitle, showSuccess, showError, showWarning, showInfo,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askChoice, waitForEnter } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';

// ASCII Art representations of 6-sided dice faces
export const DICE_FACES = {
  1: ['┌─────────┐', '│         │', '│    ●    │', '│         │', '└─────────┘'],
  2: ['┌─────────┐', '│  ●      │', '│         │', '│      ●  │', '└─────────┘'],
  3: ['┌─────────┐', '│  ●      │', '│    ●    │', '│      ●  │', '└─────────┘'],
  4: ['┌─────────┐', '│  ●   ●  │', '│         │', '│  ●   ●  │', '└─────────┘'],
  5: ['┌─────────┐', '│  ●   ●  │', '│    ●    │', '│  ●   ●  │', '└─────────┘'],
  6: ['┌─────────┐', '│  ●   ●  │', '│  ●   ●  │', '│  ●   ●  │', '└─────────┘'],
};

/**
 * Pure function: Determine round outcome between player and computer.
 * @param {number} playerRoll - 1-6
 * @param {number} computerRoll - 1-6
 * @returns {'win' | 'loss' | 'draw'}
 */
export function getDiceResult(playerRoll, computerRoll) {
  if (playerRoll > computerRoll) return 'win';
  if (playerRoll < computerRoll) return 'loss';
  return 'draw';
}

/**
 * Display dice side-by-side.
 * @param {number} playerRoll - Player dice value
 * @param {number} computerRoll - Computer dice value
 */
export function displayDice(playerRoll, computerRoll) {
  const pFace = DICE_FACES[playerRoll];
  const cFace = DICE_FACES[computerRoll];

  console.log(`\n    ${CYAN}${BOLD}Player (${playerRoll})${RESET}              ${YELLOW}${BOLD}Computer (${computerRoll})${RESET}`);
  for (let i = 0; i < 5; i++) {
    console.log(`    ${CYAN}${pFace[i]}${RESET}        ${YELLOW}${cFace[i]}${RESET}`);
  }
  console.log('');
}

/**
 * Main game entry point.
 * @param {object} stats — Player's persistent stats object
 * @returns {object} Updated stats
 */
export async function playDiceDuel(stats) {
  showGameTitle('🎲 Dice Duel');

  // ── Instructions ──
  console.log(`${WHITE}  How to play:${RESET}`);
  console.log(`${DIM}  • You and the computer each roll a fair 6-sided die.${RESET}`);
  console.log(`${DIM}  • The higher roll wins the round.${RESET}`);
  console.log(`${DIM}  • Equal rolls result in a draw.${RESET}`);
  console.log(`${DIM}  • Play as many rounds as you like!${RESET}\n`);

  // ── Session trackers ──
  let roundsPlayed = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  let keepPlaying = true;

  while (keepPlaying) {
    // Wait for player to roll
    await waitForEnter('Press Enter to roll the dice... 🎲');

    // ── Roll dice for both sides ──
    const playerRoll = getRandomInt(1, 6);
    const computerRoll = getRandomInt(1, 6);

    // ── Display side-by-side visual dice ──
    displayDice(playerRoll, computerRoll);

    // ── Determine round outcome ──
    const outcome = getDiceResult(playerRoll, computerRoll);

    if (outcome === 'win') {
      showSuccess('🎉 You win this round!');
      wins++;
    } else if (outcome === 'loss') {
      showError('😞 Computer wins this round!');
      losses++;
    } else {
      showWarning("🤝 It's a draw!");
      draws++;
    }

    roundsPlayed++;

    // ── Ask to continue ──
    console.log('');
    const again = await askChoice('  Roll again? (y/n): ', ['y', 'n']);
    if (again === 'n') {
      keepPlaying = false;
    } else {
      console.log('');
    }
  }

  // ── Session summary ──
  console.log('');
  console.log(`${CYAN}  ═══════════════════════════════${RESET}`);
  console.log(`${WHITE}${BOLD}        Session Summary${RESET}`);
  console.log(`${CYAN}  ═══════════════════════════════${RESET}`);
  console.log(`${WHITE}  Rounds played : ${YELLOW}${roundsPlayed}${RESET}`);
  console.log(`${GREEN}  Wins          : ${wins}${RESET}`);
  console.log(`${RED}  Losses        : ${losses}${RESET}`);
  console.log(`${YELLOW}  Draws         : ${draws}${RESET}`);
  console.log(`${CYAN}  ═══════════════════════════════${RESET}\n`);

  // ── Update stats ──
  if (!stats.diceDuel) {
    stats.diceDuel = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
  }
  stats.diceDuel.gamesPlayed += roundsPlayed;
  stats.diceDuel.wins += wins;
  stats.diceDuel.losses += losses;
  stats.diceDuel.draws += draws;
  stats.totalGamesPlayed += roundsPlayed;

  await waitForEnter('Press Enter to return to the menu...');

  return stats;
}
