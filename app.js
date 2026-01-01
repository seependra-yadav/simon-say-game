let gameSeq = [];
let userSeq = [];

let sounds = {
    red: new Audio("music/click.mp3"),
    green: new Audio("music/click.mp3"),
    blue: new Audio("music/click.mp3"),
    yellow: new Audio("music/click.mp3"),
    wrong: new Audio("music/game-over.mp3")
};


let btns = ["red", "green", "yellow", "blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start");
// let resetBtn = document.querySelector(".reset");

startBtn.addEventListener("click", startGame);
// resetBtn.addEventListener("click", reset);

function startGame(){
if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
    // reset();
    
}

function gameFlash(btn) {
    btn.classList.add("flash");
     let color = btn.getAttribute("id");
     playSound(color);
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}



function levelUp() {
    userSeq = [];
    // gameSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    
    gameSeq.forEach((color,i)=>{
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            gameFlash(btn);
        }, i * 600);
    })


}

function checkAns(idx) {
    // let idx = level-1;

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        playSound("wrong");
        h2.innerHTML = `Game over! Your Score was <b>${level}</b> <br> Click on start for new Game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {

            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }

}


function btnPress() {
    let btn = this;
    userFlash(btn);
   
    userColor = btn.getAttribute("id");
     playSound(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function playSound(color) {
    sounds[color].currentTime = 0; // fast replay
    sounds[color].play();
}


