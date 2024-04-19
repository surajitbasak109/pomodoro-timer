const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const beep = document.getElementById('beep');
const progressIndicator = document.getElementById('progress-indicator');
const openSetTimerDialogButton = document.getElementById('open-timer-dialog');
const setTimerDialog = document.getElementById('set-timer-dialog');
const setTimeButton = document.getElementById('set-time');
const timerInput = document.getElementById('timer-input');
const closeSetTimerDialogutton = document.getElementById('close-dialog');
let focusTime = 1500;
let timeLeft = 1500; // 25 minutes in seconds
// let timeLeft = 1500; // 25 minutes in seconds
let timerIntervalId;
let percent = 0;

function startTimer() {
  timerIntervalId = setInterval(() => {
    if (timeLeft < 0) {
      clearInterval(timerIntervalId);
      beep.play();
      alert('Time is up!');
      return;
    }
    updateTimerDisplay();
    timeLeft--;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerIntervalId);
}

function resetTimer() {
  clearInterval(timerIntervalId);
  percent = 0;
  timeLeft = 1500;
  updateTimerDisplay();

  openSetTimerDialogButton.style.display = 'block';
}

function getFormattedTime() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = getFormattedTime();
  percent = Math.floor(timeLeft / focusTime * 100);
  progressIndicator.style.width = `${percent}%`;
  if (timerIntervalId) {
    openSetTimerDialogButton.style.display = 'none';
  }
}

function openTimerDialog() {
  setTimerDialog.showModal();
}

function closeDialog() {
  setTimerDialog.close();
}

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/gi;

  return str.match(regex);
}

function setTime() {
  const timerValue = cleanInputString(timerInput.value);
  const invalidInputMatch = isInvalidInput(timerValue);

  if (invalidInputMatch) {
    alert(`Invalid Input: ${invalidInputMatch[0]}`);
    return;
  }

  const timerInSeconds = timerValue * 60
  focusTime = timerInSeconds;
  timeLeft = timerInSeconds;
  updateTimerDisplay();
  setTimerDialog.close();
}

document.addEventListener('DOMContentLoaded', updateTimerDisplay);

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

openSetTimerDialogButton.addEventListener('click', openTimerDialog);
closeSetTimerDialogutton.addEventListener('click', closeDialog);

setTimeButton.addEventListener('click', setTime)
