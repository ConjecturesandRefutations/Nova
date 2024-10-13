<?php

$host = "localhost";
$dbname = "X-Racing";
$username = "alfie";
$password = "Ic7xjc]hu8A!Xz[h";
$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
}

return $mysqli;

?>

