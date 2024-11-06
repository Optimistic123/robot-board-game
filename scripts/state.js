const gridSize = 3;
export const gameState = {
    gridSize: gridSize,         // N*N grid size
    grid: [[4,1,2], [3,6,1], [1,6,6]],            // Grid with random chocolates
    robot1Pos: { row: 0, col: 0 },  // Robot 1 position
    robot2Pos: { row: 0, col: 3 },  // Robot 2 position
    robot1Chocolates: 0,            // Chocolates collected by Robot 1
    robot2Chocolates: 0,            // Chocolates collected by Robot 2
    totalChocolates: 0,             // Total chocolates collected by both robots
    activeRobot: 1,                 // Active robot (1 for Robot1, 2 for Robot2)
    autoPlayMode: false,            // Autoplay mode flag
    robot1Path: [{ row: 0, col: 0 }],  // Path taken by Robot 1
    robot2Path: [{ row: 0, col:  gridSize - 1}],   // Path taken by Robot 2,   
};

export function resetGameState() {
    gameState.robot1Pos = { row: 0, col: 0 };
    gameState.robot2Pos = { row: 0, col: gameState.gridSize - 1 };
    gameState.robot1Chocolates = 0;
    gameState.robot2Chocolates = 0;
    gameState.totalChocolates = 0;
    gameState.activeRobot = 1;
    gameState.autoPlayMode = false;
    gameState.robot1Path = [{ row: 0, col: 0 }];
    gameState.robot2Path = [{ row: 0, col: gameState.gridSize - 1 }];
}
