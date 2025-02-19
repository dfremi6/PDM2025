let bugs = [];
let squishedBugs = [];
let bugSpriteSheet;
let walkFrames = 2;
let spriteWidth, spriteHeight;
let squishCount = 0;
let timer = 30;
let gameOver = false;
let baseSpeed = 1.5;

function preload() {
  bugSpriteSheet = loadImage('bugSquish.png');
}

function setup() {
  createCanvas(800, 600);

  spriteWidth = bugSpriteSheet.width / 2; 
  spriteHeight = bugSpriteSheet.height / 2; 

  for (let i = 0; i < 5; i++) {
    let { x, y } = getSafeSpawnLocation();
    bugs.push(new Bug(x, y, baseSpeed));
  }

  setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      gameOver = true;
    }
  }, 1000);
}

function draw() {
  background(220);

  if (!gameOver) {
    for (let bug of bugs) {
      bug.move();
      bug.display();
    }

    for (let squished of squishedBugs) {
      squished.display();
    }

    fill(0);
    textSize(24);
    text("Squished: " + squishCount, 10, 30);
    text("Time: " + timer, width - 100, 30);
  } else {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    text("Final Score: " + squishCount, width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].checkSquish(mouseX, mouseY)) {
      squishCount++;

      let squishedBug = new SquishedBug(bugs[i].x, bugs[i].y);
      squishedBugs.push(squishedBug);

      bugs.splice(i, 1);

      baseSpeed += 0.2;
      for (let bug of bugs) {
        bug.speed += 0.1; 
      }

      setTimeout(() => {
        let { x, y } = getSafeSpawnLocation();
        bugs.push(new Bug(x, y, baseSpeed));

        squishedBugs.splice(squishedBugs.indexOf(squishedBug), 1);
      }, 1000);
      break;
    }
  }
}

class Bug {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = random(TWO_PI);
    this.frame = 0;
    this.lastFrameTime = millis();
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x < 0 || this.x > width) this.angle = PI - this.angle;
    if (this.y < 0 || this.y > height) this.angle = -this.angle;

    if (millis() - this.lastFrameTime > 200) { 
      this.frame = (this.frame + 1) % walkFrames;
      this.lastFrameTime = millis();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(bugSpriteSheet, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight,
          this.frame * spriteWidth, 0, spriteWidth, spriteHeight);
    pop();
  }

  checkSquish(mx, my) {
    return dist(mx, my, this.x, this.y) < 20;
  }
}

class SquishedBug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    translate(this.x, this.y);
    image(bugSpriteSheet, -spriteWidth / 2, -spriteHeight / 2, spriteWidth, spriteHeight,
          0, spriteHeight, spriteWidth, spriteHeight); 
    pop();
  }
}

function getSafeSpawnLocation() {
  let x, y;
  let safe = false;

  while (!safe) {
    x = random(50, width - 50);
    y = random(50, height - 50);
    safe = true;

    for (let bug of bugs) {
      if (dist(x, y, bug.x, bug.y) < 50) {
        safe = false;
        break;
      }
    }
  }
  return { x, y };
}
