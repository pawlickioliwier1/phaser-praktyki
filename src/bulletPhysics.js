// Funkcja oblicza prędkość pocisku w kierunku celu
export function getBulletVelocity(fromX, fromY, toX, toY, speed) {

  // różnica pozycji między startem a celem
  const dx = toX - fromX
  const dy = toY - fromY

  // długość wektora (odległość między punktami)
  const length = Math.sqrt(dx * dx + dy * dy)

  // normalizujemy wektor i mnożymy przez speed
  // dzięki temu pocisk zawsze leci z tą samą prędkością
  const vx = (dx / length) * speed
  const vy = (dy / length) * speed

  // zwracamy prędkość w osi X i Y
  return { vx, vy }
}
