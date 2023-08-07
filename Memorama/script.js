// Array de cartas con sus contenidos
const cards = 
["img/fantasma1.jpg", 
"img/fantasma2.jpg", 
"img/fantasma3.jpg", 
"img/fantasma4.jpg",
"img/fantasma5.jpg"];

const reverseImage = "img/sailor-mercury-sailor.png";
const scores = {
  player1:0,
  player2:0,
  player_on_turn: 1
};

let gameBoard = document.getElementById('gameBoard');
let startButton = document.getElementById('startButton');
let message = document.getElementById('message');
let turn = document.getElementById('turn');
let flippedCards = [];
let score = 0;

const restartButton = document.getElementById('restartButton');

// Función para barajar las cartas en el tablero
function shuffleCards() {
  //console.log("shuffle");
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Función para crear el tablero de juego con las cartas
function createGameBoard() {
  //console.log("crearGameBoard");
  gameBoard.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    crearTarjeta(i);
  }
}

// Función para voltear una carta
function flipCard() {
  //console.log("flipped cards arreglo: " + flippedCards.length);
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    let imagen = this.getAttribute("data-card");
    //console.log(imagen);
    this.setAttribute("src", imagen);
    flippedCards.push(this);
    //console.log("flipped cards arreglo: " + flippedCards.length);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 2000);
    }
  }
}

// Función para comprobar si las cartas volteadas forman un par
function checkMatch() {
  //console.log("check Match");
  let card1 = flippedCards[0].getAttribute('data-card');
  let card2 = flippedCards[1].getAttribute('data-card');
  //console.log("card2: " + card2);
  if (card1 === card2) {
    // flippedCards[0].removeEventListener('click', flipCard);
    // flippedCards[1].removeEventListener('click', flipCard);
    flippedCards[0].classList.add("matched");
    flippedCards[1].classList.add("matched");
    if (scores.player_on_turn === 1) {
      scores.player1++;
    }
    if (scores.player_on_turn === 2) {
      scores.player2++;
    }
    message.textContent = `Score Player 1: ${scores.player1} - Score Player 2: ${scores.player2}`;
    //console.log("ganados player 1" + (scores.player1 > cards.length / 2));
    if ((scores.player1 > cards.length / 2) || (scores.player1 === cards.length / 2)) {
      message.textContent = 'you won! Player 1!';
      restartButton.style.visibility = "visible";
      turn.textContent = "";
    }
    if ((scores.player2 > cards.length / 2) || (scores.player2 === cards.length / 2)) {
      message.textContent = 'you won! Player 2!';
      restartButton.style.visibility = "visible";
      turn.textContent = "";
    }
  } else {
    flippedCards[0].classList.remove('flipped');
    flippedCards[0].setAttribute('src', reverseImage);
    flippedCards[1].classList.remove('flipped');
    flippedCards[1].setAttribute('src', reverseImage);
    if (scores.player_on_turn === 1) {
      //console.log("Cambiar a 2");
      scores.player_on_turn = 2;
      setPlayerOnTurnText();
    }
    else {
      scores.player_on_turn = 1;
      setPlayerOnTurnText();
    }
  }
  flippedCards = [];
}

// Función para iniciar el juego
function startGame() {
  restartButton.style.visibility = "hidden";
  startButton.style.visibility = "visible";
  shuffleCards();
  createGameBoard();
  scores.player1 = 0;
  scores.player2 = 0;
  message.textContent = 'Score Player 1: 0 - Score Player 2: 0';
  setPlayerOnTurnText(1);
  changeBackground();
}

function flipTodasLasCartas() {
  this.style.visibility = "hidden";
  shuffleCards();
  for (let i = 0; i < cards.length; i++) {
    crearTarjeta(i);
  }
  for (let i = 0; i < flippedCards.length; i++) {
    flippedCards[i].setAttribute('src', reverseImage);
    flippedCards[i].classList.remove("flipped");
  }
  flippedCards = [];
}

function crearTarjeta(i) {
  //console.log("crearTarjeta" + cards[i]);
  let card = "";
  card = document.createElement('img');
  card.classList.add('card');
  card.textContent = cards[i];
  card.setAttribute('src', cards[i]);
  card.setAttribute('alt', cards[i]);
  card.setAttribute('data-card', cards[i]);
  card.classList.add('flipped');
  card.addEventListener('click', flipCard);
  flippedCards.push(card);
  gameBoard.appendChild(card);
}

function setPlayerOnTurnText() {
  //console.log("setPlayerOnTunr");
  if (scores.player_on_turn === 1) {
    turn.textContent = "On turn: Player 1";
  } else if (scores.player_on_turn === 2) {
    turn.textContent = "On turn: Player 2";
  }
}

// Event listener para el botón de inicio del juego
startButton.addEventListener('click', flipTodasLasCartas);
restartButton.addEventListener('click', startGame);

// Iniciar el juego al cargar la página
startGame();
gameBoard.style.gridTemplateColumns = `repeat(${cards.length}, 1fr)`;
"repeat(, 1fr)";

function changeBackground(){
  document.querySelector("body").style.background = `linear-gradient(to right,${getRandomHEXColor()},${getRandomHEXColor()})`;
}

function getRandomHEXColor() {
  const SEED = '0123456789abcdef';
  let output = '#';
  while (output.length < 7) {
    output += SEED[Math.floor(Math.random() * SEED.length)];
  }
  return output;
}