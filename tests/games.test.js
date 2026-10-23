// ============================================================
// games.test.js — Automated Unit Tests for All 6 Mini-Games
// ============================================================
// Tests pure game logic, win conditions, scoring, and AI behavior.
// ============================================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Import game logic modules
import { calculateNumberGuessingScore } from '../src/games/numberGuessing.js';
import { getRoundResult, CHOICE_MAP } from '../src/games/rockPaperScissors.js';
import questions from '../src/data/questions.js';
import {
  checkWinner,
  isDraw,
  getComputerMove,
  WIN_COMBOS,
} from '../src/games/ticTacToe.js';
import {
  scrambleWord,
  calculateScrambleScore,
  WORDS,
} from '../src/games/wordScramble.js';
import { getDiceResult, DICE_FACES } from '../src/games/diceDuel.js';

// ── Game 1: Number Guessing Challenge Tests ──────────────────
describe('Number Guessing Challenge Logic', () => {
  it('should calculate correct score for Easy difficulty (multiplier 1)', () => {
    // Easy: max 10 attempts. Used 1 attempt -> (10 - 1 + 1) * 10 * 1 = 100
    assert.equal(calculateNumberGuessingScore(1, 10, 1), 100);
    // Used 10 attempts -> (10 - 10 + 1) * 10 * 1 = 10
    assert.equal(calculateNumberGuessingScore(1, 10, 10), 10);
  });

  it('should calculate correct score for Medium difficulty (multiplier 2)', () => {
    // Medium: max 7 attempts. Used 1 attempt -> (7 - 1 + 1) * 10 * 2 = 140
    assert.equal(calculateNumberGuessingScore(2, 7, 1), 140);
    // Used 5 attempts -> (7 - 5 + 1) * 10 * 2 = 60
    assert.equal(calculateNumberGuessingScore(2, 7, 5), 60);
  });

  it('should calculate correct score for Hard difficulty (multiplier 3)', () => {
    // Hard: max 5 attempts. Used 1 attempt -> (5 - 1 + 1) * 10 * 3 = 150
    assert.equal(calculateNumberGuessingScore(3, 5, 1), 150);
    // Used 5 attempts -> (5 - 5 + 1) * 10 * 3 = 30
    assert.equal(calculateNumberGuessingScore(3, 5, 5), 30);
  });
});

// ── Game 2: Rock Paper Scissors Tests ─────────────────────────
describe('Rock Paper Scissors Logic', () => {
  it('should correctly evaluate all Player Win combinations', () => {
    assert.equal(getRoundResult('r', 's'), 'win'); // Rock crushes Scissors
    assert.equal(getRoundResult('p', 'r'), 'win'); // Paper covers Rock
    assert.equal(getRoundResult('s', 'p'), 'win'); // Scissors cuts Paper
  });

  it('should correctly evaluate all Player Loss combinations', () => {
    assert.equal(getRoundResult('r', 'p'), 'loss'); // Paper covers Rock
    assert.equal(getRoundResult('p', 's'), 'loss'); // Scissors cuts Paper
    assert.equal(getRoundResult('s', 'r'), 'loss'); // Rock crushes Scissors
  });

  it('should correctly evaluate all Draw combinations', () => {
    assert.equal(getRoundResult('r', 'r'), 'draw');
    assert.equal(getRoundResult('p', 'p'), 'draw');
    assert.equal(getRoundResult('s', 's'), 'draw');
  });

  it('should define valid choices map', () => {
    assert.ok(CHOICE_MAP.r);
    assert.ok(CHOICE_MAP.p);
    assert.ok(CHOICE_MAP.s);
  });
});

// ── Game 3: Quiz Master Tests ─────────────────────────────────
describe('Quiz Master Data & Question Bank', () => {
  it('should contain at least 15 questions (found ' + questions.length + ')', () => {
    assert.ok(questions.length >= 15);
  });

  it('every question should have non-empty prompt, 4 options, and valid answer key', () => {
    const validKeys = new Set(['a', 'b', 'c', 'd']);

    for (const q of questions) {
      assert.ok(typeof q.question === 'string' && q.question.trim().length > 0);
      assert.equal(q.options.length, 4);
      assert.ok(validKeys.has(q.answer));

      // Verify that the answer points to an existing option
      const answerIndex = q.answer.charCodeAt(0) - 'a'.charCodeAt(0);
      assert.ok(q.options[answerIndex]);
    }
  });
});

