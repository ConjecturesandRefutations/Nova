//Key Variables

let currentGame;
let currentCar;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let obstacleSpeed = 3;

let skullFrequency = 0; // support the logic for generating skulls

let isGameOver = false;
let animationFrameId; 

let background = new Image();
let backgroundY = 0;
background.src = "./images/game-section.jpg";

let scoreDisplay = document.querySelector('#yourScore');
let finalScore = document.getElementById('#scoreTwo');
let finalLevel = document.getElementById('#levelTwo');

let frameCount = 0;

let level = document.querySelector('#level');
let lastDifficultyUpdate = 0;

let divisor = 30;

let isRestarting = false; // A flag to prevent multiple restarts

let startTime = 0;
let countdown = 20;

//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button');
const timer = document.querySelector('.timer');
const toggleOpening = document.querySelector('.opening-section');
const toggleInfo = document.querySelector('.info');
const endScreen = document.querySelector('.full-time');
const mobile = document.querySelector('.mobile-controls');

toggleOpening.style.display = '';
endScreen.style.display = 'none';
mobile.style.display = 'none';
timer.style.display = 'none';


//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';
toggleInfo.style.display = 'none';

//Start Button
window.onload = () => {
    toggleButton.onclick = (event) => {
    event.stopPropagation();
    pauseOpeningAudio();
    opening.currentTime = 0;
    drive.play();
    toggleOpening.style.display = 'none';
    myCanvas.style.display = '';
    toggleInfo.style.display = '';      
    mobile.style.display = '';
    timer.style.display = '';
    startGame();
    };

  };

  //Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button');
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    resetScore();
    toggleOpening.style.display = '';
    myCanvas.style.display = 'none';
    toggleInfo.style.display = 'none';      
    mobile.style.display = 'none';
    endScreen.style.display= 'none';
    closing.pause();
    isGameOver = false;
    obstacleSpeed = 3;
  })  ;
}

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  if (isRestarting) return;
  isRestarting = true;
  myCanvas.style.display = 'block';
  endScreen.style.display = 'none';
  toggleOpening.style.display = 'none';
  closing.pause();
  toggleInfo.style.display = '';
  mobile.style.display = '';
  timer.style.display = '';
  isGameOver = false;
  obstacleSpeed = 3;
  resetScore();
  startGame();
  isRestarting = false;
  restartButton.addEventListener('click', restartGame);
}