document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rules-btn').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('show');
    });
});


let playerScore = 0;
let computerScore = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;
let rollCount = 0; 


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}


function updateDiceAndScore() {
    const playerDice1 = rollDice();
    const playerDice2 = rollDice();
    const computerDice1 = rollDice();
    const computerDice2 = rollDice();

   
    document.querySelector('.player .dice .die:first-child').src = `../img/Side_${playerDice1}_Pips.png`;
    document.querySelector('.player .dice .die:last-child').src = `../img/Side_${playerDice2}_Pips.png`;

    
    document.querySelector('.computer .dice .die:first-child').src = `../img/Side_${computerDice1}_Pips.png`;
    document.querySelector('.computer .dice .die:last-child').src = `../img/Side_${computerDice2}_Pips.png`;

    
    playerScore = playerDice1 === 1 || playerDice2 === 1 ? 0 : playerDice1 === playerDice2 ? (playerDice1 + playerDice2) * 2 : playerDice1 + playerDice2;
    computerScore = computerDice1 === 1 || computerDice2 === 1 ? 0 : computerDice1 === computerDice2 ? (computerDice1 + computerDice2) * 2 : computerDice1 + computerDice2;

    playerTotalScore += playerScore;
    computerTotalScore += computerScore;

    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('player-total-score').textContent = playerTotalScore;
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('computer-total-score').textContent = computerTotalScore;

    rollCount++; 

    
    if (rollCount === 3) {
        const winnerMessage = determineWinner();
        document.getElementById('winner-message').textContent = winnerMessage;
        document.getElementById('roll-btn').disabled = true; 
    }
}


function determineWinner() {
    if (playerTotalScore > computerTotalScore) {
        return "Player wins!";
    } else if (playerTotalScore < computerTotalScore) {
        return "Computer wins!";
    } else {
        return "It's a tie!";
    }
}


function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerTotalScore = 0;
    computerTotalScore = 0;
    rollCount = 0; 

    document.getElementById('player-score').textContent = 0;
    document.getElementById('player-total-score').textContent = 0;
    document.getElementById('computer-score').textContent = 0;
    document.getElementById('computer-total-score').textContent = 0;
    document.getElementById('winner-message').textContent = "";

    document.querySelectorAll('.die').forEach(die => {
        die.src = '../img/Side_1_Pips.png'; 
    });

    document.getElementById('roll-btn').disabled = false; 
}


document.getElementById('roll-btn').addEventListener('click', function() {
    updateDiceAndScore();
});

document.getElementById('reset-btn').addEventListener('click', resetGame);
