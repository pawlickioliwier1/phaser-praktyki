// playerHealth.js – funkcje do obsługi życia gracza

export function takeDamage(health, damage) {
  if (typeof health !== "number" || typeof damage !== "number") {
    throw new Error("health and damage must be numbers")
  }

  if (health < 0) {
    throw new Error("health cannot be negative")
  }

  if (damage < 0) {
    throw new Error("damage cannot be negative")
  }

  return Math.max(0, health - damage)
}

export function isAlive(health) {
  if (typeof health !== "number") {
    throw new Error("health must be a number")
  }

  return health > 0
}