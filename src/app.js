const express = require('express')
const ProductManager = require('./entregable-productManager')

const app = express()
const port = 8080

app.use(express.urlencoded({extended: true}))

const productManager = new ProductManager();

const products = productManager.getProducts()

app.get('/products', (req,res)=> {

    if(req.query && req.query.limit){
        const productsToShow = products.slice(0, req.query.limit)
        return res.json({
            status: "success",
            msg: "A continuacion se muestran los primeros " + req.query.precio + " productos encontrados",
            data: productsToShow
        })
    }
    else{
        return res.json({
            status: "success",
            msg: "productos encontrados con exito",
            data: products
        })

    }
})  

app.get('/products/:pid', (req,res)=> {

    const id = req.params.pid
    const product = products.find((p) => p.id == id)

    if(product){
        return res.json({
            status: "success",
            msg: "producto encontrado con exito",
            data: product
        })
    }
    else{
        return res.json({
            status: "error",
            msg: "producto no encontrado",
            data: {}
        })
    }
})


app.get('*', (req, res) =>{
    res.json({status: "error", msg: 'ERROR: Esa ruta no existe', data: {}})
})

app.listen(port,()=>console.log(`Servidor arriba en el puerto ${port} !!`))
