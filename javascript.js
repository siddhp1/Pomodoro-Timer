// Default Settings
let pomodoro = 60;
let short = 10;
let long = 20;

let hours;
let minutes; 
let seconds; 

// Functions to convert from minutes to hms
function convertToHMS (mins) {
  let time = mins; 
  hours = Math.floor(time / 60);
  minutes = time % 60;
  seconds = 0;
}
convertToHMS(pomodoro)

// SETTINGS MENU
// Get elements
const settingsMenu = document.getElementById('settings-menu');
const settingsButton = document.getElementById('settings-button');
const inputPomodoroTime = document.getElementById('pomodoro-minutes');
const inputShortTime = document.getElementById('short-minutes');
const inputLongTime = document.getElementById('long-minutes');
const saveButton = document.getElementById('save-settings');

// Open the menu
settingsMenu.style.display = 'none'; //Maybe move this to the script or add the settings menu later
let settingsOpen = false; 

settingsButton.addEventListener('click', () => {
  if (settingsOpen) {
    settingsMenu.style.display = 'none';
    document.removeEventListener('mousedown', closeSettingsMenu);
    settingsOpen = false;
  }
  else {
    settingsMenu.style.display = 'block';
    document.addEventListener('mousedown', closeSettingsMenu);
    settingsOpen = true; 
  }
});

function closeSettingsMenu(event) {
  if (!settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
    settingsMenu.style.display = 'none';
    document.removeEventListener('mousedown', closeSettingsMenu);
  }
}

// Set items in boxes to defaults
inputPomodoroTime.value = pomodoro; 
inputShortTime.value = short; 
inputLongTime.value = long; 

// Get inputs when save is pressed
saveButton.addEventListener('click', () => {
  // Check that each is a valid integer > 0
  pomodoro = inputPomodoroTime.value;
  short = inputShortTime.value;
  long = inputLongTime.value;

  convertToHMS(pomodoro);
  updateTimerDisplay();
});

// TIMER BUTTONS
// Get elements
const pomoButton = document.getElementById("pomodoro");
const shortButton = document.getElementById("short");
const longButton = document.getElementById("long");

let timerRunning = false;

pomoButton.addEventListener('click', () => {
  setTime("pomodoro");
});

shortButton.addEventListener('click', () => {
  setTime("short");
});

longButton.addEventListener('click', () => {
  setTime("long");
});

function setTime(id) {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    toggleButton.textContent = "Start";
  }
  switch(id) {
    case "pomodoro": {
      convertToHMS(pomodoro);
      break; 
    }
    case "short": {
      convertToHMS(short);
      break; 
    }
    case "long": {
      convertToHMS(long);
      break; 
    }
  }
  updateTimerDisplay();
}

// Timer
let timerInterval;
var chime = new Audio('media/chime.mp3');

const timerDisplay = document.getElementById("timertext");
const toggleButton = document.getElementById("startstop");

function updateTimerDisplay() {
  if (hours >= 1) {
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  else if (minutes >= 1) {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  else {
    timerDisplay.textContent = `${String(seconds).padStart(1, '0')}`;
  }
}

function toggleTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        toggleButton.textContent = "Start";
    } else {
        timerRunning = true;
        toggleButton.textContent = "Stop";

        timerInterval = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                  if (hours === 0) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    toggleButton.textContent = "Start";
                    chime.play();
                    // Add functionality to automatically switch page state to the next timer
                  }
                  else {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                  }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            updateTimerDisplay();
            // update the title of the webpage with the time
        }, 1000);
    }
}

toggleButton.addEventListener("click", toggleTimer);
updateTimerDisplay();

// Add settings with three settings
// 1. Colour scheme
// 2. duration of each timer
// 3. configuration for pomodoro technique
// 3.5 maybe presets for the configs?
// 4. Customizable alarm

// Stack type of loop that changes
// update the "history element with a scrollbar and such"

