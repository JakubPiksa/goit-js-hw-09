import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

console.log(`czy teraz działa ten plik?`)

// Przypisanie zmiennych 
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownIntervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    // Sprawdzenie czy wybrana data jest w przyszłości
    if (selectedDate <= now) {
      window.alert('Wybierz datę w przyszłości!');
      startButton.disabled = true; 
    } else {
      startButton.disabled = false; 
     
      startButton.addEventListener('click', () => {
        startCountdown(selectedDate); 
      });
    }
  },
};

flatpickr(datetimePicker, options);


function startCountdown(endDate) {
  clearInterval(countdownIntervalId); 
  countdownIntervalId = setInterval(() => {
    
    const timeRemaining = convertMs(endDate - new Date()); 
    if (timeRemaining.days < 0) {
      
      clearInterval(countdownIntervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      window.alert('Countdown ended!');
    } else {
      
      daysElement.textContent = formatTime(timeRemaining.days);
      hoursElement.textContent = formatTime(timeRemaining.hours % 24);
      minutesElement.textContent = formatTime(timeRemaining.minutes % 60);
      secondsElement.textContent = formatTime(timeRemaining.seconds % 60);
    }
  }, 1000);
}

//konwersja milisekund
function convertMs(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: formatTime(days),
    hours: formatTime(hours % 24),
    minutes: formatTime(minutes % 60),
    seconds: formatTime(seconds % 60),
  };
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}
