
let synth, filter, reverb;
let filterSlider, reverbSlider;

// Octave
const keyMap = {
    'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4',
    'g': 'G4', 'h': 'A4', 'j': 'B4', 'k': 'C5'
};

let activeKeys = {};

function setup() {
    createCanvas(600, 300);
    
    // PolySynth
    synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 }
    });

    // Filter
    filter = new Tone.Filter(1500, "lowpass").toDestination();
    synth.connect(filter);

    // Reverb Effect
    reverb = new Tone.Reverb({ decay: 2, wet: 0.3 }).toDestination();
    synth.connect(reverb);

    // Filter Slider
    filterSlider = createSlider(200, 5000, 1500);
    filterSlider.position(50, height - 40);
    filterSlider.style('width', '200px');

    // Reverb Slider
    reverbSlider = createSlider(0, 1, 0.3, 0.01);
    reverbSlider.position(300, height - 40);
    reverbSlider.style('width', '200px');
}

function draw() {
    background(0);
    
    // Update
    filter.frequency.value = filterSlider.value();
    reverb.wet.value = reverbSlider.value();

    // Labeling
    fill(255);
    textSize(18);
    text("Press A - K to play notes", width / 2 - 100, 40);
    text("Filter Cutoff: " + filterSlider.value(), 50, height - 50);
    text("Reverb: " + reverbSlider.value(), 300, height - 50);

    drawKeys();
}

function keyPressed() {
    let note = keyMap[key];
    if (note && !activeKeys[key]) {
        synth.triggerAttack(note);
        activeKeys[key] = true;
    }
}

function keyReleased() {
    let note = keyMap[key];
    if (note) {
        synth.triggerRelease(note);
        delete activeKeys[key];
    }
}

// Draw Keyboard
function drawKeys() {
    let keys = Object.keys(keyMap);
    let keyWidth = width / keys.length;

    for (let i = 0; i < keys.length; i++) {
        let x = i * keyWidth;
        let isActive = activeKeys[keys[i]];

        fill(isActive ? "yellow" : "white");
        rect(x, height / 2, keyWidth - 5, 80);
        fill(0);
        textSize(20);
        text(keys[i].toUpperCase(), x + keyWidth / 2 - 5, height / 2 + 50);
    }
}
