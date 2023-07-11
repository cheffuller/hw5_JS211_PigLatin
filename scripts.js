// function to convert original word into pig latin by moving the appropriate letters to the end of the word
// and adding "ay" to the end of the string
// Also checks for punctuation at the end of the word and if present removes the punctuation, then adds it back to the end
// after converting
const convertWord = (index, wordArray) => {
  const punctuation = /\p{P}/gu;
  let removedPunctuation = '';
  if (punctuation.test(wordArray[wordArray.length - 1])) {
    removedPunctuation = wordArray.pop();
  }
  for (let i = 0; i < index; i++) {
    const firstLetter = wordArray.shift();
    wordArray.push(firstLetter);
  }
  wordArray.push("a", "y");
  if (removedPunctuation) {
    wordArray.push(removedPunctuation);
  }
  return wordArray.join("");
};

// function to evaluate the word to determine the letters (if any) to move to the end of the word
const evaluateWord = (word) => {
  const VOWELS = ["a", "e", "i", "o", "u"];
  const wordArray = Array.from(word);
  switch (true) {
    case (word === ''):
      return "Please enter a word or phrase!"
      break;
    case VOWELS.includes(wordArray[0]):
      wordArray.push("y");
      return convertWord(0, wordArray);
      break;
    case VOWELS.includes(wordArray[1]):
      return convertWord(1, wordArray);
      break;
    case VOWELS.includes(wordArray[2]):
      return convertWord(2, wordArray);
      break;
    case VOWELS.includes(wordArray[3]):
      return convertWord(3, wordArray);
      break;
    default:
      return convertWord(4, wordArray);
  }
};

// function to evaluate the string to determine if there are multiple words and split them and
// rejoin them if necessary
const evaluateString = (word) => {
  const arrayOfStrings = word.split(" ");
  let returnedWords = "";
  arrayOfStrings.forEach((e, i) => {
    returnedWords += evaluateWord(e);
    if (i < arrayOfStrings.length - 1) {
      returnedWords += " ";
    }
  });
  return returnedWords;
};

// function that calls the scrubbing function and begins the string evaluation
// it also returns the translated result
const pigLatin = (word) => {
  const stringScrubbed = word.trim().toLowerCase();
  return evaluateString(stringScrubbed);
};

// main body of code
// assigns a "click" event listener to the translate button and runs
// the input string through the pigLatin function which returns the output string
const translateButton = document.querySelector(".translate");
translateButton.addEventListener("click", function () {
  const inputString = document.querySelector(".pig-latin-input").value;
  const outputDiv = document.querySelector(".pig-latin-output");
  outputDiv.style.border = "1px solid white";
  outputDiv.innerHTML = pigLatin(inputString);
});
