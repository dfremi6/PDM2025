function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  noStroke();

  //yellow circle
  fill(255, 255, 0);
  circle(100, 100, 100);

  //black mouth
  fill(0);
  triangle(0, 0, 100, 100, 0, 200);

  //top of red ghost
  fill(255, 0, 0);
  circle(300, 100, 100)

  //bottom of red ghost
  beginShape();
  vertex(250, 100);
  vertex(250, 150);
  vertex(350, 150);
  vertex(350, 100);
  endShape(CLOSE);

  //eyeballs
  fill(255, 255, 255);
  circle(275, 100, 30);
  circle(325, 100, 30);

  //eye color
  fill(0, 0, 255);
  circle(275, 100, 20);
  circle(325, 100, 20);
}
