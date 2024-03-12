import express from 'express';
import __dirname from './utils.js';

import mongoose from 'mongoose';
import viewsRouter from "./routes/views.routes.js";

import cartsRouter from './routes/carts.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)


app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`)
})


const connectMongoDB = async ()=>{
    try {
        // await mongoose.connect('mongodb://localhost:27017/');
        await mongoose.connect('mongodb+srv://valuupecchio:zSCMX7FbzebL@cluster0.joeky3o.mongodb.net/ecommerce')
        console.log("Conectado con exito a MongoDB usando Moongose.");
        // initializeSocket(httpServer)


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();
