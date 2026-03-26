export function createPauseOverlay(scene) {
  const text = scene.add.text(400, 280, 'PAUZA', {
    fontSize: '64px',
    fill: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 24, y: 12 }
  }).setOrigin(0.5).setDepth(10).setVisible(false);
  return text;
}

export function createGameOverOverlay(scene) {
  const gameOverText = scene.add.text(400, 250, 'GAME OVER', {
    fontSize: '64px',
    fill: '#ff4444',
    backgroundColor: '#000000',
    padding: { x: 24, y: 12 }
  }).setOrigin(0.5).setDepth(10).setVisible(false);

  const restartHintText = scene.add.text(400, 340, 'Wciśnij ENTER by zrestartować', {
    fontSize: '24px',
    fill: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 16, y: 8 }
  }).setOrigin(0.5).setDepth(10).setVisible(false);

  return { gameOverText, restartHintText };
}

export function togglePause(isPaused) {
  return !isPaused;
}
