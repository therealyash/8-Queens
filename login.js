document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("button[type='submit']");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form's default submission
        window.location.href = "index.html"; // Redirect to the desired page
    });
});
