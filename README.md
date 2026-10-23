# 🎮 TERMINAL GAME HUB

**Project ID:** 2501010345  
**Version:** 1.0.0  
**License:** ISC  

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/rajputshashank0907/Game-Hub)
[![Run on Replit](https://replit.com/badge/github/rajputshashank0907/Game-Hub)](https://replit.com/github/rajputshashank0907/Game-Hub)

A comprehensive, professional, command-line gaming hub developed in modern JavaScript (ES Modules) for Node.js. Terminal Game Hub unifies six classic mini-games into a single interactive CLI application featuring persistent JSON-based player statistics, smart AI gameplay, robust input validation, and an ANSI-colored interface.

### 🌐 Live Interactive Terminal & Submission Links
- **GitHub Repository:** [https://github.com/rajputshashank0907/Game-Hub](https://github.com/rajputshashank0907/Game-Hub)
- **Live In-Browser Terminal (StackBlitz):** [https://stackblitz.com/github/rajputshashank0907/Game-Hub](https://stackblitz.com/github/rajputshashank0907/Game-Hub) *(Play directly in your web browser with zero installation)*
- **Interactive Cloud Environment (Replit):** [https://replit.com/github/rajputshashank0907/Game-Hub](https://replit.com/github/rajputshashank0907/Game-Hub)

---

## 📋 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Project Description & Objectives](#-project-description--objectives)
3. [Key Features](#-key-features)
4. [Technologies Used](#-technologies-used)
5. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
6. [macOS Installation & Setup Guide](#-macos-installation--setup-guide)
7. [How to Run the Application](#-how-to-run-the-application)
8. [Project Folder Structure](#-project-folder-structure)
9. [Detailed Gameplay Instructions](#-detailed-gameplay-instructions)
10. [Player Statistics & Persistent Storage](#-player-statistics--persistent-storage)
11. [Testing & Quality Assurance](#-testing--quality-assurance)
12. [Key Programming Concepts Demonstrated](#-key-programming-concepts-demonstrated)
13. [Limitations & Future Scope](#-limitations--future-scope)

---

## 📌 Problem Statement

In introductory computer science curricula and hobbyist coding, simple games (such as Number Guessing, Tic-Tac-Toe, or Rock Paper Scissors) are traditionally written as separate, isolated scripts. Players must locate, execute, and quit individual programs, losing all gameplay progress and scores upon exit.

**Terminal Game Hub** solves this fragmentation by consolidating multiple mini-games into a single, cohesive command-line suite. A unified menu drives game selection, while a centralized persistence layer tracks lifetime scores, win/loss records, and game-specific achievements in local JSON storage.

---

## 🎯 Project Description & Objectives

Terminal Game Hub is designed to be beginner-friendly, educational, robust, and presentation-ready.

### Primary Objectives:
- **Unified Interface:** Provide a single navigation loop where players launch games and return smoothly to the main menu without application crashes.
- **Pure Node.js Foundation:** Utilize Node.js built-in standard libraries (`readline/promises`, `fs`, `path`, `crypto`/random) avoiding external runtime dependencies for offline reliability.
- **Data Persistence:** Reliably load, update, and persist player statistics across game sessions using structured JSON storage.
- **Educational Value:** Serve as a clean, reference-quality codebase illustrating core programming concepts: control flow, functions, loops, arrays, objects, recursion, and error handling.
- **Fail-Safe Operation:** Rigorously validate terminal input against malformed values, type mismatches, out-of-range bounds, and stream interruption (`EOF` / `SIGINT`).

---

## ✨ Key Features

- **Stylized Terminal Presentation:** Custom ASCII-art banners, box-drawing characters (`╔═╗`, `│`, `─`), and standard ANSI color coding (Cyan, Yellow, Green, Magenta, Red).
- **Six Complete Mini-Games:**
  1. *Number Guessing Challenge* (Easy / Medium / Hard with dynamic multipliers)
  2. *Rock Paper Scissors* (Single Round & Best-of-3 Tournament Mode)
  3. *Quiz Master* (25-question bank, randomized 10-question rounds with performance grades)
  4. *Tic-Tac-Toe* (Local 2-Player or vs Smart Heuristic AI with win/block priorities)
  5. *Word Scramble* (Fisher-Yates shuffling with hints, 3-tier attempt scoring)
  6. *Dice Duel* (Fair six-sided dice simulation with side-by-side ASCII dice faces)
- **Persistent Player Statistics:** Tracks lifetime games, points, game-specific wins/losses/draws, best scores, and quiz accuracy.
- **Defensive Error Handling:** Automatic fallback and deep-merge recovery if the stats file is missing or corrupted.
- **Zero External Runtime Dependencies:** Runs natively on any modern Node.js installation.
- **Automated Test Suite:** 44 automated unit tests verifying pure game logic, collision detection, stats schema upgrades, and input validation.

---

## 🛠 Technologies Used

- **Runtime Environment:** Node.js (v18.0.0 or higher; developed on Node.js v24.x)
- **Language:** Modern JavaScript (ECMAScript 2022+ / ES Modules `import`/`export`)
- **CLI Input/Output:** Node.js native `readline/promises` & `process.stdin` / `process.stdout`
- **File System:** Node.js native `fs` and `path` modules
- **Data Serialization:** Standard JSON format (`storage/stats.json`)
- **Testing Framework:** Node.js built-in test runner (`node:test` and `node:assert/strict`)

---

## 💻 Prerequisites & System Requirements

- **Operating System:** macOS (Apple Silicon or Intel), Linux, or Windows.
- **Terminal:** Any standard terminal emulator supporting ANSI escape codes (macOS Terminal, iTerm2, VS Code Terminal).
- **Node.js:** Version 18.0.0 or higher.
- **NPM:** Version 9.0.0 or higher (packaged with Node.js).

---

## 🍏 macOS Installation & Setup Guide

### 1. Verify Node.js and NPM
Open Terminal (`/Applications/Utilities/Terminal.app`) and verify your installation:

```bash
node --version
npm --version
```

> **Note:** If Node.js is not installed, install it via [Homebrew](https://brew.sh):
> ```bash
> brew install node
> ```
> Alternatively, download the official macOS installer from [nodejs.org](https://nodejs.org).

### 2. Clone the Repository
```bash
git clone https://github.com/rajputshashank0907/Game-Hub.git
cd Game-Hub
```

### 3. Install Dependencies
Because Terminal Game Hub uses Node.js standard built-in modules, no external packages are required:
```bash
npm install
```

---

## 🚀 How to Run the Application

### Start the Game Hub:
```bash
npm start
```
*Or run directly via Node:*
```bash
node src/index.js
```

### Run the Automated Test Suite:
```bash
npm test
```

---

## 📂 Project Folder Structure

```
Game-Hub/
├── package.json                 # Project configuration, scripts, and ES module declaration
├── README.md                    # Comprehensive technical documentation & setup guide
├── PROJECT_REPORT.md            # Academic project report for university submission
├── .gitignore                   # Excludes node_modules, stats.json, and OS artifacts
├── src/
│   ├── index.js                 # Application entry point with uncaught error boundaries
│   ├── menu.js                  # Main navigation loop, options dispatcher, and About screen
│   ├── utils/
│   │   ├── display.js           # ANSI styling, ASCII art banner, boxes, borders, and menus
│   │   ├── input.js             # Readline wrappers: askNumber, askChoice, askYesNo, EOF guard
│   │   ├── random.js            # Random number generator, array shuffler, element picker
│   │   └── stats.js             # Stats persistence, JSON reading/writing, deep-merge recovery
│   ├── games/
│   │   ├── numberGuessing.js    # Game 1: Number Guessing Challenge
│   │   ├── rockPaperScissors.js # Game 2: Rock Paper Scissors (Single & Best-of-3)
│   │   ├── quizMaster.js        # Game 3: Quiz Master trivia engine
│   │   ├── ticTacToe.js         # Game 4: Tic-Tac-Toe (vs AI or 2P Local)
│   │   ├── wordScramble.js      # Game 5: Word Scramble with Fisher-Yates anagrams
│   │   └── diceDuel.js          # Game 6: Dice Duel with ASCII visual dice
│   └── data/
│       └── questions.js         # Curated 25-question bank covering multiple topics
├── storage/
│   ├── .gitkeep                 # Preserves directory in git tracking
│   └── stats.json               # Auto-generated persistent player statistics (git-ignored)
└── tests/
    ├── games.test.js            # Unit tests for scoring, win logic, AI, and anagrams
    ├── input.test.js            # Unit tests for validation ranges, choice parsing, collision
    └── statistics.test.js       # Unit tests for JSON persistence, corruption recovery, schema
```

---

## 🕹 Detailed Gameplay Instructions

### 1. Number Guessing Challenge
- The computer generates a secret integer between 1 and 100.
- Choose your difficulty:
  - **Easy:** 10 attempts (1× point multiplier)
  - **Medium:** 7 attempts (2× point multiplier)
  - **Hard:** 5 attempts (3× point multiplier)
- After each guess, feedback indicates whether you are **📈 Too high!** or **📉 Too low!**.
- Scoring Formula: `Multiplier × (Remaining Attempts + 1) × 10`.

### 2. Rock Paper Scissors
- Select either **Single Round** or **Best of 3** match mode.
- Input `r` (Rock), `p` (Paper), or `s` (Scissors).
- Classical rules apply: Rock beats Scissors, Scissors beats Paper, Paper beats Rock.
- In Best of 3 mode, the first competitor to reach 2 victories wins the match.

### 3. Quiz Master
- 10 randomized multiple-choice questions drawn from a 25-question bank spanning science, programming, history, math, and geography.
- Select `a`, `b`, `c`, or `d`.
- Immediate feedback reveals the correct answer upon mistakes.
- Final summary displays score, accuracy percentage, and awards +10 points per correct answer.

### 4. Tic-Tac-Toe
- Play on an interactive 3×3 grid using numbered positions `1` through `9`.
- Modes available:
  - **vs Computer:** Face an AI that prioritizes winning moves, blocks opponent win paths, secures center control, and seizes corners.
  - **Local 2-Player:** Alternate turns locally between Player 1 (`X`) and Player 2 (`O`).
- Occupied cells cannot be overwritten. All 8 winning lines (3 horizontal, 3 vertical, 2 diagonal) and draw states are detected automatically.

### 5. Word Scramble
- Unscramble a technical or computing term scrambled using the Fisher-Yates algorithm.
- An informative hint is provided alongside the puzzle.
- You have 3 attempts to solve:
  - Attempt 1: 30 points
  - Attempt 2: 20 points
  - Attempt 3: 10 points
- Guesses are case-insensitive and whitespace-trimmed.

### 6. Dice Duel
- Roll a fair six-sided die against the computer.
- Press `Enter` to roll; side-by-side ASCII dice faces render the resulting roll.
- Highest roll wins the round; ties register as draws.
- Session summaries track round tallies upon returning to the main menu.

---

## 💾 Player Statistics & Persistent Storage

Statistics are persisted automatically in `storage/stats.json`.

### Schema Structure:
```json
{
  "totalGamesPlayed": 12,
  "totalPoints": 340,
  "numberGuessing": {
    "gamesPlayed": 4,
    "gamesWon": 3,
    "bestScore": 120,
    "totalPoints": 220
  },
  "rockPaperScissors": {
    "gamesPlayed": 2,
    "wins": 1,
    "losses": 1,
    "draws": 0
  },
  "quizMaster": {
    "gamesPlayed": 1,
    "bestScore": 90,
    "bestPercentage": 90,
    "totalCorrect": 9,
    "totalQuestions": 10
  },
  "ticTacToe": {
    "gamesPlayed": 3,
    "wins": 2,
    "losses": 1,
    "draws": 0
  },
  "wordScramble": {
    "gamesPlayed": 1,
    "wordsGuessed": 1,
    "totalPoints": 30
  },
  "diceDuel": {
    "gamesPlayed": 1,
    "wins": 1,
    "losses": 0,
    "draws": 0
  }
}
```

### Safety & Resilience Features:
- **Automatic Directory Creation:** `saveStats()` recursively ensures `storage/` exists before writing.
- **Deep Merge Recovery:** If an older save file is loaded that lacks newly introduced game fields, `deepMerge()` injects default structures without overwriting historical records.
- **Corrupted File Guard:** Malformed JSON or syntax errors trigger a warning and gracefully fall back to clean `DEFAULT_STATS` without crashing the application.
- **Protected Reset:** Menu Option `[9]` requires an explicit confirmation prompt (`y`/`n`) before clearing player records.

---

## 🧪 Testing & Quality Assurance

Run the automated test suite using Node.js built-in test runner:

```bash
npm test
```

### Verified Test Coverage (44 Passing Tests):
- **Number Guessing:** Boundary validation, attempt exhaustion, multiplier scoring.
- **Rock Paper Scissors:** Full 3×3 truth matrix (9 outcome paths: win/loss/draw).
- **Quiz Master:** Data integrity, non-empty questions, valid 4-option mapping, answer keys.
- **Tic-Tac-Toe:** Win detection on 3 rows, 3 columns, 2 diagonals; draw detection; AI win priority; AI blocking move; center preference.
- **Word Scramble:** Scramble character conservation, non-identity constraint, attempt points (30/20/10), edge-case handling.
- **Dice Duel:** Numeric roll comparisons, ASCII face rendering bounds (1–6).
- **Input Validation:** Numeric bounds, type checking, float rejection, case-insensitive choices, yes/no normalization, occupied cell collisions.
- **Persistence & Resilience:** Save/load cycles, deep clone isolation, corrupt JSON fallback, missing file (`ENOENT`) handling, schema upgrades.

---

## 🧠 Key Programming Concepts Demonstrated

1. **Modular Architecture:** Clean separation of concerns across display formatting, user input handling, persistent state, and individual game mechanics.
2. **Asynchronous Programming:** `async`/`await` patterns for interactive terminal I/O using `readline/promises`.
3. **Data Structures:** Multi-dimensional arrays for Tic-Tac-Toe boards, structured object collections for quiz questions and statistics.
4. **Algorithmic Logic:**
   - **Fisher-Yates Shuffle:** Used for unbiased word scrambling and question deck shuffling.
   - **Heuristic Decision Making:** 5-tier AI strategy for Tic-Tac-Toe (Win → Block → Center → Corners → Edges).
   - **Deep Object Merge:** Recursive reconciliation of nested JSON schemas.
5. **Defensive Programming:** Comprehensive input sanitization, regular expression checks, bounds clamping, and graceful EOF termination.

---

## 🔮 Limitations & Future Scope

- **Terminal Dependent:** Requires a terminal environment with standard ANSI and UTF-8 support for optimal display.
- **Local Storage Only:** Scores are stored on the local filesystem rather than synced to a remote cloud database.
- **Potential Enhancements:**
  - Online multiplayer via WebSockets.
  - Timed rounds with countdown intervals.
  - Additional mini-games (e.g., Hangman, 2048 CLI, Battleship).
  - Global leaderboard support via REST API.

---

## 👤 Author & Academic Verification

- **Project ID:** 2501010345  
- **Application:** Terminal Game Hub  
- **Environment:** macOS / Node.js CLI  
