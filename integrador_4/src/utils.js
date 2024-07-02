import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';
import passport from 'passport';
import { faker } from '@faker-js/faker';
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
    // console.log(`User a validar: ${user.password}, Contrasenia: ${password}`);
    return bcrypt.compareSync(password, user.password)
}


export const generateJWToken = (user) => {
    return jwt.sign({user}, config.privateKey, {expiresIn: '1200s'});
};


export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};

export const authorization = (...roles) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: Usuario no encontrado en JWT"); 
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
        }
        next();
    }
};


export const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.string.numeric(1),
        category: faker.commerce.productMaterial(),
        thumbnail: faker.image.url()
    }
};


export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profilePhoto') {
            cb(null, `${__dirname}/public/uploads/profiles`);
        } else if (file.fieldname === 'productPhotos') {
            cb(null, `${__dirname}/public/uploads/products`);
        } else if (file.fieldname.startsWith === 'documents') {
            cb(null, `${__dirname}/public/uploads/documents`);
        } else {
            cb({error: 'Invalid fieldname'}, false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

export const uploader = multer({
    storage:storage,
    onError: function (err, next) {
        console.log(err);
        next();
    }
})


export default __dirname;