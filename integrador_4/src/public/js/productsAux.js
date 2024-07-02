document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addProdToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            let cid = button.dataset.cid;
            let pid = button.dataset.pid;
            try {
                const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    });
});