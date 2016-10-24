var serial;
var portName = '/dev/cu.usbmodem32';
var sensorValue;

var sliderLeft = new CreateMySlider(600, 50, "LEFT");
var sliderRight = new CreateMySlider(600, 100, "RIGHT");
var sliderMiddle = new CreateMySlider(600, 150, "MIDDLE");
var angleLeft = 0;
var angleRight = 0;
var angleMiddle = 0;

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
  rect(530, 0, 240, 160);
  fill(255);
  rect(0, 0, 200, 40);

  //Left disc control
  sliderLeft.show();
  var discLeft = new Disc(50, 400, 42, angleLeft);
  var rotateSpeedLeft = map(sliderLeft.num, 0, 100, 0, PI / 100);
  angleLeft = angleLeft + rotateSpeedLeft;

  //Right disc control
  sliderRight.show();
  var discRight = new Disc(50, 500, 22, angleRight);
  var rotateSpeedRight = map(sliderRight.num, 0, 100, 0, PI / 100);
  angleRight = angleRight + rotateSpeedRight;

  //Get the intersection point
  var node = new GetNode(discLeft.x, discLeft.y, 300, discRight.x, discRight.y, 300);

  if (!previous) {
    previous = node;
  }

  //Canvas spins
  sliderMiddle.show();
  var rotateSpeedMiddle = map(sliderMiddle.num, 0, 100, 0, PI / 500);
  angleMiddle = angleMiddle + rotateSpeedMiddle;
  push();
  translate(width / 2, height / 2);
  rotate(angleMiddle);
  strokeWeight(0.5);
  line(previous.x - width / 2, previous.y - height / 2, node.x - width / 2, node.y - height / 2);
  pop();

  previous = node;

  text("From Arduino:  " + sensorValue, 10, 30);
}

function mouseReleased() {
  println("sending");
  serial.write(sliderLeft.num);
  serial.write(sliderRight.num);
  serial.write(sliderMiddle.num);
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