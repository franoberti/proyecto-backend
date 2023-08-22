//@ts-check
import express from "express"
import { usersService } from "../services/users.service.js"
import { usersController } from "../controllers/users.controller.js"


const usersRouter = express.Router()

//LOGIN
usersRouter.get('/', usersController.getAll)

//REGISTER = SIGNIN
usersRouter.post('/', async (req, res) => {
    try {
        const user = req.body
        const userCreated = await usersService.createUser(user)

        return res.status(201).json({
            status: "success",  
            msg: "user created successfully",
            data: userCreated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Something went wrong :(",
            data: {}
        })
    }

}
)

export default usersRouter
