// Add settings with three settings
// 1. Colour scheme
// 2. duration of each timer
// 3. configuration for pomodoro technique
// 3.5 maybe presets for the configs?

let hours = 0; 
let minutes = 1;
let seconds = 10;

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
  // Check if the timer is running
  // if it is stop it and then set time
  
  switch(id) {
    case "pomodoro": {
      hours = 1;
      minutes = 0;
      seconds = 30;
      break; 
    }
    case "short": {
      hours = 0;
      minutes = 10;
      seconds = 0;
      break; 
    }
    case "long": {
      hours = 0;
      minutes = 20;
      seconds = 0;
      break; 
    }
  }
  updateTimerDisplay();
}

let timerInterval;
let timerRunning = false;

const timerDisplay = document.getElementById("timertext");
const toggleButton = document.getElementById("startstop");

// Maybe add seconds countdown?
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
                    // Add a notification/alert here
                    // Add functionality to automatically switch page state to the next timer
                    alert("Timer Ended");
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