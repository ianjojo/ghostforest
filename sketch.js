let angle = 0;
let slider;
let bg;
let leaves = ["#3a4f3f", "#485e52", "#587e60", "#5f926a", "#77a37a"]; // leaf colours

// preload background image
function preload() {
  bg = loadImage("sky.jpeg");
}

function setup() {
  createCanvas(640, 360);
}

function draw() {
  noLoop();
  background(bg);
  angle = PI / 3;
  stroke("#5e5e5e");
  strokeWeight(random(1, 3));

  // farthest layer of trees
  for (let i = 0; i < random(10, 50); i++) {
    push();
    translate(random(0, width), height - random(40, 70));
    branch(random(30, 60));
    pop();
  }
  filter(BLUR, 1);
  filter(ERODE);
  blendMode(DODGE);

  // medium layer
  for (let i = 0; i < random(10, 20); i++) {
    push();
    translate(random(0, width), height - random(10, 40));
    branch(random(30, 50));
    pop();
  }
  filter(BLUR, 1);
  blendMode(OVERLAY);

  // closer layer
  for (let i = 0; i < random(6, 12); i++) {
    push();
    translate(random(0, width), height);
    branch(random(40, 80));
    pop();
  }
  filter(BLUR, 1);
  blendMode(SOFT_LIGHT);

  // closest layer
  for (let i = 0; i < random(3, 8); i++) {
    push();
    translate(random(0, width), height);
    branch(random(40, 100));
    pop();
  }
  filter(BLUR, 0.5);
  blendMode(MULTIPLY);
}

function branch(len) {
  // tree trunk
  line(0, 0, 0, -len);
  translate(0, -len);

  // this if statement prevents the rescursion from going forever and crashing the browser
  if (len > 2) {
    stroke(leaves[round(random(0, 4))]);
    strokeWeight(1);
    push();
    rotate(angle * random(0, 1));
    branch(len * random(0.67, 0.7));
    pop();
    push();
    rotate(-angle * random(0, 1));
    branch(len * 0.67);
    pop();
  }
}

// clears the canvas, reruns setup and redraws on mouse press
function mousePressed() {
  clear();
  setup();
  redraw();
}
