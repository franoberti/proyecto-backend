
function addToCart(button, index) {
    const id = "#idProd" + index
    const elementoP = document.getElementById("cartId")
    const cartId = elementoP.textContent
    var idProduct = button.parentElement.querySelector(id).textContent;
    const idCart = cartId
    
    axios.post(`/api/carts/${idCart}/products/${idProduct}`, {})
    .then(response => {
        console.log(response.data);
        alert('Producto agregado al carrito');
    })
    .catch(error => {
        console.error(error);
    });
}