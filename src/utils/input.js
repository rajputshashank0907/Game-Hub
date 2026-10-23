// ============================================================
// input.js — Terminal Input Utilities
// ============================================================
// This module handles all user input from the terminal using
// Node.js readline/promises. It provides helpers for asking
// questions, validating numbers, choosing from options, and
// yes/no confirmations. Includes robust EOF and SIGINT handling.
// ============================================================

import * as readline from 'readline/promises';
import { showError } from './display.js';

// Shared Readline Interface (Lazy Initialized)
let rl = null;
let isClosed = false;

export function getReadlineInterface() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('close', () => {
      isClosed = true;
    });
  }
  return rl;
}

// ============================================================
// askQuestion — Ask the user a question and return their answer
// ============================================================
// Handles EOF (Ctrl+D) and closed streams cleanly without hanging.
// @param  {string} prompt — The question to display
// @returns {Promise<string>} The user's trimmed response
// ============================================================
export async function askQuestion(prompt) {
  if (isClosed) {
    process.exit(0);
  }

  const activeRL = getReadlineInterface();

  return new Promise((resolve) => {
    let settled = false;

    const onClose = () => {
      if (!settled) {
        settled = true;
        isClosed = true;
        // Graceful exit on EOF
        process.exit(0);
      }
    };

    activeRL.once('close', onClose);

    activeRL.question(prompt).then(
      (answer) => {
        if (!settled) {
          settled = true;
          activeRL.removeListener('close', onClose);
          resolve(answer.trim());
        }
      },
      () => {
        if (!settled) {
          settled = true;
          activeRL.removeListener('close', onClose);
          isClosed = true;
          process.exit(0);
        }
      }
    );
  });
}

// ============================================================
// askNumber — Ask for a number within a specific range
// ============================================================
// Keeps prompting until the user enters a valid integer
// that falls within [min, max].
//
// @param  {string} prompt — The question to display
// @param  {number} min    — Minimum allowed value (inclusive)
// @param  {number} max    — Maximum allowed value (inclusive)
// @returns {Promise<number>} A valid integer in [min, max]
// ============================================================
export async function askNumber(prompt, min, max) {
  while (true) {
    const input = await askQuestion(prompt);
    const num = Number(input.trim());

    // Check if it's a valid integer and within bounds
    if (input.trim() !== '' && !isNaN(num) && Number.isInteger(num) && num >= min && num <= max) {
      return num;
    }

    showError(`Please enter a valid whole number between ${min} and ${max}.`);
  }
}

// ============================================================
// askChoice — Ask the user to pick from a set of valid choices
// ============================================================
// Loops until the user enters one of the valid options.
// Comparison is case-insensitive; the returned value is lowercase.
//
// @param  {string}   prompt       — The question to display
// @param  {string[]} validChoices — Array of acceptable answers
// @returns {Promise<string>} The user's choice (lowercase)
// ============================================================
export async function askChoice(prompt, validChoices) {
  const lowerChoices = validChoices.map((c) => String(c).toLowerCase());

  while (true) {
    const input = await askQuestion(prompt);
    const normalized = input.trim().toLowerCase();

    if (lowerChoices.includes(normalized)) {
      return normalized;
    }

    showError(`Invalid choice. Valid options: ${validChoices.join(', ')}`);
  }
}

// ============================================================
// askYesNo — Ask a yes/no question
// ============================================================
// Keeps prompting until the user enters 'y' or 'n'.
//
// @param  {string} prompt — The question to display
// @returns {Promise<boolean>} true for 'y', false for 'n'
// ============================================================
export async function askYesNo(prompt) {
  while (true) {
    const input = await askQuestion(`${prompt} (y/n): `);
    const normalized = input.trim().toLowerCase();

    if (normalized === 'y' || normalized === 'yes') {
      return true;
    }
    if (normalized === 'n' || normalized === 'no') {
      return false;
    }

    showError('Please enter "y" for yes or "n" for no.');
  }
}

// ============================================================
// waitForEnter — Pause until the user presses Enter
// ============================================================
// @param {string} msg — The message to display (default provided)
// ============================================================
export async function waitForEnter(msg = 'Press Enter to continue...') {
  await askQuestion(`\n  ${msg}`);
}

// ============================================================
// closeInput — Closes the readline interface
// ============================================================
// Call this when the app is shutting down to clean up resources.
// ============================================================
export function closeInput() {
  if (rl) {
    isClosed = true;
    rl.close();
    rl = null;
  }
}
