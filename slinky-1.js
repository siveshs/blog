// https://colorhunt.co/palette/252807
const color_palette = [ "#f6f5f5",
                        "#d3e0ea",
                        "#1687a7",
                        "#276678",
                        "#222222"]; //added dark gray to get some depth
let bg_color = color_palette[0];
let fg_color1 = color_palette[1];
let fg_color2 = color_palette[2];
let fg_color3 = color_palette[3];

let canvasWidth = 400;
let canvasHeight = 400;
let bezierCurves = [];
var borderThickness = 20.0;         // must be var to use dat.gui
var numberOfCurves = 50;            // must be var to use dat.gui

function setup() {
  const canvas = createCanvas(windowWidth*0.75, windowHeight*0.75);
  canvas.style('margin','auto');

  const body = select('body');
  body.style('background-color',bg_color);

  const p = createP("To refresh, click/tap the screen or press Enter");
  p.style('text-align','center');
  p.style('color','#333333');

  let gui = new dat.GUI();
  gui.add(this,"numberOfCurves",10,100,10);
  gui.add(this,"borderThickness",5.0,50.0,5.0);
  gui.close();

  generateRandomBezierCurves(SPARSE_SLINKY_LINE);

  noLoop();
}

function draw() {
  background(fg_color2);
  drawBezierCurves()
  ss.addRoundedCornersToCanvas("#333333",20.0,borderThickness);
  ss.addRoundedCornersToCanvas(bg_color,20.0,0.0);
}

function keyPressed() {
  if (keyCode === ENTER || keyCode === SPACE) {
    resizeCanvas(windowWidth*0.75, windowHeight*0.75);
    bezierCurves = [];
    generateRandomBezierCurves(SPARSE_SLINKY_LINE);
    redraw();
  }
}

function mouseReleased() {
    resizeCanvas(windowWidth*0.75, windowHeight*0.75);
    bezierCurves = [];
    generateRandomBezierCurves(SPARSE_SLINKY_LINE);
    redraw();
}

function windowResized() {
//   resizeCanvas(windowWidth*0.75, windowHeight*0.75);
//   // TO DO; re-scale the points
//   redraw();
}

function generateRandomBezierCurves(style) {
  for(let i = 0; i<=numberOfCurves; i++) {
    const point1 = new ss.Point(random(width),random(height));
    const controlPoint1 = new ss.Point(random(width),random(height));
    const controlPoint2 = new ss.Point(random(width),random(height));
    const point2 = new ss.Point(random(width),random(height));
    point1.col = random(color_palette.slice(1));
    point2.col = random(color_palette.slice(1));
    point1.size = random(10,50);
    point2.size = random(1,20);

    const bezierLine = new ss.Bezier(point1,controlPoint1,controlPoint2,point2);
    bezierLine.lineStyle = SPARSE_SLINKY_LINE;
    bezierCurves.push(bezierLine);
  }
}

function drawBezierCurves() {
  bezierCurves.forEach((eachCurve, i) => {
    eachCurve.draw();
  });


}
