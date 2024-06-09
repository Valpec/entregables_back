
export default class UserDto {
    constructor(user){
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.fullName = this.firstName + ' ' + this.lastName,
        this.email = user.email,
        this.age = user.age,
        this.role= user.role,
        this.cart = user.cart,
        this.id = user._id.valueOf()
    }
}

