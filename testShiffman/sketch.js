function setup() { 
  createCanvas(400, 400);
  
  var val1 = 72.5;
  var val2 = 402.3;
  
  var send = floor(val1) + "," + floor(val2) + "\n";
  console.log(send);
  
  for (var i = 0; i < send.length; i++) {
		// var byte = send.charAt(i);
    var byte = send.charCodeAt(i);
    console.log(byte);
    // serial.write(byte);
  }
  
  
  // serial.write(byte);  
} 



