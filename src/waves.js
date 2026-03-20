// waves.js – zarządzanie falami wrogów

// Zwraca liczbę wrogów dla danej fali (2 + numer fali)
export function getEnemiesCountForWave(wave) {
  return 2 + wave;
}

// true, jeśli nie ma już żadnego wroga na mapie → start następnej fali
export function shouldStartNextWave(enemiesLeft) {
  return enemiesLeft === 0;
}