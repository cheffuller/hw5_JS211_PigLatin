// function to trim whitespace from both ends and convert to lowercase
const scrubInput = (input) => input.trim().toLowerCase();

// function to join the wordArray (an array of individual letters) into one string
const joinWord = (wordArray) => wordArray.join("");

// function to convert original word into pig latin by moving the appropriate letters to the end of the word
// and adding "ay" to the end of the string
const convertWord = (index, wordArray) => {
  for (let i = 0; i < index; i++) {
    const firstLetter = wordArray.shift();
    wordArray.push(firstLetter);
  }
  wordArray.push("a", "y");
  return joinWord(wordArray);
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
  const stringScrubbed = scrubInput(word);
  return evaluateString(stringScrubbed);
};

const translateButton = document.querySelector(".translate");
translateButton.addEventListener("click", function () {
  const inputString = document.querySelector(".pig-latin-input").value;
  const outputDiv = document.querySelector(".pig-latin-output");
  outputDiv.innerHTML = pigLatin(inputString);
});
