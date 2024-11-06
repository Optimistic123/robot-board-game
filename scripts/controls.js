import { moveRobot, toggleActiveRobot } from './robot.js';
import { updateRobotStatusDisplay } from './utils.js';

export function startAutoPlay(gameState) {
    gameState.autoPlayMode = true;
    makeAutoMove(gameState);
}

export function handleKeyPress(event, gameState) {
    if (event.key === 'Tab') {
        event.preventDefault();
        toggleActiveRobot(gameState);
        updateRobotStatusDisplay(gameState);
    }

    if (!gameState.autoPlayMode) {
        switch (event.key) {
            case 'ArrowDown':
                moveRobot(gameState.activeRobot, 1, 0, gameState); // Move Robot 1 down
                break;
            case 'ArrowLeft':
                moveRobot(gameState.activeRobot, 1, -1, gameState); // Move Robot 1 diagonal left down
                break;
            case 'ArrowRight':
                moveRobot(gameState.activeRobot, 1, 1, gameState); // Move Robot 1 diagonal right down
                break;
        }
    }
}

function makeAutoMove(gameState) {
    if (gameState.autoPlayMode) {
        let robotPos = gameState.activeRobot === 1 ? gameState.robot1Pos : gameState.robot2Pos;

        let possibleMoves = [
            { rowChange: 1, colChange: 0 }, // Down
            { rowChange: 1, colChange: -1 }, // Diagonal Left Down
            { rowChange: 1, colChange: 1 }, // Diagonal Right Down
        ];

        let bestMove = null;
        let maxChocolates = 0;

        possibleMoves.forEach(move => {
            let newRow = robotPos.row + move.rowChange;
            let newCol = robotPos.col + move.colChange;

            if (newRow < gameState.gridSize && newCol >= 0 && newCol < gameState.gridSize) {
                let chocolates = gameState.grid[newRow][newCol];
                if (chocolates > maxChocolates) {
                    maxChocolates = chocolates;
                    bestMove = move;
                }
            }
        });

        if (bestMove) {
            moveRobot(gameState.activeRobot, bestMove.rowChange, bestMove.colChange, gameState);
            updateRobotStatusDisplay(gameState);
            setTimeout(makeAutoMove.bind(this, gameState), 1000); // Recursively move every 1 second
        }
    }
}

export function handleCellClick(row, col, gameState) {
    if (!gameState.autoPlayMode) {
        let currentRobotPos = gameState.activeRobot === 1 ? gameState.robot1Pos : gameState.robot2Pos;

        if (row === currentRobotPos.row + 1 && (col === currentRobotPos.col || col === currentRobotPos.col - 1 || col === currentRobotPos.col + 1)) {
            let rowChange = row - currentRobotPos.row;
            let colChange = col - currentRobotPos.col;
            moveRobot(gameState.activeRobot, rowChange, colChange, gameState, true);
            updateRobotStatusDisplay(gameState);
        }
    }
}