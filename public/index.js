const button = document.getElementById("save");
button.addEventListener("click", async () => {
    const title = document.getElementById("title")?.value;
    const thumbnail = document.getElementById("thumbnail")?.value;
    const price = document.getElementById("price")?.value;
    const body = {title, thumbnail, price: Number(price)};
    try {
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        console.log("response", response);
        if (response?.status === 201) {
            alert("Producto agregado")
        } else {
            const jsonResponse = await response?.json();
            console.log("jsonResponse", jsonResponse)
            alert(`Error al agregar el producto ${jsonResponse?.error}`)
        }
    } catch (e) {
        alert("Error al agregar el producto")
    }

})