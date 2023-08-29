const socket = io()

function validarCampos() {
    var nombre = document.getElementById("input-nombre").value;
    var descripcion = document.getElementById("input-description").value;
    var precio = document.getElementById("input-price").value;
    var codigo = document.getElementById("input-code").value;
    var stock = document.getElementById("input-stock").value;
    var categoria = document.getElementById("input-category").value;

    if (nombre === "" || descripcion === "" || precio === "" || codigo === "" || stock === "" || categoria === "") {
        alert("Todos los campos son obligatorios. Por favor, complete todos los campos.");
    }
    else {

        const product = {
            title: nombre,
            description: descripcion,
            price: precio,
            code: codigo,
            stock: stock,
            category: categoria,
            thumbnail: "Sin imagen",
            status: true
        }


        socket.emit('msg_front_to_back', product)

        document.getElementById("input-nombre").value = ""
        document.getElementById("input-description").value = ""
        document.getElementById("input-price").value = ""
        document.getElementById("input-code").value = ""
        document.getElementById("input-stock").value = ""
        document.getElementById("input-category").value = ""
    }
}

function eliminarProducto(idProducto){
    console.log('Entras')
    axios.delete(`/api/products/${idProducto}`, {})
    .then(response => {
        console.log(response.data);
        alert('Producto Eliminado con exito!');
        socket.emit('msg_front_to_back_delete_product', idProducto)
    })
    .catch(error => {
        console.error(error);
    });
}


//FRONT ATAJA "msg_server_to_front"
socket.on("msg_all_products", (products) => {
    const divProd = document.getElementById("div-products")

    let content = ""

    products.forEach(product => {
        const idProd = `'${product._id.toString()}'`
        content = content +
            `
            <div style="padding: 5px">
                <p>Producto: ${product.title}</p>
                <p>ID: ${product._id}</p>
                <p>Precio: ${product.price}</p>
                <button onclick="eliminarProducto(${idProd})"">Eliminar Producto</button>
                <hr />
            </div>
        `
    });

    divProd.innerHTML = content

    divProd.scrollTop = divProd.scrollHeight;

})

document.addEventListener("load", function () {

});