class ProductManager {
    constructor() {
        this.products = [];
        this.dirPath = "./files";
        this.filePath = this.dirPath + "/productos.json";
        this.fs = require("fs");
    }

    static id = 0;
    // hacer funcion de inicializar
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const producto = {
            title, description, price, thumbnail, code, stock,
        }

        if (!Object.values(producto).some((val) => val == undefined) &&
            !this.products.some((prod) => (prod.code === code))) {
            ProductManager.id++
            this.products.push({ ...producto, id: ProductManager.id })
            await this.fs.promises.writeFile(this.filePath, JSON.stringify(this.products, null, 2, '\t'))
        }
    }

    getProducts = async () => {
        let productosFileStr = await this.fs.promises.readFile(this.filePath, "utf-8");
        return JSON.parse(productosFileStr)
    }

    getProductsById = async (itemId) => {
        let respuesta = await this.getProducts()
        let busquedaPorId = respuesta.find((prod) => (prod.id === itemId))
        console.log(`Busqueda por ID: ${itemId}`)
        if (busquedaPorId === undefined) {
            console.log("Not found")
        }
        else {
            console.log("Found")
            console.log(busquedaPorId)
            return (busquedaPorId)
        }
    }

    updateProduct = async ({id, ...prod}) => {
        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === id))
        if(indiceProd > -1){
        
            array.splice(indiceProd, 1, {...prod, id})
            console.log("el updateprdo")
            console.log(array)
            await this.fs.promises.writeFile(this.filePath, JSON.stringify(array, null, 2, '\t'))
        }else{
            console.log("Not Found")
        }
    }


    deleteProduct = async (itemId) => {
        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === itemId))
        if (indiceProd > -1) {
            array.splice(indiceProd, 1)
            await this.fs.promises.writeFile(this.filePath, JSON.stringify(array, null, 2, '\t'))
        } else {
            console.log('Not Found')
        }
    }
}



// Pruebas
const prods = new ProductManager();
//agrego producto de prueba
prods.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
prods.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abcasss123', 25)
// producto sin un campo
prods.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc')
//producto con codigo repetido
prods.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)


//busqueda por id
prods.getProductsById(1)
prods.getProductsById(5)

//para actualizar, envio un objeto modificado
prods.updateProduct({
        title: "aaa",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Con imagen",
        code: "abc123",
        stock: 25,
        id: 1
})

prods.deleteProduct(9)
prods.deleteProduct(2)

