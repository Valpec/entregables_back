class ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0;
    addProduct(title, description, price, thumbnail, code, stock){

        const producto = {
            title, description, price, thumbnail, code, stock
        }

        if (!Object.values(producto).some((val)=> val == undefined) && 
        ! this.products.some((prod) =>(prod.code === code))){
            ProductManager.id ++
            this.products.push({...producto, id:ProductManager.id})
        }
    }

    getProducts(){
        return this.products
    }

    getProductsById(itemId){
        let busquedaPorId = this.products.find((prod) => (prod.id === itemId))


        if (busquedaPorId === undefined){
            console.log("Not found")}
        else{ 
            console.log("Found")
            console.log(busquedaPorId)
        }
       }   
    }

// Pruebas
const prods = new ProductManager();
//agrego producto de prueba
prods.addProduct('producto prueba','Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
// producto sin un campo
prods.addProduct('producto prueba','Este es un producto prueba', 200, 'Sin imagen', 'abc')
//producto con codigo repetido
prods.addProduct('producto prueba','Este es un producto prueba', 200, 'Sin imagen','abc123', 25)
console.log(prods.getProducts())
//busqueda por id
prods.getProductsById(1)
prods.getProductsById(2)

