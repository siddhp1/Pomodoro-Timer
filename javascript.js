// Add settings with three settings
// 1. Colour scheme
// 2. duration of each timer
// 3. configuration for pomodoro technique
// 3.5 maybe presets for the configs?
// 4. Customizable alarm

// Stack type of loop that changes
// update the "history element with a scrollbar and such"

// Hardcoded Defaults
let defaultPomo = 60; 
let defaultShort = 5;
let defaultLong = 10;

let hours;
let minutes; 
let seconds; 

// Functions to convert from minutes to hms
function convertToHMS (minutes) {
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  seconds = 0;
}

// Settings Menu

// Open and close the menu
const settingsMenu = document.getElementById('settings-menu');
const settingsButton = document.getElementById('settings-button');

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

const pomodoroMinutesInput = document.getElementById('pomodoro-minutes');
const shortMinutesInput = document.getElementById('short-minutes');
const longMinutesInput = document.getElementById('long-minutes');

pomodoroMinutesInput.value = defaultPomo;
shortMinutesInput.value = defaultShort;
longMinutesInput.value = defaultLong;

var pomodorominutes = pomodoroMinutesInput.value;
var shortminutes = shortMinutesInput.value;
var longminutes = longMinutesInput.value;

// Add adjustment for the values and set the hms based on the hms 

// Add the "save" button



// Default to pomodoro once settings page is live

// Buttons to switch between timers

let timerRunning = false;

const pomoButton = document.getElementById("pomodoro");
const shortButton = document.getElementById("short");
const longButton = document.getElementById("long"); 

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
      convertToHMS(pomodorominutes);
      break; 
    }
    case "short": {
      convertToHMS(pomodorominutes);
      break; 
    }
    case "long": {
      convertToHMS(pomodorominutes);
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