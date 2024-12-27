document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Basic validation
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Email format validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Proceed with authentication or backend API request
      alert("Logged in successfully!");
  
      // Redirect to another page (Dashboard or Home page) after successful login
      // window.location.href = "dashboard.html";
    });
  });
  