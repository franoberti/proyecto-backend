//@ts-check
import express from "express"
import productsRouter from "./routes/products.routes.js"

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Archivos Publicos
app.use(express.static("public"))
//ENDPOINTS
app.use("/products", productsRouter)


app.get('*', (req, res) =>{
    res.status(404).json({status: "error", msg: 'ERROR: Esa ruta no existe', data: {}})
})

app.listen(port,()=>console.log(`Servidor arriba en el puerto ${port} !!`))
