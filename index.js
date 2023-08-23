let keysPressed = [];
const angleGameEle = document.getElementById("angle-game");
const keyEleQ = document.getElementsByClassName("key-q");
const keyEleE = document.getElementsByClassName("key-e");
const keyEleA = document.getElementsByClassName("key-a");
const keyEleD = document.getElementsByClassName("key-d");
const keyEleW = document.getElementsByClassName("key-w");
const keyEleS = document.getElementsByClassName("key-s");
const rotateEle = document.getElementById("point-holder");
const targetRotateEle = document.getElementById("target-holder");
const keyboardGuideEle = document.getElementById("keyboard-guide");
const pointEle = document.getElementById("point");
const targetEle = document.getElementById("target");
const scoreEle = document.getElementById("score");
const accuracyEle = document.getElementById("accuracy");
const timerEle = document.getElementById("timer");
const timerSectionEle = document.getElementById("timer-section");
let targetAngle = 15;
let score = 0;
let hits = 0;
let misses = 0;
let accuracy = 100;
let finalScore = 0;
const maxTime = 30;
let timeLeft = maxTime;
let timerInterval;
// 5, 7 right | 19, 17 left | 2, 4 top-right | 22, 20 top-left | 8, 10 bottom-right | 16, 14 bottom-left | 23, 1 up | 11, 13 down |
const tutorialLevels = [
  5, 7, 19, 17, 5, 7, 19, 17, 2, 4, 22, 20, 8, 10, 16, 14, 23, 1, 11, 13, 23, 1,
  11, 13,
];

document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  if (
    event.code === "KeyQ" ||
    event.code === "KeyW" ||
    event.code === "KeyE" ||
    event.code === "KeyA" ||
    event.code === "KeyS" ||
    event.code === "KeyD"
  ) {
    keysPressed.push(event.code);

    // Always make sure Q and E are at the end of the array
    // Allows for easier processing below
    keysPressed.sort((a, b) => {
      if (a === "KeyQ" || a === "KeyE") {
        return 1;
      }
      if (b === "KeyQ" || b === "KeyE") {
        return -1;
      }
      return 0;
    });

    runLogic(true);
  }
});

document.addEventListener("keyup", (event) => {
  if (
    event.code === "KeyQ" ||
    event.code === "KeyW" ||
    event.code === "KeyE" ||
    event.code === "KeyA" ||
    event.code === "KeyS" ||
    event.code === "KeyD"
  ) {
    keysPressed = keysPressed.filter((key) => key !== event.code);
    runLogic();
  }
});

const pickTargetLocation = () => {
  let randomAngleOption;

  if (tutorialLevels[hits]) {
    randomAngleOption = tutorialLevels[hits];
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
    // console.log(randomAngleOption);
  }

  if (targetAngle !== randomAngleOption * 15) {
    targetAngle = randomAngleOption * 15;
    targetRotateEle.style = "transform: rotate(" + targetAngle + "deg);";
  } else {
    pickTargetLocation();
    return;
  }
};

const missCalculator = (degree) => {
  switch (targetAngle) {
    case 15:
      if (![0, 15].includes(degree)) {
        misses++;
      }
      break;
    case 30:
      if (![0, 30, 45, 90].includes(degree)) {
        misses++;
      }
      break;
    case 60:
      if (![0, 45, 60, 90].includes(degree)) {
        misses++;
      }
      break;
    case 75:
      if (![75, 90].includes(degree)) {
        misses++;
      }
      break;
    case 105:
      if (![90, 105].includes(degree)) {
        misses++;
      }
      break;
    case 120:
      if (![90, 120, 135, 180].includes(degree)) {
        misses++;
      }
      break;
    case 150:
      if (![90, 135, 150, 180].includes(degree)) {
        misses++;
      }
      break;
    case 165:
      if (![165, 180].includes(degree)) {
        misses++;
      }
      break;
    case 195:
      if (![180, 195].includes(degree)) {
        misses++;
      }
      break;
    case 210:
      if (![180, 210, 225, 270].includes(degree)) {
        misses++;
      }
      break;
    case 240:
      if (![180, 225, 240, 270].includes(degree)) {
        misses++;
      }
      break;
    case 255:
      if (![255, 270].includes(degree)) {
        misses++;
      }
      break;
    case 285:
      if (![270, 285].includes(degree)) {
        misses++;
      }
      break;
    case 300:
      if (![0, 270, 300, 315].includes(degree)) {
        misses++;
      }
      break;
    case 330:
      if (![0, 270, 315, 330].includes(degree)) {
        misses++;
      }
      break;
    case 345:
      if (![0, 345].includes(degree)) {
        misses++;
      }
      break;
    default:
      break;
  }
};

