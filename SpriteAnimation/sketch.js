let spritesheets = [];
let characters = [];
let moveDirection = "stand";
let lastDirection = "right";

function preload() {
  spritesheets.push(loadImage("media/goldenmonk.png"));
  spritesheets.push(loadImage("media/junglewarrior.png"));
  spritesheets.push(loadImage("media/viking.png"));
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  
  for (let i = 0; i < spritesheets.length; i++) {
    let character = new Character(random(80, width - 80), random(80, height - 80), spritesheets[i]);
    characters.push(character);
  }
}

function draw() {
  background(220);

  for (let character of characters) {
    character.update();
    character.draw();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    moveDirection = "right";
    lastDirection = "right"; 
  } else if (keyCode === LEFT_ARROW) {
    moveDirection = "left";
    lastDirection = "left"; 
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    moveDirection = "stand"; 
  }
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.currentAnimation = "stand_right";
    this.animations = {
      "stand_right": new SpriteAnimation(this.spriteSheet, 0, 0, 1),
      "stand_left": new SpriteAnimation(this.spriteSheet, 0, 0, 1, true),
      "right": new SpriteAnimation(this.spriteSheet, 0, 0, 9),
      "left": new SpriteAnimation(this.spriteSheet, 0, 0, 9, true),
    };
  }

  update() {
    if (moveDirection === "right") {
      this.x += 2;
      this.currentAnimation = "right";
    } else if (moveDirection === "left") {
      this.x -= 2;
      this.currentAnimation = "left";
    } else {
      this.currentAnimation = lastDirection === "right" ? "stand_right" : "stand_left";
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    this.animations[this.currentAnimation].draw();
    pop();
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped = false) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {
    let s = this.flipped ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;
    }
    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}
