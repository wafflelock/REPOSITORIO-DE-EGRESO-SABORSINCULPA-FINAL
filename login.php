<?php
// Enable error reporting to help debug any issues that arise
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection details for MySQL
$servername = "localhost";
$username = "root"; // XAMPP's default username
$password = ""; // XAMPP's default password
$dbname = "registration";

// Establish a new connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the database connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Show error message and stop execution if connection fails
}

// Check if form submission was done using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data and sanitize it to prevent XSS attacks
    $user = htmlspecialchars($_POST['username']);
    $pass = htmlspecialchars($_POST['password']);

    // Hash the password to enhance security
    $hashed_password = password_hash($pass, PASSWORD_BCRYPT);

    // Prepare the SQL insert statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $user, $hashed_password); // Bind the sanitized variables to the SQL query

    // Execute the prepared SQL statement
    if ($stmt->execute()) {
        echo "Registration successful!"; // Output success message if insertion was successful
    } else {
        echo "Error: " . $stmt->error; // Output error if insertion fails
    }

    // Close both the statement and the database connection to free up resources
    $stmt->close();
    $conn->close();
}
?>
