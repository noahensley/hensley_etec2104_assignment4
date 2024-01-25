"use strict"

let RouletteList = ["0", "34", "10", "21", "28", "4", "18", "9", "27", "22", "12", "3", "17", "20", "11", "33", "2", "10", "32", "00", "15", "8", "25", "1", "31", "20", "14", "30", "7", "24", "29", "35", "6", "13", "23", "19", "5", "36"];

let AnswerMessage = [];

let index = Math.floor(Math.random() * (RouletteList.length - 1));
let value = RouletteList[index];

// Could add a French number dictionary later
AnswerMessage.push(value); // Adds the number

isEven(index) ? AnswerMessage.push("Rouge") : AnswerMessage.push("Noir");

isEven(value) ? AnswerMessage.push("Pair") : AnswerMessage.push("Impair");

isPasse(value) ? AnswerMessage.push("Passe") : AnswerMessage.push("Manque");

console.log(AnswerMessage.join("!\n") + "!\n");

// Pass random index to determine red/black
// Pass random value to determine even/odd 
function isEven(value) {
    let num_val = parseInt(value);

    if (value === "00")
        return 1;
    
    if (num_val % 2 == 0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function isPasse(value) {
    let num_val = parseInt(value);

    if (value === "00") /*Passe*/
        return 1;

    if (num_val >= 19 && num_val <= 36) /*Passe*/
    {
        return 1;
    }
    else if (num_val >= 0 && num_val <= 18) /*Manque*/
    {
        return 0;
    }
}

