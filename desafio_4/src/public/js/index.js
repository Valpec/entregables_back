const socket = io()
let divItemList = document.getElementById('itemList')


socket.emit('connection', 'HOLA')
socket.on('prods', (data) => {
    console.log(`Info de productos: ${data}`)
    renderProds(data)
} )

const renderProds = (data)=>{
    divItemList.innerHTML = ``
    for(let prod of data){
        let nuevoProducto = document.createElement("li")
        nuevoProducto.id = `${prod.id}`
        nuevoProducto.innerHTML = `
                                    <h5 class="itemName">${prod.title} </h5>
                                    <h4>${prod.id}</h4>`
        divItemList.appendChild(nuevoProducto)
    }
   
}

const addForm = document.getElementById('addProd')
console.log(addForm)
addForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let code = document.getElementById('code').value
    let price = document.getElementById('price').value
    let status = document.getElementById('status').value
    let stock = document.getElementById('stock').value
    let category = document.getElementById('category').value
    let thumbnail = document.getElementById('thumbnail').value
    const newProduct ={
        title: title,
        description: description,
        code:code,
        price:price,
        status:status,
        stock:stock,
        category:category,
        thumbnail:thumbnail


    }
    console.log(`producto recibidoo: ${newProduct}`)
    socket.emit('newProduct', newProduct)
})

const delForm = document.getElementById('deleteProd')
delForm.addEventListener("submit", async(e)=>{
    e.preventDefault()
    let deletedProdId = document.getElementById('delProdId').value
    socket.emit('deleteProduct', deletedProdId)
})


