//background edited from a creative commons, useable with modification pixel art background found in a database without an author
//future iterations will include my own background, some foreground objects, and more aesthetically pleasing text
//the final iteration will include an additional end event involving sitting on the ledge. Other animations may be included.


//vessels for sprites
var player;
var platform;
var endtext;
var bgimage1, bgimage2, bgimage3, bgimage4;

//mechanic variable
var overlap;
var endsit;

//number variables, useful for debugging
var gravity;
var jump;
var walkspeed;

//sprites to load
var bgimage;
var floorimage;
var textimage;

//width and height of total game
var scene_width = (960 * 4);
var scene_height = 600;

//music variables
var osc;
var sequence = [59, 64, 61, 64, 66, 64, 66, 71];
var step = 0;
var echo;

function preload() {
	
	//load the images immediately
	floorimage = loadImage("assets/floor.jpg");
  bgimage = loadImage("assets/game-background-2.jpg");
  textimage = loadImage("assets/text.png");
  
  //backgrounds loaded first to push them farthest back
  bgimage1 = createSprite(0, 0, 960, 600);
  bgimage1.addImage(bgimage);
  bgimage2 = createSprite(960, 0, 960, 600);
  bgimage2.addImage(bgimage);
  bgimage3 = createSprite(1920, 0, 960, 600);
  bgimage3.addImage(bgimage);
  bgimage4 = createSprite(2880, 0, 960, 600);
  bgimage4.addImage(bgimage);
  
  //player loaded second to appear in front of background
  player = createSprite(600, 300, 64, 64);
  player.setCollider(0, 0, 56, 56);
  
  //platform loaded last to ensure it appears "above" any other sprites
  platform = createSprite(1470, 550, 2975, 75);
  platform.setCollider(-100, 0, 2975, 75);
  platform.addImage(floorimage);
  
  //player animations loaded
  player.addAnimation("standing", "assets/charwalk0000.png");
  player.addAnimation("walking", "assets/charwalk0000.png", "assets/charwalk0011.png");
  player.addAnimation("jumpstart", "assets/charjumpstart.png");
  player.addAnimation("jumpup", "assets/charjumpup0000.png", "assets/charjumpup0001.png");
  player.addAnimation("jumppeak", "assets/charjumppeak0000.png", "assets/charjumppeak0002.png");
  player.addAnimation("jumpfall", "assets/charjumpfall0000.png", "assets/charjumpfall0001.png");
  player.addAnimation("lookup00", "assets/charlookup0000.png");
  player.addAnimation("lookup01", "assets/charlookup0001.png");
  player.addAnimation("lookup02", "assets/charlookup0002.png");
  player.addAnimation("lookdowntotal", "assets/charlookdown0000.png", "assets/charlookdown0000.png", "assets/charlookdown0000.png", "assets/charlookdown0000.png", "assets/charlookdown0000.png", "assets/charlookdown0001.png", "assets/charlookdown0001.png", "assets/charlookdown0001.png", "assets/charlookdown0001.png", "assets/charlookdown0001.png", "assets/charlookdown0002.png", "assets/charlookdown0002.png", "assets/charlookdown0002.png", "assets/charlookdown0002.png", "assets/charlookdown0002.png", "assets/charlookdown0003.png", "assets/charlookdown0003.png", "assets/charlookdown0003.png", "assets/charlookdown0003.png", "assets/charlookdown0003.png", "assets/charlookdown0004.png", "assets/charlookdown0004.png", "assets/charlookdown0004.png", "assets/charlookdown0004.png", "assets/charlookdown0004.png");
  player.addAnimation("lookdown00", "assets/charlookdown0000.png")
  player.addAnimation("lookdown01", "assets/charlookdown0001.png");
  player.addAnimation("lookdown02", "assets/charlookdown0002.png");
  player.addAnimation("lookdown03", "assets/charlookdown0003.png");
  player.addAnimation("lookdown04", "assets/charlookdown0004.png");
  player.addAnimation("sitatend", "assets/charlookdown0005.png");
  
  //text loaded last and modified using depth property
  endtext = createSprite(2930, 200, 800, 600);
  endtext.addImage(textimage);
  endtext.depth = -5;
 
}

