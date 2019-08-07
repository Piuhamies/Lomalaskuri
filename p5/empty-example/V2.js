//Pizzaworm V2 
var score = 0;


var msg = "Käynistä peli";

var direction = [];
var gameStarted = false;
var main;

var matoCoords = [];
var matoStartingLength = 4;
var matoGrow = 1;
var direction = 'right';

var updateInterval = 100; //Kuinka usein mato liikkuu/piirretään millisekunneissa

var aspectRatioX = 4;
var aspectRatioY = 3

var pizzaSize = 3; //Kuinka monen ruudun kokoinen yksi pizza on.
var mapSize = 6; //Mapin koko
var gridX = aspectRatioX*mapSize; //lasketaan mapin koko osioiksi x-akselilla
var gridY = aspectRatioY*mapSize; //lasketaan mapin koko osioiksi y-akselilla

var skipX = 0; //Näihin tallennetaan laskettu pikselimäärä jokaista kokoyksikköä vasten
var skipY = 0;
var smoothness = 0;

var pizzaX;
var pizzaY;

var tempX;
var tempY;

var img;
var play;
var pizza;
		

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
function preload() {
	img = loadImage("hdKakka.png");
	play = loadImage("play.png");
	pizza = loadImage("pizza.png");
}

function calculateSkips() {
  skipX = width / gridX;
  skipY = height / gridY;
}
function randomizeMatoLocation() {
  matoCoords.push([int(random(0, gridX-matoStartingLength)), int(random(0, gridY))]);
  for(var i =0; i< matoStartingLength-1; ++i) { //looppi joka arvoo randomilla wormin sijainnin
  matoCoords.push([matoCoords[i][0] + 1 , matoCoords[i][1]]);
  }
}
function setup() {
    var options = {
    preventDefault: true
  };
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);
  getSize();
  randomizeMatoLocation();
  createCanvas(tempX, tempY);
  calculateSkips();
}

function mouseClicked() {
	if(gameStarted == false ) {
		startGame();
		gameStarted = true;
	}
}

function windowResized() {
	getSize();
	resizeCanvas(tempX, tempY);
	calculateSkips();
}

function restartGame() {
	matoCoords = []; //resetoidaan madon sijainti
    direction = 'right';
	clearInterval(main); //Pysäytetään peli
	gameStarted = false;
	randomizeMatoLocation();
}
function swiped(event) {
	switch(event.direction ) {
		case 2 :
			if (direction != 'right') {
				direction = 'left';
			}
		break;
		case 4:
			if (direction != 'left') {
				direction = 'right';
			}
		break;
		case 8: 
			 if (direction != 'down') {
				direction = 'up';
			}
		break;
		case 16:
			if (direction != 'up') {
				direction = 'down';
			}
		break;
}
}

function keyPressed() {
switch (keyCode) {
    case 65:
      if (direction != 'right') {
        direction = 'left';
      }
      break;
    case 68:
      if (direction != 'left') {
        direction = 'right';
      }
      break;
    case 87:
      if (direction != 'down') {
        direction = 'up';
      }
      break;
    case 83:
      if (direction != 'up') {
        direction = 'down';
      }
      break;
  }
}
function draw() {
  if(gameStarted == false) {
	background(51);
	textSize(60);
	textAlign(CENTER);
	noStroke();
	if(msg == "Käynistä peli" ) {
		text(msg, width/2, height/3);
	}
	else {
		fill(255,0,0);
		text(msg, width/2, height/4);
		textSize(40);
		fill(0,0,0);
		text("Sinulla oli " + score + " pistettä", width/2, height/3);
	}
	
	imageMode(CENTER);
	image(play, width/2, height/2, width/10, width/10);
  }
}
function detectBorderCollision() {
	var last = matoCoords[matoCoords.length -1];
	console.log(matoCoords.length);
	if(last[0] < 0 || last[1] < 0 || last[0]*skipX > width || last[1]*skipY > height) {
		restartGame();
		msg = "Osuit seinään";
	}		
}
function detectSnakeCollision() {
	var last = matoCoords[matoCoords.length -1];
	for(len = matoCoords.length, i=0; i<len-2; ++i) {
		if(matoCoords[i][0] == last[0] && matoCoords[i][1] == last[1]) {
			msg = "Söit itsesi";
			restartGame();
		}
	}
}
function updateScore() {
	textAlign(LEFT);
	textSize(60);
	text(score, 15, 55);
}
function getNewPizzaLocation() {
	pizzaX = Math.floor(random(3, gridX-3))*skipX;
	pizzaY = Math.floor(random(3, gridY-3))*skipY;
}
function drawPizza() {
	image(pizza, pizzaX, pizzaY, pizzaSize/2*skipX, pizzaSize/2*skipY);
}
function detectPizzaCollision() {
	var lastX = matoCoords[matoCoords.length -1 ][0]*skipX;
	var lastY = matoCoords[matoCoords.length -1 ][1]*skipX
	if(lastX > pizzaX && lastY > pizzaY && lastX < pizzaX+(pizzaSize/2*skipX) && lastY < pizzaY+(pizzaSize/2*skipY)) {
		getNewPizzaLocation();
		++score;
		for(var i =0; i< matoGrow; ++i) { //looppi joka arvoo randomilla wormin sijainnin
			matoCoords.unshift([matoCoords[0][0] - 1 , matoCoords[0][1]]);
		}
		
	}
}
function startGame() {
	score = 0; //resetoidaan pisteet
	msg = "Error";
	getNewPizzaLocation();
	main =  setInterval(function() {
		var last = matoCoords[matoCoords.length -1 ];
			switch (direction) {
			case 'right': 
				matoCoords.push([last[0] +1, last[1] +0]);
			break;
			case 'left': 
				matoCoords.push([last[0] -1, last[1] +0]);
			break;
			case 'up': 
				matoCoords.push([last[0] +0, last[1] -1]);
			break;
			case 'down': 
				matoCoords.push([last[0] +0, last[1] +1]);
			break;
	}
	detectBorderCollision();
	detectPizzaCollision();
	detectSnakeCollision();
	matoCoords.shift();
	imageMode(CORNER);
	image(img, 0, 0, width, height);
	updateScore();
	drawPizza();
			for(len = matoCoords.length, i=0; i<len; ++i) {
					strokeWeight(10);
					stroke(random(0, 255), random(0,255), random(0,255));
					if(i < len-1) {
						line(matoCoords[i][0]*skipX, matoCoords[i][1]*skipY, matoCoords[i+1][0]*skipX, matoCoords[i+1][1]*skipY);
					}
			}
	}, updateInterval);
}