# ACADEMIC PROJECT REPORT

---

## **TERMINAL GAME HUB: A MULTI-GAME COMMAND-LINE APPLICATION WITH PERSISTENT STATISTICS**

**Course Name:** [Course Name, e.g., Bachelor of Technology in Computer Science / BCA]  
**Subject:** [Subject Name, e.g., Software Engineering / Web Technologies / Scripting Languages]  
**Academic Year:** 2025–2026  

---

### **Student & Institutional Details**

- **Student Name:** [Student Name]  
- **Roll Number / Enrollment No:** [Roll Number]  
- **Project ID:** 2501010345  
- **Department:** Department of Computer Science & Engineering  
- **Institution / College:** [College / University Name]  
- **Faculty Guide / Supervisor:** [Supervisor / Professor Name]  
- **Submission Date:** October 2026  

---

## 1. ABSTRACT

Command-line interfaces (CLIs) provide an efficient, distraction-free environment for interacting with software systems. While simple terminal games are commonly assigned in computer science education to teach fundamental programming constructs, they are typically developed as disjointed, single-use scripts that lack state persistence, input validation, and cohesive architecture.

This project presents **Terminal Game Hub**, an all-in-one command-line gaming platform built with modern JavaScript (ECMAScript Modules) running on the Node.js runtime environment. The system integrates six diverse mini-games—*Number Guessing Challenge*, *Rock Paper Scissors*, *Quiz Master*, *Tic-Tac-Toe*, *Word Scramble*, and *Dice Duel*—under a single interactive navigation loop. Key technical contributions include a modular architectural separation between business logic and terminal I/O, an automated heuristic AI for two-player strategy games, zero-dependency ANSI color formatting, and a resilient JSON file persistence engine featuring schema deep-merging and corrupted-file recovery. The system is verified by 44 automated unit tests running under Node.js's native test runner, ensuring robust execution, predictable error boundaries, and high educational value.

---

## 2. INTRODUCTION

The mastery of computer programming requires students to synthesize abstract concepts—such as algorithms, data structures, conditional control flows, event-driven I/O, and data serialization—into cohesive, functional applications. Developing text-based terminal games serves as one of the most effective pedagogical tools for illustrating these concepts.

However, conventional academic mini-games suffer from three primary shortcomings:
1. **Application Fragmentation:** Each game is an independent script requiring separate manual invocation.
2. **Volatile State:** Scores and achievements vanish as soon as the program terminates.
3. **Fragile Input Handling:** Applications crash abruptly when presented with non-numeric inputs, empty strings, out-of-range bounds, or unexpected stream interrupts (`EOF`).

**Terminal Game Hub** overcomes these limitations by combining multiple mini-games into an integrated gaming suite featuring centralized state management, defensive input parsing, and an engaging visual terminal interface without relying on third-party frameworks.

---

## 3. PROBLEM STATEMENT

In academic settings, beginner-level programming assignments often result in isolated scripts that solve single micro-problems. Users wanting to play different games must locate, launch, and exit multiple separate programs. Consequently, there is no shared player identity, no persistent record of historical performance, and no unified user experience.

The objective of this project is to build a unified, robust, and offline-capable Command-Line Game Hub that hosts six classic games behind an intuitive main menu, validates all terminal input to prevent runtime exceptions, and reliably persists player statistics across restarts via local JSON storage.

---

## 4. OBJECTIVES

The core objectives of the Terminal Game Hub project include:
1. **Consolidation:** Integrate six distinct mini-games into a single application driven by an interactive main menu.
2. **Defensive Input Engineering:** Implement robust input sanitization routines for numbers, discrete choices, yes/no prompts, and stream termination signals (`SIGINT` and `EOF`).
3. **Persistent Analytics:** Develop an automated data layer that serializes games played, victories, defeats, draws, cumulative points, and high scores to disk in JSON format.
4. **Resilience & Fault Tolerance:** Ensure the application never crashes due to missing directories, empty files, or syntactically malformed JSON storage.
5. **Heuristic AI Implementation:** Provide a rule-based computer opponent for Tic-Tac-Toe capable of prioritizing wins, blocking human wins, and claiming strategic grid positions.
6. **Zero-Dependency Architecture:** Restrict runtime dependencies strictly to Node.js built-in modules (`readline/promises`, `fs`, `path`) to guarantee frictionless local execution on macOS, Linux, and Windows.
7. **Automated Verification:** Construct a comprehensive automated test suite verifying business logic, edge conditions, and data serialization.

