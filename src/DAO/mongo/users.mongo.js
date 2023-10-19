import { UsersModel } from './models/users.model.js'
import mongoose from 'mongoose';

const db = mongoose.connection;

class Users {

    constructor() { }

    async getAllUsers() {
        const usersFounded = await UsersModel.find({})
        return usersFounded
    }

    async deleteUser(id) {
        const userDeleted = await UsersModel.deleteOne({ _id: id })
        return userDeleted
    }

    async updateRole(id, newRole) {
        if (newRole === 'admin') {
            const userUpdated = await UsersModel.updateOne({ _id: id }, { role: newRole, admin: true })
            return userUpdated
        }
        else {
            const userUpdated = await UsersModel.updateOne({ _id: id }, { role: newRole, admin: false })
            return userUpdated
        }
    }

    async getAllSessions() {
        const collection = db.collection('sessions')
        const allSessions = await collection.find({}).toArray();
        return allSessions
    }
    
    async deleteSession(idSesion) {
        const collection = db.collection('sessions')
        const response = await collection.deleteOne({ _id: idSesion })
        return response
    }



}

export const usersMongo = new Users()