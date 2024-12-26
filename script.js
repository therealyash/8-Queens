// script.js
const chessboard = document.getElementById('chessboard');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const SIZE = 8;
let board = []; // 2D board to track queen positions

function createBoard() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  chessboard.innerHTML = ''; 

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cell-${row}-${col}`;
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener('click', () => handleCellClick(row, col));

      chessboard.appendChild(cell);
    }
  }
}

function isValidPlacement(row, col) {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === 1 || board[i][col] === 1) return false;
  }

  for (let i = -SIZE; i < SIZE; i++) {
    if (
      board[row + i]?.[col + i] === 1 || 
      board[row + i]?.[col - i] === 1    
    ) {
      return false;
    }
  }

  const adjacent = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], /* Current */ [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
  ];

  for (const [adjRow, adjCol] of adjacent) {
    if (board[adjRow]?.[adjCol] === 1) return false;
  }

  return true;
}

function handleCellClick(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);

  if (board[row][col] === 1) {
    board[row][col] = 0;
    cell.textContent = '';
    cell.classList.remove('queen');
    status.textContent = 'Queen removed.';
  } else if (isValidPlacement(row, col)) {
    board[row][col] = 1;
    cell.textContent = '♛';
    cell.classList.add('queen');
    status.textContent = 'Queen placed!';
  } else {
    status.textContent = 'Invalid move! Queens cannot attack each other.';
  }

  if (checkWin()) {
    status.textContent = 'Congratulations! You placed all 8 queens correctly.';
  }
}

function checkWin() {
  return board.flat().filter(val => val === 1).length === SIZE;
}

// Reset the board
resetButton.addEventListener('click', () => {
  createBoard();
  status.textContent = 'Board reset. Place the queens again.';
});

// Create the initial board
createBoard();
