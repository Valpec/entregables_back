import MongoSingleton from "../config/mongodb-singleton.js";
import config from "../config/config.js";

let cartServiceFact
let productServiceFact

async function initializeMongoService() {
    console.log('Iniciando servicio para MongoDB');
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error('Error al iniciar MongoDB:', error);
        process.exit(1); 
    }
}

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService()
        const { default: CartService } = await import('./dao/db/carts.service.js')
        cartServiceFact = new CartService()
        console.log('Servicio de carritos cargado')

        const { default: ProductService } = await import('./dao/db/products.service.js')
        productServiceFact = new ProductService()
        console.log('Servicio de prods cargado')
        break;
    
    case 'files':
        const { default: CartManager } = await import('../services/dao/fileSystem/CartManager.js')
        cartServiceFact = new CartManager()
        console.log('Servicio de carritos cargado')


        const { default: ProductManager } = await import('../services/dao/fileSystem/ProductManager.js')
        productServiceFact = new ProductManager()
        console.log('Servicio de prods cargado')
        break;
    default:
        break;
}


export { cartServiceFact, productServiceFact}