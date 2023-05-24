//@ts-check
import express from "express"


const routerVistaChatSocket = express.Router()

routerVistaChatSocket.get("/", (req, res) => {
    return res.render("chat-socket", {
    })
})

export default routerVistaChatSocket