// ============================================================
// display.js — Terminal Display Formatting Utilities
// ============================================================
// This module handles all terminal display formatting including
// colors, banners, menus, messages, and styled text output.
// ============================================================

// ----- ANSI Color Codes -----
// These escape codes change the color/style of terminal text.
// Usage: `console.log(GREEN + "Success!" + RESET)`
export const RESET = '\x1b[0m';       // Reset all styles
export const BOLD = '\x1b[1m';        // Bold text
export const DIM = '\x1b[2m';         // Dimmed text
export const RED = '\x1b[31m';        // Red text
export const GREEN = '\x1b[32m';      // Green text
export const YELLOW = '\x1b[33m';     // Yellow text
export const BLUE = '\x1b[34m';       // Blue text
export const MAGENTA = '\x1b[35m';    // Magenta text
export const CYAN = '\x1b[36m';       // Cyan text
export const WHITE = '\x1b[37m';      // White text
export const BG_BLUE = '\x1b[44m';    // Blue background
export const BG_GREEN = '\x1b[42m';   // Green background
export const BG_RED = '\x1b[41m';     // Red background

// ============================================================
// clearScreen — Clears the entire terminal screen
// ============================================================
export function clearScreen() {
  // The ANSI escape sequence '\x1bc' resets and clears the terminal
  process.stdout.write('\x1bc');
}

// ============================================================
// showBanner — Displays the large ASCII art banner
// ============================================================
// Shows an impressive "TERMINAL GAME HUB" title with version
// info and a welcome message using box-drawing characters.
// ============================================================
export function showBanner() {
  const banner = `
${CYAN}${BOLD} ╔══════════════════════════════════════════════════════════╗
 ║                                                          ║
 ║   ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗     ║
 ║      ██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║     ║
 ║      ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║     ║
 ║      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║     ║
 ║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║     ║
 ║      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝  ║
 ║                                                          ║
 ║            ██████╗  █████╗ ███╗   ███╗███████╗           ║
 ║           ██╔════╝ ██╔══██╗████╗ ████║██╔════╝           ║
 ║           ██║  ███╗███████║██╔████╔██║█████╗             ║
 ║           ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝             ║
 ║           ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗          ║
 ║            ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝          ║
 ║                                                          ║
 ║              ██╗  ██╗██╗   ██╗██████╗                    ║
 ║              ██║  ██║██║   ██║██╔══██╗                   ║
 ║              ███████║██║   ██║██████╔╝                   ║
 ║              ██╔══██║██║   ██║██╔══██╗                   ║
 ║              ██║  ██║╚██████╔╝██████╔╝                   ║
 ║              ╚═╝  ╚═╝ ╚═════╝ ╚═════╝                   ║
 ║                                                          ║
 ║  ${YELLOW}        Version 1.0.0  •  Welcome, Player!${CYAN}             ║
 ╚══════════════════════════════════════════════════════════╝${RESET}
`;

  console.log(banner);
}

// ============================================================
// showLine — Draws a horizontal separator line
// ============================================================
// @param {string} char  — The character to repeat (default '═')
// @param {number} length — How many characters wide (default 60)
// ============================================================
export function showLine(char = '═', length = 60) {
  console.log(CYAN + char.repeat(length) + RESET);
}

// ============================================================
// showBoxedText — Displays text inside a decorative box
// ============================================================
// @param {string} text  — The text to display
// @param {string} color — Optional ANSI color code for the text
// ============================================================
export function showBoxedText(text, color = '') {
  const padding = 4;
  // Calculate the inner width based on text length + padding
  const innerWidth = text.length + padding;
  const topBorder = '╔' + '═'.repeat(innerWidth) + '╗';
  const bottomBorder = '╚' + '═'.repeat(innerWidth) + '╝';
  // Pad the text evenly inside the box
  const paddedText = '║' + ' '.repeat(padding / 2) + color + text + RESET + ' '.repeat(padding / 2) + '║';

  console.log(CYAN + topBorder + RESET);
  console.log(CYAN + paddedText);
  console.log(CYAN + bottomBorder + RESET);
}

// ============================================================
// Message helpers — Quick formatted messages
// ============================================================

