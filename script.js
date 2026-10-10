const quotes = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier", tag: "Growth" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi", tag: "Motivation" },
  { text: "Discipline is choosing between what you want most and what you want right now.", author: "Abraham Lincoln", tag: "Focus" },
  { text: "You do not have to be fearless to begin. You just have to begin.", author: "Unknown", tag: "Courage" },
  { text: "Small steps every day create the momentum of greatness.", author: "Unknown", tag: "Progress" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston", tag: "Action" }
];

const quoteText = document.getElementById("quoteText");
const quoteTag = document.getElementById("quoteTag");
const quoteAuthor = document.getElementById("quoteAuthor");
const currentTime = document.getElementById("currentTime");
const shuffleBtn = document.getElementById("shuffleBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");

function updateClock() {
  const now = new Date();
  currentTime.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function renderQuote() {
  const selectedQuote = getRandomQuote();
  quoteText.textContent = `“${selectedQuote.text}”`;
  quoteTag.textContent = selectedQuote.tag;
  quoteAuthor.textContent = selectedQuote.author;
}

shuffleBtn.addEventListener("click", renderQuote);
newQuoteBtn.addEventListener("click", renderQuote);

updateClock();
setInterval(updateClock, 1000);
renderQuote();
