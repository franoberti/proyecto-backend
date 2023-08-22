import { usersService } from "../services/users.service";

class UsersController {

    constructor(){}

    async getAll(req, res){
        try {
            const email = req.query.email
            const pass = req.query.pass
    
            const user = await usersService.getUsers(email, pass)
            
            if(user.length === 0){
                return res.status(500).json({
                    status: "error",
                    msg: "ERROR: Incorrect email or password",
                    data: {}
                })
            }
            else{
                return res.status(200).json({
                    status: "success",
                    msg: "user founded",
                    data: user
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {}
            })
        }
    }

}

export const usersController = new UsersController()