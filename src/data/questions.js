// ============================================================
// questions.js — Quiz question bank for the Quiz Master game
// Each question has: question text, 4 options (A-D), and the
// correct answer as a lowercase letter ('a', 'b', 'c', or 'd')
// ============================================================

const questions = [
  // --- Computers & Programming ---
  {
    question: "What does CPU stand for?",
    options: ["A) Central Processing Unit", "B) Computer Personal Unit", "C) Central Program Utility", "D) Central Peripheral Unit"],
    answer: "a",
  },
  {
    question: "What does HTML stand for?",
    options: ["A) Hyper Tool Markup Language", "B) HyperText Markup Language", "C) Home Text Making Language", "D) HyperText Machine Language"],
    answer: "b",
  },
  {
    question: "What is the binary representation of the decimal number 10?",
    options: ["A) 1100", "B) 1001", "C) 1010", "D) 1110"],
    answer: "c",
  },
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    options: ["A) Stack", "B) Queue", "C) Tree", "D) Graph"],
    answer: "b",
  },
  {
    question: "Who created JavaScript?",
    options: ["A) Guido van Rossum", "B) James Gosling", "C) Brendan Eich", "D) Dennis Ritchie"],
    answer: "c",
  },
  {
    question: "What does HTTP stand for?",
    options: ["A) HyperText Transfer Protocol", "B) High Tech Transfer Program", "C) Hyper Transfer Text Protocol", "D) Home Tool Transfer Protocol"],
    answer: "a",
  },
  {
    question: "In programming, what is an array?",
    options: ["A) A single variable", "B) A type of loop", "C) A collection of elements stored in order", "D) A function that returns values"],
    answer: "c",
  },
  {
    question: "How many bits are in a byte?",
    options: ["A) 4", "B) 8", "C) 16", "D) 32"],
    answer: "b",
  },
  {
    question: "What does CSS stand for?",
    options: ["A) Computer Style Sheets", "B) Creative Style System", "C) Cascading Style Sheets", "D) Colorful Style Sheets"],
    answer: "c",
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["A) Python", "B) Java", "C) C++", "D) JavaScript"],
    answer: "d",
  },
  {
    question: "What does RAM stand for?",
    options: ["A) Random Access Memory", "B) Read And Memorize", "C) Rapid Action Module", "D) Run Application Memory"],
    answer: "a",
  },
  {
    question: "In Git, which command creates a new branch?",
    options: ["A) git new", "B) git branch", "C) git create", "D) git fork"],
    answer: "b",
  },
  {
    question: "What symbol is used for single-line comments in JavaScript?",
    options: ["A) #", "B) --", "C) //", "D) /* */"],
    answer: "c",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["A) O(n)", "B) O(n²)", "C) O(1)", "D) O(log n)"],
    answer: "d",
  },

  // --- Science ---
  {
    question: "Which planet is known as the Red Planet?",
    options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
    answer: "b",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["A) Oxygen", "B) Nitrogen", "C) Carbon Dioxide", "D) Hydrogen"],
    answer: "c",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["A) O2", "B) CO2", "C) H2O", "D) NaCl"],
    answer: "c",
  },
  {
    question: "What is the speed of light approximately (in km/s)?",
    options: ["A) 150,000 km/s", "B) 300,000 km/s", "C) 450,000 km/s", "D) 600,000 km/s"],
    answer: "b",
  },

  // --- General Knowledge ---
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["A) China", "B) South Korea", "C) Japan", "D) Thailand"],
    answer: "c",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"],
    answer: "d",
  },

  // --- Math ---
  {
    question: "What is the value of Pi (π) to two decimal places?",
    options: ["A) 3.14", "B) 3.41", "C) 2.14", "D) 3.12"],
    answer: "a",
  },
  {
    question: "What is the square root of 144?",
    options: ["A) 10", "B) 11", "C) 12", "D) 14"],
    answer: "c",
  },

  // --- Geography ---
  {
    question: "What is the smallest continent by land area?",
    options: ["A) Europe", "B) Antarctica", "C) Australia", "D) South America"],
    answer: "c",
  },
  {
    question: "Which river is the longest in the world?",
    options: ["A) Amazon", "B) Nile", "C) Yangtze", "D) Mississippi"],
    answer: "b",
  },
  {
    question: "What is the capital of Australia?",
    options: ["A) Sydney", "B) Melbourne", "C) Canberra", "D) Brisbane"],
    answer: "c",
  },
];

export default questions;