const runLogic = (keyDown) => {
  Array.from(keyEleQ).forEach((el) => el.classList.remove("active"));
  Array.from(keyEleE).forEach((el) => el.classList.remove("active"));
  Array.from(keyEleA).forEach((el) => el.classList.remove("active"));
  Array.from(keyEleD).forEach((el) => el.classList.remove("active"));
  Array.from(keyEleW).forEach((el) => el.classList.remove("active"));
  Array.from(keyEleS).forEach((el) => el.classList.remove("active"));

  let activeModifier;
  let degree = 0;

  if (keysPressed.length) {
    keysPressed.forEach((key) => {
      if (activeModifier === "KeyW") {
        if (key === "KeyQ") {
          degree = degree - 15;
        } else if (key === "KeyE") {
          degree = degree + 15;
        } else if (key === "KeyA") {
          activeModifier = "KeyA";
          degree = degree - 45;
        } else if (key === "KeyD") {
          activeModifier = "KeyD";
          degree = degree + 45;
        }
      } else if (activeModifier === "KeyS") {
        if (key === "KeyQ") {
          degree = degree + 15;
        } else if (key === "KeyE") {
          degree = degree - 15;
        } else if (key === "KeyA") {
          activeModifier = "KeyA";
          degree = degree + 45;
        } else if (key === "KeyD") {
          activeModifier = "KeyD";
          degree = degree - 45;
        }
      } else if (activeModifier === "KeyA") {
        if (key === "KeyE") {
          degree = degree + 15;
        } else if (key === "KeyW") {
          degree = degree + 45;
        } else if (key === "KeyD") {
          degree = degree - 15;
        } else if (key === "KeyS") {
          degree = degree - 45;
        }
      } else if (activeModifier === "KeyD") {
        if (key === "KeyQ") {
          degree = degree - 15;
        } else if (key === "KeyW") {
          degree = degree - 45;
        } else if (key === "KeyA") {
          degree = degree + 15;
        } else if (key === "KeyS") {
          degree = degree + 45;
        }
      } else {
        if (key === "KeyQ") {
        } else if (key === "KeyW") {
          activeModifier = "KeyW";
          degree = 0;
        } else if (key === "KeyE") {
        } else if (key === "KeyA") {
          activeModifier = "KeyA";
          degree = 270;
        } else if (key === "KeyS") {
          activeModifier = "KeyS";
          degree = 180;
        } else if (key === "KeyD") {
          activeModifier = "KeyD";
          degree = 90;
        }
      }

      if (key === "KeyQ") {
        Array.from(keyEleQ).forEach((el) => el.classList.add("active"));
      } else if (key === "KeyE") {
        Array.from(keyEleE).forEach((el) => el.classList.add("active"));
      } else if (key === "KeyA") {
        Array.from(keyEleA).forEach((el) => el.classList.add("active"));
      } else if (key === "KeyD") {
        Array.from(keyEleD).forEach((el) => el.classList.add("active"));
      } else if (key === "KeyW") {
        Array.from(keyEleW).forEach((el) => el.classList.add("active"));
      } else if (key === "KeyS") {
        Array.from(keyEleS).forEach((el) => el.classList.add("active"));
      }
    });

    if (degree < 0) {
      degree = degree + 360; // Sometimes, we subtract from the degree (Holding W then Q) so it goes negative.
    }

    if (!activeModifier) {
      return;
    }

    let letter;
    switch (activeModifier) {
      case "KeyW":
        letter = "w";
        break;
      case "KeyA":
        letter = "a";
        break;
      case "KeyS":
        letter = "s";
        break;
      case "KeyD":
        letter = "d";
        break;
    }
    // console.log("ac", activeModifier);
    // console.log("kp", keysPressed);
    let letterGuide = [];
    keysPressed.forEach((pressedKey) => {
      switch (pressedKey) {
        case "KeyW":
          letterGuide.push("w");
          break;
        case "KeyA":
          letterGuide.push("a");
          break;
        case "KeyS":
          letterGuide.push("s");
          break;
        case "KeyD":
          letterGuide.push("d");
          break;
      }
    });
    keyboardGuideEle.className = "keyboard";

    if (letter) {
      keyboardGuideEle.classList.add("active-" + letter);
    }

    if (letterGuide.length) {
      letterGuide.forEach((letterEl) => {
        keyboardGuideEle.classList.add(letterEl);
      });
    }

    rotateEle.style = "transform: rotate(" + degree + "deg);";
    pointEle.classList.remove("center");

    if (keyDown) {
      missCalculator(degree);
    }

    if (degree === targetAngle) {
      hits = hits + 1;

      pickTargetLocation();
    }

    score = hits - misses;
    accuracy = (hits / (hits + misses)) * 100 || 100;

    // Game is over, don't update visual hit
    if (timeLeft > 0) {
      scoreEle.innerHTML = score;
      accuracyEle.innerHTML = accuracy.toFixed(1) + "%";
    }
  } else {
    pointEle.classList.add("center");
    keyboardGuideEle.className = "keyboard";
  }
};

const gameOver = () => {
  angleGameEle.classList.add("gameover");
  clearInterval(timerInterval);
  finalScore = score;
  scoreEle.innerHTML = finalScore;
  alert(`Game over! Your score is ${finalScore}`);
};

const startTimer = () => {
  timerSectionEle.classList.remove("hidden");
  timeLeft = maxTime;
  timerEle.style = "width: " + (timeLeft / maxTime) * 100 + "%";
  timerInterval = setInterval(() => {
    timeLeft = timeLeft - 1;
    // timerEle.innerText = timeLeft;
    timerEle.style = "width: " + (timeLeft / maxTime) * 100 + "%";
    if (timeLeft === 0) {
      gameOver();
    }
  }, 1000);
};

const startGame = () => {
  pickTargetLocation();

  const startTimerListener = (e) => {
    if (
      e.code === "KeyQ" ||
      e.code === "KeyW" ||
      e.code === "KeyE" ||
      e.code === "KeyA" ||
      e.code === "KeyS" ||
      e.code === "KeyD"
    ) {
      if (!tutorialLevels[hits]) {
        startTimer();
        window.removeEventListener("keydown", startTimerListener);
      }
    }
  };

  window.addEventListener("keydown", startTimerListener);
};

startGame();
