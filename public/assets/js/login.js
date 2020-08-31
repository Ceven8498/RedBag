console.log("test3");

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/products/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/products/');
      } else {
        alert(response.statusText);
      }
    }
  }

  function changeDisplay(event) {
    event.preventDefault();
    var x = document.getElementById("create-account");
    x.style.display = "block";
    var x = document.getElementById("log-in-form");
    x.style.display = "none";
  }

  function changeBackDisplay(event) {
    event.preventDefault();
    var x = document.getElementById("log-in-form");
    x.style.display = "block";
    var x = document.getElementById("create-account");
    x.style.display = "none";
  }
  
  document.querySelector('#log-in').addEventListener('click', changeBackDisplay);

  document.querySelector('#sign-up').addEventListener('click', changeDisplay);
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);