#include <Stepper.h>

const int stepsPerRevolution = 200;  // change this to fit the number of steps per revolution for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 8, 9, 10, 11);

void setup() {
  Serial.begin(9600);
  Serial.write(0);
}

void loop() {
  if (Serial.available() > 0) {   // if there's serial data available
    int inByte = Serial.read();   // read it
    Serial.write(inByte);         // send it back out as raw binary data  
    myStepper.setSpeed(inByte);       // set the speed at 60 rpm
  }
  myStepper.step(stepsPerRevolution);
}



