const socket = io();
console.log('Socket: ', socket);
socket.on('newMessage', (message) => {
    const div = document.createElement('div');
    div.innerHTML = `${message.mail} [${message.timestamp}] (Type: ${message.type}) ${message.content}`
    document.getElementById("messages").appendChild(div);
});
socket.on('error', (message) => {
    alert(JSON.stringify(message));
});
document.getElementById("send").addEventListener('click', () => {
    //Emit Message to the server
    socket.emit('emitMessage',
        {mail:document.getElementById("email")?.value,
         type: 'user',
        content:document.getElementById("message")?.value});

});