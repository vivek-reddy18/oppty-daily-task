
const paragraphs = [
    "The government announced a new digital initiative aimed at improving public services across the country.Heavy rainfall continued to affect several regions on Tuesday, causing traffic disruptions and power outages in some areas",
    "Heavy rainfall continued to affect several regions on Tuesday, causing traffic disruptions and power outages in some areas.The government announced a new digital initiative aimed at improving public services across the country",
    "The stock market opened on a positive note as investors reacted to strong global cues. Banking and technology shares led the gains in early trading.The government announced a new digital initiative aimed at improving public services across the country"
];

let timeLeft = 0;
let timer = null;
const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const result = document.getElementById("result");
const timeSelect = document.getElementById("timeSelect");
input.addEventListener("paste", e => e.preventDefault());


function startTest() {
    timeLeft = Number(timeSelect.value);
    paragraph.innerText =
        paragraphs[Math.floor(Math.random() * paragraphs.length)];

    input.value = "";
    input.disabled = false;
    input.focus();
    result.innerHTML = "";

    timeDisplay.innerText = timeLeft;

    clearInterval(timer);
    timer = setInterval(startTimer, 1000);
}

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        endTest();
    }
}
function endTest() {
    clearInterval(timer);
    input.disabled = true;

    const typedText = input.value;
    const originalText = paragraph.innerText;

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctChars++;
        }
    }

    let totalWords = typedText.trim().split(/\s+/).length;
    if (typedText.trim() === "") 
        totalWords = 0;

    let totalMinutes = Number(timeSelect.value) / 60;
    let wpm = Math.round(totalWords / totalMinutes);
    let accuracy = Math.round((correctChars / typedText.length) * 100) || 0;

    result.innerHTML = `
         <b>Speed:</b> ${wpm} WPM<br>
         <b>Accuracy:</b> ${accuracy}%<br>
         <b>Correct Characters:</b> ${correctChars}<br>
         <b>Wrong Characters:</b> ${typedText.length - correctChars}
    `;
}
