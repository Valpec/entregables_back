import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';

import dotenv from 'dotenv';
import __dirname from './utils.js';

import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import viewsRouter from "./routes/views.router.js";
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import sessionsRouter from './routes/session.router.js'

dotenv.config()

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.joeky3o.mongodb.net/${process.env.MONGO_DB_NAME}`

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true},
        ttl: 10 * 60
    }),
    secret: 'd3s4f105',
    resave: false,
    saveUnitialized:true,
}))



app.use('/', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);})



const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado con exito a MongoDB usando Moongose.");


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();
