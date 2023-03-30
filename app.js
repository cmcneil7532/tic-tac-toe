/*As users playing a two player game we want to:

enter our names and have them displayed
have our order chosen for us by the game

be told when a move causes a player to win, or to draw
start the game over without having to reset the browser
As a user playing a one player game I want to:

see the name 'Computer' displayed as my opponent
have the Computer player make moves as if it were a human player with the correct mark in an empty space
*/
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
    //If no present x or o
    event.target.innerText = state.currentPlayer[turnIndex]; //change the inner text to the corresponding players value
    state.board[cellIndex].tile = state.currentPlayer[turnIndex]; //set my tile to either x or
    state.board[cellIndex].isClicked = true; //set state of is clicked to true
  }
  switchPlayer();
  setTimeout(() => {
    console.log(checkForWinner());
  }, 1000);
});

//Swith betwen player x and player o
function switchPlayer() {
  turnIndex++;
  if (turnIndex === state.currentPlayer.length) {
    turnIndex = 0;
  }
}

function savePlayerToState() {
  const player1 = document.querySelector("#first_player");
  const player2 = document.querySelector("#second_player");
  state.player1 = player1.value;
  state.player2 = player2.value;
}
//StartGame
const startGame = document.querySelector("#start");
startGame.innerText = "Start Game";

startGame.addEventListener("click", () => {
  savePlayerToState();
});
let count = 0;
//check for winner
function checkForWinner() {
  //Look for horizontal win
  const board = state.board;
  if (
    board[0].tile !== "" && //Check if there isnt a string a there
    board[0].tile === board[1].tile &&
    board[0].tile === board[2].tile
  ) {
    alert(
      state.board[0] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  } else if (
    board[3].tile !== "" &&
    board[3].tile === board[4].tile &&
    board[3].tile === board[5].tile
  ) {
    alert(
      state.board[3] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  } else if (
    board[6].tile !== "" &&
    board[6].tile === board[7].tile &&
    board[6].tile === board[8].tile
  ) {
    alert(
      state.board[6] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  }
  //Look for vertical wins
  else if (
    board[0].tile !== "" &&
    board[0].tile === board[3].tile &&
    board[0].tile === board[6].tile
  ) {
    alert(
      state.board[0] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  } else if (
    board[1].tile !== "" &&
    board[1].tile === board[4].tile &&
    board[1].tile === board[7].tile
  ) {
    alert(
      state.board[1] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[5].tile &&
    board[2].tile === board[8].tile
  ) {
    alert(
      state.board[2] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  }
  //Look fo diagnal wins
  else if (
    board[0].tile !== "" &&
    board[0].tile === board[4].tile &&
    board[0].tile === board[8].tile
  ) {
    alert(
      state.board[0] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[4].tile &&
    board[2].tile === board[6].tile
  ) {
    alert(
      state.board[2] === "x" ? `${state.player1} won!` : `${state.player2} won!`
    );
    //Make a draw after all wins arent poosibel
  } else if (count === 8) {
    alert("Draw");
  }
  return count++;
}
console.log(count);
