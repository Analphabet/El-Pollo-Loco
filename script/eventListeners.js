/**
 * Handle keyboard keydown events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener("keydown", (event) => {
  if (!gameActive) return;

  if (event.code == "ArrowUp") keyboard.UP = true;

  if (event.code == "ArrowDown") keyboard.DOWN = true;

  if (event.code == "ArrowLeft") keyboard.LEFT = true;

  if (event.code == "ArrowRight") keyboard.RIGHT = true;

  if (event.code == "Space") keyboard.SPACE = true;

  if (event.code == "KeyD") {
    keyboard.D = true;
    throwingBottle = true;
  }
});

/**
 * Handle keyboard keyup events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener("keyup", (event) => {
  if (!gameActive) return;

  if (event.code == "ArrowUp") keyboard.UP = false;

  if (event.code == "ArrowDown") keyboard.DOWN = false;

  if (event.code == "ArrowLeft") keyboard.LEFT = false;

  if (event.code == "ArrowRight") keyboard.RIGHT = false;

  if (event.code == "Space") keyboard.SPACE = false;

  if (event.code == "KeyD") {
    keyboard.D = false;
    throwingBottle = false;
  }
});

/**
 * Handle touch events for mobile buttons.
 */
function mobileButtonTouch() {
  const leftButton = document.getElementById("mobile-left");
  const rightButton = document.getElementById("mobile-right");
  const jumpButton = document.getElementById("mobile-jump");
  const throwButton = document.getElementById("mobile-throw");

  leftButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });

  leftButton.addEventListener("touchend", (event) => {
    keyboard.LEFT = false;
  });

  rightButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });

  rightButton.addEventListener("touchend", (event) => {
    keyboard.RIGHT = false;
  });

  jumpButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });

  jumpButton.addEventListener("touchend", (event) => {
    keyboard.SPACE = false;
  });

  throwButton.addEventListener("touchstart", (event) => {
    throwingBottle = true;
    event.preventDefault();
    keyboard.D = true;
  });

  throwButton.addEventListener("touchend", (event) => {
    keyboard.D = false;
    throwingBottle = false;
  });
}

/**
 * Handle fullscreen change event.
 */
window.onFullscreenChange = function () {
  let fullscreenButton = document.querySelector(".fullscreen-toggle");
  if (document.fullscreenElement) {
    fullscreenButton.innerText = "Turn Fullscreen Off";
    setCanvasSize(document.getElementById("canvas"), "100vw", "100vh");
  } else {
    fullscreenButton.innerText = "Turn Fullscreen On";
    resetCanvasSize(document.getElementById("canvas"));
  }
};

/**
 * Handle ingame fullscreen change event.
 */
window.onFullscreenChange = function () {
  let fullscreenIGButton = document.querySelector(".ig-fullscreen-toggle");
  let fullscreenButton = document.querySelector(".fullscreen-toggle");
  if (document.fullscreenElement) {
    fullscreenButton.innerText = "Turn Fullscreen Off";
    setCanvasSize(document.getElementById("canvas"), "100vw", "100vh");
  } else {
    fullscreenButton.innerText = "Turn Fullscreen On";
    resetCanvasSize(document.getElementById("canvas"));
  }
};

/**
 * Toggle the rotate screen container based on window dimensions.
 */
function toggleRotateScreen() {
  const rotateContainer = document.querySelector(".rotate-container");

  if (window.innerWidth <= 1300 && window.innerHeight > window.innerWidth) {
    rotateContainer.style.display = "flex";
  } else {
    rotateContainer.style.display = "none";
  }
}

/**
 * Toggle the mobile button container based on window dimensions.
 */
function toggleMobileButtonContainer() {
  const mobileButtonContainer = document.querySelector(
    ".mobile-button-container"
  );
  const isMobileMode = window.innerWidth <= 1300;

  if (isMobileMode) {
    mobileButtonContainer.style.display = "flex";
  } else {
    mobileButtonContainer.style.display = "none";
  }
}

/**
 * Toggle the in-game menu.
 */
function toggleInGameMenu() {
  const inGameMenu = document.getElementById("ig-menu");
  inGameMenu.style.display = "flex";
}

document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("msfullscreenchange", onFullscreenChange);
window.addEventListener("DOMContentLoaded", () => {
  toggleRotateScreen();
});
window.addEventListener(
  "orientationchange",
  toggleRotateScreen,
  toggleMobileButtonContainer,
  toggleInGameMenu
);
window.addEventListener(
  "resize",
  toggleRotateScreen,
  toggleMobileButtonContainer,
  toggleInGameMenu
);
