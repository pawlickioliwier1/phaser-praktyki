export function getRandomSpawn(width, height) {
  // eksportujemy funkcję getRandomSpawn, żeby można było jej używać w innych plikach
  // width i height to szerokość i wysokość mapy / ekranu

  const x = Math.random() * width
  // losujemy pozycję X w zakresie szerokości mapy

  const y = Math.random() * height
  // losujemy pozycję Y w zakresie wysokości mapy

  return { x, y }
  // zwracamy obiekt z losową pozycją spawn: x i y
}