import { handleCellClick } from './controls.js'

export function initGame(gameState) {
    // gameState.grid = generateGrid(gameState.gridSize);
    renderGrid(gameState);
}

export function generateGrid(gridSize) {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            // row.push(Math.floor(Math.random() * 10) + 1);
        }
        grid.push(row);
    }
    return grid;
}

export function renderGrid(gameState) {
    const gridElement = document.getElementById('grid');
    const gridSize = gameState.gridSize;
    gridElement.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gridElement.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = gameState.grid[i][j];

            const { row: robot1Row, col: robot1Col} = gameState.robot1Pos;
            const { row: robot2Row, col: robot2Col } = gameState.robot2Pos;

            // Highlight robot paths
            if (gameState.robot1Path.some(pos => pos.row === i && pos.col === j)) {
                cell.classList.add('robot1-path');
            }
            if (gameState.robot2Path.some(pos => pos.row === i && pos.col === j)) {
                cell.classList.add('robot2-path');
            }

            if (robot1Row === i && robot1Col === j && robot2Row === i && robot2Col === j) {
                cell.classList.add('both-robots');
            } else if (i === robot1Row && j === robot1Col) {
                cell.classList.add('robot1');
            } else if (i === robot2Row && j === robot2Col) {
                cell.classList.add('robot2');
            }

            cell.addEventListener('click', () => handleCellClick(i, j, gameState));
            gridElement.appendChild(cell);
        }
    }
}
