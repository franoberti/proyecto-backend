//@ts-check
import express from "express"
import productsRouter from "./routes/products.routes.js"
import routerVistaProducts from "./routes/products.vista.routes.js"
import routerVistaRealTimeProducts from "./routes/realTimeProducts.vista.routes.js"
import routerVistaChatSocket from "./routes/chat-socket.vista.routes.js"
import cartsRouter from "./routes/cart.routes.js"
import { Server } from "socket.io"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import ProductManager from "./handlers/productManager.js"

const prodManager = new ProductManager()
const products = prodManager.getProducts()

const app = express()
const port = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CONFIGURACION DEL MOTOR DE PLANTILLAS HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


//Archivos Publicos
app.use(express.static(__dirname + "/public"))

console.log(__dirname)

//ENDPOINTS APIs
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

//ENDPOINTS VISTAS
app.use("/vista/products", routerVistaProducts)
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts)

//VISTAS CON SOCKETS
app.use("/vista/chat-socket", routerVistaChatSocket)

app.get('*', (req, res) => {
    res.status(404).json({ status: "error", msg: 'ERROR: Esa ruta no existe', data: {} })
})

const httpServer = app.listen(port, () => console.log(`Servidor arriba en el puerto ${port} !!`))

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    
    socket.on('msg_front_to_back', (product) => {
        prodManager.addProduct(product)
        console.log(prodManager.getProducts())
        const productsToShow = prodManager.getProducts()
        socketServer.emit("msg_all_products", productsToShow)
    })

})
