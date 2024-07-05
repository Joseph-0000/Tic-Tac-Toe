<?php
    // Establish a connection to your MySQL database
    $servername = "localhost"; // Change this to your database server
    $username = "root"; // Change this to your MySQL username
    $password = ""; // Change this to your MySQL password
    $dbname = "tictactoe"; // Change this to your database name

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the data sent from JavaScript
    $round = $_POST["round"];
    $result = $_POST["result"];
    $moves = json_encode($_POST["moves"]);

    // Prepare and execute the SQL query to insert data
    $stmt = $conn->prepare("INSERT INTO round_data (Round, Result, Moves) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $round, $result, $moves);

    if ($stmt->execute()) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
?>