---

## 5. PROPOSED SOLUTION

The proposed solution implements an event-driven, modular architecture organized into distinct functional layers:
- **Presentation Layer (`src/utils/display.js`):** Formats terminal output using ANSI escape codes, box-drawing characters, and custom ASCII banners.
- **Input Abstraction Layer (`src/utils/input.js`):** Wraps Node.js `readline/promises` to provide strongly typed input validators (`askNumber`, `askChoice`, `askYesNo`, `waitForEnter`) with EOF detection.
- **Persistence Layer (`src/utils/stats.js`):** Manages disk read/write cycles, schema deep-merging, and default state restoration.
- **Game Engine Layer (`src/games/`):** Contains pure and interactive modules for the six mini-games:
  1. *Number Guessing:* Random generation, range narrowing, attempt countdowns, and multiplier scoring.
  2. *Rock Paper Scissors:* Probability-based opponent, round outcome matrix, and best-of-3 tournament logic.
  3. *Quiz Master:* Shuffled multi-topic question bank, percentage grading, and feedback system.
  4. *Tic-Tac-Toe:* 3×3 grid management, win/draw detection, and 5-step heuristic AI.
  5. *Word Scramble:* Fisher-Yates string permutation, vocabulary hinting, and tiered attempt scoring.
  6. *Dice Duel:* Dual random die rolling with visual ASCII representations.
- **Navigation Controller (`src/menu.js`):** Orchestrates menu selection, game execution, stats persistence, and graceful termination.

---

## 6. REQUIREMENTS SPECIFICATION

### 6.1 Functional Requirements
- **FR1 (Main Menu Navigation):** The system shall present a numbered menu (Options 1–9 and Option 0 to Exit) and continuously loop until explicitly terminated by the user.
- **FR2 (Input Validation):** The system shall reject invalid menu selections, non-integer inputs, out-of-range values, and occupied grid coordinates without throwing unhandled exceptions.
- **FR3 (Game Execution):** The system shall allow the user to play any of the six mini-games, play multiple rounds within a game, and return cleanly to the main menu.
- **FR4 (Statistics Recording):** The system shall update player statistics upon completion of each game or round.
- **FR5 (State Persistence):** The system shall save statistics to `storage/stats.json` and automatically load them on startup.
- **FR6 (Statistics Reset):** The system shall provide an option to reset all statistics to default, requiring explicit confirmation (`y`/`n`).
- **FR7 (Documentation & About):** The system shall provide an information screen explaining game rules, project metadata, and controls.

### 6.2 Non-Functional Requirements
- **NFR1 (Performance):** Menu transitions and input evaluations shall execute instantaneously (< 50 milliseconds).
- **NFR2 (Portability):** The codebase shall execute on macOS, Linux, and Windows without code modifications.
- **NFR3 (Reliability):** A corrupt, missing, or empty statistics file must not crash the program; default statistics shall be restored automatically.
- **NFR4 (Usability):** Terminal text shall utilize clear visual hierarchies, distinct ANSI colors, and well-aligned box borders.
- **NFR5 (Maintainability):** Code must follow standard ES Modules conventions with descriptive variable and function naming.

### 6.3 System Requirements
- **Hardware:**
  - Processor: 1.0 GHz x86_64 or ARM64 processor.
  - Memory: Minimum 512 MB RAM.
  - Storage: 10 MB available disk space.
- **Software:**
  - Operating System: macOS 10.15+, Ubuntu 20.04+, or Windows 10/11.
  - Runtime: Node.js version 18.0.0 or higher (tested on Node.js v24.13.1).
  - Shell: Bash, Zsh, or Windows PowerShell.

---

## 7. SYSTEM DESIGN AND MODULE ARCHITECTURE

### 7.1 Architectural Overview
The application follows a modular layered architecture:

```
┌────────────────────────────────────────────────────────┐
│                   Main Entry Point                     │
│                    (src/index.js)                      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                Menu & Lifecycle Controller             │
│                       (src/menu.js)                    │
└───────┬───────────────────┬───────────────────┬────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Game Engines │   │  UI / Display │   │ Input Manager │
│ (src/games/*) │   │ (display.js)  │   │  (input.js)   │
└───────┬───────┘   └───────────────┘   └───────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────┐
│               Persistent Storage Manager               │
│                     (src/utils/stats.js)               │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   JSON Storage File                    │
│                  (storage/stats.json)                  │
└────────────────────────────────────────────────────────┘
```

