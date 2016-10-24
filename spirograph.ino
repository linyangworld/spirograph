#include <Stepper.h>

const int stepsPerRevolution = 200;

Stepper myStepper(stepsPerRevolution, 2, 3, 4, 5);
Stepper myStepper2(stepsPerRevolution, 6, 7, 8, 9);
Stepper myStepper3(stepsPerRevolution, 10, 11, 12, 13);

int sliderLeft;
int sliderRight;
int sliderMiddle;

void setup() {
  Serial.begin(9600);

}

void loop() {
  if (Serial.available() > 3) {
    sliderLeft = Serial.read();
    sliderRight = Serial.read();
    sliderMiddle = Serial.read();
    int endValue = Serial.read();

    if (endValue == 255) {
      Serial.print(sliderLeft);
      Serial.print(",");
      Serial.print(sliderRight);
      Serial.print(",");
      Serial.println(sliderMiddle);
    }
  }
  if (millis() % sliderLeft < 10) {
    myStepper.step(1);
  }
  if (millis() % sliderRight < 10) {
    myStepper2.step(1);
  }
  if (millis() % sliderMiddle < 10) {
    myStepper3.step(1);
  }

}
