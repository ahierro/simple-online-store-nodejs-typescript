const socket = io();
socket.on('newProduct', (producto) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${producto.id}</td>
    <td>${producto.title}</td>
    <td><img src="${producto.thumbnail}" alt="producto"></td>
    <td>${producto.price}</td>`
    document.getElementById("tbody").appendChild(tr);
});
socket.on('newMessage', (message) => {
    const div = document.createElement('div');
    div.innerHTML = `${message.mail} [${message.time}] ${message.content}`
    document.getElementById("mensajes").appendChild(div);
});
const button = document.getElementById("save");
button.addEventListener("click", async () => {
    const title = document.getElementById("title")?.value;
    const thumbnail = document.getElementById("thumbnail")?.value;
    const price = document.getElementById("price")?.value;
    const body = {title, thumbnail, price: Number(price)};
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response?.status !== 201) {
            const jsonResponse = await response?.json();
            alert(`Error al agregar el producto ${jsonResponse?.error}`)
        }
    } catch (e) {
        alert("Error al agregar el producto")
    }

})

document.getElementById("send").addEventListener('click', () => {

    //Emit Message to the server
    socket.emit('emitMessage',
        {mail:document.getElementById("email")?.value,
        content:document.getElementById("message")?.value});

});