class Obstacle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = this.getRandomSize(40, 90); // random width between 20 and 100
      this.height = this.getRandomSize(40, 90); // random height between 30 and 120
      this.obstacleType = this.getRandomColor();
    }

    getRandomSize(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min; // random size between min and max
    }

    getRandomColor() {
      const colors = ['red', 'blue', 'yellow'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
  
    drawObstacle() {
      const obstacleImg = new Image();
      obstacleImg.src =
      this.obstacleType === 'red'
      ? './images/asteroid-one.png'
      : this.obstacleType === 'blue'
      ? './images/asteroid-two.png'
      : './images/asteroid-three.png';
      ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
  }
  
  class Bonus extends Obstacle {
    constructor(x, y) {
        super(x, y); // Call parent constructor
        this.width = 60;  // Set fixed width for bonus box
        this.height = 60; // Set fixed height for bonus box
        this.obstacleType = 'bonus';
    }

    drawObstacle() {
        const obstacleImg = new Image();
        obstacleImg.src = './images/gem.png'; 
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }
}

class Skull extends Obstacle {
  constructor(x, y, width, height) {
      super(x, y, 60, 60);
      this.obstacleType = 'skull';
  }

  drawObstacle() {
      const obstacleImg = new Image();
      
      obstacleImg.src = './images/skull.png';
      ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
  }
}