/** Shows a green success message with a ✔ icon */
export function showSuccess(msg) {
  console.log(`${GREEN}${BOLD}  ✔ ${msg}${RESET}`);
}

/** Shows a red error message with a ✖ icon */
export function showError(msg) {
  console.log(`${RED}${BOLD}  ✖ ${msg}${RESET}`);
}

/** Shows a yellow warning message with a ⚠ icon */
export function showWarning(msg) {
  console.log(`${YELLOW}${BOLD}  ⚠ ${msg}${RESET}`);
}

/** Shows a cyan info message with a ℹ icon */
export function showInfo(msg) {
  console.log(`${CYAN}  ℹ ${msg}${RESET}`);
}

// ============================================================
// showGameTitle — Displays a game title with decorative borders
// ============================================================
// @param {string} title — The title of the game
// ============================================================
export function showGameTitle(title) {
  const width = 50;
  const titleLength = title.length;
  // Center the title within the available width
  const leftPad = Math.floor((width - titleLength) / 2);
  const rightPad = width - titleLength - leftPad;

  console.log('');
  console.log(`${MAGENTA}${BOLD}  ${'★'.repeat(width + 4)}${RESET}`);
  console.log(`${MAGENTA}${BOLD}  ★ ${' '.repeat(leftPad)}${YELLOW}${title}${MAGENTA}${' '.repeat(rightPad)} ★${RESET}`);
  console.log(`${MAGENTA}${BOLD}  ${'★'.repeat(width + 4)}${RESET}`);
  console.log('');
}

// ============================================================
// showScore — Displays a formatted score label and value
// ============================================================
// @param {string} label — Description of the score (e.g., "Points")
// @param {*}      value — The score value to display
// ============================================================
export function showScore(label, value) {
  console.log(`${CYAN}  ┃ ${WHITE}${BOLD}${label}: ${YELLOW}${value}${RESET}`);
}

// ============================================================
// showMenu — Displays a numbered menu inside a styled box
// ============================================================
// Options is an array of strings. Each is numbered starting at 1.
// If the last option starts with "Exit", "Back", or "Return",
// it's displayed as option #0 instead.
// ============================================================
// @param {string}   title   — The title above the menu
// @param {string[]} options — The list of menu choices
// ============================================================
export function showMenu(title, options) {
  // Determine if the last option is an "exit/back/return" option
  const lastOption = options[options.length - 1];
  const isLastSpecial =
    lastOption.startsWith('Exit') ||
    lastOption.startsWith('Back') ||
    lastOption.startsWith('Return');

  // Calculate the widest option text so we can size the box
  const numberedOptions = options.map((opt, i) => {
    if (isLastSpecial && i === options.length - 1) {
      return `  ${YELLOW}[0]${WHITE} ${opt}`;
    }
    return `  ${GREEN}[${i + 1}]${WHITE} ${opt}`;
  });

  // Build the box width from the title or longest option
  const rawLengths = options.map((opt, i) => {
    const num = (isLastSpecial && i === options.length - 1) ? '0' : `${i + 1}`;
    return `  [${num}] ${opt}`.length;
  });
  const maxContentLen = Math.max(title.length + 2, ...rawLengths);
  const boxWidth = maxContentLen + 6;

  // Draw the menu
  console.log('');
  console.log(`${CYAN}  ╔${'═'.repeat(boxWidth)}╗${RESET}`);

  // Title row — centered
  const titlePadLeft = Math.floor((boxWidth - title.length) / 2);
  const titlePadRight = boxWidth - title.length - titlePadLeft;
  console.log(`${CYAN}  ║${' '.repeat(titlePadLeft)}${BOLD}${YELLOW}${title}${RESET}${CYAN}${' '.repeat(titlePadRight)}║${RESET}`);

  // Separator under the title
  console.log(`${CYAN}  ╠${'═'.repeat(boxWidth)}╣${RESET}`);

  // Print each option
  for (const line of numberedOptions) {
    console.log(`${CYAN}  ║${RESET} ${line}${RESET}`);
  }

  // Bottom border
  console.log(`${CYAN}  ╚${'═'.repeat(boxWidth)}╝${RESET}`);
  console.log('');
}
