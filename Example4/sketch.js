function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
}

function draw() {
  //blue background
  background(0, 0, 150);
  
  //green circle
  stroke('white');
  strokeWeight(3);
  fill(0, 125, 0);
  circle(200, 200, 100);

  //red star
  fill(255, 0, 0);
  beginShape();
  vertex(200, 150);
  vertex(215.95, 184.53);
  vertex(247.55, 184.55);
  vertex(225.23, 214.69);
  vertex(229.39, 240.45);
  vertex(200.00, 227.55);
  vertex(170.61, 240.45);
  vertex(175.77, 214.69);
  vertex(152.45, 184.55);
  vertex(184.05, 184.53);
  endShape(CLOSE);
}
