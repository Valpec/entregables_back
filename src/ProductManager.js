import fs from "fs";
class ProductManager {
    constructor() {
        this.products = [];
        this.path =  "../files/productos.json";
        this.fs = fs
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const producto = {
            title, description, price, thumbnail, code, stock,
        }

        if (!Object.values(producto).includes(undefined) &&
            !this.products.some((prod) => (prod.code === code))) {
            ProductManager.id++
            this.products.push({ ...producto, id: ProductManager.id })
            try {
                console.log(this.products)
                await this.fs.promises.writeFile(
                    this.path,
                    JSON.stringify(this.products, null, 2, '\t')
                );
            }
            catch (error) {
                console.error(`Error escribiendo el archivo: ${error}`);
            }
        }
    }


    getProducts = async () => {
        let productosFileStr = await this.fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productosFileStr)
    }

    getProductsById = async (itemId) => {
        let respuesta = await this.getProducts()
        let busquedaPorId = respuesta.find((prod) => (prod.id === itemId))
        console.log(`Busqueda por ID: ${itemId}`)
        if (busquedaPorId === undefined) {
            console.log("Not Found")
        }
        else {
            return (busquedaPorId)
        }
    }

    updateProduct = async ({ id, ...prod }) => {
        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === id))
        if (indiceProd > -1) {

            array.splice(indiceProd, 1, { ...prod, id })
            await this.fs.promises.writeFile(this.path, JSON.stringify(array, null, 2, '\t'))
        } else {
            console.log("Not Found")
        }
    }


    deleteProduct = async (itemId) => {
        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === itemId))
        if (indiceProd > -1) {
            array.splice(indiceProd, 1)
            await this.fs.promises.writeFile(this.path, JSON.stringify(array, null, 2, '\t'))
        } else {
            console.log('Not Found')
        }
    }

}


export default ProductManager;