// call URL
// const api_key = 'dc6zaTOxFJmzC'

let button = document.querySelector('#submitButton')

// function for the form
async function getData(event) {
    event.preventDefault()
    const searchTerm = document.querySelector('#textInput').value


    // string/object/template literal; add api key into url
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=25`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {

            // for loop
            for (let i = 0; i < res.data.length; i++) {

                var dogsImages = document.createElement("img")
                console.log(dogsImages)
                dogsImages.src = res.data[i].images.downsized.url
                var block = document.getElementById("urlID")
                block.appendChild(dogsImages);
                var out = document.querySelector('.out');
                out.insertAdjacentElement('afterbegin', block)
                box.classList.add("last-box")
            }
        })
        .catch(err => {
            console.log("error!", err)
        })

}
// once we click the button we will get the output
button.addEventListener('click', getData)


// advice from teachers:
// Array.map or Array.forEach
// for loop for length of response
// console.log("success!", res.data)



// now the "load more button" is using basically the same function but with the &offset pagination in the api call, starting with row 26.
let loadMore = document.querySelector('#dots')

async function getMoreData(event) {
    event.preventDefault()
    const searchTerm = document.querySelector('#textInput').value

    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=25&offset=26`
    fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {

            // for loop
            for (let i = 0; i < res.data.length; i++) {

                var dogsImages = document.createElement("img")
                console.log(dogsImages)
                dogsImages.src = res.data[i].images.downsized.url
                var block = document.getElementById("urlID")
                block.appendChild(dogsImages);
                var out = document.querySelector('.out');
                out.insertAdjacentElement('afterbegin', block)
            }
        })
        .catch(err => {
            console.log("error!", err)
        })

}

loadMore.addEventListener('click', getMoreData)







// clear search button
let buttonClear = document.querySelector('#clear');
let input = document.querySelector('#textInput');
buttonClear.addEventListener('click', () => {
    input.forEach(input => input.value = '')
});