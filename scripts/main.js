import { initGame, renderGrid } from './grid.js';
import { resetRobots } from './robot.js';
import { startAutoPlay, handleKeyPress } from './controls.js';
import { resetGameState, gameState } from './state.js';
import { updateCounters, updateRobotStatusDisplay } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initGame(gameState);
    updateCounters(gameState);
    updateRobotStatusDisplay(gameState);

    document.getElementById('reset-btn').addEventListener('change', function () {
        if (this.checked) {
            resetGame();
        }
    });

    document.getElementById('auto-play-btn').addEventListener('click', () => {
        startAutoPlay(gameState);
    });

    document.addEventListener('keydown', (event) => handleKeyPress(event, gameState));
});

function resetGame() {
    resetGameState();
    resetRobots(gameState);
    renderGrid(gameState);
    updateCounters(gameState);
    updateRobotStatusDisplay(gameState);
}

//added comment
