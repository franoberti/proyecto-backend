
function addToCart(index){
    const i = "idProd" + index
    var idProduct = document.getElementById('idProd').value;
    var idCart = "648a118f0a7ed5d315d413f9"
    console.log('FUNCIONANDO')
    console.log(idProduct)

   /*  axios.post(`/api/carts/${idCart}/products/${idProduct}`, {})
        .then(response => {
          console.log(response.data);
          console.log('Producto agregado al carrito');
        })
        .catch(error => {
          console.error(error);
        }); */
}