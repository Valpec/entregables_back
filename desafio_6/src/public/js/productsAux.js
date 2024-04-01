document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addProdToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            let cid = "65f6e85d9ee742a71efd9ff9"
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