
import express from "express"
import { checkAdmin } from "../middlewares/main.js"
import { usersService } from "../services/users.service.js"
import UserDTO from "../DAO/DTO/users.dto.js"


const routerVistaUsers = express.Router()

routerVistaUsers.get("/", checkAdmin, async (req, res) => {

    const users = await usersService.getAllUsers()

    const usersDTO = users.map((prod) => {
        const userDTO = new UserDTO(prod)
        return userDTO
    })

    return res.render("users", {
        payload: usersDTO
    })
})

routerVistaUsers.get("/inactivos", checkAdmin, async (req, res) => {
    
    const usuariosInactivos = await usersService.getInactiveSessions()
    console.log(usuariosInactivos);
    return res.render("usersInactivos", {
        payload: usuariosInactivos
    })
})

export default routerVistaUsers