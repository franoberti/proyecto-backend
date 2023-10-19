import express from "express"
import passport from "passport"
import { usersController } from "../controllers/users.controller.js"
import { checkAdmin } from "../middlewares/main.js"

const sessionRouter = express.Router()

sessionRouter.get('/', checkAdmin ,usersController.getAll)

sessionRouter.delete('/:uid', checkAdmin, usersController.deleteUser)

sessionRouter.put('/:uid', checkAdmin, usersController.updateRoleUser)

sessionRouter.get('/inactivos', usersController.getUsersInactive)

sessionRouter.delete('/sessions/:sid', usersController.deleteSession)

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/users/faillogin'}), async (req, res) => {
    
    if(!req.user){
        return res.status(400).render('error-page', {msg: 'error al loggear el usuario'})
    }

    console.log(req.user)

    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, age: req.user.age, lastName: req.user.lastName, isAdmin: req.user.admin, cart: req.user.cart }

    return res.redirect(`/`)

})

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/users/failregister'}), async (req, res) => {

    if(!req.user) {
        return res.status(400).render('error-page', {msg: 'error al registrar usuario'})
    }

    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, age: req.user.age, lastName: req.user.lastName, isAdmin: req.user.admin }

    return res.redirect('/login')
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