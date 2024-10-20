// Backend API URL
const API_URL = 'http://localhost:5000';

// DOM Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const logoutBtn = document.getElementById('logoutBtn');

// Show register form
document.getElementById('showRegisterBtn').addEventListener('click', () => {
  loginSection.style.display = 'none';
  registerSection.style.display = 'block';
});

// Show login form
document.getElementById('showLoginBtn').addEventListener('click', () => {
  registerSection.style.display = 'none';
  loginSection.style.display = 'block';
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
   },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  if (result.success) {
    alert('Login successful!');
    loginSection.style.display = 'none';
    logoutBtn.style.display = 'block';
    // Load posts or show posts section as per requirement
  } else {
    alert('Login failed: ' + result.message);
  }
});

// Handle registration
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  alert(result.message);
  if (result.success) {
    // Automatically switch to login after successful registration
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
  }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });

  const result = await response.json();
  if (result.success) {
    alert('Logged out successfully.');
    loginSection.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
});
