
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
var mappedRotation;
var canvas;
function setup() {
  fullscreen();
   canvas = createCanvas(windowWidth, windowHeight);
  // valitse taustalle random sävy
  R = random(0, 100); 
  G = random(0, 100);
  B = random(0, 100);
   ballX = random(150, width-150);
   ballY = random(150, height);
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
    ballSpeedX = -ballSpeedX+(random(-2, 2)); //kimmota pallo
  }
  else if (ballY > height) { // jos pallo koskettaa alareunaa
    ballSpeedY = -ballSpeedY+(random(-2, 2)); // kimmota pallo
  }
  else if (ballY < 0) { // jos pallo koskettaa yläreunaa 
    ballSpeedY = -ballSpeedY+(random(-2, 2)); // kimmota pallo
  }
  paddle();
}
//oman pelaajan koodi
function paddle() {
	textSize(60);
	
  //piirrä tulos ruudulle
  if(deviceOrientation == PORTRAIT && rotationX > 0 ) {
  mappedRotation = map(rotationX, 0, 50, 0, height);
  }
  else if(deviceOrientation == LANDSCAPE && rotationY > 0) {
	mappedRotation = map(rotationY, 0 , 30, 0, height);
  }
   else if(deviceOrientation == LANDSCAPE && rotationY < 0) {
	mappedRotation = map(rotationY, 0 , -30, 0, height);
  }
  else {
	  mappedRotation = mouseY;
  }
  text(score, width/2, 120); // luo teksti
  
  rect(width-100, mappedRotation-50, 50, 100);
  if (ballX > width-100 && mappedRotation < width -80 && ballY > mappedRotation-100/2 && ballY < mappedRotation+100/2 ) {
    score++;
    ballSpeedX = -ballSpeedX+(random(-2, 2));
    ballSpeedY = -ballSpeedY+(random(-2, 2));
  }
  else if (ballX > width-80) {
    gameOver = true;
    //noLoop(); // pysäytä koodin pääsilmukka
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
  if (ballX <= 150 ) {
    ballSpeedX = -ballSpeedX+(random(-2, 2));
    ballSpeedY = -ballSpeedY+(random(-2, 2));
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