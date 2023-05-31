import fs from "fs"

class ProductManager {

    constructor() {
        this.products = [];
        this.path = "./productos.json";

        if(!fs.existsSync(this.path)){
            const productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)
        }
        else{
            const productsString= fs.readFileSync(this.path, "utf-8");
            const products = JSON.parse(productsString);
            this.products = products
        }

        if(this.products.length > 0){
            const lastIndex = this.products.length - 1
            const lastProduct = this.products[lastIndex]
            this.productsIdCounter = lastProduct.id
        }
        else{
            this.productsIdCounter = 0
        }
        
    }


    getProducts() {
        return this.products
    }

    getProductById(id) {
        const found = this.products.find(prod => prod.id == id)
        if (found) {
            return found
        }
        else {
            throw new Error('Not Found')
        }
    }

    #checkCode(code) {

        //Crea una variable booleana que si esta en "true" es porque el code ingresado no existe en la lista de productos
        //Si es false el code ya existe
        let res = true

        for (let i = 0; i < this.products.length; i++) {
            const prod = this.products[i];

            if (prod.code == code) {
                //Valida si el code del producto que esta recorriendo es igual al code ingresado
                //Si es igual asigna "false" a la variable res
                res = false
            }

        }

        return res
    }

    addProduct(product) {
        //Genera el Id 
        const id = this.productsIdCounter + 1

        //Las siguientes lineas hacen la validacion de que todos los campos son obligatorios
        //Si uno de los campos no es completado se imprime un error en pantalla
        if (!product.title) {
            throw new Error('Error: el campo "title" es obligatorio');
        }
        if (!product.description) {
            throw new Error('Error: el campo "descriptio" es obligatorio');
        }

        if (!product.price) {
            throw new Error('Error: el campo "price" es obligatorio');
        }

        if (!product.status) {
            product.status = true
        }

        if (!product.code) {
            throw new Error('Error: el campo "code" es obligatorio');
        }

        if (!product.stock) {
            throw new Error('Error: el campo "stock" es obligatorio');
        }

        if (!product.category) {
            throw new Error('Error: el campo "category" es obligatorio');
        }



        if (this.#checkCode(product.code)) {

            //Crea el nuevo producto
            const newProduct = { ...product, id }
            this.products.push(newProduct)
            const productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString)

        }
        else {
            throw new Error('Error: No es posible agregar el producto, ya que el codigo ingresado ya existe en otro producto');
        }

    }

    updateProduct(product, id){

        if (this.#checkCode(product.code)) {

            const index = this.products.findIndex(product => product.id == id)

            if(index != -1){

                this.products[index].title = product.title || this.products[index].title;
                this.products[index].description = product.description || this.products[index].description
                this.products[index].price = product.price || this.products[index].price
                this.products[index].thumbnail = product.thumbnail || this.products[index].thumbnail
                this.products[index].code = product.code || this.products[index].code
                this.products[index].stock = product.stock || this.products[index].stock
    
                const productsString = JSON.stringify(this.products)
                fs.writeFileSync(this.path, productsString)
            
            }
            else{
                throw new Error('Error: El producto buscado para actualizar no existe');
            }


        }
        else {
            throw new Error('Error: No es posible agregar el producto, ya que el codigo ingresado ya existe en otro producto');
        }

        

    }

    deleteProduct(id){
        const newProducts = this.products.filter(product => product.id != id)
        this.products = newProducts
        const productsString = JSON.stringify(this.products)
        fs.writeFileSync(this.path, productsString)
        return this.products
    }

}


export default ProductManager