### 7.2 Module Descriptions

1. **`src/index.js`:**
   - Registers top-level process handlers (`unhandledRejection`, `uncaughtException`).
   - Invokes `startApp()` from `menu.js`.

2. **`src/menu.js`:**
   - Controls application lifecycle state (`running = true/false`).
   - Renders main menu options [1] through [0].
   - Routes user selections to individual game handlers.
   - Triggers automated statistics saving after every game session.
   - Implements `showInstructionsAndAbout()` and `handleResetStats()`.

3. **`src/utils/display.js`:**
   - Declares ANSI escape constants (`RESET`, `BOLD`, `RED`, `GREEN`, `YELLOW`, `BLUE`, `CYAN`, `MAGENTA`, `WHITE`, `DIM`).
   - Exposes formatted renderers: `showBanner()`, `showMenu()`, `showLine()`, `showBoxedText()`, `showSuccess()`, `showError()`, `showWarning()`, `showInfo()`, `showScore()`, and `showGameTitle()`.

4. **`src/utils/input.js`:**
   - Lazily instantiates `readline/promises` interface to avoid unclosed stdin streams during automated testing.
   - Provides safe prompting functions: `askQuestion()`, `askNumber(prompt, min, max)`, `askChoice(prompt, validChoices)`, `askYesNo(prompt)`, and `waitForEnter()`.
   - Intercepts EOF and stream close events to guarantee clean process termination.

5. **`src/utils/stats.js`:**
   - Defines standard schema `DEFAULT_STATS`.
   - Resolves absolute filesystem path `storage/stats.json` using `import.meta.url`.
   - Implements `loadStats()` with defensive `try/catch` and recursive `deepMerge()`.
   - Implements `saveStats()` with recursive directory creation.
   - Implements `resetStats()` utilizing JSON round-trip deep cloning.
   - Implements `displayStats()` to render the formatted player dashboard.

6. **`src/utils/random.js`:**
   - `getRandomInt(min, max)`: Uniform pseudo-random integer generation.
   - `shuffleArray(array)`: Pure Fisher-Yates array permutation.
   - `getRandomElement(array)`: Direct uniform array element selection.

---

## 8. ALGORITHMS AND PSEUDOCODE

### 8.1 Tic-Tac-Toe Heuristic Computer AI
The computer opponent uses a 5-tier priority heuristic rather than brute-force minimax, making it fast and educational:

```
Algorithm: GetComputerMove(board)
Input: board array of size 9 containing '1'-'9' (empty) or 'X' / 'O'
Output: index (0-8) representing best cell move

1. WIN CONDITION CHECK:
   For each winning combination [a, b, c] in WIN_COMBOS:
       If cells contain two 'O's and one empty cell:
           Return index of the empty cell (Take immediate win)

2. BLOCK CONDITION CHECK:
   For each winning combination [a, b, c] in WIN_COMBOS:
       If cells contain two 'X's and one empty cell:
           Return index of the empty cell (Block immediate player win)

3. CENTER CLAIM:
   If board[4] is not 'X' and board[4] is not 'O':
       Return 4 (Claim strategic center)

4. CORNER CLAIM:
   For each corner index in [0, 2, 6, 8]:
       If board[corner] is empty:
           Return corner

5. EDGE CLAIM:
   For each edge index in [1, 3, 5, 7]:
       If board[edge] is empty:
           Return edge

6. Return null (Board full)
```

### 8.2 Fisher-Yates Word Scramble Algorithm
To guarantee unbiased anagram generation while ensuring the scrambled word differs from the original:

```
Algorithm: ScrambleWord(word)
Input: String word
Output: Permuted string scrambled != word

1. If length(word) <= 1 or all characters in word are identical:
   Return word

2. For attempt = 1 to 15:
       chars = Array of characters from word
       For i = length(chars) - 1 down to 1:
           j = RandomInteger(0, i)
           Swap(chars[i], chars[j])
       scrambled = Join(chars)
       If lowercase(scrambled) != lowercase(word):
           Return scrambled

3. Fallback: Reverse(word)
```

### 8.3 Resilient Statistics Deep Merge Algorithm
When an older stats file missing newly introduced game fields is loaded from disk:

