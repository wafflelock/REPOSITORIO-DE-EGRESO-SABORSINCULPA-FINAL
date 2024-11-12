<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// MySQL database connection details
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password for XAMPP
$dbname = "registration";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Output error and stop execution if connection fails
}

// Check if the form has been submitted using POST*METOdo para mandarle info a la db phpmyadmin de apache)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form inputs and sanitize them to prevent XSS attacks
    $user = htmlspecialchars($_POST['username']);
    $pass = htmlspecialchars($_POST['password']);

    // Hash the password to enhance security
    $hashed_password = password_hash($pass, PASSWORD_BCRYPT);

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $user, $hashed_password); // Bind parameters to the SQL query

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Registration successful!"; // Confirm successful registration
    } else {
        echo "Error: " . $stmt->error; // Output an error if the execution fails
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();
}
?>
