let canvasWidth = 500;
let canvasHeight = 500;
let shouldAutoResizeCanvas = false;

function setup() {
  // how to handle a variable not being declared in code gracefully
  if(canvasWidth && canvasHeight) {
    createCanvas(canvasWidth,canvasHeight);
    shouldAutoResizeCanvas = false;
  } else {
    squareSize = min(windowWidth,windowHeight);
    createCanvas(squareSize,squareSize);
    shouldAutoResizeCanvas = true;
  }


  angleMode(DEGREES);
  // noLoop();
  frameRate(24);
  noCursor();

}

function windowResized() {
  if(shouldAutoResizeCanvas) {
    squareSize = min(windowWidth,windowHeight);
    resizeCanvas(squareSize,squareSize);
  }
}

function draw() {
  colorMode(HSB,360,100,100);
  background(0,70,50);

  stroke("white");
  strokeWeight(5.0);
  noFill();
  rectMode(CENTER);
  rect(width/2,height/2,480,480);
  strokeWeight(1.0);
  rect(width/2,height/2,465,465);

  lineOfAlternatingTriangles(40,27.5,43,"HOR",0,10);
  lineOfAlternatingTriangles(27.5,40,43,"VER",0,10);
  lineOfAlternatingTriangles(40,height-27.5,43,"HOR",1,10);
  lineOfAlternatingTriangles(width-27.5,40,43,"VER",1,10);

  // inner circle of dancers
  resetMatrix();
  let ellipseR = width/3/2;
  let numberOfEllipsePoints = 27;
  for(i=0;i<numberOfEllipsePoints;i++){
    let theta = i/numberOfEllipsePoints*360-frameCount/2;
    let x = ellipseR * cos(theta);
    let y = ellipseR * sin(theta);
    // console.log("i = " + i + " x = " + x + " y = " + y);
    personGlyph(x+width/2,y+height/2,"neutral",10,+90+theta);
  }

  //  outer circle of dancers
  resetMatrix();
  ellipseR = width/1.75/2;
  numberOfEllipsePoints = 45;
  for(i=0;i<numberOfEllipsePoints;i++){
    let theta = i/numberOfEllipsePoints*360+frameCount/2;
    let x = ellipseR * cos(theta);
    let y = ellipseR * sin(theta);
    // console.log("i = " + i + " x = " + x + " y = " + y);
    personGlyph(x+width/2,y+height/2,"neutral",10,+90+theta);
  }

  // central player? maybe the trumpet can face the mouse?
  // should we try to generate music? what does the tampara sound like?
  personGlyph(width/2,height/2,"neutral",15,0);

  drawSun(width/2+160,height/2-160,50);

  // drawCursor();
  // showCurrentMousePosition();
}

function drawSun(x,y,size) {
  resetMatrix();
  translate(x,y);
  fill("white");
  ellipse(0,0,size-20.0);
  noFill();
  ellipse(0,0,size-10.0);
  ellipse(0,0,size-5.0);
  strokeWeight(1.0);
  ellipse(0,0,size);

  sunrayChangingValues = [-20,-15,-10,-5,0,5,10,15,20,15,10,5,0,-5,-10,-15];
  currentRayValue = frameCount % sunrayChangingValues.length;
  for(theta = 0;theta < 360; theta = theta + 15) {
    rotate(15);
    curve(0,sunrayChangingValues[currentRayValue],
      size/2+5.0,0,
      size*0.75,0,
      size*.75,sunrayChangingValues[currentRayValue]);
  }

}

function drawCursor() {
  resetMatrix();
  translate(width/2,height/2);
  noFill();
  stroke("yellow");
  strokeWeight(0.75);
  ellipse(mouseX-width/2,mouseY-height/2,5.0);
}

function showCurrentMousePosition() {
  resetMatrix();
  textAlign(RIGHT,BOTTOM);
  fill("yellow");
  stroke("yellow");
  text("MouseX: " + round(mouseX-width/2,2),width-40,height-50);
  text("MouseY: " + round(mouseY-height/2,2),width-40,height-35);

}

