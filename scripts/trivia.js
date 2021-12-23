// fetch the API for Trivia
// this API selects 5 random questions with boolean answers
const url = `https://opentdb.com/api.php?amount=5&category=12&type=boolean`


// show the data from the API in JSON
fetch(url)
    .then(res => {
        return res.json()
    })
    .then(res => {
        console.log("success!", res);
    })
    .catch(err => {
        console.log("something went wrong...", err);
    });


// I want to have each column showing a different category. Needed to dig in API to find categories that had boolean, thus weird category chronology
// 12=Music
// 9=General Knowledge
// 14=TV
// 18=Science:Computers
// 17=science and nature
const categories = ['12', '9', '14', '18', '17']


// function for questions for each box
function showQuestion() {
    const categ = document.createElement("div")
    categ.classList.add("category")
        // categ.innerHTML = "test"
    trivia.append(categ)

    // The forEach() method calls a function for each element in an array.
    categories.forEach(cats => {
        const box = document.createElement("div")
        box.classList.add("box")
        categ.append(box)

        // all category names (=cats) need to be displayed in the box as innerhtml.
        if (cats === "12") {
            box.innerHTML = "Music! "
        }
        if (cats === "9") {
            box.innerHTML = "General Knowledge! "
        }
        if (cats === "14") {
            box.innerHTML = "TV! "
        }
        if (cats === "18") {
            box.innerHTML = "Science-Computers! "
        }
        if (cats === "17") {
            box.innerHTML = "Science-Nature! "
                // adding another class to target it, we want to show the next round button once we click this one
            box.classList.add("last-box")
        }

        // this is the api call having the query for the categories (=cats) for each category
        fetch(`https://opentdb.com/api.php?amount=5&category=${cats}&type=boolean`)
            .then(res =>
                res.json())
            .then(data => {
                // store as data
                console.log(data)
                    // set Attribute to each box, so each box displays the question and the answer and the category returned
                box.setAttribute('APIcallquestion', data.results[0].question)
                box.setAttribute('APIcallanswer', data.results[0].correct_answer)
                box.setAttribute('category', box.getInnerHTML())
            })
            // this is when I click on a box, i call immediately the flip function but also it doesn't prevent me adding another click all the time
            //  
            .then(flippyflopp => box.addEventListener("click", flipBox))
    })
}
// this will show the whole game:
showQuestion()

// this function adds the functionality to flip the card
function flipBox() {
    // adding three elements to show the t/f buttons and the questions
    const showQuestionInBox = document.createElement("div")
    const trueButton = document.createElement("button")
    const falseButton = document.createElement("button")
    trueButton.innerHTML = "True"
    falseButton.innerHTML = "False"

    // We want to see the answer if we click the T/F button:
    // the function getanswer will come later
    trueButton.addEventListener('click', getAnswer)
    falseButton.addEventListener('click', getAnswer)
        // this will show the question... maybe I can prevent the double click here?
    showQuestionInBox.innerHTML = this.getAttribute('APIcallquestion')

    // show question from API call and both buttons, append them all to this box
    // how to stopp appending after one click. i tried doublclck and removeeventlisteners but no success
    this.append(showQuestionInBox, trueButton, falseButton)

    // create const for last item to target it (we can target it to show up with the last if statement. after the 5th card is clicked, users can select new round)
    const lastButton = document.querySelector(".last-box")
    lastButton.addEventListener('click', nextroundbutton)

    // failed attempts to prevent double-clicking.
    // showQuestionInBox.removeEventListener('click', flipBox)
    // showQuestionInBox.style.display = 'none';
}

// failed attempt to prevent double-click on True/False buttons
// function noClick() {
//     alert("button is clicked");
//     button.disabled = true;
//     button.removeEventListener('click', noClick)
// )
// }



// function to show if clicked answer is true or false,.. if it's matching
function getAnswer() {
    // parent=>the question div
    const boxOfButton = this.parentElement
    const testtest = this.innerHTML
        // i want to see what the return is from those consts
    console.log(boxOfButton)
    console.log(testtest)
        // if we click the button, the apicallanswer ("True" or "False") will compare with the innerhtml of the "True" of the button
    if (boxOfButton.getAttribute('APIcallanswer') === this.innerHTML) {
        // we create a new class that I can use in css in glowing
        boxOfButton.classList.add('right-on')
            // show it in console that it's correct
        console.log("Yass!")
            // show in the box that this was correct
        boxOfButton.innerHTML = "Good Job!"
    } else {
        boxOfButton.classList.add("nope")
        boxOfButton.innerHTML = "Wrong answer!"
    }

    // this will remove the question from the box after clicking an answer
    boxOfButton.removeEventListener('click', flipBox)

    // my box does not turn red/green if wrong/right but it shows inner html

}


// make a refresh button "next round"
function refresh() {
    window.location.reload("Next please!")
}

// this button will only show up once the 5th category box is clicked
function nextroundbutton() {
    // change the style display to block of this one button so it appears when we click the 5th box
    console.log("working");
    document.getElementById("nextround").style.display = "block";
}