export function clampPlayerPosition(x, y, sceneWidth, sceneHeight) { // Eksportujemy funkcję, żeby można było ją używać w innych plikach // Ta funkcja pilnuje, żeby gracz nie wyszedł poza ekran
  let newX = x // robimy kopię pozycji gracza (żeby nie psuć oryginalnej)
  let newY = y

  if (newX < 0) newX = 0 // za bardzo w lewo → zatrzymaj na krawędzi
  if (newY < 0) newY = 0 // za wysoko (nad ekranem) → zatrzymaj na górze
  if (newX > sceneWidth) newX = sceneWidth // za bardzo w prawo → zatrzymaj na krawędzi
  if (newY > sceneHeight) newY = sceneHeight // za nisko (pod ekranem) → zatrzymaj na dole

  return { x: newX, y: newY } // oddajemy bezpieczną pozycję
}