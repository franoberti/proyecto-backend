import { Products } from "../DAO/products.factory.js"

class ProductService {

    async getAllProducts() {
        const products = await Products.getAll()
        return products
    }

    async getAllProductsPaginated(limit, page, query, sort){
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
            
        const products = await Products.getAllPaginated(optionQuery, optionSort, limit, page)
        return products
    }

    async getProductById(id) {
        const product = await Products.getById(id)
        return product
    }
    
    async createProduct(product) {
        const { title, description, price, thumbnail, code, stock, status, category } = product

        let createdProduct = await Products.createProduct(title, description, price, thumbnail, code, stock, status, category)
        return createdProduct
    }

    async updateProduct(product, id){
        const productUpdated = await Products.updateProduct(product, id)
        return productUpdated
    }

    async deleteProduct(id) {
        const productDeleted = await Products.deleteProduct(id)
        return productDeleted
    }

}

export const productService = new ProductService()