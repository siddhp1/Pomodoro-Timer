// Default Settings
let pomodoro = 50;
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
const settingsModal = document.querySelector('#settings-modal');
const settingsButton = document.querySelector('#settings-button');
const inputPomodoroTime = document.querySelector('#pomodoro-minutes');
const inputShortTime = document.querySelector('#short-minutes');
const inputLongTime = document.querySelector('#long-minutes');
const saveButton = document.getElementById('save-settings');

// Open the menu
settingsModal.style.display = 'none';
let settingsOpen = false; 

settingsButton.addEventListener('click', () => {
  if (settingsOpen) {
    settingsModal.style.display = 'none';
    document.removeEventListener('mousedown', closesettingsModal);
    settingsOpen = false;
  }
  else {
    settingsModal.style.display = 'block';
    document.addEventListener('mousedown', closesettingsModal);
    settingsOpen = true; 
  }
});

window.onclick = function(event) {
  if (event.target == settingsModal) {
    settingsModal.style.display = 'none';
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

  settingsModal.style.display = 'none';

  convertToHMS(pomodoro);
  updateTimerDisplay();
});

// TIMER BUTTONS
const pomoButton = document.getElementById("pomodoro");
const shortButton = document.getElementById("short");
const longButton = document.getElementById("long");

let timerRunning = false;
var state = 0;

pomoButton.addEventListener('click', () => {
  setTime("pomodoro");
  state = 0;
});

shortButton.addEventListener('click', () => {
  setTime("short");
  state = 1;
});

longButton.addEventListener('click', () => {
  setTime("long");
  state = 2; 
});

function setTime(id) {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    toggleButtonText.textContent = "Start";
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

// TIMER
let timerInterval;
var chime = new Audio('../media/chime.mp3');

const timerDisplay = document.getElementById("timer");
const toggleButton = document.getElementById("start-stop-button");
const toggleButtonText = toggleButton.querySelector('h3');

function updateTimerDisplay() {
  if (hours >= 1) {
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.title = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  else if (minutes >= 1) {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  else {
    timerDisplay.textContent = `${String(seconds).padStart(1, '0')}`;
    `${String(seconds).padStart(2, '0')}`;
  }

  // Update tab title
  document.title = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        toggleButtonText.textContent = "Start";
    } else {
        timerRunning = true;
        toggleButtonText.textContent = "Stop";

        timerInterval = setInterval(function () {
            if (seconds === 0) {
                if (minutes === 0) {
                  if (hours === 0) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    toggleButtonText.textContent = "Start";
                    chime.play();
                    if (state == 0) {
                      state = 1;
                      setTime("short"); 
                    }
                    else {
                      state = 0;
                      setTime("pomodoro");
                    }
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
        }, 1000);
    }
}

toggleButton.addEventListener("click", toggleTimer);
updateTimerDisplay();