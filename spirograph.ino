#include <Stepper.h>

const int stepsPerRevolution = 200;

Stepper myStepper(stepsPerRevolution, 2, 3, 4, 5);
Stepper myStepper2(stepsPerRevolution, 6, 7, 8, 9);
Stepper myStepper3(stepsPerRevolution, 10, 11, 12, 13);

int leftValue;
int rightValue;
int middleValue;

void setup() {
  Serial.begin(9600);

}

void loop() {
  if (Serial.available() > 3) {
    leftValue = Serial.read();
    rightValue = Serial.read();
    middleValue = Serial.read();
    int endValue = Serial.read();

    if (endValue == 255) {
      Serial.print(leftValue);
      Serial.print(",");
      Serial.print(rightValue);
      Serial.print(",");
      Serial.println(middleValue);
    }
  }
  if (millis() % leftValue < 1) {
    myStepper.step(1);
  }
  if (millis() % rightValue < 1) {
    myStepper2.step(1);
  }
  if (millis() % middleValue < 1) {
    myStepper3.step(1);
  }
  delay(1);
}