function setup() {
  createCanvas(960, 600);
  
  //initialize the number-based variables
  jump = -4;
  gravity = .0875;
  walkspeed = 1.5;
  endsit = false;
  
  //initialize the p5 oscillator
  osc = new p5.Oscillator();
  osc.setType('triangle');
  osc.freq(240);
  osc.amp(0);
  osc.start();
  
  //initialize an echo
  echo = new p5.Delay();
  echo.process(osc, .8, 0.75, 1500);
}

function draw() {

	//make the music continue in time
	osc.amp(0.075);
  osc.freq(midiToFreq(sequence[step]));
  if(frameCount % 80 === 0) step = ((step + 1) % sequence.length);
  
  //make a transparent background
  background(0, 0);
  
  //have the program check for motion
  preCheck();
  
  //update the sprites
  drawSprites();
  
  //manage the camera position
  cameraCheck();
  
}

function cameraCheck() {
	if(player.position.x > 450 && player.position.x < 2820) {
		camera.position.x = player.position.x;
	}
  if(player.position.x < 0) player.position.x = 0;
  if(player.position.x >= 2770) {
  	endtext.depth = 5;
  }
}

function preCheck() {
	if (player.position.x < 2770 && 400 < player.position.y < 500) checkIt();
	else if (player.position.x < 2920 && player.position.x >= 2770) checkWalk();
	else if (player.position.x >= 2920) endGame();
}


function checkWalk() {
	overlap = player.overlap(platform);
	if (overlap === true && player.position.y < 500 && player.position.y > 400) {
		player.velocity.y = 0;
		keyCheckX();
		walk();
	}
	else {
		player.velocity.y += gravity;
		keyCheckX();
		floating();
	}
}
function checkIt() {
	//determines whether the player will be walking or flying based upon its overlap with the platform
  overlap = player.overlap(platform);
  if (overlap === true && player.position.y < 500 && player.position.y > 400) {
    player.velocity.y = 0;
    keyCheckX();
    keyCheckY();
    walk();
  }
  else {
    player.velocity.y += gravity;
    keyCheckX();
    keyCheckY();
    floating();
  }
}

function endGame() {
	gravity = 0;
	if (player.position.x < 2963) {
		player.changeAnimation("walking");
		player.setSpeed(0.5, 0);
	}
	if(player.position.x >= 2963) {
		player.setSpeed(0, 0);
		player.depth = 10
		player.position.y = 480;
		endSit()
	}
}

function endSit() {
	player.changeAnimation("lookdowntotal");
	player.changeAnimation("sitatend");
}

function keyCheckX() {
  if (keyIsDown(RIGHT_ARROW)) {
    player.mirrorX(1);
    player.velocity.x = walkspeed;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    player.mirrorX(-1);
    player.velocity.x = -walkspeed;
  }
  else {
    player.velocity.x = 0;
  }
}

function keyCheckY() {
	
	//This function prevents a player from jumping while in the air
  if (keyIsDown(UP_ARROW)) {
    if (player.velocity.y === 0) {
      player.velocity.y += jump;
    }
  }
}

function walk() {
	
	//These statements change the player animation when on the ground
  if (player.velocity.x == -walkspeed) {
    player.changeAnimation("walking");
  }
  else if (player.velocity.x == walkspeed) {
    player.changeAnimation("walking");
  }
  else {
    player.changeAnimation("standing");
  }
}

function floating() {
	
	//These statements change the player animation when in the air
  if (jump <= player.velocity.y && player.velocity.y < -3.8) {
    player.changeAnimation('jumpstart');
  }
  else if (-3.8 <= player.velocity.y && player.velocity.y < -0.2) {
    player.changeAnimation('jumpup');
  }
  else if (-0.2 <= player.velocity.y && player.velocity.y < 0.2) {
    player.changeAnimation('jumppeak');
  }
  else if (0.2 <= player.velocity.y) {
    player.changeAnimation('jumpfall');
  }
}
