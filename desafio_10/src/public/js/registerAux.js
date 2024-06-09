const formRegister = document.getElementById('formRegister');

formRegister.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(formRegister)

    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/')

        }
    }).then(
        json => console.log(json));
})