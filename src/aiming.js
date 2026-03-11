// Funkcja oblicza kąt między graczem a kursorem myszy
export function getAngleToPointer(playerX, playerY, pointerX, pointerY) {

  // Math.atan2 oblicza kąt na podstawie różnicy współrzędnych
  // pointerY - playerY → różnica w osi Y
  // pointerX - playerX → różnica w osi X
  // wynik to kąt w radianach

  return Math.atan2(pointerY - playerY, pointerX - playerX);
}