const socket = io()
if (!!!sessionStorage.getItem('token') || !!!sessionStorage.getItem('room')) {
  window.location.href = `/index.html`
}
socket.on('newMessage', (message) => {
  const div = document.createElement('div')
  div.innerHTML = `<div class="message">
  <p class="meta">${message.type} - ${message.mail} <span>${message.timestamp}</span></p>
  <p class="text">
    ${message.content}
  </p>
</div>`
  document.getElementById('messages').appendChild(div)
})

socket.on('error', (message) => {
  alert(JSON.stringify(message))
})

setTimeout(() => {
  document.getElementById('room-name').innerHTML = sessionStorage.getItem('room').toUpperCase()
  document.getElementById('chatTitle').innerHTML = `Welcome ${sessionStorage.getItem('user')}`;
}, 0);

document.getElementById('sendMessage').addEventListener('click', () => {
  setTimeout(() => {
    socket.emit('emitMessage',
      {
        token: sessionStorage.getItem('token'),
        content: document.getElementById('msg')?.value,
        room: sessionStorage.getItem('room')
      }
    );
  }, 0);

  setTimeout(() => {
    document.getElementById('msg').value = "";
  }, 500);
})
socket.emit('JoinRoom', {
  token: sessionStorage.getItem('token'),
  room: sessionStorage.getItem('room')
})


