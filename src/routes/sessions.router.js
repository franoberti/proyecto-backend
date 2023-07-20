import express from "express"
import { UsersModel } from "../DAO/models/users.model.js"

const sessionRouter = express.Router()

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).render('error-page')
    }
    try {
        const foundUser = await UsersModel.findOne({ email })
        if (foundUser && foundUser.password === password) {
            req.session.firstName = foundUser.firstName
            req.session.email = foundUser.email
            req.session.admin = foundUser.admin
            return res.redirect('/vista/products')
        }else{
            console.log(foundUser)
            console.log(foundUser.password)
            return res.status(400).render('error-page')
        }

    } catch (error) {
        console.log(error)
        return res.status(400).render('error-page')
    }
})

sessionRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body
    if (!firstName || !lastName || !email || !age || !password) {
        return res.status(400).render('error-page')
    }
    try {
        await UsersModel.create({ firstName, lastName, email, age, password })
        req.session.firstName = firstName
        req.session.email = email
        req.session.admin = false
        return res.redirect('/profile')
    } catch (error) {
        console.log(error)
        return res.status(400).render('error-page')
    }
})

export default sessionRouter