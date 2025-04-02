
let difficultyLevel = 1; 
let damage = 10; 

/**
 * Switches between Easy, Normal, and Hard modes and updates the UI.
 */
function toggleDifficulty() {
  difficultyLevel = (difficultyLevel + 1) % 3;
  updateDifficultyStatus();
}

/**
 * Updates the difficulty status displayed on the difficulty toggle button.
 * It changes the text of the button based on the current difficulty level.
 */
function updateDifficultyStatus() {
  let difficultyToggleButton = document.getElementById(
    "toggle-boss-difficulty-button"
  );

  if (difficultyLevel === 0) {
    difficultyToggleButton.innerText = "Boss: Easy";
  } else if (difficultyLevel === 1) {
    difficultyToggleButton.innerText = "Boss: Normal";
  } else if (difficultyLevel === 2) {
    difficultyToggleButton.innerText = "Boss: Hardcore";
  }
}