const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
let isXTurn = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.textContent = currentClass;
  cell.classList.add(currentClass.toLowerCase());

  if (checkWin(currentClass)) {
    endGame(`${currentClass} wins!`);
  } else if (isDraw()) {
    endGame("It's a draw!");
  } else {
    isXTurn = !isXTurn;
  }
}

function checkWin(current) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === current;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
}

function endGame(text) {
  message.textContent = text;
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartBtn.addEventListener('click', startGame);

startGame();
