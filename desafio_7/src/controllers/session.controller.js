import UserService from "../dao/db/user.service.js";
import passport from "passport";
import userModel from "../dao/db/models/user.js";
import { passportCall, isValidPassword, generateJWToken} from '../utils.js'

const userService = new UserService()

const getSessionGithubController = async (req, res) => {
    const user = req.user

    const tokenUser = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: user.cart
    };
    const access_token = generateJWToken(tokenUser);

    res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 60000,
            httpOnly: false
        }
    )
    res.redirect("/products")
}

const postSessionController = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email: email});
        if (!user) {
            console.warn(`No existe usuario con username ${email}`);
            return res.status(204).send({error: "Not found", message: `No existe usuario con username ${email}`});
        }
        if (!isValidPassword(user, password)) {
            console.warn(`Credenciales invalidas para usuairo ${email}`);
            return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"});
        }
        const tokenUser= {
            name : `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cart:user.cart
        };
        const access_token = generateJWToken(tokenUser);

        if(access_token) res.cookie('jwtCookieToken', access_token, {
            maxAge: 60000,
            httpOnly: false 
        });
        res.send({message: "Login successful!", access_token: access_token});
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
    
}

const getSessionLogoutController = (req, res) => {

    if (req.cookies['jwtCookieToken']){
        res.clearCookie('jwtCookieToken').send({ message: "Logout successful" });
    } else {
        res.status(401).send({ error: "No JWT cookie found" });
    }
}


const getSessionCurrentController = (req, res) => {
    const currentUser = req.user
    if(currentUser){
        console.log(`el usuario actual es:`)
        res.send(currentUser)
    }else{
        res.send(`no existe currentUser`)
    }
}

export { getSessionGithubController,  postSessionController, getSessionCurrentController, getSessionLogoutController}