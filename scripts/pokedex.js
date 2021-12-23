// define URL (API)
const url = 'https://pokeapi.co/api/v2/pokemon/5'


// synchronous promise
fetch(url)
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log("success!", res);
    })
    .catch(err => {
        console.log("something went wrong...", err);
    });



// we're targeting now the user input
let button = document.querySelector('#submitButton')


// we want to run an asynch function. 
async function getData(event) {
    let textInput = document.querySelector('#inputBar').value
    const urli = `https://pokeapi.co/api/v2/pokemon/${textInput}`
    event.preventDefault()
    fetch(urli)
        .then(res => {
            return res.json()
        })
        .then(res => {
            // create text for box1=name
            const newDiv1 = document.createElement("div1")
            const newContent1 = document.createTextNode("The name is:")
            newDiv1.appendChild(newContent1)
            const currentDiv1 = document.querySelector("#box1")
            document.body.insertBefore(newDiv1, currentDiv1)
            const pokemonHeader = document.querySelector('#pokemonName')
            pokemonHeader.innerText = res.name

            // create text for box3=weight
            const newDiv2 = document.createElement("div2")
            const newContent2 = document.createTextNode("The height is:")
            newDiv2.appendChild(newContent2)
            const currentDiv2 = document.querySelector("#box2")
            document.body.insertBefore(newDiv2, currentDiv2)
            const pokemonH = document.querySelector('#pokemonHeight')
            pokemonH.innerText = res.height


            // create text for box3=weight
            const newDiv3 = document.createElement("div3")
            const newContent3 = document.createTextNode("The weight is:")
            newDiv3.appendChild(newContent3)
            const currentDiv3 = document.querySelector("#box3")
            document.body.insertBefore(newDiv3, currentDiv3)
            const pokemonTypes = document.querySelector('#pokemonT')
            pokemonTypes.innerText = res.weight

            // create text for box4=image
            const newDiv = document.createElement("div")
            const newContent = document.createTextNode("Look how pretty me is:")
            newDiv.appendChild(newContent)
            const currentDiv = document.querySelector("#box4")
            document.body.insertBefore(newDiv, currentDiv)
            const pokemonImage = document.querySelector('#pokemonImage')
            pokemonImage.src = res.sprites.front_default

            // successful API call
            console.log("success!", res.name)
        })
        .catch(err => {
            console.log("something went wrong...", err)
        })
}

button.addEventListener('click', getData)