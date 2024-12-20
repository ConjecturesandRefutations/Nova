function startGame() {

  startTime = Date.now();
  cancelAnimationFrame(animationFrameId);
  drive.play();
  currentGame = new Game();
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // draw background image
  // Instantiate a new Car
  currentShip = new Car();
  currentShip.drawCar();
  animationFrameId = requestAnimationFrame(updateCanvas);

  // Add touch event listeners
  if (!isGameOver) {
    addTouchListeners();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 && isGameOver) {
    restartGame();
  }
});

function resetScore() {
  currentGame.score = 0;
  scoreDisplay.innerText = 0;
  currentGame.level = 1;
  level.innerText = currentGame.level;
  lastDifficultyUpdate = 0;
  divisor = 30;
}  

  function updateCanvas() {

    const currentTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds


    if (isGameOver) return;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // clear canvas
    
    // Scroll the background downwards
    backgroundY += 1;
    if (backgroundY >= myCanvas.height) {
        backgroundY = 0;
    }

    // Draw the background image twice, one above the other, to cover the entire canvas
    ctx.drawImage(background, 0, backgroundY, myCanvas.width, myCanvas.height);
    ctx.drawImage(background, 0, backgroundY - myCanvas.height, myCanvas.width, myCanvas.height);

    currentShip.drawCar(); // redraw the Car at its current position
    obstaclesFrequency++;
    //skullFrequency++;

    if (obstaclesFrequency % divisor === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * myCanvas.width);
        let randomObstacleY = -50;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            );
  
        currentGame.obstacles.push(newObstacle);
        currentGame.score++;
        scoreDisplay.innerText = currentGame.score
    }

    /*if (skullFrequency >= 200) {
      // Draw a skull
      let randomSkullX = Math.floor(Math.random() * myCanvas.width);
      let randomSkullY = -50;
      let randomSkullWidth = 60;
      let randomSkullHeight = 60;
      let newSkull = new Skull(
          randomSkullX,
          randomSkullY,
          randomSkullWidth,
          randomSkullHeight,
      );
  
      currentGame.skulls.push(newSkull);        
  
      // Reset the skull frequency counter
      skullFrequency = 0;
  } else {
      // Increment the skull frequency counter
      skullFrequency++;
  }*/
  
    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += obstacleSpeed; 
        currentGame.obstacles[i].drawObstacle();
 
         if (detectCollision(currentGame.obstacles[i])) {
          congrats.pause();
          crash.play();
          currentShip.x = myCanvas.width/2;
          currentShip.y = myCanvas.height/1.5;
          endGame();
        }       
              // Logic for removing obstacles 
       if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
        currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
      } 
      }

        // Check collision with bonus boxes
  for (let i = 0; i < currentGame.bonuses.length; i++) {
    if (detectCollision(currentGame.bonuses[i])) {
      currentGame.bonuses.splice(i, 1);
      congrats.pause();
      yummy.play();
      currentGame.score += 50; // Increase the score by 50
      scoreDisplay.innerText = currentGame.score; // Update the score display

      // Display the bonus indicator and then hide it after a delay
      const bonusIndicator = document.getElementById('bonus-indicator');
      bonusIndicator.classList.remove('hidden');
      setTimeout(() => {
          bonusIndicator.classList.add('hidden');
      }, 1000); // Adjust the delay time as needed
    }
                  // Logic for removing obstacles
                  if (currentGame.bonuses.length > 0 && currentGame.bonuses[i].y >= 700) {
                    currentGame.bonuses.splice(i, 1); // remove that obstacle from the array
                  } 
  }

  /* for (let i = 0; i < currentGame.skulls.length; i++) {
    currentGame.skulls[i].y += 5; 
    currentGame.skulls[i].drawObstacle();

    if (detectCollision(currentGame.skulls[i])) {
      currentGame.skulls.splice(i, 1); 
      congrats.pause();
      skull.play();
      currentGame.score -= 50; // Decrease the score by 50
      scoreDisplay.innerText = currentGame.score; // Update the score display

      // Display the skull indicator and then hide it after a delay
    const skullIndicator = document.getElementById('skull-indicator');
    skullIndicator.classList.remove('hidden');
    setTimeout(() => {
        skullIndicator.classList.add('hidden');
    }, 1000); // Adjust the delay time as needed
}

                  // Logic for removing obstacles
                  for (let i = currentGame.skulls.length - 1; i >= 0; i--) {
                    if (currentGame.skulls[i].y >= 700) {
                        currentGame.skulls.splice(i, 1); 
                        }

                      }
  }        
 */
    if (elapsedTimeInSeconds >= 20) { // Increase level every 20 seconds
      congrats.play();
      obstacleSpeed += 0.5;
      currentGame.level++;
      if (divisor > 2) {
          divisor -= 2;
      }
      startTime = currentTime; // Reset the start time
      level.innerText = currentGame.level;

      // Create a new bonus and add it to the bonuses array
      const maxX = myCanvas.width - 60; // Ensure the bonus box is fully within the canvas
      const randomX = Math.floor(Math.random() * maxX);
      const newBonus = new Bonus(randomX, -60); // Start above the canvas
      currentGame.bonuses.push(newBonus);
  }
    
    // Update and display countdown
    if (!isGameOver) {
        countdown = 20 - elapsedTimeInSeconds;
        countdown = countdown < 0 ? 0 : countdown; // To ensure sure countdown doesn't go negative
        document.getElementById('countdown').innerText = countdown;
    }

      // Move and draw bonuses
      for (let i = 0; i < currentGame.bonuses.length; i++) {
        currentGame.bonuses[i].y += 5;
        currentGame.bonuses[i].drawObstacle();

        // Remove bonuses that are out of the canvas
        if (currentGame.bonuses[i].y >= myCanvas.height) {
          currentGame.bonuses.splice(i, 1);
        }
      }

      function endGame(){
        closing.play();
        closing.currentTime = 0;
        isGameOver = true;
        currentShip.x = myCanvas.width/2
        currentShip.y = myCanvas.height/1.25
        toggleOpening.style.display = 'none'
        toggleInfo.style.display = 'none'
        myCanvas.style.display = 'none'
        endScreen.style.display = '';
        mobile.style.display = 'none';
        timer.style.display = 'none';
        scoreTwo.innerText = currentGame.score;
        levelTwo.innerText = currentGame.level;

       // Create a JavaScript Date object to get the current date and time
var currentDate = new Date();

// Format the date to match MySQL's datetime format
var formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

// AJAX request to save score with the formatted DateTime
var xhr = new XMLHttpRequest();
xhr.open('POST', './php/save_score.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Score saved successfully
    }
};
// Pass both score and formatted timestamp as POST parameters
xhr.send('score=' + currentGame.score + '&timestamp=' + formattedDate);


      }

      if (!isGameOver) {
        requestAnimationFrame(updateCanvas);
      }

  }


  function detectCollision(obstacle) {
    let leniency = 10;  // Default leniency
  
    // Remove leniency for 'bonus' or 'skull' type obstacles
    if (obstacle.obstacleType === 'bonus' || obstacle.obstacleType === 'skull') {
      leniency = 0; // No leniency for these types
    }
  
    return (
      (currentShip.x < obstacle.x + obstacle.width - leniency) &&   // check left side with leniency
      (currentShip.x + currentShip.width > obstacle.x + leniency) &&  // check right side with leniency
      (currentShip.y < obstacle.y + obstacle.height - 20) &&  // check top side with leniency
      (currentShip.y + currentShip.height > obstacle.y + leniency)  // check bottom side with leniency
    );
  }
  


