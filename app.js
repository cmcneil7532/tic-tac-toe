//State of our game
let state = {
  board: [
    { id: 0, tile: "", isClicked: false },
    { id: 1, tile: "", isClicked: false },
    { id: 2, tile: "", isClicked: false },
    { id: 3, tile: "", isClicked: false },
    { id: 4, tile: "", isClicked: false },
    { id: 5, tile: "", isClicked: false },
    { id: 6, tile: "", isClicked: false },
    { id: 7, tile: "", isClicked: false },
    { id: 8, tile: "", isClicked: false },
  ],
  currentPlayer: ["x", "o"],
  player1: "",
  player2: "",
};

let turnIndex = 0;
//---------------DOM Selectors----------------
const body = document.querySelector("body");
const board = document.createElement("main");

const resetGame = document.createElement("button");
resetGame.innerText = "Reset Game";
//Title element
let titleH1 = document.createElement("h1");
titleH1.innerText = "Tic-Tac-Toe";
titleH1.id = "title";
body.appendChild(titleH1);

//Header Element
const header = document.createElement("header");
header.className = "header";
header.innerHTML = `<input id="first_player" type="text" placeholder="Player 1" />
<input id="second_player" type="text" placeholder="Player 2" />
<button id="start">Start Game</button>
<button id="restart">Restart Game</button>`;

body.appendChild(header);
//Create a board function
function createBoard() {
  board.id = "board";

  for (let i = 0; i < state.board.length; i++) {
    //Create our cells and append them to our board
    const cell = document.createElement("div");
    cell.className = "cell"; //add a className
    cell.dataset.index = i; //using the dataset.index I am going to set each cell with an index value
    board.appendChild(cell);
  }
  body.append(board);
}
createBoard();

//Click on board and listen to which box was clicked
board.addEventListener("click", (event) => {
  let cellIndex = event.target.dataset.index; // grab the dataset-index from which tile was clicked
  if (!event.target.innerText) {
    event.target.innerText = state.currentPlayer[turnIndex];
    state.board[cellIndex].tile = state.currentPlayer[turnIndex];
    state.board[cellIndex].isClicked = true;
  }
  switchPlayer();
});

function switchPlayer() {
  turnIndex++;
  if (turnIndex === state.currentPlayer.length) {
    turnIndex = 0;
  }
}

function getPlayer() {
  const player1 = document.querySelector("#first_player");
  const player2 = document.querySelector("#second_player");
  state.player1 = player1.value;
  state.player2 = player2.value;
}
//StartGame
const startGame = document.createElement("button");
startGame.innerText = "Start Game";

startGame.addEventListener("click", () => {
  getPlayer();
});
