import { createHash , isValidPassword, generateJWToken} from "../../../utils.js";
import userModel from "./models/user.js";
import config from "../../../config/config.js";

export default class UserService {
    constructor() {
        console.log('Working products with database persistance in mongodb')
    }
    
    changePassword = async(password, email)=> {
        try{
            // buscar usuario, como recibo el email?
            let exists = await userModel.findOne( user )
            //comparar las contrasenas, tener en cuenta que la almacenada esta hasehada
            //si es valida la contrasena, si es que coincide con la actual del usuario, arrojo error porque se supone que la contrasena nueva debe ser disitna a la actual
            if(isValidPassword(user, password)){
                throw new Error('La nueva contrasena debe ser distinta a la actual')
            }

            let newPassword = createHash(password)
            exists.password = newPassword
            let result = await exists.save()
            return result
        }catch(error){
            console.error(`Error modificando rol usuario: ${error}`)

        }
    }
    changeRoleUser = async(userId) => {
        try{
            let exists = await userModel.findById( userId )
            if(exists.role == 'user'){
                const requiredDocs = ['identificacion', 'comprobante_domicilio', 'comprobante_cuenta'];
                const nombresUploaded = exists.documents.map(file => file.name)
                const existsAllDocs = requiredDocs.every(doc => nombresUploaded.includes(doc))
                if(existsAllDocs){
                    exists.role = 'premium'
                    console.log('Docs existentes, permisos actualizados')
                }else{
                    // cambiar log por mensaje en html
                    console.log('No se ha cargado por completo la documentacion requerida')
                }
    
            }else if(exists.role == 'premium'){
                exists.role = 'user'
            }

            let result = await exists.save()
            return result
        }catch(error){
            console.error(`Error modificando rol usuario: ${error}`)

        }
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
                password: createHash(password),
                loggedBy: 'app'
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

            let user = await userModel.findOne({ email })
            
            if (email === config.adminEmail && password === config.adminPassword) {
                request.session.user = {
                    name: 'Administrador Coder',
                    email: email,
                    age: '-'
                }
                request.session.role = 'admin'

            }
            else {
                if (!user) throw new Error(`Credenciales incorrectas`)

                if (!isValidPassword(user, password)) {
                    throw new Error(`Credenciales incorrectas`)
                }
                request.session.user = {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    age: user.age
                }
                request.session.role = 'user'
            }
            return ({ status: 200, payload: request.session.user, message: "Logueo existoso" })

        } catch (error) {
            console.error(`Error logueando usuario: ${error}`)
            result.status(400)

        }
    }

   uploadFiles = async(req)=> {
    try{
        const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null;
        const productPhotos = req.files['productPhotos'] ? req.files['productPhotos'].map(file => file.path) : [];
        const identificacion =req.files['documents_identificacion'] ? req.files['documents_identificacion'][0].path : null
        
        const comprobante_domicilio = req.files['documents_comprobante_domicilio'] ? req.files['documents_comprobante_domicilio'][0].path : null
        const comprobante_cuenta = req.files['documents_comprobante_cuenta'] ? req.files['documents_comprobante_cuenta'][0].path : null
        
        let user = req.user.id
        let exists = await userModel.findById( user )
        const uploadedFiles = [
            { name: 'profilePhoto', reference: profilePhoto },
            ...productPhotos.map(reference => ({ name: 'productPhoto', reference })),
            { name: 'identificacion', reference: identificacion },
            { name: 'comprobante_domicilio', reference: comprobante_domicilio },
            { name: 'comprobante_cuenta', reference: comprobante_cuenta },
        ];
        const validFiles = uploadedFiles.filter(file => file.reference !== null)

        exists.documents.push(...validFiles)
        await exists.save();
        
    }catch(error){
        console.error(`Error actualizando documentos del usuario: ${error}`)
    }
   }
}
