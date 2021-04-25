const SOLID_LINE = 0;
const DOTTED_LINE = 1;
const SLINKY_LINE = 2;
const SPARSE_SLINKY_LINE = 3; //for creating slinky's when lines are used in other curves

let ss = {};

ss.Point = function (x,y) {
  this.x = x;
  this.y = y;
  this.col = [255,255,255];
  this.size = 5.0;
};

ss.Point.prototype.draw = function () {
  push();
  noStroke();
  fill(this.col);
  ellipse(this.x, this.y, this.size, this.size);
  pop();
};

ss.Point.prototype.copyFromPoint = function (pointToBeCopied) {
  this.x = pointToBeCopied.x;
  this.y = pointToBeCopied.y;
  this.col = pointToBeCopied.col;
  this.size = pointToBeCopied.size;
};

ss.Line = function (point1, point2) {
  if(this.checkConstructorArgs(point1,point2)) {
    this.point1 = point1;
    this.point2 = point2;
    this.col = [255,255,255];
    this.lineStyle = SOLID_LINE;
  } else {
    console.log("ERROR: ss.Line must be initialized with ss.Point objects");
  }
};

ss.Line.prototype.draw = function () {
  push();
  noStroke();
  noFill();

  let t_step;
  switch (this.lineStyle) {
    case SOLID_LINE:
      t_step = 0.005;
      break;
    case SLINKY_LINE:
      t_step = 0.02;
      break;
    case SPARSE_SLINKY_LINE:
      t_step = 0.5;
      break;
    case DOTTED_LINE:
      t_step = 0.05;
      break;
    default:
      t_step = 0.01;
      break;
  }

  for(let t =0 ; t <=1; t += t_step) {

    xCoord = this.point1.x + (this.point2.x - this.point1.x) * t;
    yCoord = this.point1.y + (this.point2.y - this.point1.y) * t;
    interpolatedWeight = this.point1.size
                            + (this.point2.size - this.point1.size) * t;
    color1 = color(this.point1.col);
    color2 = color(this.point2.col);
    interpolatedColor = lerpColor(color1,color2,t);

    if(this.lineStyle == SOLID_LINE || this.lineStyle == DOTTED_LINE) {
      noStroke();
      fill(interpolatedColor);
    } else if(this.lineStyle == SLINKY_LINE || this.lineStyle == SPARSE_SLINKY_LINE) {
      stroke(interpolatedColor);
      noFill();
    }

    ellipse(xCoord,yCoord,interpolatedWeight,interpolatedWeight);
  }
  pop();
};

ss.Line.prototype.checkConstructorArgs = function (point1, point2) {
  if (  point1 instanceof ss.Point &&
        point2 instanceof ss.Point ) {
        return true;
      } else {
        return false;
      }
}

ss.Bezier = function (point1,controlPoint1,controlPoint2,point2) {
  this.point1 = point1;
  this.controlPoint1 = controlPoint1;
  this.point2 = point2;
  this.controlPoint2 = controlPoint2;
  this.lineStyle = SOLID_LINE;
}


// https://math.stackexchange.com/questions/2463390/ways-to-convert-bezier-curve-to-parametric-equations#2463582
ss.Bezier.prototype.draw = function () {
  push();
  let t_step = 0.025;

  let pointsToDraw = [];
  for (let t = 0; t <= 1.00; t = round(t + t_step,4)) {
    const a = pow(1-t,3);
    const b = 3*t*pow(1-t,2);
    const c = 3*pow(t,2)*(1-t);
    const d = pow(t,3);

    const currentX = a*this.point1.x + b*this.controlPoint1.x
                + c*this.controlPoint2.x + d*this.point2.x;
    const currentY = a*this.point1.y + b*this.controlPoint1.y
                + c*this.controlPoint2.y + d*this.point2.y;

    const color1 = color(this.point1.col);
    const color2 = color(this.point2.col);
    const interpolatedColor = lerpColor(color1,color2,t);
    const interpolatedSize = lerp(this.point1.size,this.point2.size,t);

    const currentPoint = new ss.Point(currentX,currentY);
    currentPoint.col = interpolatedColor;
    currentPoint.size = interpolatedSize;

    pointsToDraw.push(currentPoint);
  }

  for (let i = 0; i < pointsToDraw.length-1; i++) {

    const line = new ss.Line(pointsToDraw[i],pointsToDraw[i+1]);
    line.lineStyle = this.lineStyle;
    line.draw();
  }
  pop();
};


ss.addRoundedCornersToCanvas = function (color,size,offset) {
  push();
    rectMode(CENTER);
    noFill();
    stroke(color);
    const rectRadius = size;
    strokeWeight(rectRadius * 2);
    rect(width/2,height/2,width+rectRadius*2-offset,height+rectRadius*2-offset,rectRadius*2-offset/2);
  pop();
};
