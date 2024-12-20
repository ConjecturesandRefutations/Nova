<?php
session_start();

$user = null; // Initialize the $user variable

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/php/database.php";
    $sql = "SELECT * FROM user WHERE user_id = {$_SESSION["user_id"]}";
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();
}
?>

<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova</title>
        <meta name="description" content="Nova | Test your reflexes in this exciting HTML canvas game! Dodge oncoming asteroids and see how long you can survive. Simple controls, endless fun!" />
        <link rel="shortcut icon" type="image/png" href="images/Nova.png"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="styles.css" />
    </head>

    <body>

        <article class='welcome'>
            
            <?php if ($user): ?>
                <p>Hello <?= htmlspecialchars($user["name"]) ?>!</p>
            <?php endif; ?> 
            <?php ?>

        </article>

        <section class="opening-section">

        <a class="login" href="<?php echo $user ? './php/logout.php' : './php/login.php'; ?>">
             <?php echo $user ? 'LOGOUT' : 'LOGIN to save score'; ?>
        </a>

        <div class="top-ten-anchor">
        <a href="php/top-scores.php">Leaderboard</a>
            <?php if ($user): ?>
                <span style="color: red;"> | </span><a href="php/user-top-scores.php">Your 10 Best Scores</a>
            <?php endif; ?> 
            <?php ?>
        </div>
        
        <div id="settings-link">
                <p>Settings</p>
        </div>

            <div class="opening-text">

                <h1 id="title">Nova</h1>

                  <div class="top-ten-mobile">
                    <a href="php/top-scores.php">Leaderboard</a>
            <?php if ($user): ?>
                <a href="php/user-top-scores.php">Your Top 10</a>
            <?php endif; ?> 
            <?php ?>
                  </div>

                <h3 id="start-button">StartGame</h3>

             </div>

             <article class="play-music">
                <p id="audio-button" class="audio"> OPENING MUSIC &ensp;</p><i class="fas fa-volume-mute" aria-hidden="true" id="volume-icon"></i>
            </article>

        </section>

        <section class="info">
            <div class="score">Score: <span id="yourScore">0</span><span id="bonus-indicator" class="bonus-indicator hidden">+50</span></div>
            <div class="level">Level: <span id="level">1</span></div>
        </section>
        <div class="timer">Next<br/>level:<span id="countdown">20</span></div>


        <section class="mobile-controls">
            <button id="left"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <button id="right"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </section>

  <canvas id="canvas" width="500" height="600"></canvas> 

  <section class="settings">
  <div class="settings-container">
    <h3 class="choose-craft-title">Choose Spacecraft</h3>

    <label for="spaceShipOne">
      <img class="spaceship spaceship-one selected" src="images/Spaceship-One.png" alt="Spaceship One">
      <input class="radio" type="radio" id="spaceShipOne" name="craftType" value="spaceship-one" onclick="handleShipChange(event)" checked>
    </label>

    <label for="spaceShipTwo">
      <img class="spaceship spaceship-two" src="images/Spaceship-Two.png" alt="Spaceship Two">
      <input class="radio" type="radio" id="spaceShipTwo" name="craftType" value="spaceship-two" onclick="handleShipChange(event)">
    </label>

    <label for="spaceShipThree">
      <img class="spaceship spaceship-three" src="images/Spaceship-Three.png" alt="Spaceship Three">
      <input class="radio" type="radio" id="spaceShipThree" name="craftType" value="spaceship-three" onclick="handleShipChange(event)">
    </label>

    <button class="go-back">Save Changes</button>
  </div>
</section>

    <section class="full-time">
        <div class="full-time-text">
            <p>You Crashed!</p>
            <div class="stats">
                <p id="finalScore">Final Score: <span id="scoreTwo">0</span>&ensp;&ensp;
                <p id="finalLevel">Level: <span id="levelTwo">1</span></p>
             </div>

             <div class="all-together">
                <a href="php/top-scores.php">All-Time Top 10 Scores</a>
                <?php if ($user): ?>
                    <a href="php/user-top-scores.php">Your 10 Best Scores</a>
                <?php endif; ?> 
            </div>
            
            <div class="utilityButtons">
            <button id="restart-button" class="try-again-button">Restart</button>
            <button class="main-menu-button">Main Menu</button>  
            </div>
            <div class="enter-button">*Pressing 'Enter' also restarts!</div>

         </div>
         
        <article class="closing-credits"><p>Closing Music from #Uppbeat (free for Creators!):<br/>
            https://uppbeat.io/t/claude-patterns/pattern-22<br/>
            License code: O5BXHKFUKHABKGG0</p>
        </article>
    </section>

    <script type="text/javascript" src="./js/car.js"></script>
    <script type="text/javascript" src="./js/obstacle.js"></script>
    <script type="text/javascript" src="./js/game.js"></script>
    <script type="text/javascript" src="./js/index.js"></script>
    <script type="text/javascript" src="./js/audio.js"></script>
    <script type="text/javascript" src="./js/login.js"></script>
    <script type="text/javascript" src="./js/sections.js"></script>
    
</body>

</html>