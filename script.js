document.addEventListener("keydown", function(event) {
    if(event.altKey && event.key === "1"){
        window.location.href = "Timer.html";
    }
    if(event.altKey && event.key === "2"){
        window.location.href = "Algo.html";
    }
});

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function generateShuffledWord(wordsArray, length) {
    let extendedArray = [];
    while (extendedArray.length < length) {
        extendedArray = extendedArray.concat(wordsArray);
    }
    extendedArray = extendedArray.slice(0, length);
    return shuffleArray(extendedArray).join(' ');
}

const wordsArray = ["R", "R'", "R2","L", "L'", "L2","U", "U'", "U2","F", "F'", "F2","D", "D'", "D2","B", "B'", "B2"]; 
const shuffledWord = generateShuffledWord(wordsArray, 18); 

document.getElementById("rubik-moves").innerText = shuffledWord; 
 

const display = document.getElementById("timer");
let timer = null;
let strattime= 0;
let timetime = 0;
let isrunning = false;
let dis = document.getElementById("dis");
let times = [];

function start(){
    if(!isrunning){
        strattime = Date.now() - timetime;
        timer = setInterval(update , 1);
        isrunning = true;
    }
}

function stop(){
    let all;
    clearInterval(timer);
    timetime = Date.now() - strattime;
    isrunning = false;
    saveTime(timetime);
    document.getElementById("solves").innerText = times.length;
    document.getElementById("current").innerText = update();
}

function saveTime(time) {
    let formattedTime = update();
    let newEntry = document.createElement("p"); 
    newEntry.textContent = formattedTime; 
    dis.appendChild(newEntry); 
    times.push(dis.appendChild(newEntry));
}

function reset(){
    clearInterval(timer);
    strattime= 0;
    timetime = 0;
    isrunning = false;
    display.textContent = '00:00:00';
}

function update(){
    const nowtime = Date.now();
    timetime = nowtime - strattime;

    let mintues =Math.floor(timetime / (1000 * 60) % 60); 
    let seconds =Math.floor(timetime / 1000 % 60); 
    let milliseconds =Math.floor(timetime % 1000 / 10 );

    mintues = String(mintues).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliseconds = String(milliseconds).padStart(2,"0");
    
    display.textContent = `${mintues}:${seconds}:${milliseconds}`;
    return `${mintues}:${seconds}:${milliseconds}`;
}

document.body.onkeyup = function(event) {
    if (event.key == " "){
        if (!isrunning) {
            start(); 
        } else {
            stop(); 
            reset(); 
        }
    }
}