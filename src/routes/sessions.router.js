import express from "express"
import { UsersModel } from "../DAO/models/users.model.js"
import {createHash, isValidPassword} from '../utils/validations.js'
import passport from "passport"

const sessionRouter = express.Router()

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    
    if(!req.user){
        return res.status(400).render('error-page', {msg: 'error al loggear el usuario'})
    }

    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, age: req.user.age, lastName: req.user.lastName, isAdmin: req.user.admin }

    return res.redirect(`/vista/products/${req.user.firstName}`)
    
    //ANTES DE PASSPORT
    /* const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).render('error-page')
    }
    try {
        const foundUser = await UsersModel.findOne({ email })
        if (foundUser && isValidPassword(password, foundUser.password)) {
            req.session.firstName = foundUser.firstName
            req.session.email = foundUser.email
            req.session.admin = foundUser.admin
            return res.redirect(`/vista/products/${foundUser.firstName}`)
            
        }else{
            console.log(foundUser)
            console.log(foundUser.password)
            return res.status(400).render('error-page', {msg: "Email o contraseña incorrectos"})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).render('error-page')
    } */
})

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister'}), async (req, res) => {

    if(!req.user) {
        return res.status(400).render('error-page', {msg: 'error al registrar usuario'})
    }

    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, age: req.user.age, lastName: req.user.lastName, isAdmin: req.user.admin }

    return res.redirect('/login')

    //ANTES DE PASSPORT
    /* const { firstName, lastName, email, age, password } = req.body
    if (!firstName || !lastName || !email || !age || !password) {
        return res.status(400).render('error-page')
    }
    try {
        await UsersModel.create({ firstName, lastName, email, age, password: createHash(password) })
        req.session.firstName = firstName
        req.session.email = email
        req.session.admin = false
        return res.redirect('/profile')
    } catch (error) {
        console.log(error)
        return res.status(400).render('error-page')
    } */
})

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}))

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user

    res.redirect('/')
})

sessionRouter.get('/failregister', (req, res) => {
    res.render('error-page', {msg: 'fallo el registro'})
    
})
sessionRouter.get('/faillogin', (req, res) => {
    res.render('error-page', {msg: 'fallo el login'})
    
})

export default sessionRouter