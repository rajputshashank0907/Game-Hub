// ============================================================
// random.js — Simple random utility functions
// ============================================================
// Provides helper functions for generating random numbers,
// shuffling arrays, and picking random elements.
// ============================================================

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min — The lower bound (inclusive).
 * @param {number} max — The upper bound (inclusive).
 * @returns {number} A random integer in [min, max].
 */
export function getRandomInt(min, max) {
  // Math.floor ensures we get a whole number,
  // and the +1 makes the max value inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a new array with the elements shuffled randomly.
 * Uses the Fisher-Yates (Knuth) shuffle algorithm.
 * The original array is NOT modified.
 * @param {Array} arr — The array to shuffle.
 * @returns {Array} A new shuffled copy of the array.
 */
export function shuffleArray(arr) {
  // Create a shallow copy so we don't mutate the original
  const shuffled = [...arr];

  // Fisher-Yates: walk backwards through the array,
  // swapping each element with a random earlier element
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at positions i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Returns a random element from the given array.
 * @param {Array} arr — The array to pick from.
 * @returns {*} A random element from the array.
 */
export function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}
