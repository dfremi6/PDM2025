let colors = [
  'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'
];
let selectedColor = 'black';
let paletteWidth = 40;
let prevX, prevY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  drawPalette();
}

function draw() {
  if (mouseIsPressed && mouseX > paletteWidth) {
    stroke(selectedColor);
    strokeWeight(5);
    line(prevX, prevY, mouseX, mouseY);
  }
  prevX = mouseX;
  prevY = mouseY;
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(0);
    rect(0, i * 40, paletteWidth, 40);
  }
}

function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / 40);
    if (index >= 0 && index < colors.length) {
      selectedColor = colors[index];
    }
  }
}
