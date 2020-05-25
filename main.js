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
}

const start_button = new MyBtn("startButton", "Start", "yellow");
start_button.createButton();

const reset_button = new MyBtn("resetButton", "Reset", "pink");
reset_button.createButton();

////=====================================//////

class GameBtn {
  constructor(parent) {
    this.button = document.createElement("button");
    this.parent = parent;
    this.is_active = false;
  }

  createButton() {
    this.parent.appendChild(this.button);
    this.button.classList.add("game-buttons");
  }

  activate(color) {
    this.button.style.setProperty("background-color", color);
    this.is_active = true;
  }

  deactivate() {
    this.button.style.setProperty("background-color", "white");
    this.is_active = false;
  }


  checkState() {
    this.button.addEventListener("click", () => {
      console.log(this.is_active);
      if (this.is_active == true) {
        licznikPunktow++;
        document.querySelector("#scoresArea").innerText = `Punkty: ${licznikPunktow}`;
      } else {
        licznikZyc--;
        document.querySelector("#lifeArea").innerText = `Życia: ${licznikZyc}`;
        if (licznikZyc === 0) {
          alert("Koniec gry, bo koniec zyc");
          clearInterval(time);
          clearInterval(proba);
        }
      }
    });
  }

}
////=======================////

let licznikZyc = 3;

let licznikPunktow = 0;

let table_board = new Array();

for (let i = 0; i < 25; i++) {
  table_board[i] = new GameBtn(document.querySelector(".game-board-container"));
  table_board[i].createButton();
  console.log(table_board[i]);
  table_board[i].checkState();
}


function generateRandom() {
  let i = Math.floor(Math.random() * 25);
  table_board[i].activate("green");
  console.log(table_board[i]);

  window.setTimeout(function() {
    table_board[i].deactivate();
  }, 2000);
}

var proba; // do funkcji generateRandom

var time;

function stoper(seconds) {
  document.querySelector("#timeArea").innerText = `Pozostały czas: ${seconds}s`;
  time = setInterval(function() {
    seconds--;
    document.querySelector("#timeArea").innerText = `Pozostały czas: ${seconds}s`;

    if (seconds <= 0) {
      clearInterval(time);
      clearInterval(proba);
      alert("Koniec gry, bo koniec czasu");
    }
  }, 1000);
}



document.getElementById("startButton").addEventListener("click", function() {

  stoper(60);
  document.querySelector("#scoresArea").innerText = `Punkty: ${licznikPunktow}`;
  document.querySelector("#lifeArea").innerText = `Życia: ${licznikZyc}`;
  generateRandom();
  proba = setInterval(generateRandom, 3000);
});
