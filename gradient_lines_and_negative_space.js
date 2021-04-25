let numberOfLines = 10;
// const BG_COLOR = "#444444";
const BG_COLOR = "hsb(0,0%,0%)";
const BG_COLOR_WITH_ALPHA = "hsba(0,0%,0%,1.0)";
const FG_COLOR = "hsb(185,48%,90%)";

let time = 0;

function setup() {
  const canvas = createCanvas(windowWidth*0.75, windowHeight*0.75);
  canvas.style('margin','auto');

  const body = select('body');
  body.style('background-color',BG_COLOR);

  const p = createP("Quick study of colors, lines, gradients and how negative space interacts with them");
  p.style('text-align','center');
  p.style('color','#333333');

  angleMode(DEGREES);
}

function draw() {
  background(BG_COLOR);
  // drawGrid();
  drawShadedLines(10,BG_COLOR,FG_COLOR);
  drawBorder();

  drawShape(3,time*2);
  time++;
}

function drawShape(numberOfPoints,time) {
  push();
  fill(BG_COLOR_WITH_ALPHA);
  noStroke();
  translate(width/2,height/2);

  points = [];
  r = width/2+width/4*sin(time);
  for(let i =0; i<numberOfPoints;i++) {
    theta = 360 * i / numberOfPoints + time;
    const x = xC(r,theta);
    const y = yC(r,theta);
    const newPoint = new ss.Point(x,y);
    points.push(newPoint);
  }

  beginShape();
  points.forEach((point, i) => {
    vertex(point.x,point.y);
  });
  endShape(CLOSE);

  pop();
}

function xC (r,theta) {
  return (r * cos(theta));
}

function yC (r,theta) {
  return (r * sin(theta));
}

function drawBorder() {
  push();
  const numOfSpacesAroundLines = numberOfLines + 1;
  const lineThickness = height/(numberOfLines + numOfSpacesAroundLines);
  rectMode(CENTER);
  stroke(BG_COLOR);
  strokeWeight(lineThickness *2);
  noFill();
  rect(width/2,height/2,width,height);
  pop();
}

function drawShadedLines(number,startcol,endcol) {
  push();
  const numOfSpacesAroundLines = numberOfLines + 1;
  const lineThickness = height/(numberOfLines + numOfSpacesAroundLines);
  for(let i = 0; i<= numberOfLines; i++) {
    const p1 = new ss.Point(0,lineThickness*(1.5+i*2));
    p1.col = startcol // light blue
    p1.size = lineThickness;
    const p2 = new ss.Point(0.1*width,lineThickness*(1.5+i*2));
    p2.col = startcol;
    p2.size = lineThickness;
    const line1 = new ss.Line(p1,p2);
    line1.draw();

    const p3 = new ss.Point(width,lineThickness*(1.5+i*2));
    p3.col = endcol
    p3.size = lineThickness;
    const line2 = new ss.Line(p2,p3);
    line2.draw();

  }
  pop();
}


function drawGrid() {
  let gridSize = height/20;
  for(let x = 0; x <= width ; x += gridSize) {
    stroke("white");
    strokeWeight(0.1);
    line(x,0,x,height);
  }
  for(let y = 0; y <= width ; y += gridSize) {
    stroke("white");
    strokeWeight(0.1);
    line(0,y,width,y);
  }
}
