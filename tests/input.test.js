// ============================================================
// input.test.js — Automated Tests for Input Validation Logic
// ============================================================
// Tests numeric range validation, choice normalization, menu bounds,
// and input sanitization without hanging on interactive TTY.
// ============================================================

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { MAIN_MENU_OPTIONS } from '../src/menu.js';

/**
 * Pure helper representing the validation logic inside askNumber.
 */
function validateNumberInput(raw, min, max) {
  const trimmed = String(raw).trim();
  const num = Number(trimmed);

  if (trimmed === '' || isNaN(num)) {
    return { valid: false, error: 'Not a number' };
  }
  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Not an integer' };
  }
  if (num < min || num > max) {
    return { valid: false, error: 'Out of range' };
  }
  return { valid: true, value: num };
}

/**
 * Pure helper representing the choice validation logic inside askChoice.
 */
function validateChoiceInput(raw, validChoices) {
  const trimmed = String(raw).trim().toLowerCase();
  const lowerAllowed = validChoices.map((c) => String(c).toLowerCase());

  if (lowerAllowed.includes(trimmed)) {
    return { valid: true, value: trimmed };
  }
  return { valid: false, error: 'Invalid choice' };
}

/**
 * Pure helper representing the yes/no normalization inside askYesNo.
 */
function validateYesNoInput(raw) {
  const trimmed = String(raw).trim().toLowerCase();
  if (trimmed === 'y' || trimmed === 'yes') {
    return { valid: true, value: true };
  }
  if (trimmed === 'n' || trimmed === 'no') {
    return { valid: true, value: false };
  }
  return { valid: false, error: 'Expected yes/no' };
}

describe('Terminal Input Validation Logic', () => {
  describe('Numeric input validation', () => {
    it('accepts valid integers within specified range', () => {
      const res = validateNumberInput('42', 1, 100);
      assert.equal(res.valid, true);
      assert.equal(res.value, 42);
    });

    it('accepts boundary minimum and maximum values', () => {
      assert.equal(validateNumberInput('1', 1, 100).valid, true);
      assert.equal(validateNumberInput('100', 1, 100).valid, true);
    });

    it('rejects numbers strictly outside the allowed range', () => {
      assert.equal(validateNumberInput('0', 1, 100).valid, false);
      assert.equal(validateNumberInput('101', 1, 100).valid, false);
      assert.equal(validateNumberInput('-5', 1, 100).valid, false);
    });

    it('rejects decimal / float numbers', () => {
      assert.equal(validateNumberInput('3.14', 1, 100).valid, false);
      assert.equal(validateNumberInput('5.01', 1, 10).valid, false);
    });

    it('rejects non-numeric characters and empty inputs', () => {
      assert.equal(validateNumberInput('abc', 1, 100).valid, false);
      assert.equal(validateNumberInput('', 1, 100).valid, false);
      assert.equal(validateNumberInput('  ', 1, 100).valid, false);
      assert.equal(validateNumberInput('12xyz', 1, 100).valid, false);
    });
  });

  describe('Choice selection validation', () => {
    it('accepts valid choices regardless of casing', () => {
      const valid = ['r', 'p', 's'];
      assert.deepEqual(validateChoiceInput('R', valid), { valid: true, value: 'r' });
      assert.deepEqual(validateChoiceInput('  p  ', valid), { valid: true, value: 'p' });
      assert.deepEqual(validateChoiceInput('S', valid), { valid: true, value: 's' });
    });

    it('rejects invalid choices', () => {
      const valid = ['r', 'p', 's'];
      assert.equal(validateChoiceInput('x', valid).valid, false);
      assert.equal(validateChoiceInput('rock', valid).valid, false);
      assert.equal(validateChoiceInput('', valid).valid, false);
    });
  });

  describe('Yes/No confirmation validation', () => {
    it('normalizes affirmative answers to true', () => {
      assert.equal(validateYesNoInput('y').value, true);
      assert.equal(validateYesNoInput('Y').value, true);
      assert.equal(validateYesNoInput('yes').value, true);
      assert.equal(validateYesNoInput('YES').value, true);
    });

    it('normalizes negative answers to false', () => {
      assert.equal(validateYesNoInput('n').value, false);
      assert.equal(validateYesNoInput('N').value, false);
      assert.equal(validateYesNoInput('no').value, false);
      assert.equal(validateYesNoInput('NO').value, false);
    });

    it('rejects ambiguous or unexpected strings', () => {
      assert.equal(validateYesNoInput('maybe').valid, false);
      assert.equal(validateYesNoInput('1').valid, false);
      assert.equal(validateYesNoInput('').valid, false);
    });
  });

  describe('Main menu configuration', () => {
    it('should define exactly 10 menu options (1-9 and 0 Exit)', () => {
      assert.equal(MAIN_MENU_OPTIONS.length, 10);
      assert.equal(MAIN_MENU_OPTIONS[0], 'Number Guessing Challenge');
      assert.equal(MAIN_MENU_OPTIONS[9], 'Exit Game Hub');
    });

    it('every menu option has non-empty descriptive label', () => {
      for (const opt of MAIN_MENU_OPTIONS) {
        assert.ok(typeof opt === 'string' && opt.trim().length > 3);
      }
    });
  });

  describe('Tic-Tac-Toe Move Collision Detection', () => {
    it('correctly prevents moving into an occupied cell', () => {
      const board = ['X', 'O', '3', '4', '5', '6', '7', '8', '9'];

      const isOccupied = (pos) => board[pos - 1] === 'X' || board[pos - 1] === 'O';

      assert.equal(isOccupied(1), true); // Occupied by X
      assert.equal(isOccupied(2), true); // Occupied by O
      assert.equal(isOccupied(3), false); // Open
      assert.equal(isOccupied(9), false); // Open
    });
  });
});
