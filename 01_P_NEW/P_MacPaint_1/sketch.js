/**
* Simple drawing tool where mouse input gets mirrored over multiple axis
*
* MOUSE
* left click          : draw line
* scroll wheel        : change stroke weight
*
* KEYS
* space               : new composition
* s                   : save png
* 1                   : toggle vertical mirror
* 2                   : toggle horizontal mirror
* 3                   : toggle diagonal mirror
*/
"use strict";

var lineWidth = 4;

var verticalMirror = true;
var horizontalMirror = true;
var diagonalMirror = true;

function setup() {
  createCanvas(800, 800);
  cursor(CROSS);
  noFill();
  strokeWeight(lineWidth);
}

function draw() {
  strokeWeight(lineWidth);

  if (mouseIsPressed) {

    // Mirror mouse input along vertical axis.
    var mirrorX = verticalMirror ? width - mouseX : mouseX;
    var pMirrorX = verticalMirror ? width - pmouseX : pmouseX;

    // Mirror mouse input along horizontal axis.
    var mirrorY = horizontalMirror ? height - mouseY : mouseY;
    var pMirrorY = horizontalMirror ? height - pmouseY : pmouseY;

    // Draw line at current mouse position.
    line(mouseX, mouseY, pmouseX, pmouseY);
    // Draw line at mirrored position.
    line(mirrorX, mirrorY, pMirrorX, pMirrorY);
    // Draw line at vertically mirrored position.
    line(mirrorX, mouseY, pMirrorX, pmouseY);
    // Draw line at horizontally mirrored position.
    line(mouseX, mirrorY, pmouseX, pMirrorY);

    // When mirroring diagonally, flip X and Y inputs.
    if (diagonalMirror) {
      line(mouseY, mouseX, pmouseY, pmouseX);
      line(mirrorY, mirrorX, pMirrorY, pMirrorX);
      line(mirrorY, mouseX, pMirrorY, pmouseX);
      line(mouseY, mirrorX, pmouseY, pMirrorX);
    }

  }

}

function mouseWheel(e) {
  lineWidth = max(lineWidth += e.delta / 100, 0.1);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') verticalMirror = !verticalMirror;
  if (key == '2') horizontalMirror = !horizontalMirror;
  if (key == '3') diagonalMirror = !diagonalMirror;
  if (key == ' ') clear();
}
