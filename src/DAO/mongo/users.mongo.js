import { UsersModel } from './models/users.model.js'

class Users {

    constructor() { }

    async getAllUsers() {
        const usersFounded = await UsersModel.find({})
        return usersFounded
    }

    async deleteUser(id){
        const userDeleted = await UsersModel.deleteOne({ _id: id })
        return userDeleted
    }

    async updateRole(id, newRole){
        if(newRole === 'admin'){
            const userUpdated = await UsersModel.updateOne({ _id: id}, {role: newRole, admin: true})
            return userUpdated
        }
        else{
            const userUpdated = await UsersModel.updateOne({ _id: id}, {role: newRole, admin: false})
            return userUpdated
        }
    }

}

export const usersMongo = new Users()