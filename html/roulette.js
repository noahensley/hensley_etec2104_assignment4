"use strict"

// I used ChatGPT to generate this object literal.
const frenchNumbers = {
    "0": "Zéro",
    "00": "Zéro-Zéro",
    "1": "Un", "2": "Deux", "3": "Trois", "4": "Quatre", "5": "Cinq", "6": "Six", "7": "Sept", "8": "Huit", "9": "Neuf", "10": "Dix",
    "11": "Onze", "12": "Douze", "13": "Treize", "14": "Quatorze", "15": "Quinze", "16": "Seize", "17": "Dix-Sept", "18": "Dix-Huit", "19": "Dix-Neuf", "20": "Vingt",
    "21": "Vingt et Un", "22": "Vingt-Deux", "23": "Vingt-Trois", "24": "Vingt-Quatre", "25": "Vingt-Cinq", "26": "Vingt-Six", "27": "Vingt-Sept", "28": "Vingt-Huit", "29": "Vingt-Neuf", "30": "Trente",
    "31": "Trente et Un", "32": "Trente-Deux", "33": "Trente-Trois", "34": "Trente-Quatre", "35": "Trente-Cinq", "36": "Trente-Six"
  };

let RouletteList = ["0", "34", "10", "21", "28", "4", "18", "9", "27", "22", "12", "3", "17", "20", "11", "33", "2", "10", "32", "00", "15", "8", "25", "1", "31", "20", "14", "30", "7", "24", "29", "35", "6", "13", "23", "19", "5", "36"];

let AnswerMessage = [];

let index = Math.floor(Math.random() * (RouletteList.length - 1));
let value = RouletteList[index];
let frenchNumber = frenchNumbers[value];

AnswerMessage.push(frenchNumber + "! (" + value + ")");

isEven(index) ? AnswerMessage.push("Rouge!") : AnswerMessage.push("Noir!");

isEven(value) ? AnswerMessage.push("Pair!") : AnswerMessage.push("Impair!");

isPasse(value) ? AnswerMessage.push("Passe!") : AnswerMessage.push("Manque!");

console.log(AnswerMessage.join("\n"));

// Pass random index to isEven to determine red/black
// Pass random value to isEven to determine even/odd 
function isEven(value) {
    let num_val = parseInt(value);

    if (value === "00") // Pair
        return 1;
    
    if (num_val % 2 == 0) // Pair
    {
        return 1;
    }
    else // Impair
    {
        return 0;
    }
}

function isPasse(value) {
    let num_val = parseInt(value);

    if (value === "00") // Passe
        return 1;

    if (num_val >= 19 && num_val <= 36) // Passe
    {
        return 1;
    }
    else if (num_val >= 0 && num_val <= 18) // Manque
    {
        return 0;
    }
}
  
  

