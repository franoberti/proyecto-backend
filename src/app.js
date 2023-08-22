//@ts-check
import express from "express"
import productsRouter from "./routes/products.router.js"
import sessionRouter from "./routes/sessions.router.js"
import viewsRouter from "./routes/views.router.js"
import routerVistaProducts from "./routes/products.vista.router.js"
import routerVistaRealTimeProducts from "./routes/realTimeProducts.vista.router.js"
import cartsRouter from "./routes/cart.router.js"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import { __dirname } from "./path.js"
import handlebars from "express-handlebars"
import MongoSingleton from "./utils/connections.js"
import routerVistaCart from "./routes/cart.vista.router.js"
import MongoStore from "connect-mongo"
import session from "express-session"
import { configPassport } from "./config/passport.config.js"
import passport from "passport"
import { program } from "./config/commander.js"
import { environment } from "./environment.js"
import cors from 'cors'

const app = express()
const port = environment.PORT

//CONECTO A LA BD de MongoDB
MongoSingleton.getInstance()

app.use(cors())
app.use(cookieParser('coder-secret'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({mongoUrl: "mongodb+srv://franoberti45:PyoBTzvOuelYsaj7@franocluster.hx1jh7a.mongodb.net/", ttl: 86400 * 7}),
    secret: 'un-secreto',
    resave: true,
    saveUninitialized: true
}))

configPassport()
app.use(passport.initialize())
app.use(passport.session())

//CONFIGURACION DEL MOTOR DE PLANTILLAS HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")


//Archivos Publicos
app.use(express.static(__dirname + "/public"))

//ENDPOINTS APIs
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionRouter)
app.use("/", viewsRouter)

//ENDPOINTS VISTAS
app.use("/vista/products", routerVistaProducts)
app.use("/vista/realtimeproducts", routerVistaRealTimeProducts)
app.use("/vista/cart", routerVistaCart)

app.get('/setCookie', (req, res) => {
    res.cookie('cookie-test', 'un dato importante', {maxAge: 10000, signed: true})
    return res.json({msg: 'cookie puesta!'})
})
app.get('/getCookie', (req, res) => {
    console.log('cookie normal', req.cookies)
    console.log('signed Cookie', req.signedCookies)
    res.send('nada')
})
app.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookie-test')
    res.send('borrado! fijate en la consola y ya no la tenes!!!')
})

app.get('*', (req, res) => {
    res.status(404).json({ status: "error", msg: 'ERROR: Esa ruta no existe', data: {} })
})

const httpServer = app.listen(port, () => console.log(`Servidor arriba en el puerto ${port} !!`))

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {

    /* const productsToShow = prodManager.getProducts()
    socketServer.emit("msg_all_products", productsToShow)
    
    socket.on('msg_front_to_back', (product) => {
        prodManager.addProduct(product)
        socketServer.emit("msg_all_products", productsToShow)
    }) */

})
