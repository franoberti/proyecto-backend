
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


//FRONT ATAJA "msg_server_to_front"
socket.on("msg_all_products", (products) => {
    const divProd = document.getElementById("div-products")

    let content = ""

    products.forEach(product => {
        content =`
            <div style="padding: 10px">
                <p>Producto: ${product.title}</p>
                <p>ID: ${product.id}</p>
                <p>Precio: ${product.price}</p>
                <hr />
            </div>
        `
        + content
    });

    divProd.innerHTML = content
/*     var productList = document.getElementById("productList");
    
    for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var listItem = document.createElement("li");
    listItem.innerHTML = product.title + " - $" + product.price;
    productList.appendChild(listItem);
    } */
})

document.addEventListener("load", function() {
    const divProducts = document.getElementById("div-products");
    divProducts.scrollTop = divProducts.scrollHeight;
}); 