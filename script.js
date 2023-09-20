let paddle;
let ball;
let score = 0;
var timeLeft = 50;
var timer;
var c;
var win = false;

class Paddle {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - 40;
    this.speed = 20;
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction === "LEFT" && this.x > 0) {
      this.x -= this.speed;
    } else if (direction === "RIGHT" && this.x + this.width < width) {
      this.x += this.speed;
    }
  }

  checkCollision(ball) {
    if (
      ball.x + ball.size >= this.x &&
      ball.x <= this.x + this.width &&
      ball.y + ball.size >= this.y &&
      ball.y <= this.y + this.height
    ) {
      ball.bounce();
      score++;
    }
  }

  checkWin(){
    
  }
}

class Ball {
  constructor() {
    this.size = 20;
    this.x = width / 2 - this.size / 2;
    this.y = height / 2 - this.size / 2;
    this.speedX = (198, -7);
    this.speedY = (198, -7);
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x + this.size >= width) {
      this.speedX *= -1;
    }

    if (this.y <= 0 || this.y + this.size >= height) {
      this.speedY *= -1;
    }
  }

  bounce() {
    this.speedY *= -1;
  }
}

function setup() {
  createCanvas(400, 400);
  c = color(random(150, 255), random(150, 255), random(150, 255));
  paddle = new Paddle();
  ball = new Ball();
  timer = setInterval(changeBackground, 2000);
}

function draw() {
  print(mouseX,mouseY)
  background(c);

  paddle.display();
  ball.display();
  ball.update();

  paddle.checkCollision(ball);

  fill(255);
  textSize(20);
  text("Score: " + score, 10, 30);

  textSize(20);
  stroke(0);
  text(timeLeft, 366, 26);

  if (frameCount % 60 === 0 && timeLeft > 0) {
    timeLeft--;
  }

  if (timeLeft === 0 && !win ) {
    clearInterval(timer);
    fill(255, 0, 0);
    textSize(30);
    text("Game Over!", width / 2 - 75, height / 2);
  }else if(score >= 50 ){
    win = true;

  }

  
  if (win) {
    fill(255, 0, 0);
    textSize(30);
    text("You win!", width / 2 - 60, height / 2);
    ball.x = 800; // Set ball x position outside the canvas
  }
}

function changeBackground() {
  c = color(random(255), random(255), random(255));
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    paddle.move("LEFT");
  } else if (keyCode === RIGHT_ARROW) {
    paddle.move("RIGHT");
  }
}
