import { productManager } from "../DAO/handlers/productManager.js"
import { ProductsModel } from "../DAO/models/products.model.js"

class ProductService {

    validateCreateProduct( title, description, price, thumbnail, code, stock, status, category ) {
        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category ){
            console.log("Validation Error: missing values")
            throw "VALIDATION ERROR"
        }
    }

    validateUpdateProduct(title, description, price, thumbnail, code, stock, status, category, id){
        if (!title || !description || !price || !thumbnail || !code || !stock || !category || !id) {
            console.log("Validation Error: missing values")
            throw "VALIDATION ERROR"
        }
    }
    
    validateId(id){
        if (!id) {
            console.log("Validation Error: missing values")
            throw "VALIDATION ERROR"
        }
    }
    async getAllProducts() {
        const products = await ProductsModel.find({})
        return products
    }

    async getAllProductsPaginated(limit, page, query, sort){
        let products
        const optionQuery = {}
        const optionSort = {}

        if(query){
            optionQuery.category = query
        }
        if(sort){
            if(sort === "asc"){
                sort = 1
            }
            if(sort === "desc"){
                sort = -1
            }
            optionSort.sort = { price: sort }
        }
            
        products = await ProductsModel.paginate( optionQuery ,{ limit: limit || 10, page: page || 1, ...optionSort })

        return products
    }

    async getProductById(id) {
        const product = await ProductsModel.find({ _id: id})
        return product
    }
    
    async createProduct(product) {

        this.validateCreateProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.status, product.category)

        /* ESTO ES EN fileSystem */
        /* const idNewProd = productManager.addProduct(product) */
        /* const id = idNewProd */
        
        /* AHORA LO HAGO PARA Mongoose */
        const { title, description, price, thumbnail, code, stock, status, category } = product

        
        let createdProduct = await ProductsModel.create({title, description, price, thumbnail, code, stock, status, category})
        return createdProduct
    }

    async updateProduct(product, id){
        const { title, description, price, thumbnail, code, stock, status, category} = product

        this.validateUpdateProduct( title, description, price, thumbnail, code, stock, status, category, id)

        /* FileSystem */
        /* productManager.updateProduct(product, id) */

        /* MongoDB */
        const productUpdated = await ProductsModel.updateOne(
            { _id: id },
            { title, description, price, thumbnail, code, stock, status, category }
        )

        return productUpdated

    }

    async deleteProduct(id) {
        this.validateId(id)

        /* MongoDB */
        const productDeleted = await ProductsModel.deleteOne({ _id: id })

        /* FileSystem */
        /* productManager.deleteProduct(id) */

        return productDeleted
    }



}

export const productService = new ProductService()