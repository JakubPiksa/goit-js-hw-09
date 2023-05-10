const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let changeColor; 

console.log(`hi guys`)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function startButtonClick() {
    startButton.disabled = true; 
    stopButton.disabled = false; 
    changeColor = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopButtonClick() {
  startButton.disabled = false; 
  stopButton.disabled = true;
  clearInterval(changeColor); 
}

startButton.addEventListener('click', startButtonClick);
stopButton.addEventListener('click', stopButtonClick);


