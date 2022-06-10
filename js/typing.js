// const RANDOM_QUOTE_API = "http://api.quotable.io/random";


const timerElement = document.getElementById("timer");
const quoteDisplayElement= document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const scoreElement = document.querySelector(".score");

window.addEventListener("DOMContentLoaded", startTimer);

quoteInputElement.addEventListener("input", () => {
    
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split("");

    let correct = true;



    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        
        if (character == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }

        else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
            console.log(character);
        } else {
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
            correct = false;
        }
    });

    if (correct) {
        renderNewQuote();
    }
    
});


function getRandomQuote() {
    return fetch("../js/data.json")
    .then(response => response.json())
    .then( value => value.data)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = "";

    quote.split("").forEach(character => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
}

renderNewQuote();

// Creating Timer
// let startTime = new Date();
// function startTimer() {
//     timerElement.innerText = 0;
//     setInterval(() => {
//         timerElement.innerText = getTimerTime();
//     }, 1000);

// }

// function getTimerTime() {
//     return Math.floor((new Date() - startTime) / 1000);
// }


// Timer
let time = 0;
function startTimer() {
    setInterval(() => {
        if (time > 60) {
            timerElement.innerText = "";
            quoteInputElement.disabled = true;
        } else {
            timerElement.innerText = time;
        }
        time++;
    }, 1000);
   
}