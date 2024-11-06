const gridSize = 4; // N*N Grid
let grid = [];
let robot1Pos = { row: 0, col: 0 };
let robot2Pos = { row: 0, col: gridSize - 1 };
let robot1Chocolates = 0;
let robot2Chocolates = 0;
let totalChocolates = 0;
let activeRobot = 1; // 1 for Robot 1, 2 for Robot 2
let autoPlayMode = false;
let robot1Path = [];
let robot2Path = [];

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    // document.getElementById('reset-btn').addEventListener('click', resetGame);

    document.getElementById('reset-btn').addEventListener('change', function() {
      if (this.checked) {
          resetGame();
      }
    });
    document.getElementById('auto-play-btn').addEventListener('click', startAutoPlay);
    document.addEventListener('keydown', handleKeyPress);
});

function initGame() {
    generateGrid();
    renderGrid();
    updateCounters();
    updateRobotStatusDisplay();
}

function generateGrid() {
    grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(Math.floor(Math.random() * 10) + 1);
        }
        grid.push(row);
    }
    robot1Path = [{ row: 0, col: 0 }];
    robot2Path = [{ row: 0, col: gridSize - 1 }];
}

function renderGrid() {
  const gridElement = document.getElementById('grid');
  gridElement.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;
  gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
  gridElement.innerHTML = '';
  debugger

  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.textContent = grid[i][j];

          // Highlight the paths for Robot 1 and Robot 2
          if (robot1Path.some(pos => pos.row === i && pos.col === j) && !(robot1Pos.row === i && robot1Pos.col === j && robot2Pos.row === i && robot2Pos.col === j)) {
              cell.classList.add('robot1-path');
          }
          if (robot2Path.some(pos => pos.row === i && pos.col === j) && !(robot1Pos.row === i && robot1Pos.col === j && robot2Pos.row === i && robot2Pos.col === j)) {
              cell.classList.add('robot2-path');
          }

          if (robot1Path.some(pos => pos.row === i && pos.col === j) && robot2Path.some(pos => pos.row === i && pos.col === j)) {
            cell.classList.add('both-robots');
          }

          // Check if both robots land on the same cell
          if (robot1Pos.row === i && robot1Pos.col === j && robot2Pos.row === i && robot2Pos.col === j) {
              cell.classList.add('both-robots');
          } else if (i === robot1Pos.row && j === robot1Pos.col) {
              cell.classList.add('robot1');
          } else if (i === robot2Pos.row && j === robot2Pos.col) {
              cell.classList.add('robot2');
          }

          cell.addEventListener('click', () => handleCellClick(i, j));
          gridElement.appendChild(cell);
      }
  }
}


function resetGame() {
    robot1Pos = { row: 0, col: 0 };
    robot2Pos = { row: 0, col: gridSize - 1 };
    robot1Chocolates = 0;
    robot2Chocolates = 0;
    totalChocolates = 0;
    activeRobot = 1;
    autoPlayMode = false;
    robot1Path = [{ row: 0, col: 0 }];
    robot2Path = [{ row: 0, col: gridSize - 1 }];
    initGame();
}

function startAutoPlay() {
    autoPlayMode = true;
    makeAutoMove();
}

function handleKeyPress(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        toggleActiveRobot();
    }

    if (!autoPlayMode && activeRobot === 1) {
        switch (event.key) {
            case 'ArrowDown':
                moveRobot(1, 1, 0); // Move Robot 1 down
                break;
            case 'ArrowLeft':
                moveRobot(1, 1, -1); // Move Robot 1 diagonal left down
                break;
            case 'ArrowRight':
                moveRobot(1, 1, 1); // Move Robot 1 diagonal right down
                break;
        }
    }
}

function toggleActiveRobot() {
    activeRobot = activeRobot === 1 ? 2 : 1;
    updateRobotStatusDisplay();
}

function updateRobotStatusDisplay() {
  const statusElement = document.getElementById('robot-status');
  statusElement.textContent = `Active Robot: Robot #${activeRobot}`;
}

function moveRobot(robot, rowChange, colChange) {
    let robotPos = robot === 1 ? robot1Pos : robot2Pos;
    let newRow = robotPos.row + rowChange;
    let newCol = robotPos.col + colChange;

    if (newRow >= gridSize || newCol < 0 || newCol >= gridSize) return;

    if (robot === 1) {
        robot1Pos = { row: newRow, col: newCol };
        robot1Chocolates += grid[newRow][newCol];
        robot1Path.push({ row: newRow, col: newCol });
    } else {
        robot2Pos = { row: newRow, col: newCol };
        robot2Chocolates += grid[newRow][newCol];
        robot2Path.push({ row: newRow, col: newCol });
    }

    totalChocolates = robot1Chocolates + robot2Chocolates;
    renderGrid();
    updateCounters();

    toggleActiveRobot();
}

function makeAutoMove() {
    if (autoPlayMode) {
        let robotPos = activeRobot === 1 ? robot1Pos : robot2Pos;

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

            if (newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                let chocolates = grid[newRow][newCol];
                if (chocolates > maxChocolates) {
                    maxChocolates = chocolates;
                    bestMove = move;
                }
            }
        });

        if (bestMove) {
            moveRobot(activeRobot, bestMove.rowChange, bestMove.colChange);
            setTimeout(makeAutoMove, 1000); // Recursively move every 1 second
        }
    }
}

function handleCellClick(row, col) {
    if (!autoPlayMode) {
        let currentRobotPos = activeRobot === 1 ? robot1Pos : robot2Pos;

        if (row === currentRobotPos.row + 1 && (col === currentRobotPos.col || col === currentRobotPos.col - 1 || col === currentRobotPos.col + 1)) {
            let rowChange = row - currentRobotPos.row;
            let colChange = col - currentRobotPos.col;
            moveRobot(activeRobot, rowChange, colChange);
        }
    }
}

function updateCounters() {
    document.getElementById('robot1-counter').textContent = `Robot 1 Chocolates: ${robot1Chocolates}`;
    document.getElementById('robot2-counter').textContent = `Robot 2 Chocolates: ${robot2Chocolates}`;
    document.getElementById('total-counter').textContent = `Total Chocolates: ${totalChocolates}`;
}
