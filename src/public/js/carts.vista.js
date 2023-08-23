function vaciarCarrito(){
    const elementoP = document.getElementById("cartId")
    const cartId = elementoP.textContent
    
    axios.delete(`/api/carts/${cartId}/products`, {})
    .then(response => {
        console.log(response.data);
        alert('Carrito Vacio!');
        location.reload()
    })
    .catch(error => {
        console.error(error);
    });
}