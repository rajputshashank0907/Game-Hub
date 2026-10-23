// ============================================================
// stats.js — Player Statistics Manager
// ============================================================
// This module handles loading, saving, displaying, and resetting
// player stats across all mini-games. Stats are persisted as a
// JSON file in the storage/ directory.
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  showLine,
  showBoxedText,
  showScore,
  showWarning,
  showInfo,
  CYAN,
  YELLOW,
  GREEN,
  MAGENTA,
  WHITE,
  BOLD,
  DIM,
  RESET,
} from './display.js';

// ----- Resolve project root from this file's location -----
// import.meta.url gives us the file:// URL of this module.
// We go up two directories (utils → src → project root).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// ----- Path to the stats JSON file -----
export const STATS_FILE = path.join(PROJECT_ROOT, 'storage', 'stats.json');

// ============================================================
// DEFAULT_STATS — The initial stats object for a new player
// ============================================================
// Each game has its own nested stats object, plus two
// top-level aggregate counters.
// ============================================================
export const DEFAULT_STATS = {
  totalGamesPlayed: 0,
  totalPoints: 0,
  numberGuessing: {
    gamesPlayed: 0,
    gamesWon: 0,
    bestScore: null,
    totalPoints: 0,
  },
  rockPaperScissors: {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
  quizMaster: {
    gamesPlayed: 0,
    bestScore: null,
    bestPercentage: null,
    totalCorrect: 0,
    totalQuestions: 0,
  },
  ticTacToe: {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
  wordScramble: {
    gamesPlayed: 0,
    wordsGuessed: 0,
    totalPoints: 0,
  },
  diceDuel: {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
};

// ============================================================
// deepMerge — Recursively merges a source into a target
// ============================================================
// This ensures that if the saved stats file is missing any new
// keys (e.g., after an update), defaults fill in the gaps.
// ============================================================
function deepMerge(target, source) {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      key in result &&
      result[key] !== null &&
      typeof result[key] === 'object'
    ) {
      // Recursively merge nested objects
      result[key] = deepMerge(result[key], source[key]);
    }
    // Keep the target's value if it exists; source (defaults) don't override
  }

  // Add any keys from source (defaults) that are missing in target
  for (const key of Object.keys(source)) {
    if (!(key in result)) {
      result[key] = JSON.parse(JSON.stringify(source[key]));
    }
  }

  return result;
}

// ============================================================
// loadStats — Reads stats from the JSON file on disk
// ============================================================
// If the file is missing or corrupt, returns a fresh copy of
// DEFAULT_STATS. Any missing keys are filled in via deep merge.
// ============================================================
export function loadStats() {
  try {
    const data = fs.readFileSync(STATS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    // Deep-merge with defaults so any newly added fields are present
    return deepMerge(parsed, DEFAULT_STATS);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet — totally normal on first run
      return resetStats();
    }
    // File exists but is corrupt or unreadable
    showWarning('Stats file was corrupt or unreadable. Starting with fresh stats.');
    return resetStats();
  }
}

// ============================================================
// saveStats — Writes the stats object to the JSON file
// ============================================================
// Creates the storage/ directory if it doesn't already exist.
// The JSON is pretty-printed with 2-space indentation.
// ============================================================
export function saveStats(stats) {
  // Ensure the storage directory exists
  const storageDir = path.dirname(STATS_FILE);
  fs.mkdirSync(storageDir, { recursive: true });

  // Write the stats file with pretty formatting
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
}

// ============================================================
// resetStats — Returns a fresh deep clone of DEFAULT_STATS
// ============================================================
// Uses JSON round-trip for a simple deep clone.
// ============================================================
export function resetStats() {
  return JSON.parse(JSON.stringify(DEFAULT_STATS));
}

// ============================================================
// displayStats — Shows a nicely formatted player dashboard
// ============================================================
// Prints all player stats organized by game using the display
// utilities for consistent formatting.
// ============================================================
export function displayStats(stats) {
  console.log('');
  showBoxedText('📊  PLAYER STATISTICS DASHBOARD  📊', YELLOW);
  console.log('');

  // ----- Overall Stats -----
  showLine('─', 50);
  console.log(`${CYAN}${BOLD}  🏆 OVERALL${RESET}`);
  showLine('─', 50);
  showScore('Total Games Played', stats.totalGamesPlayed);
  showScore('Total Points', stats.totalPoints);
  console.log('');

  // ----- Number Guessing -----
  showLine('─', 50);
  console.log(`${GREEN}${BOLD}  🎯 NUMBER GUESSING${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.numberGuessing.gamesPlayed);
  showScore('Games Won', stats.numberGuessing.gamesWon);
  showScore('Best Score', stats.numberGuessing.bestScore ?? 'N/A');
  showScore('Total Points', stats.numberGuessing.totalPoints);
  console.log('');

  // ----- Rock Paper Scissors -----
  showLine('─', 50);
  console.log(`${MAGENTA}${BOLD}  ✊ ROCK PAPER SCISSORS${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.rockPaperScissors.gamesPlayed);
  showScore('Wins', stats.rockPaperScissors.wins);
  showScore('Losses', stats.rockPaperScissors.losses);
  showScore('Draws', stats.rockPaperScissors.draws);
  console.log('');

  // ----- Quiz Master -----
  showLine('─', 50);
  console.log(`${YELLOW}${BOLD}  🧠 QUIZ MASTER${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.quizMaster.gamesPlayed);
  showScore('Best Score', stats.quizMaster.bestScore ?? 'N/A');
  showScore('Best Percentage', stats.quizMaster.bestPercentage != null ? `${stats.quizMaster.bestPercentage}%` : 'N/A');
  showScore('Total Correct', stats.quizMaster.totalCorrect);
  showScore('Total Questions', stats.quizMaster.totalQuestions);
  console.log('');

  // ----- Tic Tac Toe -----
  showLine('─', 50);
  console.log(`${CYAN}${BOLD}  ❌ TIC TAC TOE${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.ticTacToe.gamesPlayed);
  showScore('Wins', stats.ticTacToe.wins);
  showScore('Losses', stats.ticTacToe.losses);
  showScore('Draws', stats.ticTacToe.draws);
  console.log('');

  // ----- Word Scramble -----
  showLine('─', 50);
  console.log(`${GREEN}${BOLD}  🔤 WORD SCRAMBLE${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.wordScramble.gamesPlayed);
  showScore('Words Guessed', stats.wordScramble.wordsGuessed);
  showScore('Total Points', stats.wordScramble.totalPoints);
  console.log('');

  // ----- Dice Duel -----
  showLine('─', 50);
  console.log(`${MAGENTA}${BOLD}  🎲 DICE DUEL${RESET}`);
  showLine('─', 50);
  showScore('Games Played', stats.diceDuel.gamesPlayed);
  showScore('Wins', stats.diceDuel.wins);
  showScore('Losses', stats.diceDuel.losses);
  showScore('Draws', stats.diceDuel.draws);
  console.log('');

  showLine('═', 50);
}
