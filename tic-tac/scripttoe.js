const cells = document.querySelectorAll("[data-cell]");
const player1Button = document.getElementById("player1");
const player2Button = document.getElementById("player2");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes("")) {
    return "tie";
  }

  return null;
}

function handleCellClick(cellIndex) {
  if (!gameActive || gameBoard[cellIndex] !== "") return;

  gameBoard[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;
  
  const winner = checkWin();
  if (winner) {
    gameActive = false;
    if (winner === "tie") {
      alert("¡Empate!");
    } else {
      alert(`¡El jugador ${winner} ha ganado!`);
    }
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function startGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    gameBoard[index] = "";
    cell.addEventListener("click", () => handleCellClick(index));
  });

  currentPlayer = "X";
  gameActive = true;
}

player1Button.addEventListener("click", () => {
  startGame();
  currentPlayer = "X";
});

player2Button.addEventListener("click", () => {
  startGame();
  currentPlayer = "O";
});

startGame();
