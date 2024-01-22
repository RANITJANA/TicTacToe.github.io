
let playerFirst = prompt("Enter First Player's Name (max 15 char)");
let playerSecond = prompt("Enter Second Player's Name (max 15 char)");
let turnX = true; //X,O

let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let res = document.querySelector("#result");
let whichPlayer = document.querySelector("#move");
let block = document.querySelector("#block");

const winPattern =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


let announce = () => {
    block.style.display = "block";
    res.classList.add("winnerBoard");
    if (turnX) document.querySelector("#resName").innerText = `${playerSecond} Won The Game`;
    else document.querySelector("#resName").innerText = `${playerFirst} Won The Game`;
}


let setDefault = () => {
    newGame.addEventListener("click", () => {
        block.style.display = "none";
        res.classList.remove("winnerBoard");
        turnX = true
        whichPlayer.innerText = `${turnX ? playerFirst : playerSecond}'s Turn : ${turnX ? "X" : "O"}`;
        box.forEach((val) => {
            val.innerText = "";
            val.disabled = false;
        });
    });


}
reset.addEventListener("click", () => {
    turnX = true;
    whichPlayer.innerText = `${turnX ? playerFirst : playerSecond}'s Turn : ${turnX ? "X" : "O"}`;
    box.forEach((val) => {
        val.innerText = "";
        val.disabled = false;
    });
});
let checkWinner = () => {
    winPattern.forEach((pattern) => {
        let first = box[pattern[0]].innerText, second = box[pattern[1]].innerText, third = box[pattern[2]].innerText;

        if (first != "" && second != "" && third != "") {
            if (first == second && second == third) {

                announce();
                setDefault();

                return false;
            }
        }
    });
    return true;
}


let checkDraw = () => {
    let count = 0;
    box.forEach((val) => {
        val.innerText != "" ? count++ : 0;
    })

    if (count == 9 && checkWinner()) {
        block.style.display = "block";
        document.querySelector("#resName").innerText = "DRAW !!";
        res.classList.add("winnerBoard");
        setDefault();
    }
}

box.forEach((val) => {
    whichPlayer.innerText = `${playerFirst}'s Turn : X`;
    setDefault();
    val.addEventListener("click", () => {
        if (turnX) {
            val.innerText = "X";
        }
        else {
            val.innerText = "O";
        }
        val.disabled = true;    //make that button disabled
        turnX = !turnX;
        whichPlayer.innerText = `${turnX ? playerFirst : playerSecond}'s Turn : ${turnX ? "X" : "O"}`;
        checkWinner();
        checkDraw();
    });
});



