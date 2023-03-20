let keysPressed = [];
const keyEleQ = document.getElementById("q");
const keyEleE = document.getElementById("e");
const keyEleA = document.getElementById("a");
const keyEleD = document.getElementById("d");
const keyEleW = document.getElementById("w");
const keyEleS = document.getElementById("s");
const rotateEle = document.getElementById("point-holder");
const targetRotateEle = document.getElementById("target-holder");
const keyboardGuideEle = document.getElementById("keyboard-guide");
const pointEle = document.getElementById("point");
const targetEle = document.getElementById("target");
const scoreEle = document.getElementById("score");
const timerEle = document.getElementById("timer");
let targetAngle = 15;
let score = 0;
let finalScore = 0;
const maxTime = 40;
let timeLeft = maxTime;
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
    runLogic();
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
  keyEleE.classList.remove("active");
  keyEleA.classList.remove("active");
  keyEleD.classList.remove("active");
  keyEleW.classList.remove("active");
  keyEleS.classList.remove("active");

  let activeModifier;
  let degree = 0;

  if (keysPressed.length) {
    pointEle.classList.remove("center");
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
        keyEleQ.classList.add("active");
      } else if (key === "KeyE") {
        keyEleE.classList.add("active");
      } else if (key === "KeyA") {
        keyEleA.classList.add("active");
      } else if (key === "KeyD") {
        keyEleD.classList.add("active");
      } else if (key === "KeyW") {
        keyEleW.classList.add("active");
      } else if (key === "KeyS") {
        keyEleS.classList.add("active");
      }
    });

    if (degree < 0) {
      degree = degree + 360; // Sometimes, we subtract from the degree (Holding W then Q) so it goes negative.
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
    console.log("ac", activeModifier);
    console.log("kp", keysPressed);
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
    keyboardGuideEle.className = "keyboard";
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
      alert("Game Over! Your score is " + finalScore + "!");
    }
  }, 1000);
};

const startGame = () => {
  pickTargetLocation();

  const firstKeyPress = (e) => {
    if (
      e.code === "KeyQ" ||
      e.code === "KeyW" ||
      e.code === "KeyE" ||
      e.code === "KeyA" ||
      e.code === "KeyS" ||
      e.code === "KeyD"
    ) {
      startTimer();
      window.removeEventListener("keydown", firstKeyPress);
    }
  };

  window.addEventListener("keydown", firstKeyPress);
};

startGame();
