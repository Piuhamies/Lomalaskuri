
var ballSpeedX = 10;
var ballSpeedY = 10;
var score = 0;
var R;
var G;
var B;
var gameOver = false;
var botY;
var speedD = 0;
var ballX = 0;
var ballY = 0;
function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  // valitse taustalle random sävy
  R = random(0, 100); 
  G = random(0, 100);
  B = random(0, 100);
   ballX = random(0, 720);
   ballY = random(0, 720);
}
function draw() {
  background(R,G,B);
  enemy();
  
  //pallon luonti ja liikutus
  ellipse(ballX, ballY, 20, 20);
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX == 0 && ballY == 0) { // jos pallo koskettaa ylänurkkaa
    ballSpeedY = -ballSpeedY + random(0,5); // laita pallo kimpoamaan Y-akselissa satunnaisessa kulmassa
    ballSpeedX = ballSpeedX +random(0,5); // vaihda pallon kulmaa X-akselissa
  }
  else if  (ballX < 0) { // jos pallo koskettaa vasenta reunaa
    ballSpeedX = -ballSpeedX; //kimmota pallo
  }
  else if (ballY > height) { // jos pallo koskettaa alareunaa
    ballSpeedY = -ballSpeedY; // kimmota pallo
  }
  else if (ballY < 0) { // jos pallo koskettaa yläreunaa 
    ballSpeedY = -ballSpeedY; // kimmota pallo
  }
  paddle();
}
//oman pelaajan koodi
function paddle() {
  //piirrä tulos ruudulle
  text(score, width/2, 120); // luo teksti
  
  rect(width-100, mouseY-50, 50, 100);
  if (ballX > width-100 && ballX < width -80 && ballY > mouseY-100/2 && ballY < mouseY+100/2 ) {
    score++;
    ballSpeedY = -ballSpeedY;
    ballSpeedX = -ballSpeedX;
  }
  else if (ballX > width-80) {
    gameOver = true;
    noLoop(); // pysäytä koodin pääsilmukka
  }
}
//botti vastustajan koodi
function enemy() {
  rect(100, ballY-50, 50, 100);
 if(botY != ballY && ballX < width/2) {
    if(botY > ballY) {
      var speed = 0;
      
      speed = int(map(botY-ballY, 0, 400, 0, 20)* 10
      );
      speedD = int(map(ballY-botY, 0, 400, 0, 20)*10);
      println(speed);
      botY = botY -speed;
    }
    else {
      botY = botY + speedD;
    }
  }
  else {
    if(botY > ballY) {
      botY = botY -8;
    }
    else {
      botY = botY +8;
    }
  }
  if (ballX < 100 && ballX > 90 && ballY > botY-100/2 && ballY < botY+100/2) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
  }
}
function mousePressed() {
  if (gameOver == true) {
    ballX = random(0, 720);
    ballY = random(0, 720);
    ballSpeedX = 10;
    ballSpeedY = 10;
    score = 0;
    R = 0;
    G = 0;
    B = 0;
gameOver = false;
setup();
loop();
  }
}