function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  noStroke();

  //red circle
  fill(255, 0, 0, 127);
  circle(100, 100, 50);

  //green circle
  fill(0, 255, 0, 127);
  circle(115, 125, 50);

  //blue circle
  fill(0, 0, 255, 127);
  circle(85, 125, 50);
}
