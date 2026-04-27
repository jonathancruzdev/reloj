function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  let clockSize = min(width, height) * 0.7;

  let hr = hour();
  let minu = minute();
  let sec = second();

  drawClockFace(clockSize);
  drawHands(hr, minu, sec, clockSize);
}

function drawClockFace(clockSize) {
  let outerSize = clockSize;
  let innerSize = clockSize * 0.9;
  let majorMarkStart = clockSize * 0.36;
  let majorMarkEnd = clockSize * 0.42;
  let minorMarkEnd = clockSize * 0.39;
  let numberRadius = clockSize * 0.29;

  noStroke();
  fill(235, 240, 255);
  circle(0, 0, outerSize);

  fill(20, 26, 48);
  circle(0, 0, innerSize);

  for (let i = 0; i < 60; i++) {
    push();
    rotate(i * 6);
    stroke(235, 240, 255);
    strokeWeight(i % 5 === 0 ? max(2, clockSize * 0.014) : max(1, clockSize * 0.006));
    line(0, -majorMarkStart, 0, i % 5 === 0 ? -majorMarkEnd : -minorMarkEnd);
    pop();
  }

  fill(235, 240, 255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(clockSize * 0.07);
  textStyle(BOLD);
  for (let i = 1; i <= 12; i++) {
    let angle = i * 30 - 90;
    let x = cos(angle) * numberRadius;
    let y = sin(angle) * numberRadius;
    text(i, x, y + 1);
  }
}

function drawHands(hr, min, sec, clockSize) {
  let secondAngle = map(sec, 0, 60, 0, 360) - 90;
  let minuteAngle = map(min + sec / 60, 0, 60, 0, 360) - 90;
  let hourAngle = map((hr % 12) + min / 60, 0, 12, 0, 360) - 90;

  strokeCap(ROUND);

  stroke(255, 214, 10);
  strokeWeight(max(3, clockSize * 0.028));
  line(0, 0, cos(hourAngle) * clockSize * 0.2, sin(hourAngle) * clockSize * 0.2);

  stroke(120, 220, 255);
  strokeWeight(max(2, clockSize * 0.02));
  line(0, 0, cos(minuteAngle) * clockSize * 0.3, sin(minuteAngle) * clockSize * 0.3);

  stroke(255, 90, 90);
  strokeWeight(max(1, clockSize * 0.01));
  line(0, 0, cos(secondAngle) * clockSize * 0.35, sin(secondAngle) * clockSize * 0.35);

  noStroke();
  fill(255, 90, 90);
  circle(0, 0, max(8, clockSize * 0.04));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
