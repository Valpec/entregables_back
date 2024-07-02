import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

class CartManager {
    constructor() {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        this.carts = [];
        this.path = path.resolve(__dirname, "..", "..", "..", "data", "carritos.json")
        this.fs = fs
    }

    generateId = async (existingCarts) => {
        let id
        do {
            id = Math.floor(Math.random() * 100000);
        } while (existingCarts.find((cart) => cart.id == id))
        return id;
    }

    createCart = async () => {
        let existingCarts = await this.readCartFile()
        let cartId = await this.generateId(existingCarts)
        let newCart = { id: cartId, products: [] }
        this.carts.push(...existingCarts, newCart)
        try {
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, 2, '\t')
            );
        }
        catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);
        }
    }

    readCartFile = async () => {
        try {
            let cartsFromFile = await this.fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(cartsFromFile)
        } catch (error) {
            console.error(`Error leyendo el archivo: ${error}`);
        }
    }


    listCartProds = async (cid) => {
        cid = parseInt(cid)
        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cid)
        if (cart) {
            console.log('cart found')
            return cart.products

        } else {
            console.log('cart not found')
        }

    }

    addToCart = async (cid, pid) => {
        cid = parseInt(cid)
        pid = parseInt(pid)
        let cartsFromFile = await this.readCartFile()

        let cart = cartsFromFile.find((c) => c.id === cid)
        let productFromCart = cart.products.find((prod) => prod.product === pid)
        if (productFromCart) {
            productFromCart.quantity++
        } else {
            cart.products.push({ product: pid, quantity: 1 })
        }
        try {
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);

        }

    }


    deleteCart = async (cartId) => {
        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cartId)

        if (!cart) {
            throw new Error(`No existe el carrito`)
        }

        try {
            cart ={ id: cartId, products: [] }

            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);

        }

    }
    deleteProdFromCart = async (cartId, prodId) => {
        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cartId)

        if (!cart) {
            throw new Error(`No existe el carrito`)
        }

        let productFromCart = cart.products.findIndex((prod) => prod.product === prodId)

        if (productFromCart === -1) {
            throw new Error(`No existe el producto en el carrito`)
        }
        try {
            cart.products.splice(productFromCart, 1)

            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);

        }

    }

    updateCartQty = async (cartId, prodId, qty) => {

        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cartId)
        if (!cart) {
            throw new Error(`No existe el carrito`)
        }
        let productFromCart = cart.products.find((prod) => prod.product === prodId)
        if (!productFromCart) {
            throw new Error(`No existe el producto en el carrito`)
        }
        if (isNaN(qty)) {
            throw new Error(`El valor enviado no es un numero`)
        }
        productFromCart.quantity = parseInt(qty)
        try {
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);

        }     
    }
    updateCart = async (cartId) => {

        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cartId)
        if (!cart) {
            throw new Error(`No existe el carrito`)
        }
        
        try {
               cart ={ id: cartId, products: [] }
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);

        }     
    }

}
export default CartManager