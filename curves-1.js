const canvasWidth = 500;
const canvasHeight = 500;
const numberOfDots = 25;
const dotDiameter = 10;
let arrayOfPoints = [];
const maxPixelsToRandomlyMove = 2;

function setup() {
  angleMode(DEGREES);

  createCanvas(canvasWidth, canvasHeight);

  frameRate(30);

  // create an array of points
  for (i = 0; i < numberOfDots; i++) {
    const randX = random();
    const randY = random();
    colorMode(HSB, 360, 80, 100);
    const dotHue = random(360);
    const fillColor = color(dotHue, 50, 100);
    const currentPoint = {
      x: randX,
      y: randY,
      color: fillColor,
    };
    arrayOfPoints.push(currentPoint);
  }


}

function draw() {
  background(20);

  for (let currentPoint of arrayOfPoints) {
    fill(currentPoint.color);
    noStroke();
    ellipse(realX(currentPoint.x), realY(currentPoint.y), dotDiameter);
  }

  noFill();
  strokeWeight(0.5);
  stroke("white")
  beginShape();
  for (i = 0; i < (arrayOfPoints.length); i++) {
    curveVertex(realX(arrayOfPoints[i].x), realY(arrayOfPoints[i].y));
  }
  endShape(CLOSE);

  displayFrameRate();

  movePoints();

}

function realX(normalizedX) {
  return (normalizedX * canvasWidth);
}

function realY(normalizedY) {
  return (normalizedY * canvasHeight);
}

function displayFrameRate() {
  textSize(16);
  textAlign(RIGHT);
  fill("white");
  const roundedFrameRate = round(frameRate(), 1)
  text("Current Frame Rate: " + roundedFrameRate, width - 10, height - 10);
  text("Current Frame Count: " + frameCount, width - 10, height - 30);
}

function nudgeAllPoints() {
  const scaledMaxPixelsToMove = maxPixelsToRandomlyMove / min(canvasWidth, canvasHeight);
  for (let currentPoint of arrayOfPoints) {
    currentPoint.x = currentPoint.x + random([1.0, -1.0]) * random(scaledMaxPixelsToMove);
    currentPoint.y = currentPoint.y + random([1.0, -1.0]) * random(scaledMaxPixelsToMove);
  }
}

function movePoints() {
  const centerPoint = {
    x: 0.5,
    y: 0.5,
    color: color("white"),
  };

  for (let currentPoint of arrayOfPoints) {
    const d = distance(currentPoint.x, currentPoint.y,
      centerPoint.x, centerPoint.y);
    const theta = angle(currentPoint.x, currentPoint.y,
      centerPoint.x, centerPoint.y);
    // console.log("Distance :" + d);
    // console.log("Angle :" + theta);
    currentPoint.x = currentPoint.x + 0.01 * d * cos(theta);
    currentPoint.y = currentPoint.y + 0.01 * d * sin(theta);
  }
}

function distance(x1, y1, x2, y2) {
  return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}

function angle(x1, y1, x2, y2) {
  angleMode(DEGREES);
  return atan((y1 - y2) / (x1 - x2));
}
