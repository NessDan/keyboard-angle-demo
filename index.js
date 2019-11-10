let keysPressed = [];
const KEY_Q = 81;
const KEY_W = 87;
const KEY_E = 69;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const keyEleQ = document.getElementById("q");
const keyEleW = document.getElementById("w");
const keyEleE = document.getElementById("e");
const keyEleA = document.getElementById("a");
const keyEleS = document.getElementById("s");
const keyEleD = document.getElementById("d");
const rotateEle = document.getElementById("point-holder");
const targetRotateEle = document.getElementById("target-holder");
const keyboardEle = document.getElementById("keyboard");
const pointEle = document.getElementById("point");
const targetEle = document.getElementById("target");
const scoreEle = document.getElementById("score");
const timerEle = document.getElementById("timer");
let targetAngle = 15;
let score = 0;
let finalScore = 0;
const maxTime = 80;
let timeLeft = maxTime;
// 5, 7 right | 19, 17 left | 2, 4 top-right | 22, 20 top-left | 8, 10 bottom-right | 16, 14 bottom-left | 23, 1 up | 11, 13 down |
const tutorialLevels = [
  5,
  7,
  19,
  17,
  5,
  7,
  19,
  17,
  2,
  4,
  22,
  20,
  8,
  10,
  16,
  14,
  23,
  1,
  11,
  13,
  23,
  1,
  11,
  13
];

document.addEventListener("keydown", event => {
  if (event.repeat) {
    return;
  }

  if (
    event.keyCode === KEY_Q ||
    event.keyCode === KEY_W ||
    event.keyCode === KEY_E ||
    event.keyCode === KEY_A ||
    event.keyCode === KEY_S ||
    event.keyCode === KEY_D
  ) {
    keysPressed.push(event.keyCode);
    runLogic();
  }
});

document.addEventListener("keyup", event => {
  if (
    event.keyCode === KEY_Q ||
    event.keyCode === KEY_W ||
    event.keyCode === KEY_E ||
    event.keyCode === KEY_A ||
    event.keyCode === KEY_S ||
    event.keyCode === KEY_D
  ) {
    keysPressed = keysPressed.filter(key => key !== event.keyCode);
    runLogic();
  }
});

const pickTargetLocation = () => {
  let randomAngleOption;

  if (tutorialLevels[score]) {
    randomAngleOption = tutorialLevels[score];
  } else {
    randomAngleOption = Math.floor(Math.random() * (23 - 1 + 1) + 1);
    // Don't allow the easy angles (e.g. up, up-right, right, etc.)
    if (
      randomAngleOption === 0 ||
      randomAngleOption === 3 ||
      randomAngleOption === 6 ||
      randomAngleOption === 9 ||
      randomAngleOption === 12 ||
      randomAngleOption === 15 ||
      randomAngleOption === 18 ||
      randomAngleOption === 21
    ) {
      pickTargetLocation();
      return;
    }
    console.log(randomAngleOption);
  }

  if (targetAngle !== randomAngleOption * 15) {
    targetAngle = randomAngleOption * 15;
    targetRotateEle.style = "transform: rotate(" + targetAngle + "deg);";
  } else {
    pickTargetLocation();
    return;
  }
};

const runLogic = () => {
  keyEleQ.classList.remove("active");
  keyEleW.classList.remove("active");
  keyEleE.classList.remove("active");
  keyEleA.classList.remove("active");
  keyEleS.classList.remove("active");
  keyEleD.classList.remove("active");

  let activeModifier;
  let degree = 0;

  if (keysPressed.length) {
    pointEle.classList.remove("center");
    keysPressed.forEach(key => {
      if (activeModifier === KEY_W) {
        if (key === KEY_Q) {
          degree = degree - 15;
        } else if (key === KEY_E) {
          degree = degree + 15;
        } else if (key === KEY_A) {
          activeModifier = KEY_A;
          degree = degree - 45;
        } else if (key === KEY_D) {
          activeModifier = KEY_D;
          degree = degree + 45;
        }
      } else if (activeModifier === KEY_S) {
        if (key === KEY_Q) {
          degree = degree + 15;
        } else if (key === KEY_E) {
          degree = degree - 15;
        } else if (key === KEY_A) {
          activeModifier = KEY_A;
          degree = degree + 45;
        } else if (key === KEY_D) {
          activeModifier = KEY_D;
          degree = degree - 45;
        }
      } else if (activeModifier === KEY_A) {
        if (key === KEY_E) {
          degree = degree + 15;
        } else if (key === KEY_W) {
          degree = degree + 45;
        } else if (key === KEY_D) {
          degree = degree - 15;
        } else if (key === KEY_S) {
          degree = degree - 45;
        }
      } else if (activeModifier === KEY_D) {
        if (key === KEY_Q) {
          degree = degree - 15;
        } else if (key === KEY_W) {
          degree = degree - 45;
        } else if (key === KEY_A) {
          degree = degree + 15;
        } else if (key === KEY_S) {
          degree = degree + 45;
        }
      } else {
        if (key === KEY_Q) {
        } else if (key === KEY_W) {
          activeModifier = KEY_W;
          degree = 0;
        } else if (key === KEY_E) {
        } else if (key === KEY_A) {
          activeModifier = KEY_A;
          degree = 270;
        } else if (key === KEY_S) {
          activeModifier = KEY_S;
          degree = 180;
        } else if (key === KEY_D) {
          activeModifier = KEY_D;
          degree = 90;
        }
      }

      if (key === KEY_Q) {
        keyEleQ.classList.add("active");
      } else if (key === KEY_W) {
        keyEleW.classList.add("active");
      } else if (key === KEY_E) {
        keyEleE.classList.add("active");
      } else if (key === KEY_A) {
        keyEleA.classList.add("active");
      } else if (key === KEY_S) {
        keyEleS.classList.add("active");
      } else if (key === KEY_D) {
        keyEleD.classList.add("active");
      }
    });

    if (degree < 0) {
      degree = degree + 360; // Sometimes, we subtract from the degree (Holding W then Q) so it goes negative.
    }

    let letter;
    switch (activeModifier) {
      case KEY_W:
        letter = "w";
        break;
      case KEY_A:
        letter = "a";
        break;
      case KEY_S:
        letter = "s";
        break;
      case KEY_D:
        letter = "d";
        break;
    }
    keyboardEle.className = "keyboard";

    if (letter) {
      keyboardEle.classList.add("active-" + letter);
    }

    rotateEle.style = "transform: rotate(" + degree + "deg);";

    if (degree === targetAngle) {
      score = score + 1;

      // Game is over, don't update visual score
      if (timeLeft > 0) {
        scoreEle.innerHTML = score;
      }

      pickTargetLocation();
    }
  } else {
    pointEle.classList.add("center");
    keyboardEle.className = "keyboard";
  }
};

const startTimer = () => {
  timeLeft = maxTime;
  timerEle.style = "width: " + (timeLeft / maxTime) * 100 + "%";
  const timerInterval = setInterval(() => {
    timeLeft = timeLeft - 1;
    // timerEle.innerText = timeLeft;
    timerEle.style = "width: " + (timeLeft / maxTime) * 100 + "%";
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      finalScore = score;
      scoreEle.innerHTML = finalScore;
    }
  }, 1000);
};

const startGame = () => {
  pickTargetLocation();
  startTimer();
};

startGame();
