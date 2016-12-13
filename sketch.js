var player;
var platform;

var gravity = 0.0875
var jump = -4;

var grounded = false;

var counter = frameCount;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  player = createSprite(((window.innerWidth)/2), ((window.innerHeight)/2), 64, 64);
  console.log("I made a player!");
  player.addAnimation("standing", "assets/charwalk0000.png");
  console.log("I made the standing image!");
  player.addAnimation("walking", "assets/charwalk0000.png", "assets/charwalk0011.png");
  console.log("I made the walking animation!");
  player.addAnimation("jumpstart", "assets/charjumpstart.png");
  console.log("I made the start of jump animation!");
  player.addAnimation("jumpup", "assets/charjumpup0000.png", "assets/charjumpup0001.png");
  console.log("I made the jumping up animation!");
  player.addAnimation("jumppeak", "assets/charjumppeak0000.png", "assets/charjumppeak0002.png");
  console.log("I made the peak of the jump animation!");
  player.addAnimation("jumpfall", "assets/charjumpfall0000.png", "assets/charjumpfall0001.png");
  console.log("I made the falling down animation!");
  player.addAnimation("lookup00", "assets/charlookup0000.png");
  player.addAnimation("lookup01", "assets/charlookup0001.png");
  player.addAnimation("lookup02", "assets/charlookup0002.png");
  player.addAnimation("lookdown00", "assets/charlookdown0000.png");
  player.addAnimation("lookdown01", "assets/charlookdown0001.png");
  player.addAnimation("lookdown02", "assets/charlookdown0002.png");
  player.addAnimation("lookdown03", "assets/charlookdown0003.png");
  player.addAnimation("lookdown04", "assets/charlookdown0004.png");
  
  player.setCollider("rectangle", 0, 0, 56, 56);
  
  platform = createSprite(((window.innerWidth)/2), ((window.innerHeight)/2), 800, 100);
  platform.setCollider("rectangle", 0, 0, 744, 100);
}

function draw() {
	background(255);
	checkIt();
	
	drawSprites();
	
}

function checkIt() {
	collisionCheck();
	keyCheckX();
	keyCheckY();
	groundedCheck();
}

function collisionCheck() {
	if (player.collide(platform)) {
		player.velocity.y = 0;
		grounded = true;
	}
	
	else {
		player.velocity.y += gravity;
		grounded = false;
	}
}

function keyCheckX() {
	if (keyIsDown(RIGHT_ARROW)) {
		player.mirrorX(1);
		player.velocity.x = 1.25;
			if (grounded) {
				player.changeAnimation("walking");
			}
	} 
	else if (keyIsDown(LEFT_ARROW)) { 
		player.mirrorX(-1);
		player.velocity.x = -1.25;
			if (grounded) {
				player.changeAnimation("walking");
			}
	}
	else {
		player.velocity.x = 0;
		if (grounded) {
			player.changeAnimation("standing");
		}
	}
}

function keyCheckY() {
	if (keyIsDown(32)) {
		if (grounded) {
			charJump();
		}
	}
}

function charJump() {
			player.velocity.y = jump;
			grounded = false;
}

function groundedCheck() {
	if (grounded === false) {
		if (0 > player.velocity.y || player.velocity.y > 0.0875) {
			jumpAnimationCheck();
		}
	}
}

function jumpAnimationCheck() {
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