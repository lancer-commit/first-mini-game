let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-btn');
let newButton = document.querySelector('#new-btn');
let msgContainer = document.querySelector('#msg-container');
let msg = document.querySelector('#msg');

let playerTurn = true;   // true = X, false = O
let count = 0;           // kitne boxes bhar chuke

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
];

const disableBoxes = () => {
    boxes.forEach(function (box) {
        box.disabled = true;
    });
};

// sab boxes khali aur dobara click ke qabil
const enableBoxes = () => {
    boxes.forEach(function (box) {
        box.disabled = false;
        box.textContent = "";
    });
};

// winner message dikhana (winner = "X" ya "O")
const showWinner = (winner) => {
    msg.textContent = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

// draw message
const showDraw = () => {
    msg.textContent = "Game was a Draw!";
    msgContainer.classList.remove('hide');
    disableBoxes();
};

// Reset / New Game dono yahi chalate hain
const resetGame = () => {
    playerTurn = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let posValue1 = boxes[pattern[0]].textContent;
        let posValue2 = boxes[pattern[1]].textContent;
        let posValue3 = boxes[pattern[2]].textContent;

        if (posValue1 !== "" && posValue1 === posValue2 && posValue2 === posValue3) {
            showWinner(posValue1);   // box ki value (X ya O)
            return true;
        }
    }
    return false;
};

boxes.forEach ((box) => {
    box.addEventListener('click', function () {
        if (playerTurn) {
            box.textContent = 'X';
            playerTurn = false;
        } else {
            box.textContent = 'O';
            playerTurn = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        // 9 boxes bhar gaye aur winner nahi to draw
        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});

newButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);