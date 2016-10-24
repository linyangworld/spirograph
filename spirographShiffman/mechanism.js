function Disc(discX, discY, discR, angle) {
  this.discX = discX;
  this.discY = discY;
  this.discR = discR;
  this.angle = angle;

  this.x = this.discX - (this.discR * cos(angle));
  this.y = this.discY - (this.discR * sin(angle));
}

function GetNode(x1, y1, r1, x2, y2, r2) {
  var E = sq(r2) - sq(r1) + sq(x1) - sq(x2) + sq(y1) - sq(y2);
  var F = E / (2 * (y1 - y2)) - y1;
  var G = (x1 - x2) / (y1 - y2);
  var a = 1 + sq(G);
  var b = -2 * (x1 + (F * G));
  var c = sq(x1) + sq(F) - sq(r1);

  this.x = (-b + sqrt(sq(b) - (4 * a * c))) / (2 * a);
  this.y = -G * this.x + F + y1;
}