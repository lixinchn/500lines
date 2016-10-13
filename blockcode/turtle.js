(function(global) {
  var canvas = document.querySelector('.turtle-canvas');
  canvas.setAttribute('width', canvas.scrollWidth);
  canvas.setAttribute('height', canvas.scrollHeight);
  var ctx = canvas.getContext('2d');
  var WIDTH = canvas.scrollWidth;
  var HEIGHT = canvas.scrollHeight;
  var cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt, PI = Math.PI;
  var DEGREE = PI / 180;

  function deg2rad(degrees) {
    return DEGREE * degrees;
  }

  function rad2deg(radians) {
    return radians / DEGREE;
  }

  function Turtle() {
    this.reset();
  }

  Turtle.prototype.reset = function() {
    this.position = {x: WIDTH / 2, y: HEIGHT / 2};
    this.direction = deg2rad(90);
    this.visible = true;
    this.pen = true;
    this.color = 'black';
  };

  Turtle.prototype.getDirection = function() {
    return rad2deg(this.direction);
  };

  Turtle.prototype.draw = function() {
    this.penUp();
    this.forward(5);
    this.penDown();
    this.left(-150);
    this.forward(12);
    this.left(-120);
    this.forward(12);
    this.left(-120);
    this.forward(12);
    this.left(30);
    this.penUp();
    this.forward(-5);
    this.penDown();
  };

  Turtle.prototype.penUp = function() {
    this.pen = false;
  };

  Turtle.prototype.penDown = function() {
    this.pen = true;
  };

  Turtle.prototype.hide = function() {
    this.visible = false;
  };

  Turtle.prototype.show = function() {
    this.visible = true;
  };

  Turtle.prototype.forward = function(distance) {
    var start = this.position;
    this.position = {
      x: cos(this.direction) * distance + start.x,
      y: -sin(this.direction) * distance + start.y,
    };
    if (this.pen) {
      ctx.lineStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(this.position.x, this.position.y);
      ctx.stroke();
      console.log('lineTo(%s, %s)', this.position.x, this.position.y);
    }
  };

  Turtle.prototype.left = function(degrees) {
    this.direction += deg2rad(degrees);
  };

  function clear() {
    ctx.save();
    ctx.fillStyle = 'white';
    console.log('ctx.fillRect(0,0,%s,%s', WIDTH, HEIGHT);
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
    ctx.moveTo(turtle.position.x, turtle.position.y);
    turtle.reset();
    // turtle.draw();
  }

  // initialization
  global.clear = clear;
  global.turtle = new Turtle();
  global.ctx = ctx;
  clear();
  turtle.draw();
})(window);