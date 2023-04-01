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
  player1Symbol: "",
  player2symbol: "",
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

const h2 = document.createElement("h2");
body.appendChild(h2);

function renderPlayerTurn() {
  if (!state.player1 && !state.player2) {
    alert("Need player info to display");
  } else if (state.player1 && state.player2) {
    if (state.turnIndex === 0) {
      h2.innerText = `${state.player1} turn`;
    } else if (state.turnIndex === 1) {
      h2.innerText = `${state.player2} turn`;
    }
  }
}

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
  if (!state.player1 && !state.player2) {
    alert("Need one player to play");
  } else if (!event.target.innerText) {
    //If no present x or o place a corresponding letter

    event.target.innerText = state.currentPlayer[state.turnIndex]; //change the inner text to the corresponding players value
    state.board[cellIndex].tile = state.currentPlayer[state.turnIndex]; //set my tile to either x or o
    state.board[cellIndex].isClicked = true; //set state of is clicked to true
    renderPlayerTurn();
    switchPlayer();
  }
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

//Save the players name to the the state
function savePlayerToState() {
  const player1 = document.querySelector("#first_player");
  const player2 = document.querySelector("#second_player");
  if (player2.value && player2.value) {
    state.player1 = player1.value;
    state.player2 = player2.value;
  }
}
//StartGame
const startGame = document.querySelector("#start");
startGame.innerText = "Start Game";

startGame.addEventListener("click", () => {
  savePlayerToState();
  //Based on state.player1 is a string and state.player2 is an empty string run with computer
  if (!state.player1 && !state.player2) {
    alert("Need two players"); //Display player1 vs computer
  } else {
    //Assinging each player to a random logo
    let randomNumber = Math.floor(Math.random() * 2);

    state.player1Symbol = state.currentPlayer[randomNumber];
    if (state.player1Symbol === "x") {
      state.player2symbol = "o";
      alert(`${state.player1} starts`);
    } else if (state.player1Symbol === "o") {
      state.player2symbol = "x";
      alert(`${state.player2} starts`);
    }
  }
});
const h4 = document.createElement("h4");
board.appendChild(h4);
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
      state.board[0].tile === state.player1Symbol
        ? (h4.innerText = `${state.player1} won!`)
        : (h4.innerText = `${state.player2} won!`)
    );
  } else if (
    board[3].tile !== "" &&
    board[3].tile === board[4].tile &&
    board[3].tile === board[5].tile
  ) {
    alert(
      state.board[3].tile === state.player1Symbol
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[6].tile !== "" &&
    board[6].tile === board[7].tile &&
    board[6].tile === board[8].tile
  ) {
    alert(
      state.board[6].tile === state.player1Symbol
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
    alert(
      state.board[0].tile === state.player1Symbol
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[1].tile !== "" &&
    board[1].tile === board[4].tile &&
    board[1].tile === board[7].tile
  ) {
    alert(
      state.board[1].tile === state.player1Symbol
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[5].tile &&
    board[2].tile === board[8].tile
  ) {
    alert(
      state.board[2].tile === state.player1Symbol
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
    alert(
      state.board[0].tile === state.player1Symbol
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
  } else if (
    board[2].tile !== "" &&
    board[2].tile === board[4].tile &&
    board[2].tile === board[6].tile
  ) {
    alert(
      state.board[2].tile === state.player1
        ? `${state.player1} won!`
        : `${state.player2} won!`
    );
    //Make a draw after all wins arent poosibel
  } else if (noWinner() === 9) {
    setTimeout(() => {
      alert("Draw");
    });
  }
}
//Check for a draw
function noWinner() {
  let count = 0;
  for (let i = 0; i < state.board.length; i++) {
    if (state.board[i].isClicked === true) {
      count++;
    }
  }
  return count;
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
restartGame.addEventListener("click", () => {
  resetGame(board);
  body.removeChild(h2);
});
