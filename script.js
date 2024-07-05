document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('[data-cell]');
    const playersTurn = document.getElementById('playersTurn');
    const winnerDisplay = document.getElementById('winner');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                winnerDisplay.innerText = `Player ${gameBoard[a]} Wins!`;
                winnerDisplay.style.display = 'block';
                // Send the game data to the server
                const round = "Round Number"; // Replace with the actual round number
                const result = gameBoard[a]; // Set the result to the winning player
                const moves = gameBoard; // Send the entire game board as moves
                sendDataToServer(round, result, moves);
                return;
            }
        }
        if (!gameBoard.includes('')) {
            gameActive = false;
            winnerDisplay.innerText = "It's a Tie!";
            winnerDisplay.style.display = 'block';
            // Send the game data to the server
            const round = "Round Number"; // Replace with the actual round number
            const result = "Tie"; // Set the result to "Tie"
            const moves = gameBoard; // Send the entire game board as moves
            sendDataToServer(round, result, moves);
        }
    }

    function sendDataToServer(round, result, moves) {
        fetch("index.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `round=${round}&result=${result}&moves=${JSON.stringify(moves)}`,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Display the response from the server
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            cell.innerText = currentPlayer;
            cell.classList.add(currentPlayer);

            checkWinner();

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playersTurn.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach((cell) => {
            cell.innerText = '';
            cell.classList.remove('X', 'O');
        });
        winnerDisplay.style.display = 'none';
        playersTurn.innerText = `Player X's Turn`;
    }

    cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);
});
