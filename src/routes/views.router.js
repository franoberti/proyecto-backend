//@ts-check
import express from "express"
import { checkAdmin, checkUser, checkLogIn } from "../middlewares/main.js"

const viewsRouter = express.Router()

viewsRouter.get('/login', (req, res) => {
    res.render('login-form')
})
viewsRouter.get('/login-github', (req, res) => {
    res.render('login-github')
})
viewsRouter.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            return res.render('error-page')
        }
        return res.redirect('/login')
    })
})

viewsRouter.get('/register', (req, res) => {
    res.render('register-form')
    
})

viewsRouter.get('/profile', checkUser, (req, res) => {
    res.render('profile')
    
})

viewsRouter.get('/soloAdmin', checkAdmin, (req, res) => {
    res.send('ESTO SOLO LO PUEDE VER EL ADMIN')
})

viewsRouter.get('/', checkUser, (req, res) => {
    res.render('home')
})

export default viewsRouter