```
Algorithm: DeepMerge(target, sourceDefaults)
Input: target (loaded user object), sourceDefaults (default template object)
Output: merged object preserving user data while injecting missing defaults

1. result = ShallowClone(target)

2. For each key in sourceDefaults:
       If key exists in result:
           If sourceDefaults[key] is Object AND result[key] is Object:
               result[key] = DeepMerge(result[key], sourceDefaults[key])
       Else:
           result[key] = DeepClone(sourceDefaults[key])

3. Return result
```

---

## 9. IMPLEMENTATION DETAILS

### 9.1 Technical Highlights
- **ES Modules:** Standardized on `type: "module"` in `package.json` with explicit `.js` import extensions.
- **Asynchronous Readline:** Utilized `readline/promises` for linear, readable `async`/`await` interactive prompts.
- **ANSI Color Encoding:** Avoided heavyweight third-party packages (like `chalk` or `blessed`) by writing direct terminal escape constants.
- **Defensive Error Boundaries:** Wrapped JSON parsing in `try/catch` blocks capable of handling `ENOENT` (file not found), `EACCES` (permission denied), and `SyntaxError` (corrupt JSON).

### 9.2 Game Implementation Summary

| Game | File | Core Concept | Points / Scoring |
|---|---|---|---|
| **Number Guessing** | `numberGuessing.js` | Binary search reasoning, loop control | `Multiplier × (Remaining Attempts + 1) × 10` |
| **Rock Paper Scissors** | `rockPaperScissors.js` | Truth tables, tournament tracking | Win / Loss / Draw counters |
| **Quiz Master** | `quizMaster.js` | Array mapping, question bank slicing | `+10 points` per correct answer |
| **Tic-Tac-Toe** | `ticTacToe.js` | 2D coordinates, collision checks, AI | Win / Loss / Draw counters |
| **Word Scramble** | `wordScramble.js` | String manipulation, character permutations | Attempt 1: 30 pts, Attempt 2: 20 pts, Attempt 3: 10 pts |
| **Dice Duel** | `diceDuel.js` | Random distribution, ASCII art rendering | Win / Loss / Draw counters |

---

## 10. TESTING STRATEGY AND ACTUAL TEST RESULTS

### 10.1 Testing Strategy
The testing methodology adopts automated unit testing using the Node.js native test runner (`node:test`) and strict assertions (`node:assert/strict`). Testing is structured into three dedicated suites:
1. **`tests/games.test.js`:** Pure business logic validation for all 6 games.
2. **`tests/input.test.js`:** Validation routines for numeric boundaries, choices, and collision detection.
3. **`tests/statistics.test.js`:** Persistence, corruption recovery, and schema merging.

### 10.2 Actual Automated Test Results
All 44 test cases executed and passed with 100% success rate:

