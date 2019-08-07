	var myRole = 1;
	var enemyY = 40;
	var oldBallX = 0;
	var oldBallY = 0;
	var newBallX = 0;
	var newBallY = 0;
	var scoreA = 0;
	var scoreB = 0;
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBHLb-r0rNYPNg6bL-bGeWjRCRowEJLQA4",
    authDomain: "pong-222e9.firebaseapp.com",
    databaseURL: "https://pong-222e9.firebaseio.com",
    storageBucket: "pong-222e9.appspot.com"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const preObject = document.getElementById('object');
  const dbRefObject = firebase.database().ref('Test');
  const db = firebase.database();
    dbRefObject.on('value', snap => { //Kun database päivittyy
	  newBallX = snap.val().BallX; //Tallenna uusi pallon X sijainti
	  newBallY = snap.val().BallY; //Pallon Y sijainti
	  scoreA = snap.val().ScoreA; //Pelaajan A score
	  scoreB = snap.val().ScoreB; //Pelaajan B score
	  newBallSpeedY = snap.val().ballSpeedY; //Pallon Y nopeus
	  newBallSpeedX = snap.val().ballSpeedX; //Pallon X nopeus
	});

  if(myRole == 2) {
  dbRefObject.on('value', snap => {
	  enemyY = snap.val().AY;
		console.log(enemyY);
	});
  }
  else {
	dbRefObject.on('value', snap => {
	  enemyY = snap.val().BY;
		console.log(enemyY);
	});
  }
  
  function updateBallCoords(ballnewX, ballnewY, ballXSpeed, ballYSpeed) {
	  dbRefObject.child("BallX").set(ballnewX);
	  dbRefObject.child("ballSpeedX").set(ballXSpeed);
	  dbRefObject.child("BallY").set(ballnewY);
	  dbRefObject.child("ballSpeedY").set(ballYSpeed);
  }
  
  	function updateFirebaseCoords(newX) {
	if (myRole == 1) {
		dbRefObject.child("AY").set(newX);
	}
	else {
		dbRefObject.child("BY").set(newX);
	}
	}
	

var ballSpeedX = 8;
var ballSpeedY = 8;
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
	for(var i = windowWidth; i> 0; i = i -1 ) {
		if( (Math.floor(i / 4) * 3)  <= windowHeight) {
			tempX = i;
			break;
		}
	}
  	for(var i = windowWidth; i> 0; i = i -1 ) {
		if( i <= tempX) {
			tempY = Math.floor(i / 4) * 3;
			break;
		}
	}
}
function setup() {
  fullscreen();
  getSize()
   canvas = createCanvas(tempX, tempY);
  // valitse taustalle random sävy
  R = random(0, 100); 
  G = random(0, 100);
  B = random(0, 100);
   ballX = (width/2)-10;
   ballY = (height/2)-10;
}
function draw() {
	  if(deviceOrientation == PORTRAIT && rotationX > 0 ) {
  mappedRotation = map(rotationX, 0, 50, 0, height);
  }
  else if(deviceOrientation == LANDSCAPE && rotationY > 0) {
	mappedRotation = map(rotationY, 10 , 50, 0, height);
  }
   else if(deviceOrientation == LANDSCAPE && rotationY < 0) {
	mappedRotation = map(rotationY, -10 , -50, 0, height);
  }
  else {
	  mappedRotation = mouseY;
  }
	if(newBallX != oldBallX) {
		oldBallX = newBallX;
		ballX = newBallX;
		ballSpeedX = newBallSpeedX;
		
	}
	if(newBallY != oldBallY) {
		oldBallY = newBallY;
		ballY = newBallY;
		ballSpeedY = newBallSpeedY;
	}
  console.log(enemyY);
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
  text(score, width/2, 120); // luo teksti
  if(myRole == 1 ) {
  rect(width-100, mappedRotation-50, 50, 100);
  }
  else {
	rect(width-100, enemyY-50, 50, 100);
  }
  updateFirebaseCoords(mappedRotation);
  if (ballX > width-100 && ballY > mappedRotation-50 && ballY < mappedRotation+50) {
    score++;
	console.log("colliding BallX: " + ballSpeedX + " ballY: " + ballSpeedY);
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
	updateBallCoords(ballX, ballY, ballSpeedX, ballSpeedY);
  }
  else if (ballX > width-80) {
    gameOver = true;
    //noLoop(); // pysäytä koodin pääsilmukka
  }
}
//botti vastustajan koodi
function enemy() {
  if(myRole == 2 ) {
if (ballX < 150 && ballY > mappedRotation-50 && ballY < mappedRotation+50 ) {
    ballSpeedX = -ballSpeedX+ random(0,1);
    ballSpeedY = -ballSpeedY+random(-1, 1);
  }
  rect(100,mappedRotation-50, 50, 100);
  }
  else {
	    if (ballX < 150 && ballY > enemyY-50 && ballY < enemyY+50 ) {
    ballSpeedX = -ballSpeedX+ random(0,1);
    ballSpeedY = -ballSpeedY+random(-1, 1);
  }
	rect(100,enemyY-50, 50, 100);
  }
 if(botY != ballY && ballX < width/2) {
    if(botY > ballY) {
      var speed = 0;
      
      speed = int(map(botY-ballY, 0, 400, 0, 20)* 10);
      speedD = int(map(ballY-botY, 0, 400, 0, 20)*10);
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
}
function mousePressed() {
  if (gameOver == true) {
    ballX = (width/2)-10;
    ballY = (height/2)-10;
    ballSpeedX = 10;
    ballSpeedY = 10;
    score = 0;
    R = 0;
    G = 0;
    B = 0;
	updateBallCoords(width/2, height/2, ballSpeedX, ballSpeedY);
gameOver = false;
setup();
loop();
  }
}