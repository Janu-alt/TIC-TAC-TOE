const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  if (!gameActive) return;

  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === 'X' ? '#00FFFF' : '#FF69B4'; // X: Cyan, O: Pink

  if (checkWin(currentPlayer)) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      endGame();
    }, 100);
  } else if (isDraw()) {
    setTimeout(() => {
      alert("It's a draw!");
      endGame();
    }, 100);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function endGame() {
  gameActive = false;
}

restartBtn.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'white';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
});
