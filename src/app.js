import ProductManager from "./ProductManager.js";
import express from 'express';
let productManager = new ProductManager()

const app = express();
const PORT = 8080;

app.get('/products', async (req,res ) => {
    let {limit} = req.query;
    if (limit) {
        let prods = await productManager.getProducts()
        res.send(prods.slice(0, (parseInt(limit))))
            
    }else{
        let prods = await productManager.getProducts()
        res.send(prods)
    }
})
app.get('/products/:pid', async (req,res) => {
    let prod= await productManager.getProductsById((parseInt(req.params.pid)))
    if(prod){
        res.send(prod)
    }else{res.send({msg: "Not Found"})}
    
    

})
app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})

