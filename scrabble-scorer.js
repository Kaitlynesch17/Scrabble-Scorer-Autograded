// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    word = input.question("Let's play some scrabble! Enter a word: ");
      return word;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
   word = word.toUpperCase();
   let score = word.length;

   return score;
};

let vowelBonusScorer = function (word){
   word = word.toUpperCase();
   let score = 0;
   let vowel = ['A', 'E', 'I', 'O', 'U'];
   
   for(let i = 0; i < word.length; i++) {
     if (vowel.includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;

   for(let i = 0; i < word.length; i++) {
     score += newPointStructure[word[i]];
   }
 
   return score;
};

let simpleObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
};

let bonusVowelObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer,
};

let oldScrabbleObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer,
};

let newScrabbleObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleObject, bonusVowelObject, newScrabbleObject];

function scorerPrompt(scoringAlgorithms) {
   console.log(`What scoring algorithm would you like to use? \n\n 0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n 1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n 2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`);
   scoringObject = input.question('Enter 0, 1, or 2: ');
  
   if (scoringObject === '0'){
      console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
   } else if (scoringObject === '1') {
      console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   } else if (scoringObject === '2') {
      console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
   } else {
      console.log("Invalid input")
      return scorerPrompt(scoringAlgorithms, initialPrompt);
   }

   return scoringObject;
}

function transform() {
   let newStructure = {};

   for (let items in oldPointStructure) {
     for (let i = 0; i < oldPointStructure[items].length; i++) {
       newStructure[oldPointStructure[items][i].toLowerCase()] = Number(items);
     }
   }
 
   return newStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt(scoringAlgorithms);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
