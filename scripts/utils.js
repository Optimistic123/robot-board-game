export function updateCounters(gameState) {
    const robot1Chocolates = gameState.robot1Chocolates;
    const robot2Chocolates = gameState.robot2Chocolates;
    const totalChocolates = gameState.totalChocolates;

    document.getElementById('robot1-counter').textContent = `Robot 1 Chocolates: ${robot1Chocolates}`;
    document.getElementById('robot2-counter').textContent = `Robot 2 Chocolates: ${robot2Chocolates}`;
    document.getElementById('total-counter').textContent = `Total Chocolates: ${totalChocolates}`;
}

export function updateRobotStatusDisplay(gameState) {
    const activeRobot = gameState.activeRobot;
    const statusElement = document.getElementById('robot-status');
    statusElement.textContent = `Active Robot: Robot #${activeRobot}`;
}
