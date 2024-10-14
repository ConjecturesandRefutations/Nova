let currentType = 'spaceship-one';

function handleShipChange(event) {
  event.stopPropagation();

  // Remove the 'selected' class from all spaceship images
  const spaceshipImages = document.querySelectorAll('.spaceship');
  spaceshipImages.forEach(image => image.classList.remove('selected'));

  // Get the associated label and find its image child
  const selectedLabel = event.target.closest('label'); // Find the label for the clicked input
  const selectedImage = selectedLabel.querySelector('img'); // Get the image inside the label
  selectedImage.classList.add('selected'); // Add 'selected' to the image

  // Set the current type
  if (event.target.checked) {
    currentType = event.target.value;
  }
}

function addTouchListeners() {
  // Touch event handling for leftButton
  currentShip.leftButton.ontouchstart = (event) => {
    event.preventDefault();
    currentShip.leftButtonDown = true;
    currentShip.throttledLeftStart();
  };

  currentShip.leftButton.ontouchend = () => {
    currentShip.leftButtonDown = false;
    currentShip.stopMovingCar();
  };

  // Touch event handling for rightButton
  currentShip.rightButton.ontouchstart = (event) => {
    event.preventDefault();
    currentShip.rightButtonDown = true;
    currentShip.throttledRightStart();
  };

  currentShip.rightButton.ontouchend = () => {
    currentShip.rightButtonDown = false;
    currentShip.stopMovingCar();
  };

  // Mouse event handling for leftButton
  currentShip.leftButton.onmousedown = () => {
    currentShip.leftButtonDown = true;
    currentShip.throttledLeftStart();
  };

  currentShip.leftButton.onmouseup = () => {
    currentShip.leftButtonDown = false;
    currentShip.stopMovingCar();
  };

  // Mouse event handling for rightButton
  currentShip.rightButton.onmousedown = () => {
    currentShip.rightButtonDown = true;
    currentShip.throttledRightStart();
  };

  currentShip.rightButton.onmouseup = () => {
    currentShip.rightButtonDown = false;
    currentShip.stopMovingCar();
  };
}

class Car {
    constructor(){
      this.x = canvas.width/2;
      this.y = canvas.height/1.25;
      this.width = 30;
      this.height = 50;
      this.img = this.getImagePath();
      this.rotation = 0; // Rotation angle in degrees


    // Variables to track button presses
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    
    // Variables to track button presses
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.throttleDelay = 100; // Mobile Throttle Delay (Milliseconds)

    // Select the mobile-controls buttons
    this.leftButton = document.getElementById('left');
    this.rightButton = document.getElementById('right');

    // Throttle the touchstart event listeners
    this.throttledLeftStart = this.throttle(() => this.startMovingCar('left'), this.throttleDelay);
    this.throttledRightStart = this.throttle(() => this.startMovingCar('right'), this.throttleDelay);

    this.isCarMoving = false;

    this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)

    //Event listeners for keyboard controls
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    
    }
    
    getImagePath() {
      // Return the appropriate image path based on the currentType
      switch (currentType) {
        case 'spaceship-one':
          return './images/Spaceship-One.png';
        case 'spaceship-two':
          return './images/Spaceship-Two.png';
        case 'spaceship-three':
        default:
          return './images/Spaceship-Three.png';
      }
    }

    drawCar() {
    const carImg = new Image();
    carImg.src = this.img;
    
    // Rotate the canvas context to match the car's rotation
    ctx.save(); // Save the current context state
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Move the context to the car's center
    ctx.rotate((this.rotation * Math.PI) / 180); // Rotate the context
    ctx.drawImage(carImg, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the car image
    ctx.restore(); // Restore the context to its original state
  }

    handleKeyDown(event) {
      if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = true;
        this.throttledLeftStart();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = true;
        this.throttledRightStart();
      }
    }
  
    handleKeyUp(event) {
      if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = false;
        this.stopMovingCar();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = false;
        this.stopMovingCar();
      }
    }

    throttle(callback, delay) {
      let lastCallTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
          lastCallTime = now;
          callback.apply(this, arguments);
        }
      };
    }
    
startMovingCar(direction) {
    // Move the car continuously as long as the corresponding button is pressed
    if (direction === 'left' && this.leftButtonDown && this.x > 5) {
      this.x -= 3;
      this.rotation = -17;
      //turn.play();
    } else if (direction === 'right' && this.rightButtonDown && this.x < myCanvas.width - 35) {
      this.x += 3;
      this.rotation = 17;
      //turn.play();
    }

    // Use requestAnimationFrame to keep moving the car continuously
    if (this.leftButtonDown || this.rightButtonDown) {
      this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingCar(direction));
    }
  }
  
  stopMovingCar() {
    // Stop the car's movement when both buttons are released
    if (!this.leftButtonDown && !this.rightButtonDown) {
      cancelAnimationFrame(this.requestAnimationFrame);
      this.rotation = 0;
    }
  }

  }