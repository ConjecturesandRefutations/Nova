<?php
// Start the session
session_start();

// Check if the user is already logged in
if (isset($_SESSION['user_id'])) {
    // Redirect to index.php if logged in
    header("Location: ../index.php");
    exit();
}

// Initialize $error variable
$error = null;

// Check if there is an error message in the session
if (isset($_SESSION['error'])) {
    $error = $_SESSION['error'];
    // Clear the error message from the session
    unset($_SESSION['error']);
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup | Nova</title>
    <meta name="description" content="Sign Up | Test your reflexes in this exciting HTML canvas game! Dodge oncoming traffic and see how long you can survive. Simple controls, endless fun!" />
    <link rel="shortcut icon" type="image/png" href="../images/red-car.png"/>
    <link rel="stylesheet" href="../styles.css">
    <script src="../js/login.js"></script>

    <?php
    // If there is a signup error or success, automatically refresh after 5 seconds
    if (isset($_SESSION['signup_error']) || isset($_SESSION['signup_success'])) {
        echo '<meta http-equiv="refresh" content="5;url=signup-page.php">';
    }
    ?>
</head>
<body>

    <div class="login-page">

       <a href="../index.php" class='back-home'>Play without Logging in </br><span class='note'>(your score won't be saved)</span></a>   
    
        <div class="login-card">
    
          <h1>Nova</h1>
          <h2>Signup</h2>
          <form class="login-form" action="signup.php" method="POST" id="signup" onsubmit="return validateForm()">
            
            <!-- Name Input -->
            <input type="text" id="name" name="name" placeholder="username"/>
            <span class="error" id="nameError"></span>
            
            <!-- Password Input -->
            <input type="password" id="password" name="password" placeholder="password"/>
            <span class="error" id="passwordError"></span>

            <!-- Confirm Password -->
            <input type="password" id="password-confirmation" name="password_confirmation" placeholder="confirm password">
            <span class="error" id="passwordConfirmationError"></span>
            
            <button class='loginBtn'>SIGNUP</button>
            <p class="loginSignup">Already Have an Account?</p>
            <a href="login.php">Login</a>
          </form>
    </div>
    </div>
</body>
</html>
