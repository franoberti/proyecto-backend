
function addToCart(button, index) {
    const id = "#idProd" + index
    console.log("INDICE = " + id)
    var idProduct = button.parentElement.querySelector(id).textContent;
    const idCart = "648a118f0a7ed5d315d413f9"
    console.log(idProduct);
    console.log('FUNCIONANDO')
    
    axios.post(`/api/carts/${idCart}/products/${idProduct}`, {})
    .then(response => {
        console.log(response.data);
        console.log('Producto agregado al carrito');
    })
    .catch(error => {
        console.error(error);
    });
}