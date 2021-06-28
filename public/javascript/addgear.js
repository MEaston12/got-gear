const { forEach } = require("lodash");

async function addGearHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#desc').value.trim();
    const tags = document.querySelector('#tags').value.trim();

    // tags = string.split(' ');
    // const tagsArray = new Array();
    // forEach(tags => tagsArray.push(tags));

    // console.log(tagsArray);


    if (name && description && tags) {
       const response = await fetch('/api/gear/', {
            method: 'post',
            body: JSON.stringify({
                name,
                description,
                tag
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Check the response status
        if (response.ok){
            document.location.replace('/gearbag');
        }else{
            alert(response.statusText);
        }
    }

}

document.querySelector('#add-gear').addEventListener('click', addGearHandler);