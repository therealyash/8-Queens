document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Handle signup form submission
  document.getElementById('submit').addEventListener('click', () => {
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

    // Password validation (at least 8 characters, one uppercase, one digit, one special char)
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)) {
      alert("Password must be at least 8 characters, include one uppercase, one lowercase, one digit, and one special character.");
      return;
    }

    // Show success toast
    const toast = new bootstrap.Toast(document.getElementById('successToast'));
    toast.show();

    // Reset the form
    document.getElementById('signupForm').reset();

    // Redirect to login page after a brief delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000); // 3 seconds
  });
});
