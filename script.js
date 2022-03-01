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

let apiQuote;
function newQuote() {
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
}

async function getQuotes() {
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
