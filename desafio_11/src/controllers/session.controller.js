import config from "../config/config.js";
import userModel from "../services/dao/db/models/user.js";
import UserDto from "../services/dao/dto/user.dto.js";
import CartService from "../services/dao/db/carts.service.js";

import { isValidPassword, generateJWToken } from '../utils.js'

import CustomError from '../services/errors/CustomError.js'
import EErrors from "../services/errors/errors-enum.js";
import {generateSessionErrorInfo} from '../services/errors/messages/user-creation-error.message.js'
import { addLogger } from "../config/loggerCustom.js";


const linkCart = async (user) => {
    const cartService = new CartService()
    if(!user.cart){
        let newCart = await cartService.createCart()
        user.cart = newCart
        await user.save()
        return newCart
    }
}


const getSessionGithubController = async (req, res) => {
    const user = req.user

    const tokenUser = new UserDto(user)
    const access_token = generateJWToken(tokenUser);

    res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 60000,
            httpOnly: false
        }
    )
    res.redirect("/products")
}

const postSessionController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!password || !email) {
            CustomError.createError({
                name: "User Creation Error",
                message: "Error tratando de crear el usuario.",
                cause: generateSessionErrorInfo({email, password}),
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        let tokenUser 
        if (email === config.adminEmail && password === config.adminPassword) {
            tokenUser = {
                firstName: `Admin Coder`,
                email: email,
                age: '-',
                role: 'admin',
                cart: 'user.cart'
            };

        }
        let user = await userModel.findOne({ email: email });

        if (!user) {
            CustomError.createError({
                name: "User Creation Error",
                message: "No existe el usuario",
                code: EErrors.INVALID_TYPES_ERROR
            })
            // return res.status(204).send({ error: "Not found", message: `No existe usuario con username ${email}` });
        }
        if (!isValidPassword(user, password)) {
            CustomError.createError({
                name: "User Creation Error",
                message: "Credenciales invalidas",
                code: EErrors.CREDENTIALS_ERROR
            })
            // return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
      
        //le vinculo un cart al usuario
        await linkCart(user)
        tokenUser = new UserDto(user)
        const access_token = generateJWToken(tokenUser);

        if (access_token) res.cookie('jwtCookieToken', access_token, {
            maxAge: 60000,
            httpOnly: false
        });
     
        res.status(200).send({ message: "Login successful!", access_token: access_token });
    }
     catch (error) {
        // console.error(error);
        req.logger.error(error)
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }

}

const getSessionLogoutController = (req, res) => {

    if (req.cookies['jwtCookieToken']) {
        res.clearCookie('jwtCookieToken').render('logout');
    } else {
        res.status(401).send({ error: "No JWT cookie found" });
    }
}


const getSessionCurrentController = (req, res) => {
    const currentUser = new UserDto(req.user)
    if (currentUser) {
        res.send(currentUser)
    } else {
        res.send(`No existe currentUser`)
    }
}

export { getSessionGithubController, postSessionController, getSessionCurrentController, getSessionLogoutController }