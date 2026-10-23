// ============================================================
// menu.js — Main Menu & Navigation Controller
// ============================================================
// Manages the application lifecycle, main menu display, user
// input routing, game execution, statistics saving, and exit.
// ============================================================

import {
  showBanner, showMenu, showSuccess, showError, showWarning, showInfo,
  showLine, showBoxedText,
  CYAN, YELLOW, GREEN, WHITE, RED, MAGENTA, BOLD, DIM, RESET,
} from './utils/display.js';
import { askChoice, askYesNo, waitForEnter, closeInput } from './utils/input.js';
import { loadStats, saveStats, resetStats, displayStats } from './utils/stats.js';

// Import all mini-game handlers
import { playNumberGuessing } from './games/numberGuessing.js';
import { playRockPaperScissors } from './games/rockPaperScissors.js';
import { playQuizMaster } from './games/quizMaster.js';
import { playTicTacToe } from './games/ticTacToe.js';
import { playWordScramble } from './games/wordScramble.js';
import { playDiceDuel } from './games/diceDuel.js';

// The main menu options exactly matching the specification
export const MAIN_MENU_OPTIONS = [
  'Number Guessing Challenge',
  'Rock Paper Scissors',
  'Quiz Master',
  'Tic-Tac-Toe',
  'Word Scramble',
  'Dice Duel',
  'View Player Statistics',
  'Instructions and About',
  'Reset Player Statistics',
  'Exit Game Hub',
];

/**
 * Displays the comprehensive Instructions and About screen.
 */
export async function showInstructionsAndAbout() {
  console.log('');
  showBoxedText('📖  ABOUT TERMINAL GAME HUB  📖', YELLOW);
  console.log('');

  console.log(`${CYAN}${BOLD}  Project Name:${RESET}  Terminal Game Hub`);
  console.log(`${CYAN}${BOLD}  Project ID:${RESET}    2501010345`);
  console.log(`${CYAN}${BOLD}  Version:${RESET}       1.0.0`);
  console.log(`${CYAN}${BOLD}  Platform:${RESET}      Node.js Terminal Application (macOS / Linux / Windows)`);
  console.log('');

  showLine('─', 60);
  console.log(`${YELLOW}${BOLD}  📌 OVERVIEW & PROBLEM STATEMENT${RESET}`);
  showLine('─', 60);
  console.log(`${WHITE}  Normally, small games are created and played as separate isolated`);
  console.log(`  programs. Terminal Game Hub unifies 6 classic mini-games into a single`);
  console.log(`  interactive CLI application with shared persistent player stats.${RESET}`);
  console.log('');

  showLine('─', 60);
  console.log(`${YELLOW}${BOLD}  🎮 MINI-GAMES INCLUDED${RESET}`);
  showLine('─', 60);
  console.log(`${GREEN}  1. Number Guessing Challenge${RESET} — Guess secret 1-100 with Easy/Med/Hard`);
  console.log(`${GREEN}  2. Rock Paper Scissors      ${RESET} — Single round or Best-of-3 vs Computer`);
  console.log(`${GREEN}  3. Quiz Master              ${RESET} — 10 random trivia questions across 5 topics`);
  console.log(`${GREEN}  4. Tic-Tac-Toe              ${RESET} — 3×3 grid: vs Smart AI or Local 2-Player`);
  console.log(`${GREEN}  5. Word Scramble            ${RESET} — Unscramble tech vocabulary with hints & 3 tries`);
  console.log(`${GREEN}  6. Dice Duel                ${RESET} — High-roller 6-sided dice clash with ASCII art`);
  console.log('');

  showLine('─', 60);
  console.log(`${YELLOW}${BOLD}  💾 PERSISTENT STATISTICS${RESET}`);
  showLine('─', 60);
  console.log(`${WHITE}  All wins, losses, draws, points, and high scores are automatically`);
  console.log(`  saved to ${CYAN}storage/stats.json${WHITE} in JSON format after every session.`);
  console.log(`  Corrupted or missing files are safely recovered with default values.${RESET}`);
  console.log('');

  await waitForEnter('Press Enter to return to the Main Menu...');
}

/**
 * Handles resetting player stats with explicit user confirmation.
 * @param {object} stats - Current stats object
 * @returns {Promise<object>} New or unchanged stats object
 */
export async function handleResetStats(stats) {
  console.log('');
  showWarning('Resetting statistics will permanently erase all high scores and records!');
  const confirmed = await askYesNo('  Are you sure you want to reset all player statistics?');

  if (confirmed) {
    const freshStats = resetStats();
    saveStats(freshStats);
    showSuccess('Player statistics have been successfully reset to default.');
  } else {
    showInfo('Reset cancelled. Your statistics remain untouched.');
  }

  await waitForEnter('Press Enter to return to the Main Menu...');
  return loadStats();
}

/**
 * Main application loop.
 */
export async function startApp() {
  // Load saved stats or create defaults
  let stats = loadStats();

  let running = true;

  while (running) {
    showBanner();

    // Display Main Menu with [1]-[9] and [0] for Exit
    showMenu('MAIN MENU — SELECT A GAME OR OPTION', MAIN_MENU_OPTIONS);

    const validChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const choice = await askChoice('  Enter your choice (0-9): ', validChoices);

    switch (choice) {
      case '1':
        stats = await playNumberGuessing(stats);
        saveStats(stats);
        break;

      case '2':
        stats = await playRockPaperScissors(stats);
        saveStats(stats);
        break;

      case '3':
        stats = await playQuizMaster(stats);
        saveStats(stats);
        break;

      case '4':
        stats = await playTicTacToe(stats);
        saveStats(stats);
        break;

      case '5':
        stats = await playWordScramble(stats);
        saveStats(stats);
        break;

      case '6':
        stats = await playDiceDuel(stats);
        saveStats(stats);
        break;

      case '7':
        displayStats(stats);
        await waitForEnter('Press Enter to return to the Main Menu...');
        break;

      case '8':
        await showInstructionsAndAbout();
        break;

      case '9':
        stats = await handleResetStats(stats);
        break;

      case '0':
        running = false;
        break;
    }
  }

  // Graceful exit message
  console.log('');
  showBoxedText('🎮  THANK YOU FOR PLAYING TERMINAL GAME HUB!  🎮', CYAN);
  console.log(`${YELLOW}  Have a great day and come back soon! Goodbye! 👋${RESET}\n`);

  closeInput();
}
