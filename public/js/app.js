const fetchData = (msgOne, msgTwo, address) => {
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';
    fetch('/weather?address=' + address).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                return msgOne.textContent = data.error;
            }

            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
        })
    })
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); //stop page reload on submit
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');
    fetchData(messageOne, messageTwo, document.querySelector('input').value);
})