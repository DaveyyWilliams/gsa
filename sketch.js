let img;
let size;
let revealDone = false;
let maskX;
let tintR = 255, tintG = 255, tintB = 255;

function preload() {
  img = loadImage("GamestopFinal.png");
}

function setup() {
  createCanvas(900, 900); // expanded cinematic canvas
  size = 1400; // start extremely zoomed in
  maskX = width; // mask starts fully covering the image
}

function draw() {
  // --- BACKGROUND: soft off-white ---
  background(248, 246, 240);

  // --- CINEMATIC ZOOM OUT (ease-out) ---
  if (!revealDone) {
    size = lerp(size, 500, 0.05); // final size fits perfectly in 900x900

    if (abs(size - 500) < 0.5) {
      revealDone = true;
    }
  } else {
    // --- POST-REVEAL GLOW ---
    tintR = map(sin(frameCount * 0.03), -1, 1, 230, 255);
    tintG = map(sin(frameCount * 0.025), -1, 1, 230, 255);
    tintB = map(sin(frameCount * 0.02), -1, 1, 230, 255);
  }

  // --- DRAW LOGO ---
  push();
  imageMode(CENTER);
  tint(tintR, tintG, tintB);
  image(img, width / 2, height / 2, size, size);
  pop();

  // --- MASK REVEAL ---
  if (maskX > -100) {
    maskX = lerp(maskX, -200, 0.08);
    noStroke();
    fill(248, 246, 240);
    rect(maskX, 0, width, height);
  }
}
