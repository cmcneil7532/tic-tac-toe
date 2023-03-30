/*As users playing a two player game we want to:
start the game over without having to reset the browser
----------------------------------------------------
As a user playing a one player game I want to:
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
  count: 0,
  turnIndex: 0,
};

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
    event.target.innerText = state.currentPlayer[state.turnIndex]; //change the inner text to the corresponding players value
    state.board[cellIndex].tile = state.currentPlayer[state.turnIndex]; //set my tile to either x or
    state.board[cellIndex].isClicked = true; //set state of is clicked to true
  }
  switchPlayer();
  setTimeout(() => {
    checkForWinner();
  }, 1000);
});

//Swith betwen player x and player o
function switchPlayer() {
  state.turnIndex++;
  if (state.turnIndex === state.currentPlayer.length) {
    state.turnIndex = 0;
  }
}

function savePlayerToState() {
  const player1 = document.querySelector("#first_player");
  const player2 = document.querySelector("#second_player");
  if (player2.value && player2.value) {
    state.player1 = player1.value;
    state.player2 = player2.value;
  } else if (!player2.value) {
    state.player1 = player1.value;
    state.player2 = "Computer";
  }
}
//StartGame
const startGame = document.querySelector("#start");
startGame.innerText = "Start Game";

startGame.addEventListener("click", () => {
  savePlayerToState();
  //Based on state.player1 is a string and state.player2 is also a string run full game

  //Based on state.player1 is a string and state.player2 is an empty string run with computer
  if (state.player1 && !state.player2) {
    playComputer(state.player1);
  } else {
    const h3 = document.createElement("h3");
    h3.id = "h3";
    h3.innerText = `${state.player1} vs ${state.player2}`;
    board.appendChild(h3);
  }
});

//check for winner
function checkForWinner() {
  //Look for horizontal win
  const board = state.board;
  if (
    board[0].tile !== "" && //Check if there isnt a string a there
    board[0].tile === board[1].tile &&
    board[0].tile === board[2].tile
  ) {
    console.log(
      state.board[0].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[3].tile !== "" &&
    board[3].tile === board[4].tile &&
    board[3].tile === board[5].tile
  ) {
    console.log(
      state.board[3].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[6].tile !== "" &&
    board[6].tile === board[7].tile &&
    board[6].tile === board[8].tile
  ) {
    console.log(
      state.board[6].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  }
  //Look for vertical wins
  else if (
    board[0].tile !== "" &&
    board[0].tile === board[3].tile &&
    board[0].tile === board[6].tile
  ) {
    console.log(
      state.board[0].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[1].tile !== "" &&
    board[1].tile === board[4].tile &&
    board[1].tile === board[7].tile
  ) {
    console.log(
      state.board[1].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[5].tile &&
    board[2].tile === board[8].tile
  ) {
    console.log(
      state.board[2].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  }
  //Look fo diagnal wins
  else if (
    board[0].tile !== "" &&
    board[0].tile === board[4].tile &&
    board[0].tile === board[8].tile
  ) {
    console.log(
      state.board[0].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[4].tile &&
    board[2].tile === board[6].tile
  ) {
    console.log(
      state.board[2].tile === "x"
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
    //Make a draw after all wins arent poosibel
  } else if (state.count === 8) {
    alert("Draw");
  }
  return state.count++;
}
//make a reset button
const restartGame = document.querySelector("#restart");
restartGame.innerText = "Reset Game";

function resetGame(parent) {
  //Reset the state
  state.board = [
    { id: 0, tile: "", isClicked: false },
    { id: 1, tile: "", isClicked: false },
    { id: 2, tile: "", isClicked: false },
    { id: 3, tile: "", isClicked: false },
    { id: 4, tile: "", isClicked: false },
    { id: 5, tile: "", isClicked: false },
    { id: 6, tile: "", isClicked: false },
    { id: 7, tile: "", isClicked: false },
    { id: 8, tile: "", isClicked: false },
  ];
  state.currentPlayer = ["x", "o"];
  state.player1 = "";
  state.player2 = "";
  state.count = 0;
  state.turnIndex = 0;

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  const player1 = document.querySelector("#first_player");
  const player2 = document.querySelector("#second_player");
  player1.value = "";
  player2.value = "";
  createBoard();
}
console.log();
restartGame.addEventListener("click", () => {
  resetGame(board);
});

//Check if Computer is playing
function playComputer(player1) {
  const h3 = document.createElement("h3");
  h3.id = "h3";
  h3.innerText = `${player1} vs Computer`;
  board.appendChild(h3);
}
