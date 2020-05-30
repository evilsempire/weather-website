const weatherFarm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherFarm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...'
    searchResult(location).then(data => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {

            messageOne.textContent = data.location;
            messageTwo.textContent = data.response;
        }
    })
});


const searchResult = (location) => {
    return fetch(`/weather?address=${location}`).then(response => {
        return response.json().then(json => {
            return json
        })
    });

}