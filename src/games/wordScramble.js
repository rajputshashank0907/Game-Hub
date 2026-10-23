// ============================================
// 🔤 Word Scramble Game
// Unscramble the letters to guess the word!
// ============================================

import { showGameTitle, clearScreen } from '../utils/display.js';
import { askQuestion, askChoice } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';
import chalk from 'chalk';

// ── Word list with hints ──
const WORDS = [
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
 * Scramble a word using the Fisher-Yates shuffle.
 * If the result happens to equal the original, re-shuffle (up to 10 tries).
 */
function scrambleWord(word) {
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Split the word into an array of characters
    const chars = word.split('');

    // Fisher-Yates shuffle (from the end to the beginning)
    for (let i = chars.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i); // random index 0..i
      // Swap chars[i] and chars[j]
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    const scrambled = chars.join('');

    // Only accept if the scrambled version differs from the original
    if (scrambled !== word) {
      return scrambled;
    }
  }

  // Fallback — just reverse if all attempts matched (very unlikely)
  return word.split('').reverse().join('');
}

/**
 * Main game entry point.
 * @param {object} stats — the player's persistent stats object
 * @returns {object} updated stats
 */
export async function playWordScramble(stats) {
  let playAgain = true;

  while (playAgain) {
    clearScreen();
    showGameTitle('🔤 Word Scramble');

    // ── Pick a random word ──
    const entry = WORDS[getRandomInt(0, WORDS.length - 1)];
    const { word, hint } = entry;
    const scrambled = scrambleWord(word);

    // ── Display the scrambled word ──
    console.log(
      chalk.white('  Unscramble the following word:\n')
    );
    console.log(
      chalk.cyan.bold(`    ${scrambled.toUpperCase()}\n`)
    );
    console.log(
      chalk.gray(`  💡 Hint: ${hint}\n`)
    );

    // ── Points based on attempt number ──
    const pointsByAttempt = [30, 20, 10];
    const maxAttempts = 3;
    let correct = false;
    let earnedPoints = 0;

    // ── Give the player 3 attempts ──
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const remaining = maxAttempts - attempt;
      console.log(
        chalk.dim(`  Attempts remaining: ${remaining}`)
      );

      const guess = await askQuestion('Your guess');

      // Compare case-insensitively
      if (guess.trim().toLowerCase() === word.toLowerCase()) {
        correct = true;
        earnedPoints = pointsByAttempt[attempt];
        console.log();
        console.log(
          chalk.green.bold(`  🎉 Correct! The word was "${word}".`)
        );
        console.log(
          chalk.green(`  You earned ${earnedPoints} points!\n`)
        );
        break;
      } else if (attempt < maxAttempts - 1) {
        // Wrong, but more attempts left
        console.log(
          chalk.red(`  ❌ Wrong! Try again.\n`)
        );
      } else {
        // Last attempt — game over
        console.log();
        console.log(
          chalk.red.bold(`  😞 Out of attempts!`)
        );
        console.log(
          chalk.yellow(`  The correct word was: "${word}"\n`)
        );
      }
    }

    // ── Update stats ──
    if (!stats.wordScramble) {
      stats.wordScramble = {
        gamesPlayed: 0,
        wordsGuessed: 0,
        totalPoints: 0,
      };
    }
    stats.wordScramble.gamesPlayed++;
    stats.totalGamesPlayed = (stats.totalGamesPlayed || 0) + 1;

    if (correct) {
      stats.wordScramble.wordsGuessed++;
      stats.wordScramble.totalPoints += earnedPoints;
    }

    // ── Play again? ──
    const again = await askChoice('Play again? (y/n)', ['y', 'n']);
    playAgain = again === 'y';
  }

  return stats;
}
