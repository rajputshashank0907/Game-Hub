// ============================================================
// statistics.test.js — Automated Tests for Player Statistics
// ============================================================
// Tests stats persistence, serialization, error recovery, deep
// merge for schema upgrades, and reset functionality.
// ============================================================

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

import {
  DEFAULT_STATS,
  STATS_FILE,
  loadStats,
  saveStats,
  resetStats,
} from '../src/utils/stats.js';

describe('Player Statistics Manager', () => {
  let backupContent = null;
  const backupPath = `${STATS_FILE}.test_backup`;

  beforeEach(() => {
    // Backup existing stats file if present
    if (fs.existsSync(STATS_FILE)) {
      backupContent = fs.readFileSync(STATS_FILE, 'utf-8');
      fs.copyFileSync(STATS_FILE, backupPath);
    } else {
      backupContent = null;
    }
  });

  afterEach(() => {
    // Restore backed-up stats file if it existed
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, STATS_FILE);
      fs.unlinkSync(backupPath);
    } else if (fs.existsSync(STATS_FILE) && backupContent === null) {
      fs.unlinkSync(STATS_FILE);
    }
  });

  it('DEFAULT_STATS contains all mini-game sections with initial zero counters', () => {
    assert.equal(DEFAULT_STATS.totalGamesPlayed, 0);
    assert.equal(DEFAULT_STATS.totalPoints, 0);

    assert.ok(DEFAULT_STATS.numberGuessing);
    assert.equal(DEFAULT_STATS.numberGuessing.gamesPlayed, 0);
    assert.equal(DEFAULT_STATS.numberGuessing.gamesWon, 0);

    assert.ok(DEFAULT_STATS.rockPaperScissors);
    assert.equal(DEFAULT_STATS.rockPaperScissors.gamesPlayed, 0);

    assert.ok(DEFAULT_STATS.quizMaster);
    assert.equal(DEFAULT_STATS.quizMaster.gamesPlayed, 0);

    assert.ok(DEFAULT_STATS.ticTacToe);
    assert.equal(DEFAULT_STATS.ticTacToe.gamesPlayed, 0);

    assert.ok(DEFAULT_STATS.wordScramble);
    assert.equal(DEFAULT_STATS.wordScramble.gamesPlayed, 0);

    assert.ok(DEFAULT_STATS.diceDuel);
    assert.equal(DEFAULT_STATS.diceDuel.gamesPlayed, 0);
  });

  it('resetStats returns an independent deep clone of DEFAULT_STATS', () => {
    const stats1 = resetStats();
    const stats2 = resetStats();

    stats1.totalPoints = 999;
    stats1.ticTacToe.wins = 10;

    assert.equal(stats2.totalPoints, 0);
    assert.equal(stats2.ticTacToe.wins, 0);
    assert.equal(DEFAULT_STATS.totalPoints, 0);
  });

  it('saveStats and loadStats correctly write to disk and read back faithfully', () => {
    const sample = resetStats();
    sample.totalGamesPlayed = 15;
    sample.totalPoints = 450;
    sample.numberGuessing.gamesWon = 5;
    sample.numberGuessing.bestScore = 150;
    sample.rockPaperScissors.wins = 7;
    sample.ticTacToe.wins = 3;

    saveStats(sample);

    const loaded = loadStats();
    assert.equal(loaded.totalGamesPlayed, 15);
    assert.equal(loaded.totalPoints, 450);
    assert.equal(loaded.numberGuessing.gamesWon, 5);
    assert.equal(loaded.numberGuessing.bestScore, 150);
    assert.equal(loaded.rockPaperScissors.wins, 7);
    assert.equal(loaded.ticTacToe.wins, 3);
  });

  it('loadStats handles corrupt JSON files safely without crashing or throwing', () => {
    // Write malformed JSON
    fs.mkdirSync(path.dirname(STATS_FILE), { recursive: true });
    fs.writeFileSync(STATS_FILE, '{ corrupted: "json content without close... }', 'utf-8');

    // Should not throw, should return safe default stats
    const recovered = loadStats();
    assert.ok(recovered);
    assert.equal(recovered.totalGamesPlayed, 0);
    assert.equal(recovered.totalPoints, 0);
    assert.ok(recovered.ticTacToe);
  });

  it('loadStats handles missing file gracefully (ENOENT)', () => {
    if (fs.existsSync(STATS_FILE)) {
      fs.unlinkSync(STATS_FILE);
    }

    const fresh = loadStats();
    assert.ok(fresh);
    assert.equal(fresh.totalGamesPlayed, 0);
    assert.equal(fresh.totalPoints, 0);
  });

  it('loadStats merges missing fields from defaults for partial / outdated files', () => {
    // Save an outdated stats schema lacking wordScramble and diceDuel
    const partialStats = {
      totalGamesPlayed: 5,
      totalPoints: 100,
      numberGuessing: { gamesPlayed: 5, gamesWon: 2, bestScore: 60, totalPoints: 100 },
    };

    fs.mkdirSync(path.dirname(STATS_FILE), { recursive: true });
    fs.writeFileSync(STATS_FILE, JSON.stringify(partialStats), 'utf-8');

    const upgraded = loadStats();
    // Existing values preserved
    assert.equal(upgraded.totalGamesPlayed, 5);
    assert.equal(upgraded.totalPoints, 100);
    assert.equal(upgraded.numberGuessing.bestScore, 60);

    // Missing fields filled with default values
    assert.ok(upgraded.rockPaperScissors);
    assert.ok(upgraded.quizMaster);
    assert.ok(upgraded.ticTacToe);
    assert.ok(upgraded.wordScramble);
    assert.ok(upgraded.diceDuel);
    assert.equal(upgraded.diceDuel.gamesPlayed, 0);
  });
});
