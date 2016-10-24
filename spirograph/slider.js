function CreateMySlider(x, y, name) {
  this.x = x;
  this.y = y;
  this.name = name;
  this.num = 0;

  this.dragging = false;
  this.offset = 0;
  this.handleX = x + 4;
  this.handleY = y;
  this.handleR = 9;
  this.sliderStart = x + 4;
  this.sliderEnd = x + 116;

  this.show = function() {
    fill(80);
    strokeWeight(0.05);
    textFont("Avenir");
    textSize(12);
    text(this.name, this.x - 60, this.y + 4);
    textSize(14);
    text(this.num, this.x + 140, this.y + 5);

    stroke(80);
    strokeWeight(1.5);
    strokeCap(ROUND);
    line(this.x, this.y, this.x + 120, this.y);

    if (this.dragging) {
      this.handleX = mouseX - this.offset;
    }

    this.handleX = constrain(this.handleX, this.sliderStart, this.sliderEnd);
    ellipse(this.handleX, this.handleY, this.handleR, this.handleR);
    this.num = int(map(this.handleX, this.sliderStart, this.sliderEnd, 0, 100));

    if (mouseIsPressed) {
      if (dist(mouseX, mouseY, this.handleX, this.handleY) <= this.handleR) {
        this.dragging = true;
        this.offset = mouseX - this.handleX;
      }
    } else {
      this.dragging = false;
    }
  };
}