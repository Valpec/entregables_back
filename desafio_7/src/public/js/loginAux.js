const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(formLogin);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status===200){
            result.json()
            .then(json=>{
                console.log(json);
                console.log(`cookies generadas: ${document.cookie}`)
                console.log("Login realizado con exito!");
                window.location.replace('/products');
            });
        } else if (result.status === 401){
            console.log(result);
            console.log("Login invalido revisa tus credenciales!");
        }
    })
})