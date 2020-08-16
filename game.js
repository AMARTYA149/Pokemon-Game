
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

console.log("canvas width" ,canvas.width);
console.log("canvas ht" ,canvas.height);
const startX = canvas.width / 2;
const startY = canvas.height -50;
// console.log(startX, startY);

const pokeball = document.querySelector('#pokeball');
const pokemon = document.querySelector('#pokemon');

const player = {
  w: 35,
  h: 35,
  x: startX,
  y: startY,
  speed: 5,
  dx: 0,
  dy: 0
};

const balls = {
  w: 25,
  h: 25,
  x: 20,
  y: 200
};

// function drawBalls(X, Y) {
//   ctx.drawImage(pokemon, player.x, player.y, player.w, player.h);
// }

function drawPlayer() {
  ctx.drawImage(pokemon, player.x, player.y, player.w, player.h);
}

function drawBalls(X, Y) {
  ctx.drawImage(pokeball, X, Y, balls.w, balls.h);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  player.x += player.dx;
  player.y += player.dy;

  detectWallCollision();
}

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


function renderPlayer() {
  clearCanvas();
  drawPlayer();
  newPos();
  requestAnimationFrame(renderPlayer);
}

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


// renderPlayer();
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



// ***************************************************************

// //Generate random number of PokeBalls at random XY position
var random;
// var max = 15;
// var min = 1
 
var randomArrayXOld = [];
var randomArrayYOld = [];
var randomCount;

function generateRandomBallCount(){
  let random = Math.floor(Math.random() * 15) + 1; //Finds number between 1-15
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

  console.log("randomArrayX",randomArrayXOld);
  console.log("randomArrayY",randomArrayYOld);
  for(let i = 0; i<ARRAY_LENGTH; i++) {
    drawBalls(randomArrayX[i], randomArrayY[i]);
    // ctx.clearRect(randomArrayX[i] - balls.x / 2, randomArrayY[i] - balls.y/2, randomArrayX[i] + balls.x / 2, randomArrayY[i] + balls.y/2);
  }
}

function deleteRandomBalls(){
  for(let i = 0; i<randomCount; i++) {
    ctx.clearRect(randomArrayXOld[i] - balls.x / 2, randomArrayYOld[i] - balls.y/2, randomArrayXOld[i] + balls.x / 2, randomArrayYOld[i] + balls.y/2);
  }
}

makeRandomBalls()
setInterval(deleteRandomBalls, 3000);
setInterval(makeRandomBalls, 3000);
