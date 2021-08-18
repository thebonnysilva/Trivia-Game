console.log("Game!");
let h3 = document.createElement("h3");
h3.innerHTML = "Q U E S T I O N";
let questions = document.createElement("p");
questions.id = "questions";
questions.innerHTML = "";
h3.append(questions);
let div = document.createElement("div");
div.className = "continueGame";
div.id = "gameBoard";
let input = document.createElement("input");
input.placeholder = "Type in your answer.";
input.id = "answer";
let answerButton = document.createElement("button");
answerButton.id = "answerButton";
answerButton.innerText = "Submit";
let correctDiv = document.createElement("div");
correctDiv.className = "correctAnswer";
let correctNotification = document.createElement("p");
correctNotification.id = "continueGame";
correctNotification.innerText = "";
let score = document.createElement("p");
score.id = "points";
score.innerText = "TOTAL POINTS";
let totalPoints = document.createElement("h4");
totalPoints.id = "score";
let endGameDiv = document.createElement("div");
endGameDiv.className = "endGame";
let incorrectNotification = document.createElement("p");
incorrectNotification.id = "gameOver";
incorrectNotification.innerText = "";
let newGameButton = document.createElement("button");
newGameButton.id = "newGame";
newGameButton.innerText = "Start a new game";
endGameDiv.append(incorrectNotification, newGameButton);
correctDiv.append(score, totalPoints, correctNotification);
div.append(h3, input, answerButton);
document.body.append(div, correctDiv, endGameDiv);

document.getElementById("newGame").addEventListener("click", (newGame) => {
  let myWindow = window.open("", "_self");
  myWindow.location = `./index.html`;
});

let points = 0;
totalPoints.innerText = 0;
let dataModel = [];
let currentDisplayData = [];
let answerInput = document.getElementById("answer");
let randomNumber = Math.floor(Math.random() * 1000);

let listQuestion = document.getElementById("questions");

function fetchAPi() {
  let url = `https://jservice.io/api/category?id=${randomNumber}`;
  let fetchPromise = fetch(url);
  fetchPromise
    .then((processResponse) => processResponse.json())
    .then((data) => {
      document
        .getElementById("category-select")
        .options.add(new Option(data.title));
      dataModel = data.clues;
      displayQuestion();
      displayAnswer();
    });
}
fetchAPi();

function displayQuestion() {
  let randomIndex = Math.floor(Math.random() * dataModel.length);
  currentDisplayData = dataModel[randomIndex];
  listQuestion.innerHTML = currentDisplayData.question;
}

function displayAnswer() {
  document
    .getElementById("answerButton")
    .addEventListener("click", (submitAnswer) => {
      if (
        answerInput.value.toLowerCase() ===
        currentDisplayData.answer.toLowerCase()
      ) {
        points += 1;
        correctNotification.innerText = "*Correct!!*";
        totalPoints.innerHTML = points;
        answerInput.value = "";
        displayNextQuestion();
        displayQuestion();
      } else if (answerInput.value === "") {
        correctNotification.innerText =
          "Please supply an answer to the above question";
      } else {
        let results = (totalPoints.innerText = points);
        incorrectNotification.append(
          `*YOU LOST!* ${score.innerHTML} ${results}`
        );
        document.getElementById("gameBoard").style.display = "none";
        document.getElementById("category-select").style.display = "none";
        document.getElementById("continueGame").style.display = "none";
        document.getElementById("points").style.display = "none";
        document.getElementById("score").style.display = "none";
        document.querySelector("body").style.backgroundImage =
          "url(images/game-5651053_1920.jpg)";
      }
    });
}

function displayNextQuestion() {
  let dataIndex = dataModel.indexOf(currentDisplayData);
  let removeData = dataModel.splice(dataIndex, 1);
  if (dataModel.length === 0) {
    fetchAPi();
  }
}

let text = document.querySelector("h1");
let strText = text.textContent;
let splitText = strText.split("");
text.textContent = "";
for (let i = 0; i < splitText.length; i++) {
  text.innerHTML += "<span>" + splitText[i] + "</span>";
}
let char = 0;
let timer = setInterval(onTick, 90);

function onTick() {
  let span = text.querySelectorAll("span")[char];
  span.classList.add("fade");
  char++;
  if (char === splitText.length) {
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
}
