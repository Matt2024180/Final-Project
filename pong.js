const gameBoard = document.querySelector("#pongCanvas");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const start = document.querySelector("#gameContainer");
const ballRadius = 8;
const boardColor = "black";
const paddleBorder = "black";
const paddleColor = "white";
let paddleSpeed = 10;
const deadZone = 10;
let ballSpeed = 1;    
let player1Score = 0;
let player2Score = 0;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let paddleLeft = {
  x: gameWidth / 2 - 200,
  y: gameHeight / 2 - 25,
  width: 2,
  height: 45
};
let paddleRight = {
  x: gameWidth / 2 + 200,
  y: gameHeight / 2 - 25,
  width: 2,
  height: 45
};
let paddle1 ={
  x: gameWidth / 2,
  y: gameHeight - 50,
  width: 55,
  height: 2
};
let intervalID;
let intervalID1;
window.addEventListener('keydown', startGame);
window.addEventListener('keydown', changeDirection);
function gameStart(){
    createBall();
    nextTick();
}
function gameStart1(){
    createBall1();
    nextTick1();
}
function nextTick(){
    intervalID = setTimeout(()=>{
      clearBoard();
      drawPaddle();
      moveBall();
      drawBall(ballX, ballY);
      collision();
      nextTick();
  }, 10);
}
function nextTick1(){
    intervalID1 = setTimeout(()=>{
      clearBoard();
      draw1Paddle();
      moveBall();
      drawBall(ballX, ballY);
      collision1();
      nextTick1();
  }, 10);
}
function drawPaddle(){
  ctx.strokeStyle = paddleColor;
  ctx.fillStyle = paddleColor;

  ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
  ctx.strokeRect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
 
  ctx.fillRect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
  ctx.strokeRect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
}
function draw1Paddle(){
  ctx.strokeStyle = paddleColor;
  ctx.fillStyle = paddleColor;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
}
function clearBoard(){
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createBall(){
  ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else {
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection =  1;
    }
    else {
        ballYDirection =  -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}
function createBall1(){
  ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else {
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection =  1;
    }
    else {
        ballYDirection =  -1;
    }
    ballX = gameWidth / 4;
    ballY = gameHeight / 4;
    drawBall(ballX, ballY);
}
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
}
function drawBall(ballX, ballY){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}
function collision(){
  if(ballY >= (gameHeight - ballRadius)){
    ballYDirection *= -1;
  }
  if(ballY <= 0+ballRadius){
    ballYDirection *= -1;
  }
  if(ballX <= (paddleLeft.width + paddleLeft.x + ballRadius)) {
    if(ballY >= paddleLeft.y && ballY <= paddleLeft.y + paddleLeft.height){
      ballX = paddleLeft.x + paddleRight.width + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.1;
    }
  }
  if(ballX >= (paddleRight.x - ballRadius)) {
    if(ballY >= paddleRight.y && ballY <= paddleRight.y + paddleRight.height){
      ballX = paddleRight.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 0.1;
    }
  }
  if(ballX < deadZone){
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if(ballX > gameWidth - deadZone){
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
}
function collision1(){
  if(ballY >= (gameHeight - ballRadius)){
    ballYDirection *= -1;
  }
  if(ballY <= 0+ballRadius){
    ballYDirection *= -1;
  }
  if(ballX <= 0+ballRadius){
    ballXDirection *= -1;
  }
  if(ballX >= gameWidth - ballRadius){
    ballXDirection *= -1;
  }
  if(ballY >= paddle1.y - (paddle1.height+ballRadius)){
    if(ballX >= paddle1.x && ballX <= paddle1.x+paddle1.width){
      ballY = paddle1.y - (ballRadius + paddle1.height);
      ballYDirection *= -1;
      ballSpeed += 0.1;
    }
  }
  if(ballY > gameHeight - deadZone){
    player2Score += 1;
    updateScore();
    createBall1();
    return;
  }
  if(ballY > gameHeight - deadZone){
    player1Score += 1;
    updateScore();
    createBall1();
    return;
  }
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;
    const moveLeft = 65;
    const moveRight = 68;
    switch(keyPressed){
        case (paddle1Up):
            if(paddleLeft.y > 0 ){
                paddleLeft.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddleLeft.y < gameHeight - paddleLeft.height){
                paddleLeft.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddleRight.y > 0 ){
                paddleRight.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddleRight.y < gameHeight - paddleRight.height ){
                paddleRight.y += paddleSpeed;
            }
            break;
        case (moveLeft):
            if(paddle1.x > 0 ){
                paddle1.x -= paddleSpeed;
            }
            break;
        case (moveRight):
            if(paddle1.x < gameWidth - paddle1.width ){
                paddle1.x += paddleSpeed;
            }
            break;
    }
}
function updateScore() {
    const scoreDisplay = document.querySelector("#scoreDisplay");
    if (scoreDisplay) {
        scoreDisplay.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
    }

    if (player1Score >= 10 || player2Score >= 10) {
        clearTimeout(intervalID);
        clearTimeout(intervalID1);

        window.removeEventListener('keydown', changeDirection);
        window.removeEventListener('keydown', startGame);

        if (player1Score >= 10) {
            scoreDisplay.textContent = "Player 1 wins! Press Enter to restart.";
        } else {
            scoreDisplay.textContent = "Player 2 wins! Press Enter to restart.";
        }
        window.addEventListener('keydown', restartGame);
    }
}

function restartGame(e) {
    if (e.keyCode === 13) { // Enter key
        window.removeEventListener('keydown', restartGame);
        resetGame();
    }
}

function optionInPlayer(eve){
  const opt = document.querySelector("#startGame");
  opt.textContent = "Press 1 for 1 player and 2 for 2 players"; 
  const keyOption = eve.keyCode;
  const num1 = 49;
  const num2 = 50;
  if(keyOption == num1){
    clearInterval(intervalID1);
    gameStart1();
  }
  if(keyOption == num2){
    clearInterval(intervalID);
    gameStart();
  }
}
function resetGame(){
  paddleLeft = {
  x: gameWidth / 2 - 200,
  y: gameHeight / 2 - 25,
  width: 2,
  height: 45
};
  paddleRight = {
  x: gameWidth / 2 + 200,
  y: gameHeight / 2 - 25,
  width: 2,
  height: 45
};
  ballSpeed = 1;    
  player1Score = 0;
  player2Score = 0;
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  clearInterval(intervalID1);
  start();
}
function startGame(e){
  const keyEnter = e.keyCode;
  const enter = 13;
  if(keyEnter == enter){
    clearInterval(intervalID);
    clearInterval(intervalID1);
    window.addEventListener('keydown', optionInPlayer);
  }
}
