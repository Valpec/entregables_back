import userModel from "./models/user.js";

export default class UserService {
    constructor() {
        console.log('Working products with database persistance in mongodb')
    }

    registerUser = async (userData) => {

        try {
            
            const { firstName, lastName, email, age, password } = userData

            let exists = await userModel.findOne({ email })
            if (exists) {
                throw new Error(`Ya existe el usuario`)
            }

            let user = {
                firstName,
                lastName,
                email,
                age,
                password
            }

            let result = await userModel.create(user)
            return result
        } catch (error) {
            console.error(`Error creando nuevo usuario: ${error}`)
        }
    }



    loginUser = async (userData, request) => {
        try {
            let { email, password } = userData
            let user = await userModel.findOne({ email, password })
            if (email === 'adminCoder@coder.com' && password === 'coder123') {
                request.session.user = {
                    name: 'Administrador Coder',
                    email: email,
                    age: '-'
                }
                request.session.role = 'admin'
                console.log(`para ver lo del admin: ${JSON.stringify(request.session)}`)
            }
            else {
                if (!user) {
                    throw new Error(`Credenciales incorrectas`)
                } 
                console.log(`este es el user en login: ${user}`)
                request.session.user = {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    age: user.age
                }
                request.session.role = 'user'
            }
            console.log(JSON.stringify(request.session))

            return ({ status: 200, payload: request.session.user, message: "Logueo existoso" })
        } catch (error) {
            console.error(`Error logueando usuario: ${error}`)
            result.status(400)

        }
    }
}
