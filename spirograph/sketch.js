var serial;
var portName = '/dev/cu.usbmodem1411';
var sensorValue;

var sliderLeft = new CreateMySlider(1140, 580, "DISC 1");
var sliderRight = new CreateMySlider(1140, 620, "DISC 2");
var sliderMiddle = new CreateMySlider(1140, 660, "CANVAS");
var angleLeft = 0;
var angleRight = 0;
var angleMiddle = 0;
var leftValue = 0;
var rightValue = 0;
var middleValue = 0;

var previous;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function draw() {

  //create rectangle for the background of sliders
  noStroke();
  fill(255);
  rect(1050, 0, windowWidth - 1050, windowHeight);
  fill(150);
  textSize(16);
  text("Two rotating discs control a drawing point, while the canvas is", 1058, 460);
  text("also rotating. Therefore, by changing the rotating speed of the ", 1058, 490);
  text("discs or canvas, you will get different shapes of spirograph.", 1058, 520);
  fill(200);
  text("Rotation Speed Control", 1058, 420);
  stroke(0.8);
  fill(80);
  textSize(20);
  text("# SPIROGRAPH", 1058, 380);

  //Left disc control
  sliderLeft.show();
  var discLeft = new Disc(-100, 330, 100, angleLeft);
  var rotateSpeedLeft = map(sliderLeft.num, 0, 20, 0, PI / 400);
  angleLeft = angleLeft + rotateSpeedLeft;

  //Right disc control
  sliderRight.show();
  var discRight = new Disc(-70, 660, 80, angleRight);
  var rotateSpeedRight = map(sliderRight.num, 0, 20, 0, PI / 400);
  angleRight = angleRight + rotateSpeedRight;

  //Get the intersection point
  var node = new GetNode(discLeft.x, discLeft.y, 470, discRight.x, discRight.y, 500);

  if (!previous) {
    previous = node;
  }

  //Canvas spins
  sliderMiddle.show();
  var rotateSpeedMiddle = map(sliderMiddle.num, 0, 20, 0, PI / 500);
  angleMiddle = angleMiddle + rotateSpeedMiddle;
  push();
  translate(width / 2 - 270, height / 2);
  rotate(angleMiddle);
  fill(50);
  strokeWeight(0.5);
  line(previous.x - width / 2 + 270, previous.y - height / 2, node.x - width / 2 + 270, node.y - height / 2);
  pop();

  previous = node;

  // noFill();
  // stroke(0, 0, 0, 5);
  // ellipse(discLeft.discX, discLeft.discY, 360, 360);
  // ellipse(discRight.discX, discRight.discY, 240, 240);
  // line(discLeft.x, discLeft.y, node.x, node.y);
  // line(discRight.x, discRight.y, node.x, node.y);
  // fill(0);
  // ellipse(width / 2 - 260, height / 2, 2, 2);


  //text("From Arduino:  " + sensorValue, 10, 30);
  leftValue = floor(map(sliderLeft.num, 0, 20, 30, 4));
  rightValue = floor(map(sliderRight.num, 0, 20, 30, 4));
  middleValue = floor(map(sliderMiddle.num, 0, 20, 30, 4));
}

function mouseReleased() {
  println("sending");
  serial.write(leftValue);
  serial.write(rightValue);
  serial.write(middleValue);
  serial.write(255); // send raw binary of 255 to check
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    sensorValue = inString;
  }
}
