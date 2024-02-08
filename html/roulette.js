"use strict";

let sock;

function runRoulette() {
    let result = randomSpin();
    //displayResult(result);
    sock.send(JSON.stringify(result))
}

function randomSpin() {

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
    //let frenchNumber = frenchNumbers[value];

    AnswerMessage.push(value);

    isEven(index) ? AnswerMessage.push("Rouge") : AnswerMessage.push("Noir");

    isEven(value) ? AnswerMessage.push("Pair") : AnswerMessage.push("Impair");

    isPasse(value) ? AnswerMessage.push("Passe") : AnswerMessage.push("Manque");

    return AnswerMessage;
}

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

// Returns a list of style values.
function formatColor(string) {
    if (string === "Rouge")
        return ["red", "black"];
    if (string === "Noir")
        return ["black", "white"];
    if (string === "Pair")
        return ["aquamarine", "black"];
    if (string === "Impair")
        return ["lightsalmon", "black"];
    if (string === "Passe")
        return ["aquamarine", "black"];
    if (string === "Manque")
        return ["lightsalmon", "black"];
    if (string === undefined)
        return [];
}

function displayResult(result) {
    let tbl = document.getElementById("resulttable");
    tbl.style.borderCollapse = "collapse";
    let tr = document.createElement("tr");
    tr.style.border = "1px solid black";
    for (let i = 0; i < result.length; i++) {
        let td = document.createElement("td");
        td.textContent = result[i];
        td.style.textAlign = "left";
        if (i > 0) {
            let L = formatColor(result[i]);
            let backgroundColor = L[0];
            let textColor = L[1];
            td.style.backgroundColor = backgroundColor;
            td.style.color = textColor;
        }
        tr.appendChild(td);
    }   
    tbl.appendChild(tr);
    document.body.appendChild(tbl);
}

// I used ChatGPT to write this function
function drawSegmentedCircle(colors) {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    
    // Set the canvas size
    canvas.width = 200;
    canvas.height = 200;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    // Draw the red circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw alternating red and black segments
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, (i / 8) * Math.PI, ((i + 1) / 8) * Math.PI);
      ctx.fillStyle = colors[i % 2];
      ctx.fill();
    }
  }

  // ChatGPT wrote this function for me as well
  function toggleSegments() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');

    // Colors array for toggling
    const colors = ['red', 'black'];

    // Perform 10 toggles over 3 seconds
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        // Toggle colors and redraw the segmented circle
        drawSegmentedCircle(colors);
        // Swap the colors for the next iteration
        colors.reverse();
      }, i * 300); // Adjust the delay as needed
    }
  }

  function gotSpinResult(event){
    if (event.data != 'Someone has joined the casino.' && event.data != 'Someone has left the casino.');
    {
        let parsed_data = JSON.parse(event.data);  
        displayResult(parsed_data);
        toggleSegments();
    }
}

  function main(){
    sock = new WebSocket("ws://"+document.location.host+"/sock");
    sock.addEventListener("open", ()=>{ 
        document.getElementById("spinButton").disabled=0
        console.log("SOCK IS OPEN");
    });
    sock.addEventListener("message", gotSpinResult);

}

main();