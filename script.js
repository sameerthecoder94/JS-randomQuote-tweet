//02-27-22
'use strict';

const quoteText = document.querySelector('#quote');
// console.dir(quoteText);
// console.log(quoteText.textContent);
const quoteAuthor = document.querySelector('#author');
// console.log(quoteAuthor.textContent);
const newQuoteBtn = document.querySelector('#new-quote');
// console.log(newQuoteBtn);
const twitterBtn = document.querySelector('#twitter');
// console.log(twitterBtn);
const loader = document.querySelector('.loader');
// console.log(loader);
const quoteContainer = document.querySelector('.quote-container');

let apiQuote;

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  loading();
  loader.hidden = false;
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // console.log(quote);
  quoteText.textContent = quote.text;

  if (quote.author) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = 'unknown';
  }

  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  complete();
}

async function getQuotes() {
  loading();
  try {
    const res = await fetch('https://type.fit/api/quotes');
    const quoteData = await res.json();
    // console.log(quoteData);
    apiQuote = quoteData;
    newQuote();
  } catch (error) {
    console.log('Some error!', error);
  }
}
getQuotes();

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~${quoteAuthor.textContent}`;
  window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
