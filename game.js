// console.log("done");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// // console.log(canvas.width);
// // console.log(canvas.height);
const startX = canvas.width / 2;
const startY = canvas.height -50;
console.log(startX, startY);

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


function drawBalls() {
  ctx.drawImage(pokemon, player.x, player.y, player.w, player.h);
}


function drawPlayer() {
  ctx.drawImage(pokeball, balls.x, balls.y, balls.w, balls.h);
}

 drawBalls();
 drawPlayer();
 
