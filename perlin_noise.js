//C:\\processing-3.5.4\\processing-java.exe

var xoff = 0;
var yoff = 0;
var zoff = 0;
var inc = 0.1;
var scl = 20;
var cols, rows;

var angle;

var particles = [];

var flowfield;

function setup(){
  createCanvas(200,200);
  cols = floor(width / scl);
  rows = floor(height / scl);
  //noLoop();
  fr = createP(' ');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 400; i++){
    particles[i] = new Particle();
  
  }
  background(255);
}

function draw(){
  
  yoff = 0;
  for (var y = 0; y < rows; y++) {
    xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);

      v.setMag(0.1);
      flowfield[index] = v;
      xoff += inc;
      
      stroke(0, 100);
      strokeWeight(1);

      push();
      
      translate(x * scl, y * scl);
      rotate(v.heading());
      //line(0, 0, scl, 0);

      pop();

      
    }
    yoff += inc;
    zoff += 0.0002;
  }  

  for (var i = 0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fr.html(floor(frameRate()));
}
