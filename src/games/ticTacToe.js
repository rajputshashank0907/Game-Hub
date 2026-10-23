// ============================================
// 🎮 Tic-Tac-Toe Game
// Play against the computer or a friend!
// ============================================

import { showGameTitle, clearScreen } from '../utils/display.js';
import { askNumber, askChoice, waitForEnter } from '../utils/input.js';
import chalk from 'chalk';

// ── All 8 winning combinations (indices into the 0-based board array) ──
const WIN_COMBOS = [
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
 */
function displayBoard(board) {
  console.log(); // blank line above

  // Helper: style a single cell value
  const styled = (val) => {
    if (val === 'X') return chalk.cyan.bold(' X ');
    if (val === 'O') return chalk.yellow.bold(' O ');
    // Empty cell → show position number (dimmed)
    return chalk.dim(` ${val} `);
  };

  // Row indices: 0-2, 3-5, 6-8
  for (let row = 0; row < 3; row++) {
    const i = row * 3;

    // Cell content
    const line =
      ` ${styled(board[i])}│${styled(board[i + 1])}│${styled(board[i + 2])} `;
    console.log(line);

    // Draw horizontal divider (except after last row)
    if (row < 2) {
      console.log(chalk.gray(' ───┼───┼─── '));
    }
  }

  console.log(); // blank line below
}

/**
 * Check if there is a winner.
 * @returns {'X' | 'O' | null}
 */
function checkWinner(board) {
  for (const [a, b, c] of WIN_COMBOS) {
    if (board[a] === board[b] && board[b] === board[c]) {
      // board[a] is 'X' or 'O' (not a position number)
      if (board[a] === 'X' || board[a] === 'O') {
        return board[a];
      }
    }
  }
  return null;
}

/**
 * Check for a draw (board full, no winner).
 */
function isDraw(board) {
  return board.every((cell) => cell === 'X' || cell === 'O') && !checkWinner(board);
}

/**
 * Simple but smart computer AI.
 * Priority: 1) Win  2) Block  3) Center  4) Corner  5) Edge
 */
function getComputerMove(board) {
  // Helper: can `mark` win by playing at some position?
  const findWinningMove = (mark) => {
    for (const [a, b, c] of WIN_COMBOS) {
      const cells = [board[a], board[b], board[c]];
      // Two of the three cells are `mark`, and the third is still a number
      if (
        cells.filter((v) => v === mark).length === 2 &&
        cells.filter((v) => v !== 'X' && v !== 'O').length === 1
      ) {
        // Return the empty index
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

  // Shouldn't reach here if the board isn't full
  return null;
}

/**
 * Main game entry point.
 * @param {object} stats — the player's persistent stats object
 * @returns {object} updated stats
 */
export async function playTicTacToe(stats) {
  let playAgain = true;

  while (playAgain) {
    clearScreen();
    showGameTitle('❌⭕ Tic-Tac-Toe');

    // ── Choose game mode ──
    console.log(chalk.white('  Choose game mode:\n'));
    console.log(chalk.cyan('  1.') + ' Play vs Computer');
    console.log(chalk.cyan('  2.') + ' Play vs Another Player');
    console.log();

    const mode = await askNumber('Enter your choice (1-2)', 1, 2);
    const vsComputer = mode === 1;

    // ── Initialise a fresh board (1-9 for empty cells) ──
    // Using strings '1'–'9' so every cell is a string.
    const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let currentMark = 'X'; // X always goes first
    let winner = null;
    let draw = false;

    // ── Game loop ──
    while (!winner && !draw) {
      displayBoard(board);

      const isComputerTurn = vsComputer && currentMark === 'O';

      if (isComputerTurn) {
        // Computer's turn
        console.log(chalk.yellow('  🤖 Computer is thinking...\n'));
        // Small delay so player can see the message
        await new Promise((r) => setTimeout(r, 600));

        const moveIdx = getComputerMove(board);
        board[moveIdx] = 'O';
        console.log(chalk.yellow(`  Computer chose position ${moveIdx + 1}\n`));
      } else {
        // Human turn
        const playerLabel =
          vsComputer
            ? 'Your'
            : currentMark === 'X'
              ? "Player 1's (X)"
              : "Player 2's (O)";

        let validMove = false;
        while (!validMove) {
          const pos = await askNumber(
            `${playerLabel} turn — pick a position (1-9)`,
            1,
            9
          );
          const idx = pos - 1;

          if (board[idx] === 'X' || board[idx] === 'O') {
            console.log(chalk.red('  ⚠  That position is already taken! Try again.\n'));
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
          console.log(chalk.green.bold('  🎉 You win! Congratulations!\n'));
        } else {
          console.log(chalk.red.bold('  😞 Computer wins! Better luck next time.\n'));
        }
      } else {
        const winnerLabel = winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)';
        console.log(chalk.green.bold(`  🎉 ${winnerLabel} wins! Congratulations!\n`));
      }
    } else {
      console.log(chalk.yellow.bold("  🤝 It's a draw!\n"));
    }

    // ── Update stats (only for vs Computer games) ──
    if (vsComputer) {
      // Make sure sub-object exists
      if (!stats.ticTacToe) {
        stats.ticTacToe = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
      }
      stats.ticTacToe.gamesPlayed++;
      stats.totalGamesPlayed = (stats.totalGamesPlayed || 0) + 1;

      if (winner === 'X') {
        stats.ticTacToe.wins++;
      } else if (winner === 'O') {
        stats.ticTacToe.losses++;
      } else {
        stats.ticTacToe.draws++;
      }
    }

    // ── Play again? ──
    const again = await askChoice('Play again? (y/n)', ['y', 'n']);
    playAgain = again === 'y';
  }

  return stats;
}
