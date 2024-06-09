document.addEventListener('DOMContentLoaded', () => {
    const delProdFromCart = document.querySelectorAll('.delProdFromCart');
    delProdFromCart.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            let cid = button.dataset.cid
            let pid = button.dataset.pid;

            try {
                const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(response){
                    window.location.replace(`/carts/${cid}`);

                }

            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    });
});