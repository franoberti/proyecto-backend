import { UsersModel } from './models/users.model.js'

class Users {

    constructor() { }

    async getUsers(email, pass) {
        const userFounded = await UsersModel.find({email: email, password: pass})
        return userFounded
    }

}

export const usersMongo = new Users()