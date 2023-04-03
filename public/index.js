sessionStorage.setItem('token', "");
sessionStorage.setItem('room', "");
sessionStorage.setItem('user', "");

document.getElementById('joinChat').addEventListener('click', () => {
  // Login to the chat using fetch
  fetch('/api/session/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById('username')?.value,
      password: document.getElementById('password')?.value
    })
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        console.log('Logged in', data.token);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', document.getElementById('username')?.value);
        sessionStorage.setItem('room', document.getElementById('room')?.value);
        window.location.href = `/chat.html`
      });
    } else {
      alert('Unauthorized: Please register using api');
    }
  });
})
