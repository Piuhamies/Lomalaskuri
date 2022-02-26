var enemyY = 40;
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBHLb-r0rNYPNg6bL-bGeWjRCRowEJLQA4",
  authDomain: "pong-222e9.firebaseapp.com",
  databaseURL: "https://pong-222e9.firebaseio.com",
  storageBucket: "pong-222e9.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const preObject = document.getElementById("object");
const dbRefObject = firebase.database().ref();

dbRefObject.on("value", (snap) => {
  enemyY = snap.val().padelY;
  console.log(enemyY);
});

var ballSpeedX = 8;
var ballSpeedY = 8;
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

var tempY;
var tempX;
function getSize() {
  for (var i = windowWidth; i > 0; i = i - 1) {
    if (Math.floor(i / 4) * 3 <= windowHeight) {
      tempX = i;
      break;
    }
  }
  for (var i = windowWidth; i > 0; i = i - 1) {
    if (i <= tempX) {
      tempY = Math.floor(i / 4) * 3;
      break;
    }
  }
}
function setup() {
  fullscreen();
  getSize();
  canvas = createCanvas(tempX, tempY);
  // valitse taustalle random sävy
  R = random(0, 100);
  G = random(0, 100);
  B = random(0, 100);
  ballX = width / 2 - 10;
  ballY = height / 2 - 10;
}
function draw() {
  console.log(enemyY);
  background(R, G, B);
  enemy();

  //pallon luonti ja liikutus
  ellipse(ballX, ballY, 20, 20);
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX == 0 && ballY == 0) {
    // jos pallo koskettaa ylänurkkaa
    ballSpeedY = -ballSpeedY + random(0, 5); // laita pallo kimpoamaan Y-akselissa satunnaisessa kulmassa
    ballSpeedX = ballSpeedX + random(0, 5); // vaihda pallon kulmaa X-akselissa
  } else if (ballX < 0) {
    // jos pallo koskettaa vasenta reunaa
    ballSpeedX = -ballSpeedX + random(-2, 2); //kimmota pallo
  } else if (ballY > height) {
    // jos pallo koskettaa alareunaa
    ballSpeedY = -ballSpeedY + random(-2, 2); // kimmota pallo
  } else if (ballY < 0) {
    // jos pallo koskettaa yläreunaa
    ballSpeedY = -ballSpeedY + random(-2, 2); // kimmota pallo
  }
  paddle();
}
//oman pelaajan koodi
function paddle() {
  textSize(60);

  //piirrä tulos ruudulle
  if (deviceOrientation == PORTRAIT && rotationX > 0) {
    mappedRotation = map(rotationX, 0, 50, 0, height);
  } else if (deviceOrientation == LANDSCAPE && rotationY > 0) {
    mappedRotation = map(rotationY, 10, 50, 0, height);
  } else if (deviceOrientation == LANDSCAPE && rotationY < 0) {
    mappedRotation = map(rotationY, -10, -50, 0, height);
  } else {
    mappedRotation = mouseY;
  }

  text(score, width / 2, 120); // luo teksti

  rect(width - 100, mappedRotation - 50, 50, 100);
  if (
    ballX > width - 100 &&
    ballY > mappedRotation - 50 &&
    ballY < mappedRotation + 50
  ) {
    score++;
    console.log("colliding BallX: " + ballSpeedX + " ballY: " + ballSpeedY);
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
  } else if (ballX > width - 80) {
    gameOver = true;
    //noLoop(); // pysäytä koodin pääsilmukka
  }
}
//botti vastustajan koodi
function enemy() {
  rect(100, enemyY, 50, 100);
  if (botY != ballY && ballX < width / 2) {
    if (botY > ballY) {
      var speed = 0;

      speed = int(map(botY - ballY, 0, 400, 0, 20) * 10);
      speedD = int(map(ballY - botY, 0, 400, 0, 20) * 10);
      botY = botY - speed;
    } else {
      botY = botY + speedD;
    }
  } else {
    if (botY > ballY) {
      botY = botY - 8;
    } else {
      botY = botY + 8;
    }
  }
  if (ballX <= 150) {
    ballSpeedX = -ballSpeedX + random(0, 1);
    ballSpeedY = -ballSpeedY + random(-1, 1);
  }
}
function mousePressed() {
  if (gameOver == true) {
    ballX = width / 2 - 10;
    ballY = height / 2 - 10;
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
