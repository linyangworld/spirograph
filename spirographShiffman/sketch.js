var serial;
var portName = '/dev/cu.usbmodem1421';

var sliderLeft = new CreateMySlider(600, 50, "LEFT");
var sliderRight = new CreateMySlider(600, 100, "RIGHT");
var sliderMiddle = new CreateMySlider(600, 150, "MIDDLE");
var angleLeft = 0;
var angleRight = 0;
var angleMiddle = 0;

var previous;

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  background(255);
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {

  //create rectangle for the background of sliders
  noStroke();
  fill(255);
  rect(3 * width / 4 - 10, 0, width / 4, width / 5);

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
  line(previous.x - width / 2, previous.y - height / 2, node.x - width / 2, node.y - height / 2);
  //point(node.x - width / 2, node.y - height / 2);
  pop();
  
  previous = node;
}

function serialEvent() {
  var inString = serial.read(); // read a string from the serial port
  
  //serial.write(floor(sliderLeft.num));
  // serial.print(sliderLeft.num); // send it out to the serial port
  // serial.print(",");
  // serial.print(sliderRight.num);
  // serial.print(",");
  // serial.println(sliderMiddle.num);
}