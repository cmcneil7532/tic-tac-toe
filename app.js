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
};
let turnIndex = 0;
//---------------DOM Selectors----------------
const body = document.querySelector("body");
const board = document.createElement("main");
//Title element
let titleH1 = document.createElement("h1");
titleH1.innerText = "Tic-Tac-Toe";
titleH1.id = "title";
body.appendChild(titleH1);

//Header Element
const header = document.createElement("header");
header.className = "header";
header.innerHTML = `<input type="text" placeholder="Player 1" />
<input type="text" placeholder="Player 2" />
<button id="start">Start Game</button>
<button id="restart">Restart Game</button>`;
body.appendChild(header);

//Create a board function
function createBoard() {
  board.id = "board";
  body.append(board);
  for (let i = 0; i < state.board.length; i++) {
    //Create our cells and append them to our board
    const cell = document.createElement("div");
    cell.className = "cell"; //add a className
    cell.dataset.index = i; //using the dataset.index I am going to set each cell with an index value
    board.appendChild(cell);
  }
}
createBoard();

//Click on board and listen to which box was clicked
board.addEventListener("click", (event) => {
  let cellIndex = event.target.dataset.index; // grab the dataset-index from which tile was clicked
  if (!event.target.innerText) {
    event.target.innerText = state.currentPlayer[turnIndex];
  }
  switchPlayer();
});

function switchPlayer() {
  turnIndex++;
  if (turnIndex === state.currentPlayer.length) {
    turnIndex = 0;
  }

  console.log(turnIndex);
}

const startGame = document.createElement("button");
startGame.innerText = "Start Game";
const resetGame = document.createElement("button");
resetGame.innerText = "Reset Game";
