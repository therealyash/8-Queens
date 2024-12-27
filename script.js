const chessboard = document.getElementById('chessboard');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const timerElement = document.getElementById('timer');
const SIZE = 8;
let board = []; // 2D board to track queen positions
let timerDuration = 4 * 60; // 4 minutes in seconds
let timeRemaining = timerDuration;
let timerInterval = null;
let timerStarted = false;

// Create the chessboard grid
function createBoard() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0)); // Initialize an empty board
  chessboard.innerHTML = ''; // Clear any previous board

  // Loop through the rows and columns to create the cells
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cell-${row}-${col}`;
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Add an event listener to each cell
      cell.addEventListener('click', () => handleCellClick(row, col));

      // Append the cell to the chessboard
      chessboard.appendChild(cell);
    }
  }
}

// Check if the placement of a queen is valid
function isValidPlacement(row, col) {
  // Check the row and column
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === 1 || board[i][col] === 1) return false;
  }

  // Check diagonals
  for (let i = -SIZE; i < SIZE; i++) {
    if (
      board[row + i]?.[col + i] === 1 ||
      board[row + i]?.[col - i] === 1
    ) {
      return false;
    }
  }

  return true;
}

// Handle cell clicks to place or remove queens
function handleCellClick(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);

  // If there's already a queen, remove it
  if (board[row][col] === 1) {
    board[row][col] = 0;
    cell.textContent = ''; // Remove the queen symbol
    cell.classList.remove('queen');
    status.textContent = 'Queen removed.';
  } else if (isValidPlacement(row, col)) {
    // If placement is valid, place the queen
    board[row][col] = 1;
    cell.textContent = '♛'; // Place the queen symbol
    cell.classList.add('queen');
    status.textContent = 'Queen placed!';
  } else {
    // If placement is invalid, show error
    status.textContent = 'Invalid move! Queens cannot attack each other.';
  }

  // Check if the game is complete (8 queens placed correctly)
  if (checkWin()) {
    status.textContent = 'Congratulations! You placed all 8 queens correctly.';
    stopTimer(); // Stop the timer once the game is completed
  }
}

// Check if all queens are placed correctly
function checkWin() {
  return board.flat().filter(val => val === 1).length === SIZE;
}

// Reset the board when the reset button is clicked
resetButton.addEventListener('click', () => {
  createBoard();
  status.textContent = 'Board reset. Place the queens again.';
  stopTimer(); // Reset timer on board reset
  timeRemaining = timerDuration; // Reset the timer
  updateTimerDisplay(); // Update the timer display immediately
});

// Timer functions
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        handleTimeExpiry();
      }
    }, 1000);
  }
}

function stopTimer() {
  if (timerStarted) {
    clearInterval(timerInterval);
    timerStarted = false;
  }
}

function updateTimerDisplay() {
  if (timerElement) {
    timerElement.textContent = formatTime(timeRemaining);
  }
}

function handleTimeExpiry() {
  alert('Time is up!');
  // Add any logic to reset or end the game here
}

// Event listener for the first user move to start the timer
document.addEventListener('click', function onFirstMove() {
  if (!timerStarted) {
    startTimer();
    // Remove this event listener after the first move
    document.removeEventListener('click', onFirstMove);
  }
});

// Create the initial board
createBoard();
updateTimerDisplay(); // Set the initial timer display
