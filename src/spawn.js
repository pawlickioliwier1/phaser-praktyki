// spawn.js – funkcje związane z losowaniem pozycji pojawiania się obiektów

export function getRandomSpawn(width, height) {
  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error("width and height must be numbers")
  }

  if (width <= 0 || height <= 0) {
    throw new Error("width and height must be > 0")
  }

  const x = Math.random() * width
  const y = Math.random() * height

  return { x, y }
}