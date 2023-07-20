//@ts-check
import express from "express"
import { usersService } from "../services/users.service.js"


const usersRouter = express.Router()

//LOGIN
usersRouter.get('/', async (req,res)=> {

    try {
        const email = req.query.email
        const pass = req.query.pass

        const user = await usersService.getUsers(email, pass)
    
        return res.status(200).json({
            status: "success",
            msg: "user founded",
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {}
        })
    }

})

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
