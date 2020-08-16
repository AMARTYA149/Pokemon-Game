
//Canvas properties setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var score = 0;

console.log("canvas width" ,canvas.width);
console.log("canvas ht" ,canvas.height);
//starting point of player
const startX = canvas.width / 2;
const startY = canvas.height -50;
// console.log(startX, startY);

//fetching images
const pokeball = document.querySelector('#pokeball');
const pokemon = document.querySelector('#pokemon');

//Pickup Sound
var pokePick = new Audio('https://drive.google.com/uc?id=1ULOY_JeGQWJ0SOcxQfBtNQ77e20sWa31');
  pokePick.volume = 0.8;


//Player config
const player = {
  w: 35,
  h: 35,
  x: startX,
  y: startY,
  speed: 5,
  dx: 0,
  dy: 0
};

//Ball config
const balls = {
  w: 25,
  h: 25,
  x: 20,
  y: 200
};

//Variable for random balls generation
var random; 
var randomArrayXOld = [];
var randomArrayYOld = [];
var randomCount;


//Draw Player
function drawPlayer() {
  ctx.drawImage(pokemon, player.x, player.y, player.w, player.h);
}

//Drawball
function drawBalls(X, Y) {
  ctx.drawImage(pokeball, X, Y, balls.w, balls.h);
}

//Clear Player
function clearPlayer() {
  ctx.clearRect(player.x - 5, player.y - 5, player.w + 11, player.h + 10);
}


//update position of player
function newPos() {
  player.x += player.dx;
  player.y += player.dy;

  detectWallCollision();
}


//Detect Wall Collision
function detectWallCollision() {
  // Left wall
  if (player.x < 0) {
    player.x = 0;
  }

  // Right Wall
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  // Top wall
  if (player.y < 0) {
    player.y = 0;
  }

  // Bottom Wall
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
  }
}

//Move player
function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    moveRight();
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    moveLeft();
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    moveUp();
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveDown();
  }
}

//Direction of player movement
function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveRight() {
  player.dx = player.speed;
}

function moveLeft() {
  player.dx = -player.speed;
}


//Stop movement
function keyUp(e) {
  if (
    e.key == 'Right' ||
    e.key == 'ArrowRight' ||
    e.key == 'Left' ||
    e.key == 'ArrowLeft' ||
    e.key == 'Up' ||
    e.key == 'ArrowUp' ||
    e.key == 'Down' ||
    e.key == 'ArrowDown'
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}


//Generate random number of PokeBalls at random XY position

function generateRandomBallCount(){
  let random = Math.floor(Math.random() * 10) + 1; //Finds number between 1-15
  return random;
}

function makeRandomBalls() {
  randomCount = generateRandomBallCount();
  const ARRAY_LENGTH = randomCount;
  const randomArrayX = [];
  const randomArrayY = [];

  var maxX = 700;
  var maxY = 400;
  var min = 50;

  for(let i = 0; i<ARRAY_LENGTH; i++) {
    randomArrayX.push(Math.floor(Math.random() * maxX) + min);
    randomArrayY.push(Math.floor(Math.random() * maxY) + min);
  }

  randomArrayXOld = randomArrayX.slice();
  randomArrayYOld = randomArrayY.slice();

  for(let i = 0; i<ARRAY_LENGTH; i++) {
    drawBalls(randomArrayX[i], randomArrayY[i]);
  }
}


//delete previous created balls
function deleteRandomBalls(){
  // console.log("randomCount", randomCount);
  for(let i = 0; i<randomCount; i++) {
    ctx.clearRect(randomArrayXOld[i] , randomArrayYOld[i],  balls.w  ,  balls.h );
  }
}

function collectBalls(){
  // let score = 0;
  for(let i = 0; i<randomCount; i++) {

    if( 
    ((player.x  >= randomArrayXOld[i] && player.x <= randomArrayXOld[i] + balls.w)  && (player.y >= randomArrayYOld[i] && player.y <= randomArrayYOld[i] + balls.h))
    || ((player.x + player.w >= randomArrayXOld[i] && player.x + player.w <= randomArrayXOld[i] + balls.w)  && (player.y + player.h >= randomArrayYOld[i] && player.y + player.h <= randomArrayYOld[i] + balls.h) )
    || (player.x >=randomArrayXOld[i] && player.x <=randomArrayXOld[i] + balls.w && player.y + player.h >= randomArrayYOld[i] && player.y + player.h <= randomArrayYOld[i] + balls.h )
    || (player.x + player.w >= randomArrayXOld[i] && player.x + player.w <= randomArrayXOld[i] + balls.w) && (player.y >= randomArrayYOld[i] && player.y <= randomArrayYOld[i] + balls.h)
    )
    {
      pokePick.pause();
      pokePick.currentTime = 0;
      pokePick.play();
      ctx.clearRect(randomArrayXOld[i] , randomArrayYOld[i],  balls.w  ,  balls.h );
      score++;      
      console.log("score",score);
      randomArrayXOld.splice(i,1);
      randomArrayYOld.splice(i,1);      
      // break;
    }
  }
}

makeRandomBalls()
setInterval(deleteRandomBalls, 3000);
setInterval(makeRandomBalls, 3000);


//Starting game
function renderPlayer() {
  clearPlayer();
  drawPlayer();
  newPos();
  collectBalls();
  requestAnimationFrame(renderPlayer);}


renderPlayer();
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


