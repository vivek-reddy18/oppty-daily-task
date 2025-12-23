document.addEventListener("DOMContentLoaded", () => {

/*******************************
 * PARAGRAPHS
 *******************************/
const paragraphs = [
    "The government announced a new digital initiative aimed at improving public services across the country. Heavy rainfall continued to affect several regions on Tuesday, causing traffic disruptions and power outages in some areas.",
    "Heavy rainfall continued to affect several regions on Tuesday, causing traffic disruptions and power outages in some areas. The government announced a new digital initiative aimed at improving public services across the country.",
    "The stock market opened on a positive note as investors reacted to strong global cues. Banking and technology shares led the gains in early trading. The government announced a new digital initiative aimed at improving public services across the country."
];

/*******************************
 * EMAILJS CONFIGURATION
 *******************************/
const EMAILJS_SERVICE_ID = 'service_45p9r7o';
const EMAILJS_TEMPLATE_ID = 'template_dd60vub';
const EMAILJS_PUBLIC_KEY = 'GmwIaMFjXADdpoK2c';

emailjs.init(EMAILJS_PUBLIC_KEY);

/*******************************
 * DOM ELEMENTS
 *******************************/
const emailInput = document.getElementById('email-input');
const paragraphDisplay = document.getElementById('paragraph-display');
const typingInput = document.getElementById('typing-input');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resultsSection = document.getElementById('results-section');
const wpmResult = document.getElementById('wpm-result');
const accuracyResult = document.getElementById('accuracy-result');
const wordsResult = document.getElementById('words-result');
const timeResult = document.getElementById('time-result');
const emailStatus = document.getElementById('email-status');

/*******************************
 * STATE
 *******************************/
let timeRemaining = 60;
let timer = null;
let isTestActive = false;
let referenceText = "";

/*******************************
 * PREVENT COPY / PASTE
 *******************************/
typingInput.addEventListener("paste", e => e.preventDefault());

/*******************************
 * START TEST
 *******************************/
startBtn.addEventListener("click", () => {
    if (!emailInput.value.trim()) {
        alert("Please enter your email");
        return;
    }

    referenceText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    paragraphDisplay.textContent = referenceText;

    timeRemaining = 60;
    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();
    isTestActive = true;

    startBtn.disabled = true;
    resultsSection.classList.add("hidden");
    emailStatus.textContent = "";
    timerDisplay.textContent = timeRemaining;
    timerDisplay.classList.remove("warning");

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 10) {
            timerDisplay.classList.add("warning");
        }

        if (timeRemaining <= 0) {
            endTest();
        }
    }, 1000);
});

/*******************************
 * END TEST
 *******************************/
function endTest() {
    clearInterval(timer);
    isTestActive = false;
    typingInput.disabled = true;
    startBtn.disabled = false;
    timerDisplay.classList.remove("warning");

    const typedText = typingInput.value;
    const metrics = calculateMetrics(typedText);

    displayResults(metrics);
    sendEmail(metrics);
}

/*******************************
 * CALCULATE METRICS
 *******************************/
function calculateMetrics(text) {
    let correctChars = 0;

    for (let i = 0; i < Math.min(text.length, referenceText.length); i++) {
        if (text[i] === referenceText[i]) correctChars++;
    }

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const timeTaken = 60 - timeRemaining || 1;
    const wpm = Math.round(words / (timeTaken / 60));
    const accuracy = text.length
        ? Math.round((correctChars / text.length) * 100)
        : 0;

    return {
        wpm,
        accuracy,
        totalWords: words,
        correctChars,
        wrongChars: text.length - correctChars,
        timeTaken
    };
}

/*******************************
 * DISPLAY RESULTS
 *******************************/
function displayResults(m) {
    wpmResult.textContent = m.wpm;
    accuracyResult.textContent = m.accuracy + "%";
    wordsResult.textContent = m.totalWords;
    timeResult.textContent = m.timeTaken + " seconds";
    resultsSection.classList.remove("hidden");
}

/*******************************
 * SEND EMAIL
 *******************************/
function sendEmail(m) {
    emailStatus.textContent = "Sending results...";
    emailStatus.className = "email-status sending";

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: emailInput.value,
        wpm: m.wpm,
        accuracy: m.accuracy + "%",
        total_words: m.totalWords,
        correct_characters: m.correctChars,
        wrong_characters: m.wrongChars,
        test_duration: m.timeTaken + " seconds",
        from_name: "Typing Speed Test"
    })
    .then(() => {
        emailStatus.textContent = "✅ Results sent to your email!";
        emailStatus.className = "email-status success";
    })
    .catch(() => {
        emailStatus.textContent = "❌ Email failed to send";
        emailStatus.className = "email-status error";
    });
}

});