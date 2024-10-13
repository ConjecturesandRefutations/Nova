<?php
$mysqli = require __DIR__ . "/database.php";

$top_scores_sql = "SELECT user.name, scores.score, DATE(scores.timestamp) AS date FROM scores
                  JOIN user ON scores.user_id = user.user_id
                  ORDER BY scores.score DESC, scores.timestamp ASC
                  LIMIT 10";

$top_scores_result = $mysqli->query($top_scores_sql);

if ($top_scores_result) {
    echo "<h1>Top 10 Scores of All Time</h1>";
    echo "<table>";
    echo "<tr><th>Position</th><th>Username</th><th>Score</th><th>Date</th></tr>";

    $rank = 1; // Initialize the rank counter
    
    while ($row = $top_scores_result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $rank . "</td>"; // Display the rank
        echo "<td>" . $row["name"] . "</td>";
        echo "<td>" . $row["score"] . "</td>";
        
        // Format the date in the desired format
        $formattedDate = date("j M Y", strtotime($row["date"]));
        echo "<td>" . $formattedDate . "</td>";
        
        echo "</tr>";
        
        $rank++; // Increment the rank counter
    }

    echo "</table>";
} else {
    echo "Error retrieving top scores: " . $mysqli->error;
} 

$mysqli->close();
?>



<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Scores | X-Racing</title>
    <meta name="description" content="Top 10 scores | Test your reflexes in this exciting HTML canvas game! Dodge oncoming traffic and see how long you can survive. Simple controls, endless fun!" />
    <link rel="stylesheet" type="text/css" href="../styles.css">
</head>
<body class="top-ten">
<a href="../index.php" class='score-back'>Go Back </a>    
