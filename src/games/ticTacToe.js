// ============================================================
// ticTacToe.js — ❌⭕ Tic-Tac-Toe Game
// ============================================================
// Play against the computer or a friend in 2-player local mode.
// Demonstrates: arrays, 2D coordinates / grid layout, smart AI logic,
// winning conditions evaluation, and turn management.
// ============================================================

import {
  showGameTitle, showSuccess, showError, showWarning, showInfo,
  CYAN, YELLOW, GREEN, WHITE, RED, BOLD, DIM, RESET,
} from '../utils/display.js';
import { askNumber, askChoice } from '../utils/input.js';

// ── All 8 winning combinations (indices into the 0-based board array) ──
export const WIN_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left → bottom-right
  [2, 4, 6], // diagonal top-right → bottom-left
];

/**
 * Display the 3×3 board with box-drawing characters.
 * Empty cells show their 1-based position number.
 * X is cyan, O is yellow.
 * @param {string[]} board - Array of 9 cells ('1'-'9' or 'X' / 'O')
 */
export function displayBoard(board) {
  console.log('');

  const styled = (val) => {
    if (val === 'X') return `${CYAN}${BOLD} X ${RESET}`;
    if (val === 'O') return `${YELLOW}${BOLD} O ${RESET}`;
    return `${DIM} ${val} ${RESET}`;
  };

  for (let row = 0; row < 3; row++) {
    const i = row * 3;
    const line = `    ${styled(board[i])}│${styled(board[i + 1])}│${styled(board[i + 2])}`;
    console.log(line);

    if (row < 2) {
      console.log(`${DIM}    ───┼───┼───${RESET}`);
    }
  }

  console.log('');
}

/**
 * Pure function: Check if there is a winner.
 * @param {string[]} board - 9-element array
 * @returns {'X' | 'O' | null}
 */
export function checkWinner(board) {
  for (const [a, b, c] of WIN_COMBOS) {
    if (board[a] === board[b] && board[b] === board[c]) {
      if (board[a] === 'X' || board[a] === 'O') {
        return board[a];
      }
    }
  }
  return null;
}

/**
 * Pure function: Check for a draw (board full, no winner).
 * @param {string[]} board - 9-element array
 * @returns {boolean}
 */
export function isDraw(board) {
  const isFull = board.every((cell) => cell === 'X' || cell === 'O');
  return isFull && !checkWinner(board);
}

/**
 * Pure function: Computer AI strategy.
 * Priority: 1) Win  2) Block  3) Center  4) Corner  5) Edge
 * @param {string[]} board - 9-element array
 * @returns {number | null} Index 0-8 to play
 */
export function getComputerMove(board) {
  // Helper: can `mark` win by playing at some position?
  const findWinningMove = (mark) => {
    for (const [a, b, c] of WIN_COMBOS) {
      const cells = [board[a], board[b], board[c]];
      const markCount = cells.filter((v) => v === mark).length;
      const emptyCount = cells.filter((v) => v !== 'X' && v !== 'O').length;

      if (markCount === 2 && emptyCount === 1) {
        for (const idx of [a, b, c]) {
          if (board[idx] !== 'X' && board[idx] !== 'O') return idx;
        }
      }
    }
    return null;
  };

  // 1. Can the computer win?
  const winMove = findWinningMove('O');
  if (winMove !== null) return winMove;

  // 2. Must the computer block the player?
  const blockMove = findWinningMove('X');
  if (blockMove !== null) return blockMove;

  // 3. Take center if available (index 4)
  if (board[4] !== 'X' && board[4] !== 'O') return 4;

  // 4. Take a corner (indices 0, 2, 6, 8)
  const corners = [0, 2, 6, 8];
  for (const idx of corners) {
    if (board[idx] !== 'X' && board[idx] !== 'O') return idx;
  }

  // 5. Take any edge (indices 1, 3, 5, 7)
  const edges = [1, 3, 5, 7];
  for (const idx of edges) {
    if (board[idx] !== 'X' && board[idx] !== 'O') return idx;
  }

  return null;
}

/**
 * Main game entry point.
 * @param {object} stats — Player's persistent stats object
 * @returns {object} Updated stats
 */
export async function playTicTacToe(stats) {
  let playAgain = true;

  while (playAgain) {
    showGameTitle('❌⭕ Tic-Tac-Toe');

    // ── Choose game mode ──
    console.log(`${CYAN}  Choose game mode:${RESET}\n`);
    console.log(`${GREEN}  1)${WHITE} Play vs Computer (Smart AI)${RESET}`);
    console.log(`${GREEN}  2)${WHITE} Play vs Another Player (Local 2P)${RESET}`);
    console.log('');

    const mode = await askNumber('  Enter your choice (1-2): ', 1, 2);
    const vsComputer = mode === 1;

    // ── Initialise fresh board (1-9 for empty cells) ──
    const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let currentMark = 'X'; // X always goes first
    let winner = null;
    let draw = false;

    // ── Game loop ──
    while (!winner && !draw) {
      displayBoard(board);

      const isComputerTurn = vsComputer && currentMark === 'O';

      if (isComputerTurn) {
        console.log(`${YELLOW}  🤖 Computer is thinking...${RESET}`);
        // Small delay for realism
        await new Promise((r) => setTimeout(r, 500));

        const moveIdx = getComputerMove(board);
        board[moveIdx] = 'O';
        console.log(`${YELLOW}  Computer chose position ${moveIdx + 1}.${RESET}\n`);
      } else {
        const playerLabel = vsComputer
          ? 'Your'
          : currentMark === 'X'
          ? "Player 1's (X)"
          : "Player 2's (O)";

        let validMove = false;
        while (!validMove) {
          const pos = await askNumber(
            `  ${playerLabel} turn — pick a position (1-9): `,
            1,
            9
          );
          const idx = pos - 1;

          if (board[idx] === 'X' || board[idx] === 'O') {
            showError('That position is already taken! Try another one.');
          } else {
            board[idx] = currentMark;
            validMove = true;
          }
        }
      }

      // Check end conditions
      winner = checkWinner(board);
      if (!winner) draw = isDraw(board);

      // Switch turn
      currentMark = currentMark === 'X' ? 'O' : 'X';
    }

    // ── Show final board & result ──
    displayBoard(board);

    if (winner) {
      if (vsComputer) {
        if (winner === 'X') {
          showSuccess('🎉 You win! Congratulations!');
        } else {
          showError('😞 Computer wins! Better luck next time.');
        }
      } else {
        const winnerLabel = winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)';
        showSuccess(`🎉 ${winnerLabel} wins! Congratulations!`);
      }
    } else {
      showWarning("🤝 It's a draw!");
    }

    // ── Update stats (tracked for vs Computer games) ──
    if (vsComputer) {
      if (!stats.ticTacToe) {
        stats.ticTacToe = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
      }
      stats.ticTacToe.gamesPlayed++;
      stats.totalGamesPlayed++;

      if (winner === 'X') {
        stats.ticTacToe.wins++;
      } else if (winner === 'O') {
        stats.ticTacToe.losses++;
      } else {
        stats.ticTacToe.draws++;
      }
    }

    // ── Play again? ──
    console.log('');
    const again = await askChoice('  Play again? (y/n): ', ['y', 'n']);
    playAgain = again === 'y';
  }

  return stats;
}
