export function getEnemiesCountForWave(wave) {
  return 2 + wave
}

export function shouldStartNextWave(enemiesLeft) {
  return enemiesLeft === 0
}