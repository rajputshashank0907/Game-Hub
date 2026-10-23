// ============================================================
// wordScramble.js — 🔤 Word Scramble Game
// ============================================================
// Unscramble the letters to guess the word!
// Demonstrates: string manipulation, arrays, Fisher-Yates shuffle,
// loop control, and scoring.
// ============================================================

import {
  showGameTitle, showSuccess, showError, showWarning, showInfo,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askQuestion, askChoice } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';

// ── Word list with hints (at least 15 technical / programming words) ──
export const WORDS = [
  { word: 'javascript', hint: 'A popular programming language for the web' },
  { word: 'computer', hint: 'An electronic device for processing data' },
  { word: 'keyboard', hint: 'Input device with keys for typing' },
  { word: 'algorithm', hint: 'A step-by-step procedure to solve a problem' },
  { word: 'database', hint: 'Organized collection of structured data' },
  { word: 'function', hint: 'A reusable block of code' },
  { word: 'variable', hint: 'A named container for storing data' },
  { word: 'terminal', hint: 'Text-based interface to interact with a computer' },
  { word: 'internet', hint: 'A global network connecting computers' },
  { word: 'software', hint: 'Programs and applications that run on a computer' },
  { word: 'hardware', hint: 'Physical components of a computer' },
  { word: 'compiler', hint: 'Translates source code to machine code' },
  { word: 'network', hint: 'System of interconnected computers' },
  { word: 'pixel', hint: 'Smallest unit of a digital image' },
  { word: 'server', hint: 'A computer that provides resources to other computers' },
  { word: 'browser', hint: 'Application used to access websites' },
  { word: 'program', hint: 'A set of instructions for a computer' },
  { word: 'syntax', hint: 'Rules governing the structure of code' },
];

/**
 * Pure function: Scramble a word using Fisher-Yates shuffle.
 * If the result happens to equal the original, re-shuffle (up to 10 tries).
 * Words with fewer than 2 distinct characters will return as-is.
 * @param {string} word - The word to scramble
 * @returns {string} Scrambled word
 */
export function scrambleWord(word) {
  // If word has fewer than 2 characters or all characters are identical
  const uniqueChars = new Set(word.toLowerCase().split(''));
  if (word.length <= 1 || uniqueChars.size <= 1) {
    return word;
  }

  const maxAttempts = 15;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const chars = word.split('');

    for (let i = chars.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    const scrambled = chars.join('');

    if (scrambled.toLowerCase() !== word.toLowerCase()) {
      return scrambled;
    }
  }

  // Fallback: reverse the word
  return word.split('').reverse().join('');
}

/**
 * Pure function: Calculate score based on attempt index (0, 1, 2).
 * @param {number} attemptIndex - 0 for 1st attempt, 1 for 2nd, 2 for 3rd
 * @returns {number} Points earned
 */
export function calculateScrambleScore(attemptIndex) {
  const points = [30, 20, 10];
  return points[attemptIndex] || 0;
}

/**
 * Main game entry point.
 * @param {object} stats — Player's persistent stats object
 * @returns {object} Updated stats
 */
export async function playWordScramble(stats) {
  let playAgain = true;

  while (playAgain) {
    showGameTitle('🔤 Word Scramble');

    // ── Pick a random word ──
    const entry = WORDS[getRandomInt(0, WORDS.length - 1)];
    const { word, hint } = entry;
    const scrambled = scrambleWord(word);

    // ── Display the scrambled word ──
    console.log(`${WHITE}  Unscramble the following word:${RESET}\n`);
    console.log(`${CYAN}${BOLD}    👉  ${scrambled.toUpperCase()}${RESET}\n`);
    console.log(`${YELLOW}  💡 Hint: ${hint}${RESET}\n`);

    const maxAttempts = 3;
    let correct = false;
    let earnedPoints = 0;

    // ── Give the player 3 attempts ──
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const remaining = maxAttempts - attempt;
      console.log(`${DIM}  Attempts remaining: ${remaining}${RESET}`);

      const guess = await askQuestion('  Your guess: ');

      // Compare case-insensitively and trimmed
      if (guess.trim().toLowerCase() === word.toLowerCase()) {
        correct = true;
        earnedPoints = calculateScrambleScore(attempt);
        console.log('');
        showSuccess(`Correct! The word was "${word}".`);
        showSuccess(`You earned ${earnedPoints} points!`);
        break;
      } else if (attempt < maxAttempts - 1) {
        showError('Wrong! Try again.\n');
      } else {
        console.log('');
        showError('Out of attempts!');
        console.log(`${YELLOW}  The correct word was: "${word}"${RESET}\n`);
      }
    }

    // ── Update stats ──
    if (!stats.wordScramble) {
      stats.wordScramble = { gamesPlayed: 0, wordsGuessed: 0, totalPoints: 0 };
    }
    stats.wordScramble.gamesPlayed++;
    stats.totalGamesPlayed++;

    if (correct) {
      stats.wordScramble.wordsGuessed++;
      stats.wordScramble.totalPoints += earnedPoints;
      stats.totalPoints += earnedPoints;
    }

    // ── Play again? ──
    console.log('');
    const again = await askChoice('  Play again? (y/n): ', ['y', 'n']);
    playAgain = again === 'y';
  }

  return stats;
}
