export function getAngleToPointer(playerX, playerY, pointerX, pointerY) {
  return Math.atan2(pointerY - playerY, pointerX - playerX);
}