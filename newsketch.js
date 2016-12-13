var player;
var platform;
var overlap;

var gravity;
var jump;

function preload() {
  player = createSprite(((window.innerWidth)/2), ((window.innerHeight)/2), 64, 64);
  player.setCollider(0, 0, 64, 64);
  
  player.addAnimation("standing", "assets/charwalk0000.png");
  player.addAnimation("walking", "assets/charwalk0000.png", "assets/charwalk0011.png");
  player.addAnimation("jumpstart", "assets/charjumpstart.png");;
  player.addAnimation("jumpup", "assets/charjumpup0000.png", "assets/charjumpup0001.png");
  player.addAnimation("jumppeak", "assets/charjumppeak0000.png", "assets/charjumppeak0002.png");
  player.addAnimation("jumpfall", "assets/charjumpfall0000.png", "assets/charjumpfall0001.png");
  player.addAnimation("lookup00", "assets/charlookup0000.png");
  player.addAnimation("lookup01", "assets/charlookup0001.png");
  player.addAnimation("lookup02", "assets/charlookup0002.png");
  player.addAnimation("lookdown00", "assets/charlookdown0000.png");
  player.addAnimation("lookdown01", "assets/charlookdown0001.png");
  player.addAnimation("lookdown02", "assets/charlookdown0002.png");
  player.addAnimation("lookdown03", "assets/charlookdown0003.png");
  player.addAnimation("lookdown04", "assets/charlookdown0004.png");
  
  platform = createSprite(((window.innerWidth)/2), (3*(window.innerHeight)/4), 800, 100);
  platform.setCollider(0, 0, 800, 100);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  jump = -4;
  gravity = 0.0875;
}

function draw() {
  background(255);
  console.log(player.velocity.x + " + " + player.velocity.y + " + " + gravity);
  checkIt();
  drawSprites();
}

function checkIt() {
  groundedCheck();
}

function groundedCheck() {
  overlap = player.overlap(platform);
  if (overlap) {
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

function keyCheckX() {
  if (keyIsDown(RIGHT_ARROW)) {
    player.mirrorX(1);
    player.velocity.x = 1.25;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    player.mirrorX(-1);
    player.velocity.x = -1.25;
  }
  else {
    player.velocity.x = 0;
  }
}

function keyCheckY() {
  if (keyIsDown(UP_ARROW)) {
    if (player.velocity.y == 0) {
      gravity = .0875;
      player.velocity.y += jump;
    }
  }
}

function walk() {
  if (player.velocity.x == -1.25) {
    player.changeAnimation("walking");
  }
  else if (player.velocity.x == 1.25) {
    player.changeAnimation("walking");
  }
  else {
    player.changeAnimation("standing");
  }
}

function floating() {
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