```
> terminal-game-hub@1.0.0 test
> node --test tests/*.test.js

▶ Number Guessing Challenge Logic
  ✔ should calculate correct score for Easy difficulty (multiplier 1)
  ✔ should calculate correct score for Medium difficulty (multiplier 2)
  ✔ should calculate correct score for Hard difficulty (multiplier 3)
✔ Number Guessing Challenge Logic (3.5 ms)

▶ Rock Paper Scissors Logic
  ✔ should correctly evaluate all Player Win combinations
  ✔ should correctly evaluate all Player Loss combinations
  ✔ should correctly evaluate all Draw combinations
  ✔ should define valid choices map
✔ Rock Paper Scissors Logic (1.1 ms)

▶ Quiz Master Data & Question Bank
  ✔ should contain at least 15 questions (found 25)
  ✔ every question should have non-empty prompt, 4 options, and valid answer key
✔ Quiz Master Data & Question Bank (0.5 ms)

▶ Tic-Tac-Toe Logic
  ✔ should detect wins across all 3 rows
  ✔ should detect wins across all 3 columns
  ✔ should detect wins across both diagonals
  ✔ should return null when no player has won yet
  ✔ should detect a draw correctly when the board is full and no winner
  ✔ should NOT report draw on incomplete boards
  ✔ Computer AI should take an immediate winning move
  ✔ Computer AI should block an immediate player win
  ✔ Computer AI should take center if available when no immediate win/block
✔ Tic-Tac-Toe Logic (4.1 ms)

▶ Word Scramble Logic
  ✔ should have at least 15 words in the vocabulary pool
  ✔ every word entry should have a word and a descriptive hint
  ✔ scrambleWord should return a scrambled string of the same length and letters
  ✔ scrambleWord handles single-char or homogenous strings gracefully
  ✔ calculateScrambleScore awards 30, 20, 10 points based on attempt
✔ Word Scramble Logic (2.3 ms)

▶ Dice Duel Logic
  ✔ should correctly evaluate win, loss, and draw rolls
  ✔ should have visual ASCII faces for numbers 1 through 6
✔ Dice Duel Logic (1.8 ms)

▶ Terminal Input Validation Logic
  ▶ Numeric input validation
    ✔ accepts valid integers within specified range
    ✔ accepts boundary minimum and maximum values
    ✔ rejects numbers strictly outside the allowed range
    ✔ rejects decimal / float numbers
    ✔ rejects non-numeric characters and empty inputs
  ✔ Numeric input validation (2.2 ms)
  ▶ Choice selection validation
    ✔ accepts valid choices regardless of casing
    ✔ rejects invalid choices
  ✔ Choice selection validation (2.2 ms)
  ▶ Yes/No confirmation validation
    ✔ normalizes affirmative answers to true
    ✔ normalizes negative answers to false
    ✔ rejects ambiguous or unexpected strings
  ✔ Yes/No confirmation validation (2.9 ms)
  ▶ Main menu configuration
    ✔ should define exactly 10 menu options (1-9 and 0 Exit)
    ✔ every menu option has non-empty descriptive label
  ✔ Main menu configuration (1.7 ms)
  ▶ Tic-Tac-Toe Move Collision Detection
    ✔ correctly prevents moving into an occupied cell
  ✔ Tic-Tac-Toe Move Collision Detection (0.1 ms)
✔ Terminal Input Validation Logic (9.9 ms)

▶ Player Statistics Manager
  ✔ DEFAULT_STATS contains all mini-game sections with initial zero counters
  ✔ resetStats returns an independent deep clone of DEFAULT_STATS
  ✔ saveStats and loadStats correctly write to disk and read back faithfully
  ✔ loadStats handles corrupt JSON files safely without crashing or throwing
  ✔ loadStats handles missing file gracefully (ENOENT)
  ✔ loadStats merges missing fields from defaults for partial / outdated files
✔ Player Statistics Manager (6.1 ms)

----------------------------------------------------------------------
Total Tests: 44 | Passed: 44 | Failed: 0 | Skipped: 0 | Duration: ~46 ms
----------------------------------------------------------------------
```

---

## 11. CONCLUSION

The **Terminal Game Hub** project successfully achieves all stated design and educational goals. By combining six classic mini-games into a single unified CLI application, the system demonstrates how foundational computer science principles—modular architecture, asynchronous streams, defensive input validation, heuristic algorithms, and local data persistence—can be brought together into a professional software project.

The application operates without external runtime dependencies, delivers an attractive ANSI-styled terminal interface, recovers transparently from corrupted persistent storage, and passes 44 automated unit tests. It stands ready for demonstration and academic evaluation.

---

## 12. FUTURE SCOPE

While the current release provides a comprehensive offline gaming suite, several extensions could be implemented in future iterations:
1. **Network Multiplayer:** Incorporate WebSockets or TCP sockets to allow players on different terminal instances to compete in Tic-Tac-Toe or Rock Paper Scissors.
2. **Timed Difficulty:** Implement countdown timers for Word Scramble and Quiz Master using ANSI cursor manipulation.
3. **Audio Effects:** Add terminal bell sounds (`\x07`) or cross-platform audio chimes for win/loss conditions.
4. **Additional Mini-Games:** Introduce Hangman, Battleship, Snake (using raw terminal mode), and 2048 CLI.
5. **Cloud Synchronization:** Sync player statistics with a lightweight cloud REST API for school-wide leaderboards.

---

## 13. REFERENCES

1. Node.js Official Documentation. *Readline Module (Promises API)*. https://nodejs.org/api/readline.html
2. Node.js Official Documentation. *Node Test Runner (`node:test`)*. https://nodejs.org/api/test.html
3. ECMA International. *ECMAScript 2022 Language Specification (ES Modules)*. https://www.ecma-international.org/
4. Knuth, Donald E. *The Art of Computer Programming, Volume 2: Seminumerical Algorithms* (Fisher-Yates Shuffle). Addison-Wesley.
5. ANSI Escape Sequences Standard. *VT100 / ANSI Terminal Control Reference*. https://en.wikipedia.org/wiki/ANSI_escape_code
