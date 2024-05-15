document.addEventListener('DOMContentLoaded', () => {

    const delForm = document.getElementById('deleteProd')

    delForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        let prodId = document.getElementById('delProdId').value;
        let actionUrl = `/api/products/${prodId}`;
        let result = await fetch(actionUrl, {
            method: 'DELETE'
        })
        let json = await result.json()
        console.log(json)
        delForm.submit();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('updateProd')

    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        let prodId = document.getElementById('uId').value;
        console.log('prodId', prodId)
        let actionUrl = `/api/products/${prodId}`;

        let updatedProduct = {
            title: document.getElementById('uTitle').value,
            description: document.getElementById('uDescription').value,
            code: document.getElementById('uCode').value,
            price: document.getElementById('uPrice').value,
            status: document.getElementById('uStatus').value,
            stock: document.getElementById('uStock').value,
            category: document.getElementById('uCategory').value,
            thumbnail: document.getElementById('uThumbnail').value,
            _id: prodId
        };

            let result = await fetch(actionUrl, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            let json = await result.json();
            console.log(json);
        // updateForm.submit();
    });
});


