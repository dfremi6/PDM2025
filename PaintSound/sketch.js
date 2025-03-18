let colors = [
  "red", "orange", "yellow", "green", "cyan", "blue", "magenta", "brown", "white", "black"
];
let selectedColor = "black";
let paletteWidth = 40;
let prevX, prevY;
let drawCount = 0;
let isDrawing = false;

// Tone.js Sound Setup
let brushSynth, colorSynth, clearSynth, loopSequence;
let bgLoop, kick, melody;
let userStarted = false; // Ensures sound starts only after interaction

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  drawPalette();

  // Tone.js Synths
  brushSynth = new Tone.MembraneSynth({ volume: -10 }).toDestination(); // Percussion for strokes
  colorSynth = new Tone.Synth({ oscillator: { type: "triangle" } }).toDestination(); // Soft blip for color change
  clearSynth = new Tone.NoiseSynth({ // Woosh effect for clearing
    volume: -10,
    noise: { type: "brown" },
    envelope: { attack: 0.2, decay: 0.6, sustain: 0 }
  }).toDestination();

  // Background Music (Looping)
  kick = new Tone.MembraneSynth({ volume: -15 }).toDestination();
  melody = new Tone.Synth({ oscillator: { type: "sine" }, volume: -12 }).toDestination();

  bgLoop = new Tone.Loop((time) => {
    kick.triggerAttackRelease("C2", "8n", time); // Soft bass
    let notes = ["C4", "E4", "G4", "B4", "C5"];
    melody.triggerAttackRelease(notes[Math.floor(Math.random() * notes.length)], "8n", time);
  }, "4n");

  // Start Audio on User Click
  document.addEventListener("click", startAudio);
}

// Start Audio Context on User Interaction
function startAudio() {
  if (!userStarted) {
    Tone.start().then(() => {
      bgLoop.start(0);
      Tone.Transport.start();
      console.log("Audio Started");
    });
    userStarted = true;
  }
}

function draw() {
  if (mouseIsPressed && mouseX > paletteWidth) {
    stroke(selectedColor);
    strokeWeight(5);
    line(prevX, prevY, mouseX, mouseY);

    if (!isDrawing) {
      isDrawing = true;
      brushSynth.triggerAttackRelease("C2", "16n"); // Quick sound for brush strokes
    }

    drawCount++; // Track drawing amount
    adaptMusic();
  } else {
    isDrawing = false;
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
      let pitch = Tone.Frequency("C4").transpose(index * 2); // Changes pitch for each color
      colorSynth.triggerAttackRelease(pitch, "8n");
    }
  }
}

function keyPressed() {
  if (key === "C" || key === "c") {
    background(220);
    clearSynth.triggerAttackRelease("8n");
    drawPalette();
    drawCount = 0;
    adaptMusic();
  }
}

// Adapt Music Dynamically
function adaptMusic() {
  let progress = constrain(drawCount / (width * height * 0.005), 0, 1);
  Tone.Transport.bpm.value = 90 + progress * 40; // Increase tempo gradually
  kick.volume.value = -15 + progress * 5; // Boost bass subtly
  melody.volume.value = -12 + progress * 5; // Increase melody prominence
}
