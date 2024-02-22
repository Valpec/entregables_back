import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import viewsRoutes from "../src/routes/views.routes.js"
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"))

app.use('/', viewsRoutes)
const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})


const socketServer = new Server(httpServer);
const productManager = new ProductManager()



socketServer.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado");

    try {
        let prods = await productManager.getProducts()
        socket.emit('prods', prods);
    } catch (error) {
        console.error('Error en socket', error)
    }

    socket.on('newProduct', async (data) => {
        console.log(`Nuevo producto: ${data}`)
        try {
            await productManager.addProduct(data)
            let updatedProds = await productManager.getProducts()
            socket.emit('prods', updatedProds)
        } catch (error) {
            console.log(`Error al intentar agregar el producto, ${error}`)
            socket.emit(`Error al agregar producto: ${error}`)
        }
    })

    socket.on('deleteProduct', async(data)=>{
        console.log(`Id recibido: ${data}`)
        try{
            await productManager.deleteProduct(parseInt(data))
            let updatedProds = await productManager.getProducts()
            socket.emit('prods', updatedProds)
        }catch (error){
            console.log(`Error al intentar eliminar el producto, ${error}`)
            socket.emit(`Error al eliminair producto: ${error}`)
        }
    })

})
