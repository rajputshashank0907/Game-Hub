// ============================================
// 🎲 Dice Duel Game
// Roll the dice and beat the computer!
// ============================================

import { showGameTitle, clearScreen } from '../utils/display.js';
import { askChoice, waitForEnter } from '../utils/input.js';
import { getRandomInt } from '../utils/random.js';
import chalk from 'chalk';

/**
 * Main game entry point.
 * @param {object} stats — the player's persistent stats object
 * @returns {object} updated stats
 */
export async function playDiceDuel(stats) {
  clearScreen();
  showGameTitle('🎲 Dice Duel');

  // ── Instructions ──
  console.log(chalk.white('  How to play:'));
  console.log(chalk.gray('  • You and the computer each roll a die (1–6).'));
  console.log(chalk.gray('  • The higher roll wins the round.'));
  console.log(chalk.gray('  • Equal rolls are a draw.'));
  console.log(chalk.gray('  • Play as many rounds as you like!\n'));

  // ── Session trackers ──
  let roundsPlayed = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  let keepPlaying = true;

  while (keepPlaying) {
    // Wait for the player to roll
    await waitForEnter('Press Enter to roll the dice... 🎲');

    // ── Roll dice for both sides ──
    const playerRoll = getRandomInt(1, 6);
    const computerRoll = getRandomInt(1, 6);

    // ── Display results ──
    console.log();
    console.log(chalk.cyan(`  🎲 Your Roll:     [ ${playerRoll} ]`));
    console.log(chalk.yellow(`  🎲 Computer Roll: [ ${computerRoll} ]`));
    console.log();

    // ── Determine round outcome ──
    if (playerRoll > computerRoll) {
      console.log(chalk.green.bold('  🎉 You win this round!\n'));
      wins++;
    } else if (playerRoll < computerRoll) {
      console.log(chalk.red.bold('  😞 Computer wins this round!\n'));
      losses++;
    } else {
      console.log(chalk.yellow.bold("  🤝 It's a draw!\n"));
      draws++;
    }

    roundsPlayed++;

    // ── Ask to continue ──
    const again = await askChoice('Roll again? (y/n)', ['y', 'n']);
    if (again === 'n') {
      keepPlaying = false;
    } else {
      console.log(); // spacing before next round
    }
  }

  // ── Session summary ──
  console.log();
  console.log(chalk.white.bold('  ═══════════════════════════════'));
  console.log(chalk.white.bold('        Session Summary'));
  console.log(chalk.white.bold('  ═══════════════════════════════'));
  console.log(chalk.white(`  Rounds played : ${roundsPlayed}`));
  console.log(chalk.green(`  Wins          : ${wins}`));
  console.log(chalk.red(`  Losses        : ${losses}`));
  console.log(chalk.yellow(`  Draws         : ${draws}`));
  console.log(chalk.white.bold('  ═══════════════════════════════\n'));

  // ── Update stats ──
  if (!stats.diceDuel) {
    stats.diceDuel = { gamesPlayed: 0, wins: 0, losses: 0, draws: 0 };
  }
  stats.diceDuel.gamesPlayed += roundsPlayed;
  stats.diceDuel.wins += wins;
  stats.diceDuel.losses += losses;
  stats.diceDuel.draws += draws;
  stats.totalGamesPlayed = (stats.totalGamesPlayed || 0) + roundsPlayed;

  await waitForEnter('Press Enter to return to the menu...');

  return stats;
}
