
//desde el router de las vistas, bloqueamos la ruta con acceso al chat

//HACER CHAT
//agregar producto, el endpoint no se puede hacer en el endpoitn

export default class UserDto {
    constructor(user){
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.fullName = this.firstName + ' ' + this.lastName,
        this.email = user.email,
        this.age = user.age,
        this.role= user.role,
        this.cart = user.cart
    }
}