function personGlyph(x,y,gender,size,rotAngle) {
  // size if the square size of one of smallest triangle
  resetMatrix();
  translate(x,y);
  rotate(rotAngle);

  // upper and lower body
  switch(gender) {
    case "male":
      rotate(180);
      triangleInscribedInRect(-(size+2)/2,0,size+2,size+2);
      rotate(180);
      triangleInscribedInRect(-size/2,0,size,size);
      break;
    case "female":
      rotate(180);
      triangleInscribedInRect(-size/2,0,size,size);
      rotate(180);
      triangleInscribedInRect(-(size+2)/2,0,size+2,size+2);
      break;
    case "neutral":
      rotate(180);
      triangleInscribedInRect(-size/2,0,size,size);
      rotate(180);
      triangleInscribedInRect(-size/2,0,size,size);
      break;
  }

  // ellipse (currently female only)
  ellipse(-1,-1.7*size,size);
  ellipse(size/2,-1.7*size-2,0.5*size);
  stroke("white");
  strokeWeight(1.0);
  line(-1,-2*size,0,-size);

  //left leg
  line(-0.2*size,size,-0.3*size,size*1.5);
  line(-0.3*size,size*1.5,-0.2*size,size*2.0)
  //right leg
  line(0.2*size,size,-0.3*size+size/3.0,size*1.5);
  line(-0.3*size+size/3.0,size*1.5,0.2*size,size*2.0)

  //arms
  rotate(180);
  // right arm
  line(-size/2,size,-size,0);
  //left arm
  line(size/2,size,size,0);
  rotate(180);

}

// Make a glyph maker page to make this faster? And democratize making the glyphs?

function myTriangle(x,y,sideLength,rotAngle) {
  translate(x,y);
  angleMode(DEGREES);
  rotate(rotAngle);
  radius = sideLength / sqrt(3);
  triangle(
          xCoord(radius,90),yCoord(radius,90),
          xCoord(radius,210),yCoord(radius,210),
          xCoord(radius,330),yCoord(radius,330)
          )

}

function xCoord(r,theta) {
  return r * cos(theta);
}

function yCoord(r,theta) {
  return r * sin(theta);
}

// how to overload functions in javascript
// how to do classes and objects in javascript

function triangleInscribedInRect(x,y,w,h) {
  //Outline of triangle with rounded corners
  stroke("white");
  calcStrokeWeight = min(w/4,h/4);
  strokeWeight(calcStrokeWeight);

  line( x+calcStrokeWeight/2,y+h-calcStrokeWeight/2,
        x+w-calcStrokeWeight/2,y+h-calcStrokeWeight/2);
  line( x+w-calcStrokeWeight/2,y+h-calcStrokeWeight/2,
        x+w/2,y+calcStrokeWeight/2);
  line( x+w/2,y+calcStrokeWeight/2,
        x+calcStrokeWeight/2,y+h-calcStrokeWeight/2);

  //Fill of triangle
  noStroke()
  fill("white");
  beginShape();
  vertex(x,y+h);
  vertex(x+w,y+h);
  vertex(x+w/2,y);
  vertex(x,y+h);
  endShape();
}

function lineOfAlternatingTriangles(
                  startX,
                  startY,
                  count,
                  lineDirection, // direction must be HOR or VER
                  flipped, // must be 0 or 1
                  size) {
  resetMatrix();
  translate(startX,startY);
  if(lineDirection === "HOR") {
    rotationAngle = 180;
  } else {
    rotationAngle = 90;
  }
  for(i=0; i<count; i++) {
    if(i % 2 === flipped) {
      rotate(rotationAngle);
      triangleInscribedInRect(-size/2,-size/2,size,size);
      rotate(-rotationAngle);
    }
    else {
      rotate(rotationAngle+180);
      triangleInscribedInRect(-size/2,-size/2,size,size);
      rotate(-(rotationAngle+180));
    }
    if(lineDirection === "HOR") {
      translate(size,0);
    } else {
      translate(0,size);
    }

  }
}

// create a gradient line function
// create a gradient curve function
