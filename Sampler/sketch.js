let startContext, samples, sampler, button1, button2, button3, button4, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(0.5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload() {
  samples = new Tone.Players({
    drum: "/media/drum.mp3",
    blast: "/media/blast.mp3",
    bass: "/media/synthBass.mp3",
    yeah: "/media/yeah.mp3"
  }).connect(del);
}

function setup() {
  createCanvas(600, 300);

  startContext = createButton("Start Audio");
  startContext.position(250, 20);
  startContext.mousePressed(startAudioContext);

  button1 = createButton("Drum");
  button1.position(100, 80);
  button2 = createButton("Blast");
  button2.position(200, 80);
  button3 = createButton("Bass");
  button3.position(300, 80);
  button4 = createButton("Yeah");
  button4.position(400, 80);

  button1.mousePressed(() => { samples.player("drum").start(); });
  button2.mousePressed(() => { samples.player("blast").start(); });
  button3.mousePressed(() => { samples.player("bass").start(); });
  button4.mousePressed(() => { samples.player("yeah").start(); });

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(100, 180);
  delTimeSlider.input(() => { del.delayTime.value = delTimeSlider.value(); });

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(100, 220);
  feedbackSlider.input(() => { del.feedback.value = feedbackSlider.value(); });

  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(350, 180);
  distSlider.input(() => { dist.distortion = distSlider.value(); });

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(350, 220);
  wetSlider.input(() => { rev.wet.value = wetSlider.value(); });
}

function draw() {
  background(220);
  textSize(14);
  text("Delay Time", 100, 170);
  text("Feedback", 100, 210);
  text("Distortion", 350, 170);
  text("Reverb Wet", 350, 210);
}

function startAudioContext() {
  if (Tone.context.state !== "running") {
    Tone.start();
    console.log("Audio Context Started");
  }
}
