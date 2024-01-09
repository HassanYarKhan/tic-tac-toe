const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameButton = document.querySelector('.btn');


let curentPlayer;
let gameGrid;
let movesX = [];
let movesO = [];
let winner = "";

let victory;
let tie;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//initialise game
function initialiseGame() {

    //reset game state.
    victory = false;
    tie = false;

    //intialise the player.
    curentPlayer = "X";

    //reset winner to none
    winner = "";

    // set gmaeGrid to empty.
    gameGrid = ["","","","","","","","","",];
   

    // new game button is to be hidden.
    newGameButton.classList.remove('active');

    // disaplay the current player.
    gameInfo.innerText = `Current Player - ${curentPlayer}`; 

    //clear UI
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove('win');
        box.style.pointerEvents = "all";
    })
}
initialiseGame();
newGameButton.addEventListener('click', initialiseGame);



// adding event listeners to all the boxes.
boxes.forEach((box,index) => {
    box.addEventListener('click', () => {
        handleclick(index);
    })
});


function handleclick(index) {
    if(gameGrid[index] === "")
    { 
     boxes[index].innerText = curentPlayer;
     boxes[index].style.pointerEvents = "none";
     gameGrid[index] = curentPlayer;
 
      // check if any player won 
      checkGameOver(); 
 
     //swap players
     swapTurn();
 
    //  gameInfo.innerHTML = `Current Player - ${curentPlayer}`;
 
    
    }
 }   



 function checkGameOver()
{  
    
    winningPositions.forEach((position) => { // position = 0,1,2
        if(gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="")
        {
            if(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]){
                winner = gameGrid[position[1]];
                boxes[position[0]].classList.add('win');
                boxes[position[1]].classList.add('win');
                boxes[position[2]].classList.add('win');
            }
        }
    })

    if(winner !== "")
    {
       victory = true;
       boxes.forEach((box) => {
            box.style.pointerEvents = "none";
       });
       gameInfo.innerHTML = `Winner - ${winner} `;
       newGameButton.classList.add('active');
    }    

    let count = 0;
    gameGrid.forEach((item) => {
        if(item !== "")
            count++;
    })

    if(winner === "" && count === 9){
        tie = true;
        newGameButton.classList.add('active');
        gameInfo.innerHTML = "DRAW";
    }
        
       


}



function swapTurn() {
    if(curentPlayer === "X")
        curentPlayer = "O";
    else
        curentPlayer = "X";
    if(victory === false && tie === false)
        gameInfo.innerHTML = `Current Player - ${curentPlayer} `;

}  

    

