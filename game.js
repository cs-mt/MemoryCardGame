/* JavaScript Memory Card Game
Copyright (c) cs-mt github.com/cs-mt
2023-07-27 11:30 PM UTC+3 */

const delay = ms => new Promise(res => setTimeout(res, ms));

async function clickCell(cell, match){
    if(window.clickedCell == true){
        if(window.lastClicked == cell){
            return;
        }

        if(document.getElementById(cell).style.background != "rgb(0, 0, 0)"){
            return;
        }

        var tries = document.getElementById("tries").innerText
        tries = parseInt(tries) + 1;
        document.getElementById("tries").innerText = tries;


        document.getElementById(cell).style = "";

        if(window.lastClicked == match){
            document.getElementById(cell).style = "";
            document.getElementById(match).style = "";
        }else {
            await delay(1000);
            document.getElementById(cell).style = "background: rgb(0, 0, 0)";
            document.getElementById(window.lastClicked).style = "background: rgb(0, 0, 0)";
        }

        window.clickedCell = false;
    }else {
        if(document.getElementById(cell).style.background == "rgb(0, 0, 0)"){
            var tries = document.getElementById("tries").innerText
            tries = parseInt(tries) + 1;
            document.getElementById("tries").innerText = tries;

            window.clickedCell = true;
            window.lastClicked = cell;
            document.getElementById(cell).style = "";
        }
    }
    
}

function load() {
    var gameSizeInput = document.getElementById("gameSizeInput");
    var generateBtn = document.getElementById("generateBtn");

    var gameArea = document.getElementById("gameArea");

    generateBtn.addEventListener("click", async function () {
        var gameSize = gameSizeInput.value;

        if(gameSize % 2 != 0){
            alert("Only even numbers!");
            return;
        }

        var gameHtml = "";

        var cards = [];

        for (var i = 0; i < gameSize * gameSize; i++) {
            cards.push(i);
        }

        var hasMatch = {};

        for (var row = 0; row < gameSize; row++) {
            gameHtml += '<div class="row">';

            for (var cell = 0; cell < gameSize; cell++) {
                if (hasMatch[cell + gameSize * row] == undefined) {
                    var matchCard = cell + gameSize * row;

                    while (matchCard == cell + gameSize * row) {
                        matchCard = cards[Math.floor(Math.random() * cards.length)];
                    }

                    hasMatch[matchCard] = cell + gameSize * row;
                    hasMatch[cell + gameSize * row] = matchCard;

                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == matchCard) {
                            cards.splice(i, 1);
                            break;
                        }
                    }

                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] == cell + gameSize * row) {
                            cards.splice(i, 1);
                            break;
                        }
                    }

                    console.log(cards)
                }


                var cardNum = (hasMatch[cell + gameSize * row] + 1) * (hasMatch[hasMatch[cell + gameSize * row]] + 1);

                gameHtml += '<div class="cell" data-match="' + "cell" + '-' + hasMatch[cell + gameSize * row] + '" id="cell-' + parseInt(cell + gameSize * row) + '">';

                gameHtml += cardNum;

                gameHtml += "</div>";
            }

            gameHtml += '</div>';
        }

        gameHtml = "<p>Tries: <span id='tries'>0</span>" + "</p>" + gameHtml; 
        gameArea.innerHTML = gameHtml;

        var cells = gameArea.getElementsByClassName("cell");

        await delay(2000);

        for(var i=0;i<cells.length;i++){
            cells[i].style = "background: rgb(0, 0, 0)";
            cells[i].addEventListener("click", function(){
                clickCell(this.id, this.dataset.match);
            });
        }

    });
}

window.onload = load;