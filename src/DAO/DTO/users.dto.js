export default class UserDTO {
    constructor(user) {
        this.id = user._id.toString()
        this.firstName = user.firstName
        this.email = user.email
        this.role = user.role
    }
}