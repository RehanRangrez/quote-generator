const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
// SHow loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  loading();
  // pick random quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  //   check if author is  blank n replace with unknown
  if (!quote.author) authorText.textContent = "Unknown";
  else authorText.textContent = quote.author;

  //   check quote length to determine styling
  if (quote.text.length > 120) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
  //   Set quote-hide loader
  complete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error
    console.log(error);
  }
}

// to tweet

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_black");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onload
console.log("running");
getQuotes();
