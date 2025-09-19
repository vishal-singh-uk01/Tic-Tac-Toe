let box = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn')
let newGameBtn = document.querySelector('#new-btn')
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')

let turnO = true // playerX, playerO
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4 ,8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

box.forEach((box) => {
    box.addEventListener("click", () => {

        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++

        let isWinner = checkWinner();

        if(count == 9 && !isWinner)
        gameDrawn();
    });
});

const gameDrawn = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide")
}

const disableBoxes = () =>{
    for(let bx of box){
        bx.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let bx of box){
        bx.disabled = false;
        bx.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
}

const checkWinner = () => {
    for(let pattern of winPattern){
        let posVal1 = box[pattern[0]].innerText;
        let posVal2 = box[pattern[1]].innerText;
        let posVal3 = box[pattern[2]].innerText;
        
        if(posVal1 != ""  && posVal2 != "" && posVal3 != ""){
            if(posVal1 === posVal2 && posVal2 ===posVal3){

                showWinner(posVal1);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)