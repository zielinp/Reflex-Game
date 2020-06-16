////=====================================//////
class InfoArea {
  constructor(id) {
    this.id = id;
    this.div = document.createElement("div");
    this.parent = document.querySelector(".top-panel");
  }

  createArea() {
    this.div.id = this.id;
    this.parent.appendChild(this.div);
    this.div.classList.add("info-area");
  }
}

let life_area = new InfoArea("lifeArea");
life_area.createArea();

let scores_area = new InfoArea("scoresArea");
scores_area.createArea();

let time_area = new InfoArea("timeArea");
time_area.createArea();

////=====================================//////
class HeartLife {
  constructor() {
    this.div = document.createElement("div");
    this.parent = document.querySelector("#lifeArea");
  }
  createHeart() {
    this.parent.appendChild(this.div);
    this.div.classList.add("heart");
  }
}


function generateHeart(n) {
  const ul = document.querySelector("#lifeArea");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  let heart_life = new Array();
  for (let i = 0; i < n; i++) {
    heart_life[i] = new HeartLife();
    heart_life[i].createHeart();
  }
}

////=====================================//////
class MyBtn {
  constructor(id, innerText, color) {
    this.button = document.createElement("button");
    this.id = id;
    this.innerText = innerText;
    this.color = color;
    this.parent = document.querySelector(".button-panel");
  }

  createButton() {
    this.button.id = this.id;
    this.button.innerText = this.innerText;
    this.parent.appendChild(this.button);
    this.button.style.setProperty("background-color", this.color);
    this.button.classList.add("reactions-buttons");
  }

  disableButton() {
    this.button.style.setProperty("opacity", "60%"); //cursor: not-allowed";
    this.button.style.setProperty("cursor", "not-allowed");
    this.button.disabled = true;
  }

  enableButton() {
    this.button.style.setProperty("opacity", "100%");
    this.button.style.setProperty("cursor", "pointer");
    this.button.disabled = false;
  }
}

const start_button = new MyBtn("startButton", "Start", "forestgreen");
start_button.createButton();

const reset_button = new MyBtn("resetButton", "Reset", "firebrick");
reset_button.createButton();


////=====================================//////

class GameBtn {
  constructor(parent) {
    this.button = document.createElement("button");
    this.parent = parent;
    this.is_active = false;
    this.was_clicked = false;
  }

  createButton() {
    this.parent.appendChild(this.button);
    this.button.classList.add("game-buttons");
  }

  activate(color) {
    this.button.style.setProperty("background-color", color);
    this.is_active = true;
    this.was_clicked = false;
  }

  deactivate() {
    this.button.style.setProperty("background-color", "white");
    this.is_active = false;
    if (this.was_clicked === false) {
      life_counter--;
      generateHeart(life_counter);

      if (life_counter === 0) {

        //alert("Koniec gry, bo koniec zyc");
        showStatement("You have lost all of lives.");

        clearInterval(time);
        clearInterval(attempt);
      }
    }
  }
  clear() {
    this.button.style.setProperty("background-color", "white");
  }

  checkState() {
    this.button.addEventListener("click", () => {
      this.was_clicked = true;

      //console.log(this.is_active);
      if (this.is_active == true) {
        points_counter++;
        document.querySelector("#scoresArea").innerText = `Score: ${points_counter}`;
      } else {
        life_counter--;
        generateHeart(life_counter);

        if (life_counter === 0) {
          //alert("Koniec gry, bo koniec zyc");
          showStatement("You have lost all of lives");
          clearInterval(time);
          clearInterval(attempt);
        }
      }
    });
  }

}


////=======================////

function showStatement(message){
  const area = document.querySelector(".game-board-container");
  while (area.firstChild) {
    area.removeChild(area.firstChild);
  }
  area.innerText = `${message}`;
}










let life_counter = 3;
let points_counter = 0;
let table_board = new Array();

function generateTableBoard() {
  const area = document.querySelector(".game-board-container");
  while (area.firstChild) {
    area.removeChild(area.firstChild);
  }

  for (let i = 0; i < 25; i++) {
    table_board[i] = new GameBtn(document.querySelector(".game-board-container"));
    table_board[i].createButton();
    console.log(table_board[i]);
    table_board[i].checkState();
  }
}

function clearTableBoard() {
  for (let i = 0; i < 25; i++) {
    table_board[i].clear();
  }
}

 //generateTableBoard();


function generateRandom() {
  let i = Math.floor(Math.random() * 25);
  table_board[i].activate("yellow");
  console.log(table_board[i]);
  time2 = setTimeout(function() {
    table_board[i].deactivate();
  }, 1500);

  // window.setTimeout(function() {
  //   table_board[i].deactivate();
  // }, 1500);
}



var attempt; // do funkcji generateRandom
//var time;
const game_time = 60;

function stoper(seconds) {
  document.querySelector("#timeArea").innerText = `Time: ${seconds} s`;
  time = setInterval(function() {
    seconds--;
    document.querySelector("#timeArea").innerText = `Time: ${seconds} s`;

    if (seconds <= 0) {
      clearInterval(time);
      clearInterval(attempt);
      // alert("Koniec gry, bo koniec czasu");
      showStatement("End of time");
    }
  }, 1000);
}


function startGame() {
  generateTableBoard();
  start_button.disableButton();
  reset_button.enableButton();
  stoper(game_time);
  document.querySelector("#scoresArea").innerText = `Score: ${points_counter}`;
  generateHeart(life_counter);
  generateRandom();
  attempt = setInterval(generateRandom, 2000);
}


function resetGame() {
  showStatement('');
  reset_button.disableButton();
  start_button.enableButton();
  clearTableBoard();
  document.querySelector("#scoresArea").innerText = `Score: ${points_counter}`;
  clearInterval(time);
  clearInterval(attempt);
  setInitialState();
  clearTimeout(time2);
}

function setInitialState() {
  points_counter = 0;
  life_counter = 3;
  generateHeart(life_counter);
  document.querySelector("#timeArea").innerText = `Time: ${game_time} s`;
  document.querySelector("#scoresArea").innerText = `Score: ${points_counter}`;
  showStatement('Click the yellow boxes and try to get the most points!');
}




//do rozkminy czy nie mozna by jakos wykorzysac start_button?

////=======================////
// document.getElementById("startButton")
start_button.button.addEventListener("click", startGame);
reset_button.button.addEventListener("click", resetGame);
reset_button.disableButton();
setInitialState();
