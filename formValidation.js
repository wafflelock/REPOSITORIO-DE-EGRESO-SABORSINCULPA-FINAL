// JavaScript file for form validation

// Adds an event listener for the form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    // Retrieve the values of the username and password fields
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check that the username has a minimum length of 5 characters
    if (username.length < 5) {
        alert("Username must be at least 5 characters long.");
        event.preventDefault(); // Prevents form submission if validation fails
    } 
    // Check that the password has a minimum length of 8 characters
    else if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        event.preventDefault(); // Prevents form submission if validation fails
    } 
    // Check that the password contains at least one uppercase letter and one number
    else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        alert("Password must contain at least one uppercase letter and one number.");
        event.preventDefault(); // Prevents form submission if validation fails
    }
});

// Adds an event listener for the click event on the password toggle icon
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");

    // Toggles the input type between 'password' and 'text' to show or hide the password
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggles the eye icon to indicate password visibility
    this.classList.toggle("fa-eye-slash");
});

// Adds an event listener for the form submission to handle the form data with fetch
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Creates a new FormData object to hold form data
    let formData = new FormData(this);

    // Sends the form data to 'register.php' using the POST method
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        if (data.status === 'success') {
            // Redirects to the main page with the username in the URL
            window.location.href = 'mainpageesp.html?username=' + encodeURIComponent(data.username);
        } else {
            // Displays an error message if the registration fails
            alert(data.message);
        }
    })
    .catch(error => {
        // Logs any errors that occur during the fetch process
        console.error('Error:', error);
    });
});
