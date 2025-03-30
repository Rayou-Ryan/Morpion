class Morpion {
    constructor(gridElement) {
        this.gridElement = gridElement;
        this.currentPlayer = 'X';
        this.board = Array(3).fill(null).map(() => Array(3).fill(null));
        this.cells = Array.from(this.gridElement.querySelectorAll('.cell'));
        this.currentPlayerDisplay = document.getElementById('currentPlayer');
        this.replayButton = document.getElementById('replay');
        this.scores = { 'X': 0, 'O': 0 };
        this.playerOneScore = document.getElementById('playerOne');
        this.playerTwoScore = document.getElementById('playerTwo');

        this.init();
    }

    init() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(cell, index));
        });
        this.replayButton.addEventListener('click', () => this.resetGame());
        this.updateCurrentPlayerDisplay();
    }

    handleCellClick(cell, index) {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (this.board[row][col] !== null) return;

        this.board[row][col] = this.currentPlayer;
        cell.textContent = this.currentPlayer;

        if (this.checkWin()) {
            this.declareWinner();
            return;
        }

        if (this.isBoardFull()) {
            this.declareDraw();
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateCurrentPlayerDisplay();
    }

    checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const flatBoard = this.board.flat();
        return winningCombinations.some(combination =>
            combination.every(index => flatBoard[index] === this.currentPlayer)
        );
    }

    isBoardFull() {
        return this.board.flat().every(cell => cell !== null);
    }

    declareWinner() {
        document.querySelector('.win-display').textContent = `Joueur ${this.currentPlayer} a gagné !`;
        document.getElementById('grid').classList.add('won');
        this.scores[this.currentPlayer]++;
        this.updateScores();
    }

    declareDraw() {
        document.querySelector('.win-display').textContent = "Match nul !";
        document.getElementById('grid').classList.add('won');
    }

    resetGame() {
        this.board = Array(3).fill(null).map(() => Array(3).fill(null));
        this.cells.forEach(cell => cell.textContent = '');
        document.querySelector('.win-display').textContent = '';
        document.getElementById('grid').classList.remove('won');
        this.currentPlayer = 'X';
        this.updateCurrentPlayerDisplay();
    }

    updateCurrentPlayerDisplay() {
        this.currentPlayerDisplay.textContent = `Joueur ${this.currentPlayer}`;
    }

    updateScores() {
        this.playerOneScore.textContent = this.scores['X'];
        this.playerTwoScore.textContent = this.scores['O'];
    }
}

window.Morpion = Morpion;

document.addEventListener("DOMContentLoaded", () => {
    new Morpion(document.querySelector('#grid'));
});