// ── Game 4: Tic-Tac-Toe Tests ─────────────────────────────────
describe('Tic-Tac-Toe Logic', () => {
  it('should detect wins across all 3 rows', () => {
    // Row 1
    assert.equal(checkWinner(['X', 'X', 'X', '4', '5', '6', '7', '8', '9']), 'X');
    // Row 2
    assert.equal(checkWinner(['1', '2', '3', 'O', 'O', 'O', '7', '8', '9']), 'O');
    // Row 3
    assert.equal(checkWinner(['1', '2', '3', '4', '5', '6', 'X', 'X', 'X']), 'X');
  });

  it('should detect wins across all 3 columns', () => {
    // Column 1
    assert.equal(checkWinner(['O', '2', '3', 'O', '5', '6', 'O', '8', '9']), 'O');
    // Column 2
    assert.equal(checkWinner(['1', 'X', '3', '4', 'X', '6', '7', 'X', '9']), 'X');
    // Column 3
    assert.equal(checkWinner(['1', '2', 'O', '4', '5', 'O', '7', '8', 'O']), 'O');
  });

  it('should detect wins across both diagonals', () => {
    // Top-left to bottom-right
    assert.equal(checkWinner(['X', '2', '3', '4', 'X', '6', '7', '8', 'X']), 'X');
    // Top-right to bottom-left
    assert.equal(checkWinner(['1', '2', 'O', '4', 'O', '6', 'O', '8', '9']), 'O');
  });

  it('should return null when no player has won yet', () => {
    const freshBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    assert.equal(checkWinner(freshBoard), null);

    const ongoingBoard = ['X', 'O', 'X', '4', '5', '6', '7', '8', '9'];
    assert.equal(checkWinner(ongoingBoard), null);
  });

  it('should detect a draw correctly when the board is full and no winner', () => {
    // Cat's game (draw)
    const drawBoard = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X',
    ];
    assert.equal(checkWinner(drawBoard), null);
    assert.equal(isDraw(drawBoard), true);
  });

  it('should NOT report draw on incomplete boards', () => {
    const incompleteBoard = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', '9',
    ];
    assert.equal(isDraw(incompleteBoard), false);
  });

  it('Computer AI should take an immediate winning move', () => {
    // Computer is 'O', has positions 0 and 1, position 2 is open
    const board = ['O', 'O', '3', 'X', 'X', '6', '7', '8', '9'];
    const move = getComputerMove(board);
    assert.equal(move, 2); // Takes index 2 (position 3) to win
  });

  it('Computer AI should block an immediate player win', () => {
    // Player 'X' has positions 0 and 1, computer must block index 2
    const board = ['X', 'X', '3', '4', 'O', '6', '7', '8', '9'];
    const move = getComputerMove(board);
    assert.equal(move, 2); // Blocks position 3
  });

  it('Computer AI should take center if available when no immediate win/block', () => {
    const board = ['X', '2', '3', '4', '5', '6', '7', '8', '9'];
    const move = getComputerMove(board);
    assert.equal(move, 4); // Index 4 is center position 5
  });
});

// ── Game 5: Word Scramble Tests ───────────────────────────────
describe('Word Scramble Logic', () => {
  it('should have at least 15 words in the vocabulary pool', () => {
    assert.ok(WORDS.length >= 15);
  });

  it('every word entry should have a word and a descriptive hint', () => {
    for (const item of WORDS) {
      assert.ok(typeof item.word === 'string' && item.word.length >= 3);
      assert.ok(typeof item.hint === 'string' && item.hint.length > 5);
    }
  });

  it('scrambleWord should return a scrambled string of the same length and letters', () => {
    const original = 'javascript';
    const scrambled = scrambleWord(original);

    assert.equal(scrambled.length, original.length);
    assert.notEqual(scrambled, original);

    // Verify same character distribution
    const sortChars = (s) => s.split('').sort().join('');
    assert.equal(sortChars(scrambled), sortChars(original));
  });

  it('scrambleWord handles single-char or homogenous strings gracefully', () => {
    assert.equal(scrambleWord('a'), 'a');
    assert.equal(scrambleWord('aaa'), 'aaa');
  });

  it('calculateScrambleScore awards 30, 20, 10 points based on attempt', () => {
    assert.equal(calculateScrambleScore(0), 30); // 1st attempt
    assert.equal(calculateScrambleScore(1), 20); // 2nd attempt
    assert.equal(calculateScrambleScore(2), 10); // 3rd attempt
    assert.equal(calculateScrambleScore(3), 0);  // out of attempts
  });
});

// ── Game 6: Dice Duel Tests ───────────────────────────────────
describe('Dice Duel Logic', () => {
  it('should correctly evaluate win, loss, and draw rolls', () => {
    assert.equal(getDiceResult(6, 4), 'win');
    assert.equal(getDiceResult(2, 5), 'loss');
    assert.equal(getDiceResult(3, 3), 'draw');
  });

  it('should have visual ASCII faces for numbers 1 through 6', () => {
    for (let i = 1; i <= 6; i++) {
      assert.ok(DICE_FACES[i]);
      assert.equal(DICE_FACES[i].length, 5); // 5-line height for each face
    }
  });
});
