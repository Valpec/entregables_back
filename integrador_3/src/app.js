import express from 'express';
import handlebars from 'express-handlebars';

import __dirname from './utils.js';
import config from './config/config.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewsRouter from "./routes/views.router.js";
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import sessionsRouter from './routes/session.router.js'
import emailRouter from './routes/email.router.js';
import smsRouter from './routes/sms.router.js';
import usersRouter from './routes/users.router.js'

import cookieParser from 'cookie-parser';

import { addLogger } from './config/loggerCustom.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addLogger)


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));

app.use(cookieParser("d3s4f105"))

initializePassport();
app.use(passport.initialize());


app.use('/', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/sessions', sessionsRouter);
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);
app.use("/api/users", usersRouter);


app.get('/loggerTest', (req, res) => {
    req.logger.debug("Prueba de log level debug - en endpoint /loggerTest")
    req.logger.http("Prueba de log level http -en endpoint /loggerTest") 
    req.logger.info("Prueba de log level info -en endpoint /loggerTest")
    req.logger.warning("Prueba de log level warning -en endpoint /loggerTest")
    req.logger.error("Prueba de log level error -en endpoint /loggerTest")
    req.logger.fatal("Prueba de log level fatal -en endpoint /loggerTest")

    res.send("Prueba de logger");
} )

app.get("*", (req, res) => {
    res.status(400).send("Connot get that URL!!")
});

app.listen(config.port, () => {
    console.log(`Server run on port: ${config.port}`);
})

const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoURL)
        console.log("Conectado con exito a MongoDB usando Moongose.");


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();



