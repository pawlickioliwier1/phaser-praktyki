// waves.js – zarządzanie falami wrogów

// Zwraca liczbę wrogów dla danej fali – fala 1 = 3, każda kolejna +2
export function getEnemiesCountForWave(wave) {
  return 1 + wave * 2;
  // fala 1 → 3, fala 2 → 5, fala 3 → 7, fala 4 → 9, fala 5 → 11...
}

// true, jeśli nie ma już żadnego wroga na mapie → start następnej fali
export function shouldStartNextWave(enemiesLeft) {
  return enemiesLeft === 0;
}