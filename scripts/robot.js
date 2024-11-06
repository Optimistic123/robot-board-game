import { renderGrid } from './grid.js';
import { updateCounters } from './utils.js';

export function moveRobot(robot, rowChange, colChange, gameState, manualClick) {
    let robotPos = robot === 1 ? gameState.robot1Pos : gameState.robot2Pos;
    let newRow = robotPos.row + rowChange;
    let newCol = robotPos.col + colChange;

    if (newRow >= gameState.gridSize || newCol < 0 || newCol >= gameState.gridSize) return;
    if (robot === 1) {
        gameState.robot1Pos = { row: newRow, col: newCol };
        gameState.robot1Chocolates += gameState.grid[newRow][newCol];
        gameState.robot1Path.push({ row: newRow, col: newCol });
    } else {
        gameState.robot2Pos = { row: newRow, col: newCol };
        gameState.robot2Chocolates += gameState.grid[newRow][newCol];
        gameState.robot2Path.push({ row: newRow, col: newCol });
    }

    gameState.totalChocolates = gameState.robot1Chocolates + gameState.robot2Chocolates;
    renderGrid(gameState);
    updateCounters(gameState);

    if(gameState.autoPlayMode || manualClick) {
        toggleActiveRobot(gameState);
    }
}

export function resetRobots(gameState) {
    gameState.robot1Pos = { row: 0, col: 0 };
    gameState.robot2Pos = { row: 0, col: gameState.gridSize - 1 };
    gameState.robot1Path = [{ row: 0, col: 0 }];
    gameState.robot2Path = [{ row: 0, col: gameState.gridSize - 1 }];
}

export function toggleActiveRobot(gameState) {
    gameState.activeRobot = gameState.activeRobot === 1 ? 2 : 1;
}
