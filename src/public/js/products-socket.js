

const socket = io();

const products = []

//FRONT ATAJA "msg_server_to_front"
socket.on("msg_products", (msg) => {
    console.log(msg.products)
    console.log(products)
    products.push(...msg.products)
    console.log(products)
    var productList = document.getElementById("productList");
    
    for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var listItem = document.createElement("li");
    listItem.innerHTML = product.title + " - $" + product.price;
    productList.appendChild(listItem);

}

})

//FRONT EMITE 'msg_front_to_back'
socket.emit('msg_front_to_back', { 
    author: "Usuario anonimo (front)", 
    msg: "Hola Server!!!" 
})

socket.on("msg_a_todos", (msg) => {
    console.log(msg)
})