#!/usr/bin/env node

// ============================================================
// index.js — Terminal Game Hub Main Entry Point
// ============================================================
// Project Name: Terminal Game Hub
// Project ID:   2501010345
// Description:  A modern, unified terminal gaming hub running
//               multiple mini-games with persistent stats.
// ============================================================

import { startApp } from './menu.js';

// Catch any unhandled promise rejection to prevent ugly stack traces
process.on('unhandledRejection', (reason) => {
  console.error('\n⚠️  An unexpected error occurred:', reason?.message || reason);
  process.exit(1);
});

// Run the application
startApp().catch((err) => {
  console.error('\n⚠️  Fatal error starting Terminal Game Hub:', err);
  process.exit(1);
});
