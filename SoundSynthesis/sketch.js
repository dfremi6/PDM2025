let rockImage;
let soundTriggered = false;
let impactSynth, noise, crackle, debris, filter, noiseEnv, noiseLFO, crush;

function preload() {
  rockImage = loadImage("media/rock_break.png", 
    () => console.log("Image loaded!"), 
    () => console.error("Failed to load image!")
  );
}

function setup() {
  createCanvas(600, 400);

  // Impact synth for the "thud"
  impactSynth = new Tone.MembraneSynth({
    pitchDecay: 0.02,
    octaves: 4,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0.0, release: 0.1 }
  }).toDestination();

  // Noise burst for the "crack" sound
  noise = new Tone.Noise("white");
  filter = new Tone.Filter(3000, "highpass").toDestination();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.005,
    decay: 0.1,
    sustain: 0,
    release: 0.05
  }).connect(filter);
  noise.connect(noiseEnv);

  // Crackling effect (short bursts of noise)
  crackle = new Tone.Player({
    url: "https://freesound.org/data/previews/170/170117_2437358-lq.mp3",
    autostart: false
  }).toDestination();

  // Small debris falling (short noise blips)
  debris = new Tone.Noise("white").start();
  let debrisFilter = new Tone.Filter(500, "bandpass").toDestination();
  let debrisEnv = new Tone.AmplitudeEnvelope({
    attack: 0.02,
    decay: 0.3,
    sustain: 0,
    release: 0.1
  }).connect(debrisFilter);
  debris.connect(debrisEnv);

  // Bitcrusher effect for an extra "crunch"
  crush = new Tone.BitCrusher(4).toDestination();

  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Click to Break the Rock!", width / 2, height / 2);
}

function draw() {
  background(50);
  if (soundTriggered) {
    image(rockImage, width / 2 - 100, height / 2 - 100, 200, 200);
  }
}

function mouseClicked() {
  if (!soundTriggered) {
    soundTriggered = true;
    playBreakingSound();
  }
}

function playBreakingSound() {
  Tone.start();

  // Impact - Heavy low thud
  impactSynth.triggerAttackRelease("C1", 0.1);

  // Crackling noise burst
  noiseEnv.triggerAttackRelease(0.05);

  // Randomized debris effect
  setTimeout(() => {
    debris.volume.value = -15;
    debrisEnv.triggerAttackRelease(0.1);
  }, 100 + Math.random() * 50);

  // Play crackle sample for extra realism (optional)
  setTimeout(() => {
    crackle.start();
  }, 80);
}
