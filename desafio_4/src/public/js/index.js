const socket = io()
let divItemList = document.getElementById('itemList')


socket.emit('connection')
socket.on('prods', (data) => {
    renderProds(data)
} )

const renderProds = (data)=>{
    divItemList.innerHTML = ``
    for(let prod of data){
        let nuevoProducto = document.createElement("div")
        nuevoProducto.className = `item`
        nuevoProducto.id = `${prod.id}`
        nuevoProducto.innerHTML = ` <h4>Id: ${prod.id}</h4>
                                    <p class="itemName">Title: ${prod.title} </p>
                                    <p>Code: ${prod.code}</p>
                                    <p>Price: ${prod.price}</p>
                                    <p>Stock: ${prod.stock}</p>
                                    <p>Category: ${prod.category}</p>
                                    `
        divItemList.appendChild(nuevoProducto)
    }
   
}

const addForm = document.getElementById('addProd')

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
    socket.emit('newProduct', newProduct)
})

const delForm = document.getElementById('deleteProd')
delForm.addEventListener("submit", async(e)=>{
    e.preventDefault()
    let deletedProdId = document.getElementById('delProdId').value
    socket.emit('deleteProduct', deletedProdId)
})


